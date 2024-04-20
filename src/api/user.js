import request from '@/utils/request'

export function login(data) {
  console.log(data)
  return request({
    url: '/user/ManagerLogin/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  // console.log(token)
  return request({
    headers: {
      'Authorization': token
    },
    url: '/user/ManagerDetail/',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
