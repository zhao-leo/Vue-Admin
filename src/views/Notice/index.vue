<template>
  <el-container>
    <el-header>
      <h1>温馨提示</h1>
    </el-header>
    <el-main>
      <el-input v-model="noticeContent" type="textarea" :rows="4" placeholder="请输入公告内容" />
      <el-input v-model="formerContent" type="textarea" placeholder="当前公告内容" disabled style="font-size: 20px; color: #000000;" />
    </el-main>
    <el-footer>
      <el-button type="primary" @click="submitNotice">提交</el-button>
    </el-footer>
  </el-container>
</template>

<script>
import { handletext, gettext } from '@/api/notice.js'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      noticeContent: '',
      formerContent: '',
      listLoading: true,
      data: null
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      gettext(this.token, {}).then(response => {
        // console.log(response)
        this.data = response.data
        this.listLoading = false
        // console.log(this.data.data.warn_text)
        this.formerContent = this.data.data.warn_text
      })
    },
    submitNotice() {
      const formdata = {
        warn_text: this.noticeContent
      }
      handletext(this.token, formdata).then(() => {
        this.noticeContent = ''
        location.reload()
      })
    }
  }
}
</script>
