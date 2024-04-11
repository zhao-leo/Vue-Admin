<template>
  <div class="app-container">
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
          <el-input v-model="scope.row.monday"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="星期二">
        <template slot-scope="scope">
          <el-input v-model="scope.row.tuesday"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="星期三">
        <template slot-scope="scope">
          <el-input v-model="scope.row.wednesday"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="星期四">
        <template slot-scope="scope">
          <el-input v-model="scope.row.thursday"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="星期五">
        <template slot-scope="scope">
          <el-input v-model="scope.row.friday"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" icon="el-icon-edit" @click="handleEdit()">保存</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      currentRow: null,
      tableData: [
        {
          weekday: '限行尾号',
          monday: '1,6',
          tuesday: '2,7',
          wednesday: '3,8',
          thursday: '4,9',
          friday: '5,0'
        }
      ],
      dateRange: ['', '']
    }
  },
  methods: {
    handleEdit() {
      console.log(this.tableData)
      console.log(this.dateRange)
    }
  }
}
</script>
