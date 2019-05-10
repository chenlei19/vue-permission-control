<template>
  <div v-if="total" class="block text-right pagination-wrap">
    <el-row>
      <el-col :span="23">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSizes[0]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-col>
      <el-col :span="1">
        <div class="refresh-wrap">
          <i class="el-icon-refresh cursor-pointer" @click="handleRefresh" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 15, 20, 50, 100]
      }
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.$emit('pageSizeChange', val)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.$emit('currentPage', val)
    },
    handleRefresh() {
      this.$emit('paginationRfresh')
    }
  }
}
</script>
<style lang="scss">
.pagination-wrap {
  // position: fixed;
  // bottom: 0;
  // right: 0;
  // background: #f1f1f1;
  width: 100%;
  z-index: 10;
  padding: 6px 0 6px 0;
  .refresh-wrap {
    width: 32px;
    margin-top: 2px;
    margin-left: 10px;
    line-height: 26px;
    font-size: 20px;
    border: 1px solid #cccccc;
    border-radius: 3px;
    text-align: center;
    &:hover {
      background-color: #f1f1f1;
    }
  }
}
</style>

