<template>
  <div class="profile-edit">
    <h1>管理员信息</h1>
    <el-form class="form" @submit.prevent="submitForm">
      <el-form-item label="名字:">
        <el-input v-model="formData.manager_name" type="text" />
      </el-form-item>
      <el-form-item label="手机号码:">
        <el-input v-model="formData.manager_tele" type="text" />
      </el-form-item>
      <el-form-item label="账号:">
        <el-input v-model="formData.manager_account" type="text" />
      </el-form-item>
      <el-form-item label="密码:">
        <el-input v-model="formData.manager_code" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        manager_name: '',
        manager_tele: '',
        manager_account: '',
        manager_code: ''
      }
    }
  },
  methods: {
    submitForm() {
      // Handle the submit logic here
      console.log(this.formData)
    }
  }
}
</script>

<style scoped>
.profile-edit {
  max-width: 600px;
  margin: 0 auto;
}
</style>
