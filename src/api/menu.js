import request from '@/utils/request'

export function getRoleMenu(params) {
  return request({
    url: '/interface/user/getRoleMenu',
    method: 'get',
    params
    // params: { loginname: 's001' }
    // params: { loginname: 'test_sg' }
  })
}
export const getMenu_soo1 = [
  {
    href: '/example',
    name: 'Example',
    meta: {
      name: '模块',
      icon: 'example'
    },
    children: [{
      href: 'table-demo',
      name: 'table-demo',
      meta: {
        name: 'test_sg没有操作权限',
        icon: 'table',
        permission: 'table:remove,table:create,table:edit',
        target: '/modules/table-demo'
      }
    },
    {
      href: 'vue-swiper',
      name: 'vue-swiper',
      meta: {
        name: '图片预览',
        target: '/modules/vue-swiper',
        icon: 'table'

      }
    },
    {
      href: 'tree',
      name: 'Tree',
      meta: {
        name: '树',
        target: '/tree',
        icon: 'tree'
      }
    }, {
      href: 'table',
      name: 'Table',
      meta: {
        name: '综合',
        target: '/table',
        icon: 'table'
      }
    }
    ]
  },

  {
    href: '/nested',
    name: 'Nested',
    meta: {
      name: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        href: 'menu1',
        name: 'Menu1',
        meta: {
          target: '/nested/menu1', // Parent router-view
          name: 'Menu1'
        },
        children: [
          {
            href: 'menu1-1',
            name: 'Menu1-1',
            meta: {
              target: '/nested/menu1/menu1-1',
              name: 'Menu1-1'
            }
          },
          {
            href: 'menu1-2',
            name: 'Menu1-2',
            meta: {
              target: '/nested/menu1/menu1-2',
              name: 'Menu1-2'
            },
            children: [{
              href: 'menu1-2-1',
              name: 'Menu1-2-1',
              meta: {
                target: '/nested/menu1/menu1-2/menu1-2-1',
                name: 'Menu1-2-1'
              }
            },
            {
              href: 'menu1-2-2',
              name: 'Menu1-2-2',
              meta: {
                target: '/nested/menu1/menu1-2/menu1-2-2',
                name: 'Menu1-2-2'
              }
            }
            ]
          },
          {
            href: 'menu1-3',
            name: 'Menu1-3',
            meta: {
              target: '/nested/menu1/menu1-3',
              name: 'Menu1-3'
            }
          }
        ]
      },
      {
        href: 'menu2',
        meta: {
          target: '/nested/menu2',
          name: 'menu2'
        }
      }
    ]
  },

  {
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
  },

  {
    href: 'external-link',
    children: [{
      href: 'https://panjiachen.github.io/vue-element-admin-site/#/',
      meta: {
        name: 'External Link',
        icon: 'link'
      }
    }]
  },

  // 404 page must be placed at the end !!!
  {
    href: '*',
    redirect: '/404',
    hidden: true
  }
]

export const getMenu_test_sg = [
  {
    href: '/example',
    name: 'Example',
    meta: {
      name: '模块',
      icon: 'example'
    },
    children: [{
      href: 'table-demo',
      name: 'table-demo',
      meta: {
        name: 'test_sg没有操作权限',
        icon: 'table',
        permission: '',
        target: '/modules/table-demo'
      }
    }, {
      href: 'tree',
      name: 'Tree',
      meta: {
        name: '树',
        target: '/tree',
        icon: 'tree'
      }
    }
    ]
  },

  {
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
  }

]

