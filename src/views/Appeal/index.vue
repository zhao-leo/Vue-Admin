<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="提出人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="最后处理日期" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">回复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="回复" :visible.sync="dialogVisible" width="80%">
      <el-table :data="dialogDataWithTime" border style="width: 100%">
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
      <el-button v-else-if="attachmentUrl" type="primary" icon="el-icon-download" @click="downloadAttachment">下载附件</el-button>
      <el-input v-model="replyContent" placeholder="请输入回复内容" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitReply">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table.js'
import { mapGetters } from 'vuex'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        已处理: 'success',
        待处理: 'gray'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      currentTime: new Date().toLocaleTimeString(),
      list: null,
      listLoading: true,
      dialogVisible: false,
      replyContent: '',
      author: '',
      content: '',
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
      attachmentUrl: 'https://m701.music.126.net/20240412025820/1208de7c449d7fe5bb6d9eb75c9ab2fd/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/34455915010/53e0/684f/7196/b3c9e23956fb156f51c754f655f84895.mp3'
    }
  },
  computed: {
    dialogDataWithTime() {
      return [...this.dialogData, { label: '当前时间', value: this.currentTime }]
    },
    ...mapGetters([
      'name', 'phonenumber'
    ])
  },
  created() {
    this.fetchData()
  },
  mounted() {
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    isAudio(url) {
      return url.endsWith('.mp3') || url.endsWith('.wav') || url.endsWith('.ogg')
    },
    downloadAttachment() {
      window.open(this.attachmentUrl)
    },
    handleEdit(index, row) {
      this.dialogVisible = true
      this.dialogData[0].value = row.content
      this.dialogData[1].value = row.display_time
      this.dialogData[2].value = row.author
      this.dialogData[3].value = row.phone
      this.dialogData[4].value = this.name
      this.dialogData[5].value = row.location
      this.dialogData[6].value = this.phonenumber
      console.log(this.content)
    },
    submitReply() {
      // 在这里发送数据
      this.dialogVisible = false
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
