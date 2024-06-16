<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          {{ scope.row.comp_text }}
        </template>
      </el-table-column>
      <el-table-column label="提出人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.comp_name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="最后处理日期" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.comp_sub_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">回复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="回复" :visible.sync="dialogVisible" width="80%">
      <el-table :data="dialogData" border style="width: 100%">
        <el-table-column prop="label" label="类型" width="180" />
        <el-table-column prop="value" label="内容" />
      </el-table>
      <div v-for="(item, index) in medialinkset" :key="index" class="image-container">
        <el-image :src="item.sugg_media" fit="contain" />
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input v-model="handlerName" placeholder="请输入处理人姓名" />
        </el-col>
        <el-col :span="12">
          <el-input v-model="handlerPhone" placeholder="请输入处理人电话" />
        </el-col>
      </el-row>
      <el-input v-model="replyMethod" placeholder="请输入处理方式" />
      <el-input v-model="replyContent" type="textarea" placeholder="请输入回复内容" :autosize="{ minRows: 3, maxRows: 5 }" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitReply">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList, handleForm } from '@/api/complaint.js'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      id: '',
      medialinkset: '',
      list: null,
      listLoading: true,
      dialogVisible: false,
      replyContent: '',
      replyMethod: '',
      handlerName: '',
      handlerPhone: '',
      dialogData: [
        { label: '反馈内容', value: '' },
        { label: '原始时间', value: '' },
        { label: '提出者', value: '' },
        { label: '手机号', value: '' },
        { label: '反馈位置', value: '' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'ids', 'token'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleEdit(row) {
      this.dialogVisible = true
      this.dialogData[0].value = row.comp_text
      this.dialogData[1].value = row.comp_sub_time
      this.dialogData[2].value = row.comp_name
      this.dialogData[3].value = row.comp_user_tele
      this.dialogData[4].value = row.comp_site
      this.medialinkset = row.complaintmedia_set
      this.id = row.id
    },
    submitReply() {
      const formData = {
        comp_status: true,
        comp_staff_name: this.handlerName,
        comp_staff_tele: this.handlerPhone,
        comp_way: this.replyMethod,
        comp_content: this.replyContent,
        comp_handle_id: this.ids
      }
      handleForm(this.token, this.id, formData).then(() => {
        this.dialogVisible = false
        this.fetchData()
        this.$message({
          message: '提交成功',
          type: 'success'
        })
      }).catch(error => {
        this.$message({
          message: '提交失败: ' + error.message,
          type: 'error'
        })
      })
    },
    fetchData() {
      this.listLoading = true
      getList(this.token, {}).then(response => {
        // console.log(response)
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.image-container {
  display: inline-block;
  margin-right: 10px;
}
</style>
