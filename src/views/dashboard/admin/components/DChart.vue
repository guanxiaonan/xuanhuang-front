<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="element">
        <span>用户购买待发货订单</span>
      </div>
      <hr>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      <el-table-column class-name="status-col" :label="$t('table.status')" width="100">
        <template slot-scope="scope">
          <el-tag>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('table.date')">
        <template slot-scope="scope">
          <span>{{scope.row.creatTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('金额')" width="95">
        <template slot-scope="scope">
          <span v-if="scope.row.price" class="link-type" @click='handleFetchPv(scope.row.price)'>{{scope.row.price}}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" :label="$t('用户')">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" :label="$t('订单号')">
        <template slot-scope="scope">
          <span>{{scope.row.orderNo}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" :label="$t('table.actions')" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link to="/order/dingdan/more">
            <button type="primary" size="mini">详情</button>
          </router-link>
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
    fetchPv
  } from '@/api/article'
  import waves from '@/directive/waves' // 水波纹指令
import { getToken } from '@/utils/auth'
  import {
    parseTime
  } from '@/utils'
  import {
    getDeliverySO
  } from '@/api/shouye'

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
        authorization: '',
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
        this.authorization = getToken('Admin-Token')
        getDeliverySO(this.authorization).then(response => {
          this.list = response.data.data.orderList
          console.log(response)
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
      handleFetchPv(pv) {
        fetchPv(pv).then(response => {
          this.pvData = response.data.pvData
          this.dialogPvVisible = true
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
  .element {
    height: 40px;
    line-height: 40px;
    margin-bottom: 12px;
  }
</style>
