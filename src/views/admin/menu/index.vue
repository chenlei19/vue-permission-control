<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4">
        <tree-table
          :title="'区域导航跟节点'"
          :height="tableHeight"
          :tree-list="treeList"
        />
      </el-col>
      <el-col :span="20">
        <main-table :title="'菜单管理'">
          <div slot="left-area">
            <el-button-group>
              <el-button type="primary" size="mini" @click="addShow = true">新增</el-button>
            </el-button-group>
          </div>
          <div slot="table">
            <el-table
              ref="multipleTable"
              v-loading="tableLoading"
              :data="tableList"
              highlight-current-row
              :height="tableHeight"
              stripe
            >
              <el-table-column type="selection" width="35" />
              <el-table-column label="类型" width="140">
                <template slot-scope="scope">
                  <span>{{ scope.type === '1' ? '菜单' : scope.type === '2' ? '按钮' : '' }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="菜单名称" show-overflow-tooltip fixed width="150" />
              <el-table-column prop="createtime" label="创建时间" fixed width="150" />
            </el-table>
            <pagi-nation :total="total" @pageSizeChange="getRows" @currentPage="getPage" @paginationRfresh="getRfresh" />
          </div>
        </main-table>
      </el-col>
    </el-row>
    <el-dialog title="新增" :visible.sync="addShow">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        size="small"
        :inline="true"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="新增类型"
          prop="type"
        >
          <el-select
            v-model="ruleForm.type"
            placeholder=""
            @change="reset('ruleForm')"
          >
            <el-option
              label="菜单"
              value="1"
            />
            <el-option
              label="按钮"
              value="2"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="名称"
          prop="title"
        >
          <el-input v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item
          label="上级菜单"
          prop="parentid"
        >
          <el-input v-model="ruleForm.parentid" />
        </el-form-item>
        <el-form-item
          v-show="isAddMenu"
          label="访问地址"
          prop="path"
        >
          <el-input v-model="ruleForm.path" />
        </el-form-item>
        <el-form-item
          v-show="isAddMenu"
          label="路由名称"
          prop="name"
        >
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item
          v-show="isAddMenu"
          label="页面地址"
          prop="component"
        >
          <el-input v-model="ruleForm.component" />
        </el-form-item>
        <el-form-item
          v-show="isAddMenu"
          label="跨域地址"
          prop="treehref"
        >
          <el-input v-model="ruleForm.treehref" />
        </el-form-item>
        <el-form-item
          label="显示图标"
          prop="icon"
        >
          <el-input v-model="ruleForm.icon" />
        </el-form-item>
        <el-form-item
          label="访问权限"
          prop="roles"
        >
          <el-input v-model="ruleForm.roles" />
        </el-form-item>
        <!-- <el-form-item
          label="角色类型"
          prop="grade"
        >
          <el-input v-model="ruleForm.grade" />
        </el-form-item> -->
        <el-form-item
          v-show="isAddMenu"
          label="是否显示"
          prop="showflag"
        >
          <el-select
            v-model="ruleForm.showflag"
            placeholder=""
          >
            <el-option
              label="显示"
              value="1"
            />
            <el-option
              label="隐藏"
              value="2"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="排序"
          prop="orderno"
        >
          <el-input v-model="ruleForm.orderno" />
        </el-form-item>
        <el-form-item
          label="说明"
          prop="remarks"
        >
          <el-input v-model="ruleForm.remarks" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import treeTable from '@/components/TreeMenu/index'
const defaultForm = {
  type: '1',
  name: '',
  showflag: '1',
  parentid: '00'
}
export default {
  components: {
    treeTable
  },
  data() {
    return {
      total: 0,
      treeList: [],
      tableList: [],
      tableHeight: null,
      tableLoading: false,
      addShow: false,
      ruleForm: { ...defaultForm },
      rules: {}
    }
  },
  computed: {
    isAddMenu() {
      return this.ruleForm.type === '1'
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.tableHeight = this.$tableHeigh()
    console.log(this.tableHeight)
  },
  methods: {
    fetchData() {
      this.tableLoading = true
      this.$http({
        url: '/interface/menu/page',
        method: 'get'
      }).then(res => {
        this.tableLoading = false
        this.tableList = res.rows
        this.total = res.total | 0
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            url: '/interface/menu/create',
            method: 'post',
            data: this.ruleForm
          }).then(res => {
            console.log(res, 233)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    reset(formName) {
      const type = this.ruleForm.type
      this.ruleForm = { ...defaultForm }
      this.ruleForm.type = type
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
    }
  }
}
</script>
