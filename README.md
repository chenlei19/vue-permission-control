## 写在前面  
最近花了1天时间研究了基于vue的前端菜单权限，权限配置应该是做单页面应用都会遇到的问题，网上也有很多关于权限配置的文章，但是大多数也都说得不是很详细。我写个笔记把昨天倒腾的东西记录下，给不清楚怎么做权限的朋友参考。也许还有其他思路和方案，欢迎一起交流。


## 基于vue的实现思路
权限配置分为2种：
- 从后台请求过来权限，前端动态配置菜单
  > 从后期可维护性来看，权限做在后端更好些；通过后台返回的菜单动态构建路由，通过router.addRoutes()方法添加路由，所有的字段全都维护在后端，通过配置修改
    - ***菜单权限*** ：[后台请求的菜单](https://github.com/44021987/vue-permission-control/blob/master/src/api/menu.js)
      ```js
      const router = [{
        href: '/sys',
        name: 'System',
        meta: {
          name: '平台管理',
          icon: 'example'
        },
        children: [{
          href: 'sys-user',
          name: 'sys-user',
          meta: {
            target: '/sysindex/sys-user',
            name: '角色管理',
            icon: 'peoples'
          }
        },
        {
          href: 'sys-menu',
          name: 'sys-menu',
          meta: {
            target: '/sysindex/sys-menu',
            name: '菜单管理',
            icon: 'documentation'

          }
        }]
      }]
      ```
   
    - [在vuex里转化路由](https://github.com/44021987/vue-permission-control/blob/master/src/store/modules/permission.js)
      ```js
      /**
       * Filter asynchronous routing tables
      * @param routes asyncRoutes
      */
      export function filterAsyncRoutes(routes = []) {
        const res = []
        routes.forEach(route => {
          const tmp = createMenuPath(route)
          const childrenRoute = getChildren(tmp)
          tmp.component = Layout
          if (childrenRoute) {
            res.push(getChildren(tmp))
          } else {
            res.push(tmp)
          }
        })
        res.push({
          path: '*',
          redirect: '/404',
          hidden: true
        })
        return res
      }
      const actions = {
        generateRoutes({ rootState, commit }) {
          return new Promise(resolve => {
            // getRoleMenu({ loginname: rootState.user.name }).then(res => {
            //   const accessedRoutes = filterAsyncRoutes(res.data)
            //   commit('SET_ROUTES', accessedRoutes)
            //   resolve(accessedRoutes)
            // })
            const memu = (rootState.user.name === 's001') ? getMenu_soo1 : (rootState.user.name === 'test_sg' ? getMenu_test_sg : [])
            const accessedRoutes = filterAsyncRoutes(memu)
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
          })
        }
      }
      ```
    - [动态添加路由](https://github.com/44021987/vue-permission-control/blob/master/src/permission.js)
      - 每次进入路由的时候判断是否需要添加路由
      ```js
      // 每次进入路由的时候判断是否需要添加路由
      router.beforeEach(async(to, from, next) => {
        document.title = getPageTitle(to.meta.title)
        const hasToken = getToken()
        if (hasToken) {
          if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
          } else {
            const hasRoles = store.getters.permission_routes.length // 判断是否需要添加路由
            if (hasRoles) {
              // 路由存在不需，要再次添加路由vuex里保存进入页面的按钮权限字符
              store.commit('permission/SET_BTN_PERMISSION', to.meta.roles || '')
              next()
            } else {
              try {
                // 重点：请求菜单并转换成路由,并且在vuex中保存用于渲染导航
                const accessRoutes = await store.dispatch('permission/generateRoutes', [])
                // 添加转化后的路由
                router.addRoutes(accessRoutes)
                // vuex里保存进入页面的按钮权限字符
                store.commit('permission/SET_BTN_PERMISSION', to.meta.roles || '')
                next({ ...to, replace: true })
                // next()
              } catch (error) {
                await store.dispatch('user/resetToken')
                Message.error(error || 'Has Error')
                next(`/login?redirect=${to.path}`)
              }
            }
          }
        } else {

          if (whiteList.indexOf(to.path) !== -1) {
            next()
          } else {
            next(`/login?redirect=${to.path}`)
          }
        }
      })

      ```
      - ***按钮权限***：新建btn-permission.js，然后在main.js里引入
      ```js
        import Vue from 'vue'
        import store from '@/store'
        const _has = val => {
          const isShow = false
          const permissionStr = store.getters.roles
          if (permissionStr === undefined || permissionStr == null) {
            return isShow
          }
          if (permissionStr.indexOf(val) > -1) {
            return true
          }
          return isShow
        }
        Vue.directive('has', {
          inserted: function(el, binding, vnode) {
            const permissionsName = binding.value.permission
            if (!_has(permissionsName)) {
              el.parentNode.removeChild(el)
            }
          }
        })
      ```
      - 按钮权限在页面中使用
      ```html
        <template>
          <div class="dashboard-container">
            <div class="dashboard-text">name: {{ name }}</div>
            <h1>按钮权限测试</h1>
            <el-button v-has="{permission: 'dashboard:permission:create'}">新增</el-button>
            <el-button v-has="{permission: 'dashboard:permission:remove'}">删除</el-button>
            <el-button v-has="{permission: 'dashboard:permission:update'}">修改</el-button>
          </div>
        </template>
      ```
      
- 完全由前端配置：这种方案的权限不能动态进行配置，也可通过meta.roles进行判断，大致思路也一致，只是前端自己通过角色权限进行过滤
***
#### 实现思路

在实例化路由的时候分2种情况，首先实例化公共路由（也就是所有角色都能看的路由），登录成功后每次刷新时都从后台获取需要权限的菜单，通过菜单生成路由，然后用router.addRoutes()动态添加路由并且保存在vuex里。 


## 写在最后
- 按照现在的方案路由跟随菜单生成，并且由后台进行维护。这就避免了没有权限的用户直接输入地址访问的问题。
- 路由的层级和菜单的层级不挂钩，菜单可以有很多层，路由也许就2层，怎么把菜单转换成符合vue-router的格式，具体看项目需求，这个理解起来也没什么难度。
- 需要注意的是，如果菜单在登录获取后存在本地，这样就需要退出登录后才能获取新的权限，或者在后台返回401错误后重新获取权限菜单
> 一个问题：管理员动态修改路由后，其他角色需要下次登录才能得到新的权限信息。该角色在下次登录之前的某些操作可能是非法的，这时候除了后端在提交操作的时候验证权限，前端我暂时还想不到好的解决方案，有更好的解决方案跪求交流



