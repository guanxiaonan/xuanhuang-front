<template>
  <div class="app-container calendar-list-container">
<h4>已无效申请:{{invalid}}</h4>
    <div class="filter-container">

      <el-date-picker style="width:300px" v-model="listQuery.searchtime" value-format='yyyy-MM-dd' type="date" placeholder="选择日期">
      </el-date-picker>
      <el-button style="float:right" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-input style="width: 380px;float:right" placeholder="请输入关键词" v-model="listQuery.searchStr"></el-input>

      <el-select style="width: 120px;float:right" v-model="listQuery.searchCol" placeholder="订单号">
        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>


    </div>


    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">


      <el-table-column min-width="150px" label="单号">
        <template slot-scope="scope">
          <span>{{scope.row.presentNo}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="提现金额" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.money}}</span>

        </template>
      </el-table-column>
      <el-table-column align="center" label="实际到账金额" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.moneyOnhand}}</span>

        </template>
      </el-table-column>
      <el-table-column align="center" label="手续费金额" width="110">
        <template slot-scope="scope">
          <span>{{parseFloat(scope.row.money) - parseFloat(scope.row.moneyOnhand)}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="提现时间">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" :label="$t('table.status')" width="100">

        <template slot-scope="scope">
          <span>{{scope.row.status|statusfilter}}</span>
        </template>
      </el-table-column>

    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import {
    getWithdrawCountDetail,
    searchShopWithdrawCash
  } from '@/api/article'
  import waves from '@/directive/waves' // 水波纹指令
  const calendarTypeOptions = [{
    key: '0',
    display_name: '提现人'
  },
  {
    key: '1',
    display_name: '提现单号'
  }
  ]

  export default {
    name: 'pay',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        invalid: 0,
        list: [],
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 5,
          status: 3,
          searchtime: '',
          searchStr: '',
          searchCol: ''

        },
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
        dialogPvVisible: false,
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
        calendarTypeOptions,
        downloadLoading: false
      }
    },
    filters: {
      statusfilter(type) {
        const typeMap = {
          '0': '申请中',
          '1': '结算中',
          '2': '已结算',
          '3': '无效的'
        }
        return typeMap[type]
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getNumber() {
        getWithdrawCountDetail(this.res).then(response => {
          console.log('number', response)
          this.finished = response.data.data.withdrawdetail.finished
        })
      },
      getList() {
        this.listLoading = true
        searchShopWithdrawCash(this.listQuery).then(response => {
          this.list = response.data.data
          console.log('object', response)
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
      }
    }
  }
</script>
