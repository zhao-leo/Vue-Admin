import axios from 'axios'

export function handlePasswordSubmit(token, formData) {
  return axios({
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    url: `/user/ManagerDetail/`,
    method: 'put',
    data: JSON.stringify(formData)
  })
}

export function handleinformationSubmit(token, formData) {
  return axios({
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    url: `/user/ManagerDetail/`,
    method: 'put',
    data: JSON.stringify(formData)
  })
}
