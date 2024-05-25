import axios from 'axios'

export function GetAllCover(token, params) {
  return axios({
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    url: '/user/Cover/',
    method: 'get',
    params
  })
}

export function uploadCover(token, formData) {
  return axios({
    headers: {
      'Authorization': token,
      'Content-Type': 'multipart/form-data'
    },
    url: '/user/Cover/',
    method: 'post',
    data: formData
  })
}

export function deleteCover(token, id) {
  return axios({
    headers: {
      'Authorization': token
      // 'Content-Type': 'multipart/form-data'
    },
    url: `/user/CoverDetail/${id}/`,
    method: 'delete'
  })
}

export function GetAllNumber(token, params) {
  return axios({
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    url: '/user/Hotline/',
    method: 'get',
    params
  })
}

export function editNumber(token, id, formdata) {
  return axios({
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    url: `/user/HotlineDetail/${id}/`,
    method: 'put',
    data: JSON.stringify(formdata)
  })
}

export function addNumber(token, formdata) {
  return axios({
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    url: '/user/Hotline/',
    method: 'post',
    data: JSON.stringify(formdata)
  })
}

export function deleteNumber(token, id) {
  return axios({
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    url: `/user/HotlineDetail/${id}/`,
    method: 'delete'
  })
}

export function getExcel(token, formData) {
  return axios({
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    url: '/user/GetExcel/',
    method: 'post',
    data: JSON.stringify(formData)
  })
}
