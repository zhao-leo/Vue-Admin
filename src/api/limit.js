import axios from 'axios'
// import request from '@/utils/request'

export function handlelimit(token, formData) {
  return axios({
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'

    },
    url: '/user/Limit/',
    method: 'post',
    data: JSON.stringify(formData)
  })
}

export function getlimit(token, params) {
  return axios({
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    method: 'get',
    url: '/user/Limit/',
    params
  })
}
