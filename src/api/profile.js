export function handleForm(token, id, formData) {
    return axios({
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      url: `/user/SuggestionListDetail/${id}/`,
      method: 'put',
      data: JSON.stringify(formData)
    })
  }