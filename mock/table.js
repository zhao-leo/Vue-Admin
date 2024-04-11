const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    content: '@sentence(10, 20)',
    'status|1': ['已处理', '待处理'],
    author: 'name',
    user: 'nmae',
    phone: '@integer(13000000000, 18999999999)',
    location: 'location',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)',
    reply: ''
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
