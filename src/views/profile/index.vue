<template>
  <div class="profile-view">
    <h1 style="font-size: 2em;">管理员信息</h1>
    <el-card>
      <div style="font-size: 1.2em;">名字: {{ formData.manager_name }}</div>
      <div style="font-size: 1.2em;">手机号码: {{ formData.manager_tele }}</div>
      <div style="font-size: 1.2em;">账号: {{ formData.manager_account }}</div>
      <el-button type="primary" @click="openDialog">编辑</el-button>
    </el-card>
    <el-card>
      <el-button type="primary" @click="openPasswordDialog">修改密码</el-button>
    </el-card>
    <el-dialog title="编辑信息" :visible.sync="editMode" @close="editMode = false">
      <el-form class="form">
        <el-form-item label="名字:">
          <el-input v-model="formData.manager_name" type="text" />
        </el-form-item>
        <el-form-item label="手机号码:">
          <el-input v-model="formData.manager_tele" type="text" :maxlength="11" :minlength="11" pattern="\d*" />
          <span style="font-size: 12px; color: #333;">(请输入11位数字)</span>
        </el-form-item>
        <el-form-item label="账号:">
          <el-input v-model="formData.manager_account" type="text" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="passwordEditMode" @close="passwordEditMode = false">
      <el-form class="form">
        <el-form-item label="设置新密码:">
          <el-input v-model="newPassword" :type="showNewPassword ? 'text' : 'password'" />
          <el-button type="text" @click="showNewPassword = !showNewPassword">{{ showNewPassword ? '隐藏密码' : '显示密码' }}</el-button>
        </el-form-item>
        <el-form-item label="确认新密码:">
          <el-input v-model="confirmNewPassword" :type="showConfirmNewPassword ? 'text' : 'password'" />
          <el-button type="text" @click="showConfirmNewPassword = !showConfirmNewPassword">{{ showConfirmNewPassword ? '隐藏密码' : '显示密码' }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitPasswordForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { handlePasswordSubmit, handleinformationSubmit } from '@/api/profile.js'

export default {
  data() {
    return {
      formData: {
        manager_name: '',
        manager_tele: '',
        manager_account: ''
      },
      showNewPassword: false,
      showConfirmNewPassword: false,
      newPassword: '',
      confirmNewPassword: '',
      editMode: false,
      passwordEditMode: false
    }
  },
  computed: {
    ...mapGetters([
      'name', 'phonenumber', 'roles', 'token'
    ])
  },
  created() {
    this.formData.manager_name = this.name
    this.formData.manager_tele = this.phonenumber
    this.formData.manager_account = this.roles
  },
  methods: {
    openDialog() {
      this.editMode = true
      this.formData.manager_code = ''
    },

    openPasswordDialog() {
      this.passwordEditMode = true
    },
    submitForm() {
      if (this.formData.manager_tele.length !== 11) {
        this.$message.error('请输入11位手机号码')
        return
      }
      handleinformationSubmit(this.token, this.formData)
      // 处理提交逻辑，比如发送请求等
      this.editMode = false
    },
    submitPasswordForm() {
      const passworddata = {
        manager_code: this.newPassword,
        manager_recode: this.confirmNewPassword
      }
      handlePasswordSubmit(this.token, passworddata)
      // 处理提交逻辑，比如发送请求等
      // console.log('新密码:', this.newPassword)
      this.passwordEditMode = false
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
