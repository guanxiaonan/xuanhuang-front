<template>
  <div class="app-container calendar-list-container">
    <div class="element">
      <span>基础设置</span>
      <el-button class="filter-item" style="float:right;">提交</el-button>
    </div>
    <hr>
<el-tabs v-model="activeName" @tab-click="handleClick">
<el-form  ref="form" :model="form" label-width="200px">
<el-tabs v-model="activeName" @tab-click="handleClick">
  <el-tab-pane label="结算" name="first">
<el-form-item class="label" label="设计费抽成比例">

  <el-input style="width:600px;float:left" v-model="form.name" placeholder="为空则不抽成（%）"></el-input>
</el-form-item>
<el-form-item class="label" label="组件费抽成比例">

  <el-input style="width:600px;float:left" v-model="form.name" placeholder="为空则不抽成（%）"></el-input>
</el-form-item>
<el-form-item class="label" label="所得税比例">

<el-input style="width:600px;float:left" v-model="form.name" placeholder="提现时,扣除的个人所得税.空为不扣除个人所得税（%）"></el-input>

</el-form-item>
<el-form-item class="label" label="结算天数">

<el-input style="width:600px;float:left" v-model="form.name" placeholder="当订单完成后的n天后，才能申请提现,设置0或空，订单完成就可以结算"></el-input>

</el-form-item>



  </el-tab-pane>
  <el-tab-pane label="多商户端" name="second"></el-tab-pane>
  
</el-tabs>

 



</el-form>

  
</el-tabs>


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
<style>
.label{
  width: 200px;
  text-align: left
}
</style>

