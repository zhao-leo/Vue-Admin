import axios from 'axios'
// import request from '@/utils/request'

export function getpageview(token, params) {
  return axios({
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    method: 'get',
    url: '/user/Frequency/',
    params
  })
}
