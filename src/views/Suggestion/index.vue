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
          {{ scope.row.sugg_text }}
        </template>
      </el-table-column>
      <el-table-column label="提出人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sugg_name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="最后处理日期" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.sugg_sub_time }}</span>
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
      <el-image
        v-if="imageUrl"
        :src="imageUrl"
        fit="contain"
        :preview-src-list="[imageUrl]"
        style="max-width: 400px; max-height: 400px;"
      />
      <audio v-if="isAudio(attachmentUrl)" controls>
        <source :src="attachmentUrl" type="audio/mpeg">
        您的浏览器不支持音频元素。
      </audio>
      <el-button
        v-else-if="attachmentUrl"
        type="primary"
        icon="el-icon-download"
        @click="downloadAttachment"
      >下载附件</el-button>
      <el-input
        v-model="handleMethod"
        placeholder="请输入处理方式"
      />
      <el-input
        v-model="replyContent"
        type="textarea"
        placeholder="请输入回复内容"
        :autosize="{ minRows: 3, maxRows: 5}"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitReply">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList, handleForm } from '@/api/suggestion.js'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      dialogVisible: false,
      replyContent: '',
      handleMethod: '',
      author: '',
      content: '',
      id: 0,
      dialogData: [
        { label: '反馈内容', value: '' },
        { label: '原始时间', value: '' },
        { label: '提出者', value: '' },
        { label: '手机号', value: '' },
        { label: '处理人', value: '' },
        { label: '反馈位置', value: '' },
        { label: '处理人电话', value: '' }
      ],
      imageUrl: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
      attachmentUrl: 'https://m701.music.126.net/20240412025820/1208de7c449d7fe5bb6d9eb75c9ab2fd/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/34455915010/53e0/684f/7196/b3c9e23956fb156f51c754f655f84895.docx'
    }
  },
  computed: {
    ...mapGetters([
      'name', 'phonenumber', 'token'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    isAudio(url) {
      return url.endsWith('.mp3') || url.endsWith('.wav') || url.endsWith('.ogg')
    },
    downloadAttachment() {
      window.open(this.attachmentUrl)
    },
    handleEdit(row) {
      this.dialogVisible = true
      this.dialogData[0].value = row.sugg_content
      this.dialogData[1].value = row.sugg_sub_time
      this.dialogData[2].value = row.sugg_name
      this.dialogData[3].value = row.sugg_staff_tele
      this.dialogData[4].value = this.name
      this.dialogData[5].value = row.sugg_site
      this.dialogData[6].value = this.phonenumber
      this.imageUrl = row.sugg_media
      this.attachmentUrl = row.sugg_file
      this.id = row.id
    },
    submitReply() {
      const formData = {
        sugg_status: true,
        sugg_staff_name: this.name,
        sugg_staff_tele: this.phonenumber,
        sugg_way: this.handleMethod,
        sugg_content: this.replyContent
      }
      console.log(formData)
      handleForm(this.token, this.id, formData).then(() => {
        this.dialogVisible = false
        this.fetchData()
      })
    },
    fetchData() {
      this.listLoading = true
      getList(this.token, {}).then(response => {
        console.log(response)
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
