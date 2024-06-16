<template>
  <div class="app-container">
    <el-input
      v-model="formerDateRange"
      placeholder="之前的时间起点和终点"
      disabled
    />
    <el-date-picker
      v-model="dateRange"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="限行尾号/星期">
        <template slot-scope="scope">
          <span>{{ scope.row.weekday }}</span>
        </template>
      </el-table-column>
      <el-table-column label="星期一">
        <template slot-scope="scope">
          <el-input v-model="scope.row.monday" />
        </template>
      </el-table-column>
      <el-table-column label="星期二">
        <template slot-scope="scope">
          <el-input v-model="scope.row.tuesday" />
        </template>
      </el-table-column>
      <el-table-column label="星期三">
        <template slot-scope="scope">
          <el-input v-model="scope.row.wednesday" />
        </template>
      </el-table-column>
      <el-table-column label="星期四">
        <template slot-scope="scope">
          <el-input v-model="scope.row.thursday" />
        </template>
      </el-table-column>
      <el-table-column label="星期五">
        <template slot-scope="scope">
          <el-input v-model="scope.row.friday" />
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" icon="el-icon-edit" @click="handleEdit">保存</el-button>
  </div>
</template>

<script>
import { handlelimit, getlimit } from '@/api/limit.js'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      dialogVisible: false,
      currentRow: null,
      tableData: [],
      dateRange: ['', ''],
      formerDateRange: ''
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created() {
    getlimit(this.token).then(res => {
      if (res.data.code === 200) {
        this.tableData[0].monday = res.data.data.limit_mon
        this.tableData[0].tuesday = res.data.data.limit_tue
        this.tableData[0].wednesday = res.data.data.limit_wed
        this.tableData[0].thursday = res.data.data.limit_thu
        this.tableData[0].friday = res.data.data.limit_fri
        this.formerDateRange = '上次设置的限行的时间区段为' + res.data.data.limit_date_start + '至' + res.data.data.limit_date_end
      }
    })
    this.tableData = [
      {
        weekday: '限行尾号',
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: ''
      }
    ]
  },
  methods: {
    handleEdit() {
      const formData = {
        limit_mon: String(this.tableData[0].monday),
        limit_tue: String(this.tableData[0].tuesday),
        limit_wed: String(this.tableData[0].wednesday),
        limit_thu: String(this.tableData[0].thursday),
        limit_fri: String(this.tableData[0].friday),
        limit_sat: 'Null',
        limit_sun: 'Null',
        limit_date_start: String(new Date(this.dateRange[0]).toISOString().slice(0, 10)),
        limit_date_end: String(new Date(this.dateRange[1]).toISOString().slice(0, 10))
      }
      // console.log(formData)
      // console.log(this.token)
      handlelimit(this.token, formData).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.created()
        } else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
