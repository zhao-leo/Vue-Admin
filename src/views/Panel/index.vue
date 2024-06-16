<template>
  <el-container class="app-container">
    <el-header>
      <h1>设定信息</h1>
    </el-header>
    <el-main v-loading="listLoading">
      <h2>封面轮播图设置</h2>
      <div v-for="(cover, index) in covers" :key="cover.id" class="image-container">
        <el-image :src="cover.cover_file" style="max-width: 330px; max-height: 330px; width: auto; height: auto; " />
        <el-button type="danger" @click="removeCover(index)">删除</el-button>
      </div>
      <el-upload action class="upload-demo" :http-request="uploadxCover" :before-upload="beforeCoverUpload" :show-file-list="false">
        <el-button slot="trigger" size="large" type="primary">添加封面图</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
      </el-upload>
    </el-main>
    <h2>社区热线</h2>
    <el-table v-loading="listLoading2" :data="hotlinesx" element-loading-text="Loading">
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系人" width="95">
        <template slot-scope="scope">
          {{ scope.row.hotline_who }}
        </template>
      </el-table-column>
      <el-table-column label="联系电话" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.hotline_tele }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="opennumdialog(scope.row)">修改</el-button>
          <el-dialog :visible.sync="dialogVisible" width="30%">
            <el-input v-model="form.hotline_who" :placeholder="scope.row.hotline_who" />
            <el-input v-model="form.hotline_tele" :placeholder="scope.row.hotline_tele" />
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleEditNumber()">确 定</el-button>
            </span>
          </el-dialog>
          <el-button size="mini" type="danger" @click="deletenumber(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template>
      <el-button type="primary" style="margin-top: 20px;" @click="addHotlineDialogVisible = true">添加热线联系人</el-button>
      <el-dialog :visible.sync="addHotlineDialogVisible" width="30%">
        <el-input v-model="newHotline.hotline_who" placeholder="联系人" />
        <el-input v-model="newHotline.hotline_tele" placeholder="电话" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="addHotlineDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addHotline()">确 定</el-button>
        </span>
      </el-dialog>
    </template>
    <el-button @click="downloadExcel">下载 Excel</el-button>
  </el-container>

</template>

<script>
import { mapGetters } from 'vuex'
import { GetAllCover, uploadCover, deleteCover, GetAllNumber, getExcel, deleteNumber, editNumber, addNumber } from '@/api/panel.js'

export default {
  data() {
    return {
      id: '',
      addHotlineDialogVisible: false,
      hotlinesx: null,
      covers: null,
      response: '',
      listLoading: true,
      listLoading2: true,
      dialogVisible: false,
      form: {
        hotline_who: '',
        hotline_tele: ''
      },
      newHotline: {
        hotline_who: '',
        hotline_tele: ''
      },
      excelform: {
        start_time: '2024-05-19',
        finish_time: '2024-05-24'
      }
    }
  },
  computed: {
    ...mapGetters([
      'ids', 'token'
    ])
  },
  async created() {
    await this.fetchCover()
    await this.fetchNumber()
  },
  methods: {
    downloadExcel() {
      getExcel(this.token, this.excelform).then(res => {
        const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${this.excelform.start_time}至${this.excelform.finish_time}报表.xls`
        link.click()
        window.URL.revokeObjectURL(url)
        console.log(this.hotlinesx)
      })
    },
    async uploadxCover({ file }) {
      // console.log(file)
      // console.log(this.token)
      var formData = new FormData()
      formData.append('cover_file', file)
      uploadCover(this.token, formData).then(res => {
        this.response = res.data
      })
      await this.fetchCover()
    },
    async fetchCover() {
      this.listLoading = true
      return GetAllCover(this.token, {}).then(response => {
        // console.log(response)
        this.covers = response.data.data
        this.listLoading = false
      })
    },
    removeCover(index) {
      deleteCover(this.token, this.covers[index].id).then(() => {
        this.fetchCover()
      })
    },
    beforeCoverUpload(file) {
      const isJPG2 = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isJPG = file.type === 'image/jpg'
      if (!isJPG && !isPNG && !isJPG2) {
        this.$message.error('上传封面图只能是 JPG/PNG 格式!')
      }
    },

    async fetchNumber() {
      this.listLoading2 = true
      return GetAllNumber(this.token, {}).then(response => {
        console.log(response.data.data)
        this.hotlinesx = response.data.data
        // console.log(this.hotlinesx)
        this.listLoading2 = false
      })
    },
    deletenumber(id) {
      deleteNumber(this.token, id).then(() => {
        this.fetchNumber()
      })
    },
    opennumdialog(data) {
      this.id = data.id
      this.dialogVisible = true
      this.form.hotline_who = data.hotline_who
      this.form.hotline_tele = data.hotline_tele
    },
    handleEditNumber() {
      console.log(this.id)
      editNumber(this.token, this.id, this.form).then(() => {
        this.fetchNumber()
      })
      this.dialogVisible = false
    },
    addHotline() {
      addNumber(this.token, this.newHotline).then(() => {
        this.fetchNumber()
      })
      this.addHotlineDialogVisible = false
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
