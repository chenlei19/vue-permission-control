import { asyncRouterMap, constantRouterMap } from '@/router'
const types = {
  SET_ROUTERS: 'SET_ROUTERS'
}
/**
 * 过滤菜单ID
 * @param routerIdList 后台返的children路由id
 * @param asyncItem 异步路由每一条的children路由
 */
function filterRouterId(routerIdList, asyncItem) {
  const o = {}
  for (const key in asyncItem) {
    if (key !== 'children') {
      o[key] = asyncItem[key]
    }
  }
  o.children = []
  for (let i = 0; i < asyncItem.children.length; i++) {
    const item = asyncItem.children[i]
    if (routerIdList.indexOf(item.meta.id) >= 0) {
      o.children.push(item)
    }
  }
  return o
}
/**
 * 过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param permissions 后台返的权限信息
 */
function filterAsyncRouter(asyncRouterMap, permissions) {
  const accessedRouters = []
  if (!permissions) return
  permissions.forEach(route => {
    const id = route.id
    const children = route.children
    for (let i = 0; i < asyncRouterMap.length; i++) {
      const asyncItem = asyncRouterMap[i]
      // 不需要id判断的
      if (!asyncItem.meta) {
        accessedRouters.push(asyncItem)
        continue
      }
      if (id === asyncItem.meta.id) {
        if (!children) {
          accessedRouters.push(asyncItem)
        } else {
          accessedRouters.push(filterRouterId(children, asyncItem))
        }
        break
      }
    }
  })
  return accessedRouters
}
const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    [types.SET_ROUTERS]: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({
      commit,
      state,
      rootState
    }, data) {
      return new Promise(resolve => {
        // 异步路由超级权限设置
        // if (rootState.user.token === 'admin') {
        //   accessedRouters = asyncRouterMap
        // } else {
        //   accessedRouters = filterAsyncRouter(asyncRouterMap, data)
        // }
        const accessedRouters = filterAsyncRouter(asyncRouterMap, data)
        commit(types.SET_ROUTERS, accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
