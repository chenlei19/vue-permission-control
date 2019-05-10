<template>
  <div>
    <main-table :title="'应用列表'">
      <template v-slot:all-area>
        <el-form ref="formInline" :inline="true" :model="formInline" class="form-inline" size="mini">
          <el-form-item label="选择时间" prop="time">
            <el-date-picker
              v-model="formInline.time"
              type="daterange"
              style="width:250px"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item prop="region">
            <el-select v-model="formInline.region" placeholder="类型选择">
              <el-option label="工程名称" value="1" />
              <el-option label="批文号" value="2" />
              <el-option label="施工单位" value="3" />
              <el-option label="监理单位" value="4" />
            </el-select>
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="formInline.code" placeholder="输入查询关键字" />
          </el-form-item>
          <el-form-item label="批文名称" prop="name">
            <el-input v-model="formInline.name" placeholder="批文名称" />
          </el-form-item>
          <el-form-item label="异常情况" prop="abnormal">
            <el-select v-model="formInline.abnormal" placeholder="状态选择">
              <el-option label="全部" value="1" />
              <el-option label="无异常" value="2" />
              <el-option label="有异常" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="开工状态" prop="state">
            <el-select v-model="formInline.state" placeholder="状态选择" style="width:120px;">
              <el-option label="全部" value="1" />
              <el-option label="计划内施工" value="2" />
              <el-option label="无计划施工" value="3" />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:right-area>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="formSearch()">查询</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetForm('formInline')">重置</el-button>
      </template>
      <template v-slot:left-area>
        <el-button-group>
          <el-button v-has="{permission:'table:create'}" type="primary" size="mini" @click="handleAdd">新增</el-button>
          <el-button v-has="{permission:'table:edit'}" type="primary" size="mini" @click="changeEdit">编辑</el-button>
          <el-button v-has="{permission:'table:remove'}" type="primary" size="mini" @click="changeDel">删除</el-button>

        </el-button-group>
      </template>
      <template v-slot:table>
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
          <el-table-column v-if="show" prop="transFileno" label="id" />
          <el-table-column prop="transFileno" label="批文文号" show-overflow-tooltip />
          <el-table-column prop="transFilename" label="批文名称" />

          <el-table-column label="批次年度" width="100">
            <template slot-scope="scope">
              <el-tooltip content="点击查看详情" placement="right">
                <router-link
                  class="underline"
                  :to="{
                    // path: '/example/table',
                    name: '/sysindex/sys-user',
                    query: {
                      id: scope.row.transFileno,
                      name: scope.row.createName
                    },
                    //params: {
                    //  title: scope.row.transFilename+' - '+scope.row.transYear,
                    //  name: scope.row.createName
                    //}
                  }"
                >{{ scope.row.transYear }}</router-link>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="tranDate" label="批次下达时间" width="130" sortable />
          <el-table-column prop="engCount" label="工程数量" width="100" />
          <el-table-column prop="createName" label="创建者" width="100" />
          <el-table-column prop="createDate" label="创建时间" width="100" />
          <el-table-column prop="remark" label="备注" show-overflow-tooltip />
          <el-table-column label="操作" width="140">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagi-nation :total="total" @pageSizeChange="getRows" @currentPage="getPage" @paginationRfresh="getRfresh" />
      </template>
    </main-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="editObj" :inline="true" size="small" :model="editObj" :rules="editObjRules" label-width="80px">
        <el-col :span="12">
          <el-form-item label="批文文号" prop="transFileno">
            <el-input v-model="editObj.transFileno" auto-complete="off" />
          </el-form-item>
        </el-col>
        <el-form-item label="批文名称" prop="transFilename">
          <el-input v-model="editObj.transFilename" auto-complete="off" />
        </el-form-item>
        <el-col :span="12">
          <el-form-item label="批文类型" prop="transType">
            <el-select v-model="editObj.transType" placeholder="类型选择">
              <el-option label="农网工程" value="1" />
              <el-option label="城网工程" value="2" />
              <el-option label="机井通电工程" value="3" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-form-item label="批次年度" prop="transYear">
          <el-input v-model="editObj.transYear" auto-complete="off" />
        </el-form-item>
        <el-col :span="12">
          <el-form-item label="下达时间" prop="tranDate">
            <el-date-picker
              v-model="editObj.tranDate"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-form-item label="工程数量" prop="engCount">
          <el-input v-model="editObj.engCount" auto-complete="off" />
        </el-form-item>
        <el-col :span="12">
          <el-form-item label="创建时间" prop="createDate">
            <el-date-picker
              v-model="editObj.createDate"
              type="date"
              :disabled="true"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-form-item label="归属机构" prop="createName">
          <tree-select
            v-model="editObj.createName"
            :data="data"
            :default-props="defaultProps"
            :node-key="nodeKey"
            :checked-keys="defaultCheckedKeys"
            @popoverHide="popoverHide"
          />
        </el-form-item>
        <el-form-item label="备注" style="width:100%;" prop="remark">
          <el-input v-model="editObj.remark" type="textarea" :rows="3" style="width:400px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTableList } from '@/api/table'

export default {
  data() {
    return {
      data: [{
        menuId: '1',
        menuName: '系统管理',
        childrenList: [{
          menuId: 100,
          menuName: '用户管理',
          childrenList: [{
            menuId: 1000,
            menuName: '国网重庆'
          },
          {
            menuId: 1001,
            menuName: '用户新增'
          },
          {
            menuId: 1002,
            menuName: '用户修改'
          },
          {
            menuId: 1003,
            menuName: '用户删除'
          }]
        },
        {
          menuId: 101,
          menuName: '角色管理',
          childrenList: [{
            menuId: 1000,
            menuName: '国网重庆市电'
          },
          {
            menuId: 1001,
            menuName: '用户新增'
          },
          {
            menuId: 1002,
            menuName: '用户修改'
          },
          {
            menuId: 1003,
            menuName: '用户删除'
          }]
        }]
      }],
      defaultProps: {
        children: 'childrenList',
        label: 'menuName'
      },
      nodeKey: 'menuId',
      defaultCheckedKeys: [], // tree-select选项赋值
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
      }, // 时间选择器控制范围
      show: false, // 隐藏表单id
      dialogStatus: '', // 弹出框标题
      textMap: {
        edit: '编辑',
        create: '新增'
      }, // 弹出框标题
      dialogFormVisible: false, // 弹出框默认隐藏隐藏
      listLoading: true, // 默认加载
      list: [], // 表格数据
      multipleSelection: [], // 选中项数据
      total: 0, // 分页总数
      tableHeight: null, // 表格高度自适应
      editObj: {
        transFileno: '',
        transFilename: '',
        transType: '',
        transYear: '',
        tranDate: '',
        engCount: '',
        createName: '',
        createDate: new Date()
      }, // 弹出框表单
      editObjRules: {
        transFileno: [{ required: true, message: '请输入批文文号', trigger: 'blur' }]
      } // 弹出框验证规则
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.defaultCheckedKeys = [1000]
    this.tableHeight = this.$tableHeigh()
  },
  methods: {
    formSearch() {
      console.log(this.formInline)
    },
    popoverHide(checkedIds, checkedData) {
      if (checkedData) {
        console.log(checkedIds)
        console.log(checkedData.menuName)
        this.editObj.createName = checkedData.menuName
      }
    },
    // 获取数据
    fetchData() {
      this.listLoading = true
      getTableList(this.listQuery).then(response => {
        this.list = response.date.items
        this.total = response.total
        this.listLoading = false
      })
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
    // 关闭弹窗
    editDialogClose() {
      this.dialogFormVisible = false
      this.$refs['editObj'].clearValidate()
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
              console.log(para)
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
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          // const para = { id: row.id }
          // getTableList(para).then(response => {
          //   this.$message({
          //     message: '删除成功',
          //     type: 'success'
          //   })
          //   this.fetchData()
          // })
          this.$message({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
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
      const index = this.multipleSelection[0].index
      if (len === 0) {
        this.$message.error('请选择一条数据')
      } else if (len > 1) {
        this.$message.error('只能选择一条数据')
      } else {
        // this.multipleSelection.map((selectedItem) => {
        //   this.editObj = Object.assign({}, selectedItem)
        // })
        console.log(index)
        this.handleDel(index, this.multipleSelection[0])
      }
    },
    // 行内显示编辑页面
    handleEdit(index, row) {
      this.editObj = Object.assign({}, row) // copy obj
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
      this.defaultCheckedKeys = [1003]
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
        createName: '',
        createDate: new Date()
      }
    },
    handleAdd() {
      this.resetTemp()
      this.defaultCheckedKeys = []
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['editObj'].clearValidate()
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
