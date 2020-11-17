<template>
  <ui-container class="page">
    <div class="white-bg relative">
      <h2 class="title-h2">资源管理</h2>

      <!-- 查询 -->
      <section>
        <el-form :inline="true" :model="formInline" class="flex-space-between center-horizontally">
          <el-form-item class="marg100" label="搜索条件1">
            <el-input v-model="formInline.qryParam1" placeholder="请输入搜索条件1"></el-input>
          </el-form-item>
          <el-form-item label="搜索条件2">
            <el-select v-model="formInline.qryParam2" placeholder="请选择搜索条件2">
              <el-option
                v-for="item in options"
                :key="item.value"
                :value="item.value"
                :label="item.lable"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="btnBox btn-center">
          <el-button @click="handleClickQueryList" type="primary" style="margin-right: 110px">查询</el-button>
          <el-button @click="handleClickAdd">新增</el-button>
        </div>
      </section>
      <section>
        <el-table :data="tableData" :header-cell-style="{background: '#f5f7fa'}">
          <el-table-column prop="tableData1" label="tableDataName1"></el-table-column>
          <el-table-column prop="tableData2" label="tableDataName2"></el-table-column>
          <el-table-column prop="tableData3" label="tableDataName3"></el-table-column>
          <el-table-column prop="tableData4" label="tableDataName4"></el-table-column>
          <el-table-column prop="tableData5" label="tableDataName5"></el-table-column>
          <el-table-column label="操作" width="260px">
            <template slot-scope="scope">
              <el-button @click="handleClickgetDetail(scope.row)" type="text">详情</el-button>
              <el-button @click="handleClickModify(scope.row)" type="text">修改</el-button>
              <el-button class="font-red" type="text" @click="handleClickDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="float-right">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            :page-size="pagesize"
            @current-change="handleClickChangePage"
            @size-change="handleClickChangePageSize"
          ></el-pagination>
        </div>
      </section>
    </div>
    <!-- 查询end -->

    <!-- 更新 -->
    <el-dialog :title="mode ? '新增':'修改'" :visible.sync="formVisible" center width="60%">
      <el-form
        :model="formData"
        :rules="rules"
        ref="form"
        label-position="left"
        :label-width="labelWidth"
      >
        <el-form-item label="formParamName1" prop="formParam1">
          <el-input v-model="formData.formParam1" placeholder="请输入formParamName1"></el-input>
        </el-form-item>
        <el-form-item label="formParamName2" prop="formParam2">
          <el-input v-model="formData.formParam2" placeholder="请输入formParamName2"></el-input>
        </el-form-item>
        <el-form-item label="formParamName3" prop="formParam3">
          <el-input v-model="formData.formParam3" placeholder="请输入formParamName3"></el-input>
        </el-form-item>
        <el-form-item label="formParamName4" prop="formParam4">
          <el-input v-model="formData.formParam4" placeholder="请输入formParamName4"></el-input>
        </el-form-item>
        <el-form-item label="formParamName5" prop="formParam5">
          <el-select v-model="formData.formParam5" placeholder="请选择formParamName5">
            <el-option
              v-for="item in options.slice(1)"
              :key="item.value"
              :value="item.value"
              :label="item.lable"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- jdbc -->
        <template v-if="formData.formParam5 == 'jdbc'">
          <el-form-item label="URL地址" prop="ConnUrl">
            <el-input v-model="formData.ConnUrl" placeholder="请输入URL地址"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="ConnUsername">
            <el-input v-model="formData.ConnUsername" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="ConnPassword">
            <el-input v-model="formData.ConnPassword" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="刷新最大条数" prop="ConnFlushMaxRows">
            <el-input v-model="formData.ConnFlushMaxRows" placeholder="请输入刷新最大条数"></el-input>
          </el-form-item>
          <el-form-item label="最大去重次数" prop="ConnMaxRetries">
            <el-input v-model="formData.ConnMaxRetries" placeholder="请输入最大去重次数"></el-input>
          </el-form-item>
        </template>
        <!-- jdbc -->
      </el-form>
      <div v-show="isDetail" slot="footer">
        <el-button @click="formVisible = false">取消</el-button>
        <el-button type="primary" @click="submit('form')">提交</el-button>
      </div>
    </el-dialog>
    <!-- 更新end -->
  </ui-container>
</template>

<script>
import {
  requestQuery,
  requestAdd,
  requestModify,
  requestDelete,
  requestDetail,
} from '@/api/realTimeData'
export default {
  name: 'firstName-lastName',
  data() {
    return {
      options: [
        {
          value: '',
          lable: '全部',
        },
        {
          value: 'kafka',
          lable: 'kafka',
        },
        {
          value: 'jdbc',
          lable: 'jdbc',
        },
        {
          value: 'hbase',
          lable: 'hbase',
        },
        {
          value: 'elasticsearch',
          lable: 'elasticsearch',
        },
      ],
      formInline: {
        qryParam1: '',
        qryParam2: '',
      },
      formData: {
        formParam1: '', // 资源名称
        formParam2: '', // 资源名称
        formParam3: '', // 资源名称
        formParam4: '', // 资源名称
        formParam5: 'kafka', // 资源类型
        // jdbc
        ConnUrl: '', // url地址
        ConnUsername: '', // 用户名
        ConnPassword: '', // 密码
        ConnMaxRetries: '', // 最大重试次数
      },
      rules: {
        formParam1: [
          { required: true, message: '请输入 formParam1', trigger: 'blur' },
        ],
        formParam2: [
          { required: true, message: '请选择 formParam2', trigger: 'blur' },
        ],
        formParam3: [
          { required: true, message: '请输入 formParam3', trigger: 'blur' },
        ],
        formParam4: [
          { required: true, message: '请输入 formParam4', trigger: 'blur' },
        ],
        formParam5: [
          { required: true, message: '请输入 formParam5', trigger: 'blur' },
        ],
      },
      mode: '', //1 add, 0 modify
      total: 0,
      pagesize: 10,
      currentPage: 1,
      formVisible: false,
      labelWidth: '120px',
      tableData: [],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleClickgetDetail(row) {
      this.initEditTable()
      this.getDetail(row)
    },
    getDetail(row) {
      const prama = {
        Id: row.Id,
      }
      requestDetail(prama)
        .then((data) => {
          this.$nextTick(() => {
            this.formData = {
              ...data,
            }
          })
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    getList() {
      const params = {
        HeadPageNum: this.currentPage,
        HeadPageSize: this.pagesize,
        RequestParam1: this.formInline.qryParam1,
        RequestParam1: this.formInline.qryParam2,
      }
      requestQuery(params)
        .then((data) => {
          this.tableData = data.List
          this.total = parseInt(data.HeadTotalNum)
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    handleClickAdd() {
      this.mode = 1
      this.initEditTable()
    },
    handleClickModify(row) {
      this.mode = 0
      this.initEditTable()
      this.getDetail(row)
    },
    initEditTable() {
      this.$nextTick(() => {
        this.$refs['form'].resetFields()
      })
      this.formVisible = true
    },
    submit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const params = {
            ...this.formData,
          }
          if (this.mode) {
            requestAdd(params)
              .then((data) => {
                this.formVisible = false
                this.getList()
                this.$message({
                  message: '添加成功',
                  type: 'success',
                })
              })
              .catch((err) => {
                console.log('err:', err)
              })
          } else {
            requestModify(params)
              .then((data) => {
                this.formVisible = false
                this.getList()
                this.$message({
                  message: '修改成功',
                  type: 'success',
                })
              })
              .catch((err) => {
                console.log('err:', err)
              })
          }
        } else {
          return false
        }
      })
    },
    handleClickDelete(row) {
      const params = {
        Id: row.Id,
      }
      this.$confirm(`请确认是否删除${row.name}?`, '提醒', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
      }).then(() => {
        requestDelete(params)
          .then((data) => {
            this.$message({
              message: '删除成功',
              type: 'success',
            })
            this.getList()
          })
          .catch((err) => {
            console.log('err:', err)
          })
      })
    },
    handleClickChangePage(currentPage) {
      this.currentPage = currentPage
      this.getList()
    },
    handleClickChangePageSize(size) {
      this.pagesize = size
      this.getList()
    },
  },
}
</script>

<style lang="scss" scoped>
.flex-space-between {
  display: flex;
  justify-content: space-between;
}
.center-horizontally {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
.font-red {
  color: red;
}
section {
  margin: 30px;
  text-align: center;
}
.marg100 {
  margin-right: 100px;
}
.float-right {
  position: absolute;
  right: 0;
  bottom: 0;
  padding-bottom: 5px;
  padding-right: 50px;
}
.relative {
  position: relative;
}
// element tableContent center
/deep/ .el-table .td,
.el-table.th {
  text-align: center !important;
}
</style>
