<template>
  <div class="app-container calendar-list-container">
    <div>
      <span>{{detailData.orderStatus|clickfilter}}订单详情</span>
    </div>
    <br>
    <br>
    <div class="filter-container">
      <el-steps :active="stepActive" align-center finish-status="success">
        <el-step title="买家下单" :description="detailData.createTime?detailData.createTime:''|parseTime('{yyyy}-{mm}-{dd} {hh}:{ii}:{ss}')"></el-step>
        <el-step title="买家付款" :description="detailData.payTime?detailData.payTime:''|parseTime('{yyyy}-{mm}-{dd} {hh}:{ii}:{ss}')"></el-step>
        <el-step title="商家发货" :description="detailData.deliveryTime?detailData.deliveryTime:''|parseTime('{yyyy}-{mm}-{dd} {hh}:{ii}:{ss}')"></el-step>
        <el-step title="订单完成" :description="detailData.completeTime?detailData.completeTime:''|parseTime('{yyyy}-{mm}-{dd} {hh}:{ii}:{ss}')"></el-step>
      </el-steps>
      <br>
      <br>
      <br>
      <div>
        <span>订单信息</span>
        <hr>
        <el-card class="box-card">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item>
              <el-row>
                <el-col style="line-height:0px" :span="24">
                  订单编号：{{detailData.orderNo}}
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-col style="line-height:0px" :span="24">
                  订单金额：{{detailData.price}}
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-col style="line-height:0px" :span="24">
                  付款时间：{{detailData.payTime}}
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-col style="line-height:0px" :span="24">
                  付款方式：{{detailData.payType}}
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-col style="line-height:0px" :span="24">
                  发票抬头：{{detailData.remark}}
                </el-col>
              </el-row>
            </el-form-item>
            <hr style="border:1px dashed #ccc" />
            <br>
            <el-form-item>
              <el-row>
                <el-col style="line-height:1.5" :span="24">
                  配送方式：{{detailData.logisticsInfo}}
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-col style="line-height:1" :span="24">
                  收货地址:
                  <div> {{detailData.receiveAddressInfo}}</div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card class="box-card">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item>
              <el-row>
                <el-col style="line-height:0px" :span="24">
                  <h3>订单状态：{{detailData.orderStatus|clickfilter}}</h3>
                  <p>买家已经付款，请商家尽快发货</p>
                  <button v-if="detailData.orderStatus === '0'" class="filter-item" @click="checkSend(form)">确认付款</button>
                  <button v-if="detailData.orderStatus === '1'" class="filter-item" @click="checkSend1(form)">确认发货</button>
                  <button v-if="detailData.orderStatus === '2'" class="filter-item" @click="checkSend2(form)">确认收货</button>
                  <button @click="beizhu=true">备注</button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
    <el-card>
      <span>商品信息</span>
      <br>
      <br />

      <el-table :key='tableKey' :data="list" border style="width: 100%">
        <el-table-column style="float:left" align="center" label="商品">
          <template slot-scope="scope">
            <span>{{scope.row.productInfo}}</span>
          </template>
        </el-table-column>
        <el-table-column style="float:left" align="center" label="单价/数量">
          <template slot-scope="scope">
            <span>{{scope.row.productPrice}}/{{scope.row.productAmount}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
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
        <el-button type="primary" @click="submit(ruleForm)">确认发货</el-button>
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
    modifySaleOrderStatus,
    getSODetail,
    comfirmShipment,
    modifySaleOrderRemark
  } from '@/api/article'
  import {
    getToken
  } from '@/utils/auth'
  export default {

    data() {
      return {
        requset: {
          authorization: '',
          SOId: ''

        },
        detailData: {
          orderStatus: '',
          createTime: '',
          payTime: '',
          deliveryTime: '',
          completeTime: '',
          orderNo: '',
          price: '',
          payType: '',
          remark: '',
          logisticsInfo: '',
          receiveAddressInfo: ''
        },
        list: [],
        beizhu: false,
        dialogfhVisible: false,
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

        ruleForm: {
          authorization: '',
          deliveryCompany: '',
          deliveryNo: '',
          orderNo: ''
        },
        tableKey: 0,
        res: {
          orderNo: '',
          remark: ''
        },
        res1: {
          status: '',
          orderNo: ''
        },
        form: {
          authorization: '',
          orderNo: '',
          note: ''
        },
        tem: {
          deliveryCompany: '',
          deliveryNo: ''
        }
      }
    },
    created() {
      this.getList()
    },
    computed: {
      stepActive() {
        if (this.detailData.completeTime) {
          return 4
        } else {
          if (this.detailData.deliveryTime) {
            return 3
          } else {
            if (this.detailData.payTime) {
              return 2
            } else {
              if (this.detailData.createTime) {
                return 1
              }
            }
          }
        }
        return 0
      }
    },
    filters: {
      clickfilter(type) {
        const typeMap = {
          '0': '未付款',
          '1': '待发货',
          '2': '待收货',
          '3': '已完成',
          '4': '已关闭'
        }
        return typeMap[type]
      }
    },
    methods: {
      checkSend2(item) {
        this.res1.orderNo = this.detailData.orderNo
        this.$confirm('你确定此订单已收获吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.res1.status = 2
          modifySaleOrderStatus(this.res1).then(response => {
            console.log('response', response)
            if (response.data.code ===
              '200') {
              this.getList()
              this.$message({
                type: 'success',
                message: '已成功确认收货'
              })
            }
          })
        })
      },
      checkSend(form) {
        this.res1.orderNo = this.detailData.orderNo
        this.$confirm('你确定此订单已付款, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.res1.status = 0
          modifySaleOrderStatus(this.res1).then(response => {
            console.log('response', response)
            if (response.data.code ===
              '200') {
              this.getList()
              this.$message({
                type: 'success',
                message: '成功确认付款'
              })
            }
          })
        })
      },
      checkSend1(item) {
        this.dialogfhVisible = true
        this.ruleForm.orderNo = item.orderNo
      },
      getList() {
        this.listLoading = true
        this.requset.authorization = getToken('Admin-Token')
        this.requset.SOId = this.$route.query.SOId
        getSODetail(this.requset).then(response => {
          this.form.note = response.data.data.note
          this.detailData = response.data.data
          this.list = response.data.data.products
          this.listLoading = false
        })
      },
      submit(ruleForm) {
        this.ruleForm.authorization = getToken('Admin-Token')
        this.ruleForm.orderNo = this.detailData.orderNo
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            comfirmShipment(this.ruleForm).then(Response => {
              this.$message('确认发货成功')
              this.dialogfhVisible = false
            })
          } else {
            this.$message('还有未填选项')
            return false
          }
        })
      },
      submit1(form) {
        this.beizhu = false
        this.form.authorization = getToken('Admin-Token')
        this.res.orderNo = this.detailData.orderNo
        this.res.remark = this.form.note

        modifySaleOrderRemark(this.res).then(Response => {
          this.$message('提交成功')
        })
      }
    }
  }
</script>
<style scoped>
  .text {
    font-size: 14px;
    text-align: left
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    height: 300px;
    text-align: left;
    width: 50%;
    float: left;
  }
</style>
