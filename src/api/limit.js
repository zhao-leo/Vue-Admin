import request from '@/utils/request'

export function handlelimit(params) {
  return request({
    url: '/vue-admin-template/limit/list',
    method: 'post',
    params
  })
}
