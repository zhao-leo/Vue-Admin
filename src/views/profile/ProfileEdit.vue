<template>
    <div class="profile-edit">
      <h1>管理员信息</h1>
      <form @submit.prevent="submitForm" class="form">
        <div class="form-group">
          <label for="manager_name">名字:</label>
          <input type="text" id="manager_name" v-model="formData.manager_name" />
        </div>
        <div class="form-group">
          <label for="manager_tele">手机号码:</label>
          <input type="text" id="manager_tele" v-model="formData.manager_tele" />
        </div>
        <div class="form-group">
          <label for="manager_account">账号:</label>
          <input type="text" id="manager_account" v-model="formData.manager_account" />
        </div>
        <div class="form-group">
          <label for="manager_code">密码:</label>
          <input type="password" id="manager_code" v-model="formData.manager_code" />
        </div>
        <button type="submit" class="btn-submit">Save</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProfileEdit',
    data() {
      return {
        formData: {
          manager_name: '',
          manager_tele: '',
          manager_account: '',
          manager_code: ''
        }
      };
    },
    methods: {
      submitForm() {
        // Handle form submission logic here
        console.log('Form submitted:', this.formData);
        // You can add your logic here to submit the form data to the server
      }
    }
  };
  </script>
  
  <style scoped>
  .profile-edit {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
  }
  
  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .btn-submit {
    background-color: #007bff;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-submit:hover {
    background-color: #0056b3;
  }
  </style>