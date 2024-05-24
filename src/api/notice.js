import axios from 'axios'
// import request from '@/utils/request'

export function handletext(token, formData) {
  return axios({
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'

    },
    url: '/user/Warn/',
    method: 'post',
    data: JSON.stringify(formData)
  })
}

export function gettext(token, params) {
  return axios({
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    method: 'get',
    url: '/user/Warn/',
    params
  })
}
