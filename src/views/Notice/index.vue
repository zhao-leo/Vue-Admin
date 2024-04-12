<template>
  <el-container class="app-container">
    <el-header>
      <h1>温馨提示</h1>
    </el-header>
    <el-main>
      <el-input
        v-model="noticeContent"
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
      />
    </el-main>
    <el-footer>
      <el-button type="primary" @click="submitNotice">提交</el-button>
    </el-footer>
  </el-container>
</template>

<script>
import { MessageBox } from 'element-ui'

export default {
  data() {
    return {
      noticeContent: ''
    }
  },
  methods: {
    submitNotice() {
      MessageBox.alert('提交成功！', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
          // 在这里处理用户点击确定按钮后的逻辑
        }
      })
      console.log(this.noticeContent)
    }
  }
}
</script>
