import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
export function postreply(id, reply) {
  return request({
    url: '/vue-admin-template/suggestion/reply',
    method: 'post',
    params: {
      id,
      reply
    }
  })
}
