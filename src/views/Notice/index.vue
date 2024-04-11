<template>
  <el-container class="app-container">
    <el-header>
      <h1>温馨提示</h1>
    </el-header>
    <el-main>
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
        v-model="noticeContent"
      ></el-input>
    </el-main>
    <el-footer>
      <el-button type="primary" @click="submitNotice">提交</el-button>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      noticeContent: ''
    }
  },
  methods: {
    submitNotice() {
      // Handle the submit logic here
      console.log(this.noticeContent)
    }
  }
}
</script>
