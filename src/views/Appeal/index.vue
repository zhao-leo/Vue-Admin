<template>
  <div class="app-container">
    <!-- <el-input
      v-model="searchTitle"
      placeholder="请输入标题"
    />
    <el-date-picker
      v-model="searchDate"
      type="date"
      placeholder="选择日期"
    />
    <el-button @click="handleSearch">搜索</el-button> -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
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
      <el-table-column label="提出者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="处理日期" width="200">
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
      <el-input v-model="content" placeholder="反馈内容" disabled />
      <el-date-picker v-model="originalTime" type="datetime" placeholder="原始时间" disabled />
      <el-input v-model="author" placeholder="提出者" disabled />
      <el-input v-model="server" placeholder="处理人" disabled />
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
        published: 'success',
        draft: 'gray'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogVisible: false,
      replyContent: '',
      author: '',
      server: ''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleEdit(index, row) {
      this.dialogVisible = true
      this.content = '反馈内容；' + row.content
      this.originalTime = row.display_time
      this.author = '反馈者：' + row.author
      this.server = '处理人：' + this.name
    },
    submitReply() {
      // 在这里发送数据
      this.dialogVisible = false
    },
    // handleSearch() {
    //   // 在这里处理搜索操作
    //   // 例如，你可以调用一个 API 来获取搜索结果
    //   // 然后将结果赋给 tableData
    // },
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
