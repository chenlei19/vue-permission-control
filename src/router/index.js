import Vue from 'vue'
import Router from 'vue-router'
import {
  asyncMenuList
} from '@utils/menu'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/index/index'
  },
  {
    path: '/index',
    redirect: '/index/index',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Index',
      component: () =>
        import('@/views/dashboard/index'),
      meta: {
        title: '首页',
        icon: 'example'
      }
    }]
  },
  {
    path: '/form',
    redirect: '/form/index',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Form',
      component: () => import('@/views/form/index'),
      meta: {
        title: '都能看见的',
        icon: 'form'
      }
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
// 异步加载的路由
export const asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {
      title: asyncMenuList.example.title,
      icon: 'example',
      id: asyncMenuList.example.id
    },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: {
          title: asyncMenuList.table.title,
          icon: 'table',
          id: asyncMenuList.table.id
        }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: {
          title: asyncMenuList.tree.title,
          icon: 'table',
          id: asyncMenuList.tree.id
        }
      }
    ]
  },
  {
    path: '/editor',
    component: Layout,
    name: 'editor',
    meta: {
      title: asyncMenuList.editor.title,
      icon: 'example',
      id: asyncMenuList.editor.id
    },
    children: [
      {
        path: 'index',
        name: 'editor01',
        component: () =>
          import('@/views/test/index'),
        meta: {
          title: asyncMenuList.editor1.title,
          icon: 'table',
          id: asyncMenuList.editor1.id
        }
      },
      {
        path: 'test2',
        name: 'editor02',
        component: () =>
          import('@/views/test2/index'),
        meta: {
          title: asyncMenuList.editor2.title,
          icon: 'table',
          id: asyncMenuList.editor2.id
        }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/index',
    name: 'test',
    meta: {
      title: asyncMenuList.test.title,
      icon: 'example',
      id: asyncMenuList.test.id
    },
    children: [
      {
        path: 'index',
        name: 'test_admin',
        component: () =>
          import('@/views/test/index'),
        meta: {
          title: asyncMenuList.test_admin.title,
          icon: 'table',
          id: asyncMenuList.test_admin.id
        }
      },
      {
        path: 'test2',
        name: 'test_editor',
        component: () =>
          import('@/views/test2/index'),
        meta: {
          title: asyncMenuList.test_editor.title,
          icon: 'table',
          id: asyncMenuList.test_editor.id
        }
      },
      {
        path: 'test3',
        name: 'test_admin2',
        component: () =>
          import('@/views/test2/index'),
        meta: {
          title: asyncMenuList.test_admin2.title,
          icon: 'table',
          id: asyncMenuList.test_admin2.id
        }
      }
    ]
  }
]
