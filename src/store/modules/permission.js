import { getMenu_soo1, getMenu_test_sg } from '@/api/menu'
// import { getRoleMenu } from '@/api/menu'
import Layout from '@/layout'
import { constantRoutes } from '@/router'

const _import = (path, callback) => {
  import(`@/views${path.replace(/\'+/g, '')}/index.vue`).then(res => {
    callback && callback(res.default)
  })
}
/**
 * 生成符合vue-router格式的数据
 * @param {*} route
 */
const createMenuPath = (route) => {
  route.path = route.href
  if (route.meta) {
    route.meta.title = route.meta.name
    route.name = route.meta.target || route.path
  }
  return route
}
/**
 * 生成路由
 * @param {*} tmp router item
 * @param {*} islev1 是否为根目录
 */
const getChildren = (tmp, islev1 = true) => {
  var data = tmp.children
  if (!data) return
  data.forEach((itemMenu, i) => {
    const child = createMenuPath(itemMenu)
    const childrenComponentPath = (child.meta && child.meta.target) || ''
    if (i === 0 && islev1 === true) {
      tmp.redirect = tmp.path + '/' + child.path
    }
    if (childrenComponentPath) {
      _import(childrenComponentPath, (res) => {
        child['component'] = res
      })
    }
    if (child.children && child.children.length) child.children = getChildren(child.children, false)
  })
  return tmp
}
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

const state = {
  routes: [],
  addRoutes: [],
  btnPermission: ''
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_BTN_PERMISSION: (state, permission) => {
    state.btnPermission = permission
  }
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

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
