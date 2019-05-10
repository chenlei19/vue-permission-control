import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin/table/list',
    method: 'get',
    params
  })
}

export function getTableList(params) {
  return request({
    url: 'https://easy-mock.com/mock/5b74cb1a2f68764eda1dca9e/pwgl/tableDemo/list',
    method: 'get',
    params
  })
}

export function getTreeList(params) {
  return request({
    url: 'https://easy-mock.com/mock/5b74cb1a2f68764eda1dca9e/pwgl/tree',
    method: 'get',
    params
  })
}
