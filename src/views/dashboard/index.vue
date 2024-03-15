<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎进入社区服务后台系统</div>
    <div class="dashboard-welcome">欢迎您: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
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
