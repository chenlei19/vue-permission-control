<template>
  <div>
    <main-table :title="'应用列表'">
      <div slot="all-area">
        <el-form ref="formInline" :inline="true" :model="formInline" class="form-inline" size="mini">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="formInline.name" placeholder="输入查询关键字" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="right-area">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="formSearch()">查询</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetForm('formInline')">重置</el-button>
      </div>
      <div slot="left-area">
        <el-button-group>
          <el-button type="primary" size="mini">新增</el-button>
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button type="primary" size="mini">删除</el-button>
          <el-button type="primary" size="mini">批量删除</el-button>
          <el-button type="primary" size="mini">授权配置</el-button>
          <el-button type="primary" size="mini">查看授权</el-button>
        </el-button-group>
      </div>
      <div slot="table">
        <el-table
          ref="multipleTable"
          v-loading="listLoading"
          :data="list"
          element-loading-text="加载中"
          element-loading-spinner="el-icon-loading"
          highlight-current-row
          :height="tableHeight"
          :default-sort="{prop: 'date', order: 'descending'}"
          stripe
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="35" />
          <el-table-column prop="transFilename" label="中文名称" width="220" />
          <el-table-column prop="transFileno" label="英文名称" width="200" />
          <el-table-column prop="createName" label="数据范围" width="100" />
          <el-table-column prop="remark" label="备注" show-overflow-tooltip />
        </el-table>
        <pagi-nation :total="total" @pageSizeChange="getRows" @currentPage="getPage" @paginationRfresh="getRfresh" />
      </div>
    </main-table>
  </div>
</template>

<script>
import { getTableList } from '@/api/table'

export default {
  data() {
    return {
      formInline: {
        name: this.$route.query.id || ''
      }, // 查询项
      listLoading: true, // 默认加载
      tableHeight: null, // 表格高度自适应
      total: 0, // 分页总数
      list: [] // 表格数据
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.tableHeight = this.$tableHeigh()
  },
  methods: {
    // 获取数据
    fetchData() {
      this.listLoading = true
      getTableList(this.listQuery).then(response => {
        this.list = response.date.items
        this.total = response.total
        this.listLoading = false
      })
    },
    // 分页
    getRows(val) {
      this.rows = val
      this.fetchData()
    },
    getPage(val) {
      this.page = val
      this.fetchData()
    },
    // 刷新
    getRfresh() {
      this.fetchData()
    },
    // 把每一行的索引放进row
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex
    },
    // 多选选中获取信息
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    formSearch() {
      console.log(this.formInline)
    },
    // 重置
    resetForm(formName) {
      this.formInline = {
        name: ''
      }
      this.$refs[formName].resetFields()
    }
  }
}
</script>
