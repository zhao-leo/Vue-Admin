import request from '@/utils/request'
import axios from 'axios'

export function getList(token, params) {
  return request({
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    url: '/user/ComplaintAll/',
    method: 'get',
    params
  })
}

export function handleForm(token, id, formData) {
  return axios({
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    url: `/user/ComplaintListDetail/${id}/`,
    method: 'put',
    data: JSON.stringify(formData)
  })
}
