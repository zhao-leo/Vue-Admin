<template>
  <div class="profile-view">
    <h1>管理员信息</h1>
    <el-card>
      <div>名字: {{ formData.manager_name }}</div>
      <div>手机号码: {{ formData.manager_tele }}</div>
      <div>账号: {{ formData.manager_account }}</div>
      <div>密码: ******</div>
      <el-button type="primary" @click="openDialog">编辑</el-button>
    </el-card>
    <el-dialog title="编辑信息" :visible.sync="editMode" @close="editMode = false">
      <el-form class="form">
        <el-form-item label="名字:">
          <el-input v-model="formData.manager_name" type="text" />
        </el-form-item>
        <el-form-item label="手机号码:">
          <el-input v-model="formData.manager_tele" type="text" :maxlength="11" :minlength="11" pattern="\d*" />
        </el-form-item>
        <el-form-item label="账号:">
          <el-input v-model="formData.manager_account" type="text" />
        </el-form-item>
        <el-form-item label="设置新密码:">
          <el-input
            v-model="formData.manager_code"
            :type="passwordType"
            :suffix-icon="passwordType === 'password' ? 'el-icon-view' : 'el-icon-edit'"
            :minlength="6"
            @click:append="showPwd"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      },
      editMode: false,
      passwordType: 'password'
    }
  },
  mounted() {
    this.formData = {
      manager_name: '张三',
      manager_tele: '13800138000',
      manager_account: 'admin',
      manager_code: ''
    }
  },
  methods: {
    openDialog() {
      this.editMode = true
      this.formData.manager_code = ''
    },
    submitForm() {
      console.log(this.formData.manager_account, this.formData.manager_code)
      this.editMode = false
    },
    showPwd() {
      this.passwordType === 'password' ? 'text' : 'password'
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
