export const menuList = [{
  id: '1',
  title: '首页'
}, {
  id: '2',
  title: '都能看见的'
}]

export const asyncMenuList = {
  example: {
    id: '3',
    title: '仅dmin可见'
  },
  table: {
    id: '3-1',
    title: 'table'
  },
  tree: {
    id: '3-2',
    title: 'tree'
  },
  editor: {
    id: '4',
    title: 'editor看见的'
  },
  editor1: {
    id: '4-1',
    title: 'editor01'
  },
  editor2: {
    id: '4-2',
    title: 'editor02'
  },
  test: {
    id: '5',
    title: '分角色权限看'
  },
  test_admin: {
    id: '5-1',
    title: 'admin可见'
  },
  test_admin2: {
    id: '5-3',
    title: 'admin可见2'
  },
  test_editor: {
    id: '5-2',
    title: 'editor也可见'
  },
  test_editor2: {
    id: '5-4',
    title: 'editor也可见02'
  }
}

export const adminMenuMap = [{
  id: '3'
}, {
  id: '5',
  children: ['5-1', '5-3']
}]

export const editorMenuMap = [{
  id: '4'
}, {
  id: '5',
  children: ['5-2', '5-4']
}]
