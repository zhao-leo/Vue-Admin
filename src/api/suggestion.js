import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
export function updateItem(id, data) {
  return request({
    url: `/vue-admin-template/table/update/${id}`,
    method: 'post',
    data
  })
}
