import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'token'
    ])
  }
}
export function getList(params) {
  return request({
    headers: {
      'Authorization': this.token
    },
    url: '/user/SuggestionAll/',
    method: 'get',
    params
  })
}

export function handleForm(params) {
}
