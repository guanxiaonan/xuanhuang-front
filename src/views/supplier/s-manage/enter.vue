<template>
  <div class="app-container calendar-list-container">
    <div class="element">
      <span>入驻中</span>
      <span>&nbsp;&nbsp;</span>
      <span>总数：</span>
      <el-button class="filter-item" style="float:right;" icon="el-icon-edit" @click="dialogfaVisible=true">添加商户</el-button>
    </div>

    <hr>
    <div class="filter-container">

      <el-button style="float:right" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;float:right" class="filter-item" :placeholder="$t('商户名称/联系人/手机号')"
        v-model="listQuery.title">
      </el-input>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">

      <el-table-column style="float:left" type="selection" align="center"></el-table-column>
      <el-table-column style="float:left" align="center" :label="$t('商户名称')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column style="float:left" align="center" :label="$t('商户类型')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>

      <el-table-column style="float:left" align="center" :label="$t('联系人')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column style="float:left" align="center" :label="$t('入驻时间')">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column style="float:left" align="center" :label="$t('到期时间')">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column style="float:left" class-name="status-col" :label="$t('table.status')" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column style="float:left" align="center" :label="$t('table.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('修改')}}</el-button>

          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="添加用户" :visible.sync="dialogfaVisible">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="添加商户" name="first">
          <el-form ref="form" :model="form" label-width="80px">

            <el-form-item label="商品名称">
              <span style="color:red">*</span>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="商户类型">
              <span style="color:red">*</span>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="联系人">
              <span style="color:red">*</span>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <span style="color:red">*</span>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
<div class="element">
  <span>账号信息</span>
</div>
<hr>
<el-form-item label="主账户名">
  <span style="color:red">&nbsp;</span>
  <el-input v-model="form.name"></el-input>
</el-form-item>
<el-form-item label="主账户密码">
  <span style="color:red">&nbsp;</span>
  <el-input v-model="form.name"></el-input>
</el-form-item>
<el-form-item label="服务到期时间">
  <span style="color:red">&nbsp;</span>
<el-date-picker v-model="value1" type="date" placeholder="选择日期">
</el-date-picker>

</el-form-item>
<el-form-item label="联系电话">
  <span style="color:red">*</span>
  <el-input v-model="form.name"></el-input>
</el-form-item>
<div class="element">
  <span>入驻状态</span>
</div>
<hr>
<el-form-item label="状态">
  <el-radio-group v-model="form.resource">
    <el-radio label="允许入驻"></el-radio>
    <el-radio label="暂停中"></el-radio>
  </el-radio-group>
</el-form-item>
<div class="element">
  <span>商户结算</span>
</div>
<hr>
<el-form-item label="收款人">
  <span style="color:red">*</span>
  <el-input v-model="form.name"></el-input>
</el-form-item>
<el-button class="filter-item" style="float:right;" icon="el-icon-edit">添加新商户</el-button>
<el-button class="filter-item" style="float:right;" icon="el-icon-edit">返回列表</el-button>




          </el-form>

        </el-tab-pane>
      

      </el-tabs>
    </el-dialog>



  </div>
</template>

<script>
  import {
    fetchList,
    fetchPv,
    createArticle,
    updateArticle
  } from '@/api/article'
  import waves from '@/directive/waves' // 水波纹指令
  import {
    parseTime
  } from '@/utils'

  const calendarTypeOptions = [{
    key: 'CN',
    display_name: 'China'
  },
  {
    key: 'US',
    display_name: 'USA'
  },
  {
    key: 'JP',
    display_name: 'Japan'
  },
  {
    key: 'EU',
    display_name: 'Eurozone'
  }
  ]

  // arr to obj ,such as { CN : "China", US : "USA" }
  const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  export default {
    name: 'complexTable',

    directives: {
      waves
    },
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        form1: {
          content: ''
        },
        activeName: 'first',

        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        importanceOptions: [1, 2, 3],
        calendarTypeOptions,
        sortOptions: [{
          label: 'ID Ascending',
          key: '+id'
        }, {
          label: 'ID Descending',
          key: '-id'
        }],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: 'published'
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogfaVisible: false,

        pvData: [],
        rules: {
          type: [{
            required: true,
            message: 'type is required',
            trigger: 'change'
          }],
          timestamp: [{
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }],
          title: [{
            required: true,
            message: 'title is required',
            trigger: 'blur'
          }]
        },
        downloadLoading: false
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      },
      typeFilter(type) {
        return calendarTypeKeyValue[type]
      }
    },
    created() {
      this.getList()
    },
    methods: {

      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          status: 'published',
          type: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.author = 'vue-element-admin'
            createArticle(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            updateArticle(tempData).then(() => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleDelete(row) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      },
      handleFetchPv(pv) {
        fetchPv(pv).then(response => {
          this.pvData = response.data.pvData
          this.dialogPvVisible = true
        })
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      }
    }
  }

</script>
<style lang="scss" scoped>
  .el-dialog {
    .el-input {
      width: 98%;
    }
  }

</style>
