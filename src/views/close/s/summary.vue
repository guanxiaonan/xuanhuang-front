<template>
  <div class="app-container calendar-list-container">
    <div class="element">
      <span>订单概述</span>
    </div>
    <hr>
    <el-row style=" border-bottom: 1px solid ">
      <el-col :span="6">
        <span>{{request.validcash}}</span>
        <el-row>可提现金额</el-row>
        <el-row>
          <button icon="money" @click="apply()">申请提现</button>
        </el-row>
      </el-col>
      <el-col :span="6">
        <span>{{request.uncheckcash}}</span>
        <el-row>待审核金额</el-row>
        <el-row></el-row>

      </el-col>
      <el-col :span="6">
        <span>{{request.unpaycash}}</span>
        <el-row>待结算金额</el-row>
        <el-row></el-row>

      </el-col>
      <el-col :span="6">
        <span>{{request.finishedcash}}</span>
        <el-row>已结算金额</el-row>
        <el-row></el-row>
      </el-col>
    </el-row>

    <el-dialog title="申请提现" :visible.sync="dialogjsVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可提现金额</span>
              <span style="float: right; padding: 3px 0" type="text">抽成比例:{{form.rate}}</span>
            </div>
            <span>{{form.validcash}}元</span>
            <span style="float: right; padding: 3px 0" type="text">抽成前的金额：{{parseFloat(form.validcash)/(1-parseFloat(form.rate))}}元</span>
          </el-card>
        </el-form-item>
        <el-form-item>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>订单金额</span>
              <span style="float: right; padding: 3px 0" type="text"></span>
            </div>
            <span>{{form.SOtotalmoney}}元</span>
            <span style="float: right; padding: 3px 0" type="text">订单个数：{{form.SOcount}}</span>
          </el-card>
        </el-form-item>
        <el-form-item label="提现申请">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>提现账号：{{form.shopaccount}}</span>
              <br>
              <span>最多可提现金额：{{form.validcash}}</span>
              <el-input style="width: 380px" v-model="res.money" placeholder="请输入你要提现的金额">请输入提现金额</el-input>
            </div>
            <button @click="submit">提交</button>
            <button>取消</button>
          </el-card>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogjsVisible = false">{{$t('table.confirm')}}</el-button>
      </span>
    </el-dialog>



  </div>
</template>

<script>
  import {
    applyWithdrawCash,
    getSODetailandWithdrawCash,
    getWithdrawCashDetail
  } from '@/api/article'
  import waves from '@/directive/waves' // 水波纹指令
  import {
    getToken
  } from '@/utils/auth'

  // const calendarTypeOptions = [
  //   { key: 'CN', display_name: 'China' },
  //   { key: 'US', display_name: 'USA' },
  //   { key: 'JP', display_name: 'Japan' },
  //   { key: 'EU', display_name: 'Eurozone' }
  // ]

  // arr to obj ,such as { CN : "China", US : "USA" }
  // const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  //   acc[cur.key] = cur.display_name
  //   return acc
  // }, {})

  export default {
    name: 'all',
    directives: {
      waves
    },
    data() {
      return {
        res: {
          account: '',
          money: '',
          authorization: ''
        },
        form: {
          shopaccount: '',
          validcash: '',
          rate: '',
          SOcount: '',
          SOtotalmoney: '',
          money: '',
          account: ''
        },
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        request: {
          validcash: '',
          uncheckcash: '',
          unpaycash: '',
          finishedcash: ''
        },
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        importanceOptions: [1, 2, 3],
        // calendarTypeOptions,
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
        dialogjsVisible: false,
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
    // filters: {
    //   statusFilter(status) {
    //     const statusMap = {
    //       published: 'success',
    //       draft: 'info',
    //       deleted: 'danger'
    //     }
    //     return statusMap[status]
    //   },
    //   typeFilter(type) {
    //     return calendarTypeKeyValue[type]
    //   }
    // },
    created() {
      this.getList()
    },
    methods: {
      submit(form) {
        this.res.account = this.form.shopaccount
        this.res.authorization = getToken('Admin-Token')
        applyWithdrawCash(this.res).then(Response => {
          this.$message('提现成功')
          this.getList()
          this.dialogjsVisible = false
        })
      },
      apply() {
        this.dialogjsVisible = true
        this.res.authorization = getToken('Admin-Token')
        getSODetailandWithdrawCash(this.res.authorization).then(response => {
          this.form = response.data.data
        })
      },
      getList() {
        this.listLoading = true
        this.res.authorization = getToken('Admin-Token')
        getWithdrawCashDetail(this.res).then(response => {
          this.request = response.data.data
          console.log('object', response)
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
      }
    }
  }

</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 80%;
    float: left;
  }

  .el-row {
    margin-bottom: 20px;
    text-align: center;

  }

  .el-col {
    border-radius: 4px;
  }

</style>
