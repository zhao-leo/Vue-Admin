<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎进入社区服务后台系统</div>
    <div class="dashboard-welcome">欢迎您: {{ name }}</div>
    <div class="dashboard-welcome">当前小程序访问量: {{ pageview }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getpageview } from '@/api/pageview.js'

export default {
  name: 'Dashboard',
  data() {
    return {
      pageview: ''
    }
  },
  computed: {
    ...mapGetters([
      'name', 'token'
    ])
  },
  created() {
    getpageview(this.token).then(res => {
      this.pageview = String(res.data.data)
      console.log(this.pageview)
    })
  }
}

</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 24px;
    line-height: 46px;
  }
  &-welcome {
    font-size: 18px;
    line-height: 36px;
  }
}
</style>
