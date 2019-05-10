import request from '@/utils/request'

export function login(data) {
  // return request({
  //   url: '/user/login',
  //   method: 'post',
  //   data
  // })
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          success: 'true',
          token: '125',
          name: data.username
        }
      })
    }, 500)
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  // return request({
  //   url: '/user/logout',
  //   method: 'post'
  // })
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          state: 'true'
        }
      })
    }, 500)
  })
}
