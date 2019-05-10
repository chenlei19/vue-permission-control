<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4">
        <tree-table
          :title="'菜单导航树'"
          :height="tableHeight"
          :tree-list="treeList"
          :loading="treeLoading"
          @refreshList="onRefresTable"
          @refreshTree="onRefresTree"
        />
      </el-col>
      <el-col :span="20">
        <main-table :title="'菜单列表'">
          <div slot="all-area">
            <el-form ref="formInline" :inline="true" :model="formInline" class="form-inline" size="mini">
              <el-form-item label="菜单名称" prop="code">
                <el-input v-model="formInline.code" placeholder="菜单名称" />
              </el-form-item>
              <el-form-item label="访问地址" prop="name">
                <el-input v-model="formInline.name" placeholder="访问地址" />
              </el-form-item>
            </el-form>
          </div>
          <div slot="right-area">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="formSearch()">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetForm('formInline')">重置</el-button>
          </div>
          <div slot="left-area">
            <el-button-group>
              <el-button type="primary" size="mini" @click="handleAdd">新增</el-button>
              <el-button type="primary" size="mini" @click="changeEdit">编辑</el-button>
              <el-button type="primary" size="mini" @click="changeDel">删除</el-button>
            </el-button-group>
          </div>
          <div slot="table">
            <el-table
              ref="multipleTable"
              v-loading="listLoading"
              :data="list"
              highlight-current-row
              :height="tableHeight"
              :default-sort="{prop: 'date', order: 'descending'}"
              stripe
              :row-class-name="tableRowClassName"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="35" />
              <el-table-column label="类型" width="140">
                <template slot-scope="scope">
                  <span>{{ !scope.row.permission  ? '菜单' : '按钮'}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="菜单名称" show-overflow-tooltip fixed width="150" />
              <el-table-column prop="permission" label="权限标识" show-overflow-tooltip fixed width="150" />
              <el-table-column prop="id" label="id" show-overflow-tooltip fixed width="250" />
              <el-table-column prop="href" label="访问地址" show-overflow-tooltip fixed width="150" />
              <el-table-column prop="createtime" label="创建时间" fixed width="150" />
              <el-table-column label="操作" width="140">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <pagi-nation :total="total" @pageSizeChange="getRows" @currentPage="getPage" @paginationRfresh="getRfresh" />
          </div>
        </main-table>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
          <div>
            <label for="">新增类型</label>
            <el-select
              v-model="add.type"
              size="small"
              placeholder=""
              style="width: 100px;margin-bottom: 12px"
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
          </div>
          <!-- 新增菜单 -->
          <el-form
            v-show="add.type==='1'"
            ref="addmenu"
            :model="add.menu"
            :rules="rules"
            size="small"
            :inline="true"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="名称"
              prop="name"
              required
            >
              <el-input v-model="add.menu.name" />
            </el-form-item>
            <el-form-item
              label="上级菜单"
              prop="parentids"
              required
            >
              <el-input v-model="add.menu.parentids" />
            </el-form-item>
            <el-form-item

              label="访问地址"
              prop="href"
            >
              <el-input v-model="add.menu.href" />
            </el-form-item>
            <el-form-item
              label="页面地址"
              prop="target"
            >
              <el-input v-model="add.menu.target" />
            </el-form-item>
            <el-form-item
              label="跨域地址"
              prop="treehref"
            >
              <el-input v-model="add.menu.treehref" />
            </el-form-item>
            <el-form-item
              label="显示图标"
              prop="icon"
            >
              <el-input v-model="add.menu.icon" />
            </el-form-item>
            <el-form-item

              label="是否显示"
              prop="showflag"
            >
              <el-select
                v-model="add.menu.showflag"
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
              required
            >
              <el-input v-model="add.menu.orderno" />
            </el-form-item>
            <el-form-item
              label="说明"
              prop="remarks"
            >
              <el-input v-model="add.menu.remarks" />
            </el-form-item>
          </el-form>
          <!-- 新增按钮 -->
          <el-form
            v-show="add.type==='2'"
            ref="addbtn"
            :model="add.menu"
            :rules="rules"
            size="small"
            :inline="true"
            label-width="100px"
            class="demo-ruleForm"
          >

            <el-form-item
              label="名称"
              prop="name"
              required
            >
              <el-input v-model="add.btn.name" />
            </el-form-item>
            <el-form-item
              label="上级菜单"
              prop="parentids"
              required
            >
              <el-input v-model="add.btn.parentids" />
            </el-form-item>
            <el-form-item
              label="显示图标"
              prop="icon"
            >
              <el-input v-model="add.btn.icon" />
            </el-form-item>
            <el-form-item
              label="访问权限"
              required
              prop="permission"
            >
              <el-input v-model="add.btn.roles" />
            </el-form-item>
            <el-form-item
              label="排序"
              prop="orderno"
              required
            >
              <el-input v-model="add.btn.orderno" />
            </el-form-item>
            <el-form-item
              label="说明"
              prop="remarks"
            >
              <el-input v-model="add.btn.remarks" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogFormVisible = false">取消</el-button>
            <el-button size="small" type="primary" @click="menuCreate">确定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import treeTable from '@/components/TreeMenu/index'
import { getTableList } from '@/api/table'
import { getTreeList } from '@/api/table'

export default {
  components: {
    treeTable
  },
  data() {
    return {
      treeList: [],
      tableHeight: null,
      treeLoading: true,
      formInline: {
        time: '',
        region: '',
        code: '',
        name: '',
        state: '',
        abnormal: ''
      }, // 查询项
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      show: false,
      dialogStatus: '', // 弹出框标题
      textMap: {
        edit: '编辑',
        create: '新增'
      },
      dialogFormVisible: false,
      listLoading: false, // 默认加载
      list: [], // 表格数据
      multipleSelection: [], // 选中项数据
      total: 0, // 分页总数
      add: {
        type: '1',
        menu: {
          showflag: '1',
          parentid: '00'
        },
        btn: {
          showflag: '1',
          parentid: '00'
        }
      },
      page: {
        rows: 10,
        page: 1
      },
      rules: {},
      editObjRules: {
        transFileno: [{ required: true, message: '请输入批文文号', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.fetchData()
    this.treeData()
  },
  mounted() {
    this.tableHeight = this.$tableHeigh()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.$http({
        url: '/interface/menu/page',
        method: 'get',
        params: this.page
      }).then(res => {
        this.listLoading = false
        this.list = res.rows
        this.total = res.total | 0
      })
    },
    formSearch() {
      console.log(this.formInline)
    },
    treeData() {
      this.treeLoading = true
      getTreeList(this.listQuery).then(response => {
        this.treeList = response.date.items
        this.treeLoading = false
      })
    },
    onRefresTable(data) {
      console.log(data.id)
      this.fetchData()
    },
    onRefresTree() {
      this.treeData()
    },
    // 把每一行的索引放进row
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex
    },
    // 多选选中获取信息
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    // 筛选功能
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    // 分页
    getRows(val) {
      this.page.rows = val
      this.fetchData()
    },
    getPage(val) {
      this.page.page = val
      this.fetchData()
    },
    // 刷新
    getRfresh() {
      this.fetchData()
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 新增
    createData() {
      this.$refs.editObj.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {})
            .then(() => {
              this.editObj.id = (parseInt(Math.random() * 100)).toString() // mock a id
              const para = Object.assign({}, this.editObj)
              getTableList(para).then(res => {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
                this.$refs['editObj'].clearValidate()
                this.dialogFormVisible = false
                this.fetchData()
              })
            })
            .catch(e => {
              // 打印一下错误
              console.log(e)
            })
        }
      })
    },
    // 修改
    updateData() {
      console.log(this.editObj.transFileno)
    },
    // 删除
    handleDel(index, row) {
      console.log(row)
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          const para = { id: row.id }
          getTableList(para).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.fetchData()
          })
        })
        .catch(e => {
          // 打印一下错误
          this.$message({
            message: e,
            type: 'warning'
          })
        })
    },
    // 行外删除
    changeDel() {
      const len = this.multipleSelection.length
      if (len === 0) {
        this.$message.error('请选择一条数据')
      } else if (len > 1) {
        this.$message.error('只能选择一条数据')
      } else {
        this.multipleSelection.map((selectedItem) => {
          this.editObj = Object.assign({}, selectedItem)
        })
        this.handleDel(this.editObj)
      }
    },
    // 行内显示编辑页面
    handleEdit(index, row) {
      this.editObj = Object.assign({}, row) // copy obj
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['editObj'].clearValidate()
      })
    },
    // 行外显示编辑页面
    changeEdit(row) {
      this.dialogStatus = 'edit'
      const len = this.multipleSelection.length
      if (len === 0) {
        this.$message.error('请选择一条数据')
      } else if (len > 1) {
        this.$message.error('只能选择一条数据')
      } else {
        this.dialogFormVisible = true
        this.multipleSelection.map((selectedItem) => {
          this.editObj = Object.assign({}, selectedItem)
        })
      }
      /* this.multipleSelection.forEach(selectedItem => {
        删除请求
        axios({
          url: '/xxxxxxx/delete/' + selectedItem.id,
          method: 'get',
          dataType: 'json'
        })
      }) */
    },
    // 显示新增界面
    resetTemp() {
      this.editObj = {
        transFileno: '',
        transFilename: '',
        transType: '',
        transYear: '',
        tranDate: '',
        engCount: '',
        createDate: new Date()
      }
    },
    handleAdd() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['addmenu'].clearValidate()
        this.$refs['addbtn'].clearValidate()
      })
    },
    menuCreate() {
      const type = this.add.type
      const formName = type === '1' ? 'addmenu' : 'addbtn'
      this.$refs[formName].validate(valid => {
        const data = type === '1' ? { ...this.add.menu } : { ...this.add.btn }
        data.appid = 'e9a3eb64e6c111e7a2c6450140ea936c'
        if (valid) {
          this.$http({
            url: '/interface/menu/create',
            method: 'post',
            data
          }).then(res => {
            console.log(res, 233)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.underline {
  text-decoration: underline;
  color: #409eff;
}
</style>
