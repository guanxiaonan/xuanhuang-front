<template>
  <div class="app-container calendar-list-container">
    <div class="element">
      <span>订单概述</span>
    </div>
    <hr>
    <el-row>
      <el-col :span="6">
        <el-card class="box-card" style="margin-right:10px;">
          <div slot="header" class="clearfix">
            <span>今日成交</span>
          </div>
          <span>成交量：{{jiaoyi.todaydeal}}</span>
          <div style="padding-top: 5px" type="text">成交额：{{jiaoyi.todaymoney}}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" style="margin-right:10px;">
          <div slot="header" class="clearfix">
            <span>昨日成交</span>
          </div>
          <span>成交量：{{jiaoyi.yesterdeal}}</span>
          <div style="padding-top: 5px" type="text">成交额：{{jiaoyi.yestermoney}}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" style="margin-right:10px;">
          <div slot="header" class="clearfix">
            <span>近7日成交</span>
          </div>
          <span>成交量：{{jiaoyi.weekdeal}}</span>
          <div style="padding-top: 5px" type="text">成交额：{{jiaoyi.weekmoney}}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" style="margin-right:10px;">
          <div slot="header" class="clearfix">
            <span>近一个月成交</span>
          </div>
          <span>成交量：{{jiaoyi.monthdeal}}</span>
          <div style="padding-top: 5px" type="text">成交额：{{jiaoyi.monthmoney}}</div>
        </el-card>
      </el-col>
    </el-row>

    <h4 v-if="request.status === ''">全部订单</h4>
    <h4 v-if="request.status === 0">未付款订单</h4>
    <h4 v-if="request.status === 1">待发货订单</h4>
    <h4 v-if="request.status === 2">待收货订单</h4>
    <h4 v-if="request.status === 3">已完成订单</h4>
    <h4 v-if="request.status === 4">已关闭订单</h4>
    <div class="filter-container">
      <el-select style="width: 120px" v-model="request.isSearchAsTime" placeholder="不按时间">
        <el-option v-for="item in TypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>
      <el-date-picker v-model="searchT" type="datetimerange" value-format="yyyy-MM-dd hh:mm:ss" @change="changeDate" range-separator="至"
        start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
      <!-- <el-select style="width: 120px" v-model="request.status" placeholder="选择状态">
        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select> -->
      <el-button style="float:right" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-input @keyup.enter.native="handleFilter" style="width: 150px;float:right" placeholder="请输入关键词" v-model="request.searchString">
      </el-input>
    </div>
    <table class="tabletitle" cellpadding="0" cellspacing="0">
      <tr style="width:100%;height:44px">
        <th style="width:26%" class="border-right">商品</th>
        <th style="width:8%" class="border-right">单价/数量</th>
        <th style="width:14%" class="border-right">买家</th>
        <th style="width:13%" class="border-right">支付/配送</th>
        <th style="width:13%" class="border-right">价格</th>
        <th style="width:13%" class="border-right">下单时间</th>
        <th style="width:13%">状态</th>
      </tr>
    </table>
    <table class="tabletitle2" cellpadding="0" cellspacing="0">
      <tbody style="width:100%" v-for="(table,index) of tablelist" :key="index">
        <tr>
          <th style="width:26%;text-align:left;font-size:14px" class="border-bottom">订单编号：{{table.orderNo}}</th>
          <th style="width:8%;font-size:14px" class="border-bottom">退款申请</th>
          <th style="width:14%" class="border-bottom"></th>
          <th style="width:13%" class="border-bottom"></th>
          <th style="width:13%" class="border-bottom"></th>
          <th colspan="2" class="border-bottom">
            <router-link to="/order/rights/detial">
              <button style="font-size:10px" type="mini">删除订单</button>
              <button v-if="table.returnStatus" style="font-size:10px" type="mini">维权处理</button>
            </router-link>
            <router-link :to="{path:'/order/dingdan/more',query:{SOId:table.orderNo}}">
              <button style="font-size:10px">查看详情</button>
            </router-link>
            <button style="font-size:10px" type="mini" @click="change(table)">备注</button>
          </th>
        </tr>
        <tr style="font-size:14px;">
          <td style="width:26%">
            <div style="clear:both;">
              <div class="commonstyle">
                <img :src="table.image" alt="" style="padding: 10px;">
              </div>
              <div class="commonstyle">
                <p>{{table.note}}</p>
              </div>
            </div>
          </td>
          <td>
            <div style="text-align:center;" class="border-right2">
              <p>{{table.price}}</p>
              <p>*{{table.amount}}</p>
            </div>
          </td>
          <td>
            <div style="text-align:center;" class="border-right2">
              <p>{{table.orderInfo}}</p>
              <p>{{table.userPhone}}</p>
            </div>
          </td>
          <td>
            <div style="text-align:center;" class="border-right2">
              <p>{{table.payType}}</p>
              <p>{{table.deliveryType}}</p>
            </div>
            <td>
              <div style="text-align:center;" class="border-right2">
                <p>¥{{parseFloat(table.price) + parseFloat(table.postFare)}}</p>
                <p>(含运费：¥{{table.postFare}})</p>
              </div>
            </td>
            <td>
              <div style="text-align:center;" class="border-right2">
                <p>{{table.createTime|parseTime('{yyyy}-{mm}-{dd} {hh}:{ii}:{ss}')}}</p>
              </div>
            </td>
            <td>
              <div style="text-align:center;" class="border-right2">
                <p v-if="table.orderStatus === 0">未付款</p>
                <p v-if="table.orderStatus === 1">待发货</p>
                <p v-if="table.orderStatus === 2">待收货</p>
                <p v-if="table.orderStatus === 3">已完成</p>
                <p v-if="table.orderStatus === 4">已关闭</p>
                <button v-if="table.orderStatus === 0" class="filter-item" @click="checkSend(table)">确认付款</button>
                <button v-if="table.orderStatus === 1" class="filter-item" @click="checkSend1(table)">确认发货</button>
                <button v-if="table.orderStatus === 2" class="filter-item" @click="checkSend2(table)">确认收货</button>
                <!-- <button v-if="table.orderStatus === 3" class="filter-item" @click="checkSend(table)">删除订单</button>
              <button v-if="table.orderStatus === 4" class="filter-item" @click="checkSend(table)">删除订单</button> -->
              </div>
            </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="确认发货" :visible.sync="dialogfhVisible">

      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="200px">

        <el-form-item class="label" label="收货地址">

          <p style="margin-top:0px">{{detailData.receiveAddressInfo}}</p>


        </el-form-item>


        <el-form-item style="margin-top:0px" class="label" label="快递公司" prop="deliveryCompany">
          <el-input style="width:80%;float:left" v-model="ruleForm.deliveryCompany">

          </el-input>
        </el-form-item>
        <el-form-item class="label" label="快递单号" prop="deliveryNo">
          <el-input style="width:80%;float:left" v-model="ruleForm.deliveryNo"></el-input>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit('ruleForm')">确认发货</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogtakeVisible">

      <h4>确认该订单收获吗?</h4>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogtakeVisible = false">确认收货</el-button>
        <el-button type="primary" @click="dialogtakeVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogpayVisible">

      <h4>确认此订单已付款吗？</h4>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogpayVisible = false">确认付款</el-button>
        <el-button type="primary" @click="dialogpayVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="备注" :visible.sync="beizhu">
      <hr>

      <textarea style="width:100%" name="txt" id="txt" cols="30" rows="10" v-model="form.note"></textarea>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit1('form')">提交</el-button>
        <el-button type="primary" @click="beizhu = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    modifySaleOrderRemark,
    getSODetail,
    getSODealSummary,
    searchSaleOrders,
    comfirmShipment
  } from '@/api/article'
  import waves from '@/directive/waves' // 水波纹指令
  import { getToken } from '@/utils/auth'

  const TypeOptions = [{
    key: 0,
    display_name: '不按时间'
  },
  {
    key: 1,
    display_name: '按时间'
  }

  ]
  const calendarTypeOptions = [{
    key: 0,
    display_name: '未付款'
  },
  {
    key: 1,
    display_name: '待发货'
  },
  {
    key: 2,
    display_name: '待收货'
  },
  {
    key: 3,
    display_name: '已完成'
  },
  {
    key: 4,
    display_name: '已关闭'
  },
  {
    key: '',
    display_name: '全部订单'
  }
  ]

  export default {
    name: 'pay',
    directives: {
      waves
    },

    data() {
      return {
        requset: {
          SOId: ''
        },
        form: {
          orderNo: '',
          note: ''
        },
        res: {
          authorization: '',
          orderNo: '',
          remark: ''
        },
        jiaoyi: {
          monthdeal: '',
          monthmoney: '',
          yesterdeal: '',
          weekmoney: '',
          todaymoney: '',
          yestermoney: '',
          weekdeal: '',
          todaydeal: ''
        },
        searchT: [],
        request: {
          authorization: '',
          page: 1,
          size: 5,
          paymode: '',
          startTime: '',
          endTime: '',
          isSearchAsTime: 0,
          status: ''
        },
        detailData: {
          receiveAddressInfo: '',
          orderNo: ''
        },
        tablelist: [],
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
        calendarTypeOptions,
        TypeOptions,
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: 'published'
        },
        dialogfhVisible: false,
        dialogtakeVisible: false,
        dialogpayVisible: false,
        beizhu: false,
        pvData: [],
        ruleForm: {
          authorization: 'jfhkqauwghfkqwufqhkuihf',
          deliveryCompany: '',
          deliveryNo: '',
          orderNo: ''
        },
        rules: {
          deliveryCompany: [{
            required: true,
            message: '请输入快递公司',
            trigger: 'change'
          }],
          deliveryNo: [{
            required: true,
            message: '请输入快递单号',
            trigger: 'blur'
          }]
        },
        downloadLoading: false
      }
    },
    computed: {},
    created() {
      this.getList()
      this.getDetial()
    },
    methods: {
      getDetial() {
        this.listLoading = true
        getSODetail(this.requset).then(response => {
          this.list = response.data.data.products
          this.form.note = response.data.data.note
          this.detailData = response.data.data
          this.listLoading = false
        })
      },
      change(item) {
        this.beizhu = true
        this.res.authorization = getToken('Admin-Token')
        this.res.orderNo = item.orderNo
      },
      submit1(form) {
        this.beizhu = false
        this.res.authorization = getToken('Admin-Token')
        this.res.orderNo = this.detailData.orderNo
        this.res.remark = this.form.note

        modifySaleOrderRemark(this.res).then(Response => {
          this.$message('提交成功')
        })
      },
      submit(ruleForm) {
        // console.log(ruleForm)
        // this.ruleForm.orderNo = this.tablelist.orderNo
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            comfirmShipment(this.ruleForm).then(Response => {
              this.$message('修改成功')
              this.dialogfhVisible = false
            })
          } else {
            this.$message('还有未填选项')
            return false
          }
        })
      },
      checkSend1(item) {
        this.dialogfhVisible = true
        this.ruleForm.orderNo = item.orderNo
      },
      checkSend(item) {
        this.dialogpayVisible = true
        this.ruleForm.orderNo = item.orderNo
      },
      checkSend2(item) {
        this.dialogtakeVisible = true
        this.ruleForm.orderNo = item.orderNo
      },
      getList() {
        this.listLoading = true
        this.request.authorization = getToken('Admin-Token')
        searchSaleOrders(this.request).then(response => {
          this.tablelist = response.data.data
          console.log('response', response)
          this.listLoading = false
        })
        this.res.authorization = getToken('Admin-Token')
        getSODealSummary(this.res).then(response => {
          this.jiaoyi = response.data.data
          console.log('response', response)
          this.listLoading = false
        })
      },
      handleFilter() {
        this.request.page = 1
        this.getList()
      },
      changeDate(val) {
        this.request.startTime = val[0]
        this.request.endTime = val[1]
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

<style lang="scss" scoped>
  .text {
    font-size: 14px;
  }

  .calendar-list-container>>>.el-card__body {
    padding: 10px 20px;
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

  .commonstyle {
    float: left;
  }

  .tabletitle {
    width: 100%;
    font-weight: bold;
    font-size: 14px;
    height: 44px;
    border: 1px solid #ebeef5;
    color: #909399;
    .border-right {
      border-right: 1px solid #ebeef5;
      font-weight: inherit;

    }
  }

  .tabletitle2 {
    width: 100%;
    font-weight: inherit;
    border: 1px solid #ebeef5;
    color: #606266;
    margin-top: 10px;
    font-weight: inherit;
    .border-bottom {
      border-bottom: 1px solid #ebeef5;
      font-weight: inherit;
    }
    .border-right2 {
      border-right: 1px solid #ebeef5;
      font-weight: inherit;
    }
  }
</style>
