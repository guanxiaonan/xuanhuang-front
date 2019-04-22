<template>
  <div class="app-container calendar-list-container">
    <div>
      <span>{{detailData.status===0?'已完成申请':'维权申请中'}}</span>
    </div>
    <br>
    <br>

    <div class="filter-container">
      <el-steps :active="stepActive" align-center finish-status="success">
        <el-step title="客户申请维权" :description="detailData.createTime?detailData.createTime:'' | parseTime('{yyyy}-{mm}-{dd} {hh}:{ii}:{ss}')"></el-step>
        <el-step title="商家处理维权申请" :description="detailData.handlerTime?detailData.handlerTime:'' | parseTime('{yyyy}-{mm}-{dd} {hh}:{ii}:{ss}')"></el-step>
        <el-step title="退款完成" :description="detailData.completeTime?detailData.completeTime:'' | parseTime('{yyyy}-{mm}-{dd} {hh}:{ii}:{ss}')"></el-step>
      </el-steps>
      <br>
      <br>
      <br>
      <div>
        <span>维权处理</span>
        <hr>
        <el-card class="box-card">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item>
              <el-row>
                <el-col style="line-height:0px" :span="24">
                  维权原因：{{detailData.refundReason}}
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-col style="line-height:0px" :span="24">
                  维权说明：{{detailData.refundState}}
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-col style="line-height:0px" :span="24">
                  维权编号： {{detailData.returnOrderNo}}
                </el-col>
              </el-row>
            </el-form-item>
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
                  订单金额：{{detailData.orderPrice}}
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-col style="line-height:0px" :span="24">
                  买家：{{detailData.userName}}
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
          </el-form>
        </el-card>
        <el-card class="box-card">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item>
              <el-row>
                <el-col style="line-height:0px" :span="24">
                  <h3>维权状态：{{detailData.status===0?'已完成申请':'维权申请中'}}</h3>
                  <button v-if="detailData.status= '0'" @click="change(form)">处理申请</button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
    <el-dialog title="维权处理" :visible.sync="apply">
      <el-form ref="form1" :model="form1" label-width="80px">
        <!-- <el-form-item label="处理方式">
          <span style="margin-left:20px;">{{form1.type}}</span>
        </el-form-item> -->
        <el-form-item label="处理结果">
          <el-radio-group v-model="form1.handle">
            <el-radio label="1">驳回</el-radio>
            <el-radio label="2">通过</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit(form1)">提交</el-button>
        <el-button type="primary" @click="apply = false">取消</el-button>
      </span>
    </el-dialog>

    <el-card>
      <span>商品信息</span>
      <br>
      <br/>
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
  </div>
</template>

<script>
  import {
    modifyReturnSOStatus,
    viewSOReturnDetail
  } from '@/api/article'
  export default {
    data() {
      return {
        apply: false,
        tableKey: 0,
        list: [],
        request: {
          orderNo: ''
        },
        form: {
          type: '',
          handle: []
        },
        detailData: {
          userName: '',
          orderNo: '',
          refundMoney: '',
          orderPrice: '',
          payTime: '',
          returnOrderNo: '',
          refundState: '',
          handlerTime: '',
          completeTime: '',
          createTime: '',
          refundReason: ''
        },
        form1: {
          // type: '',
          handle: '',
          orderNo: ''
        }
      }
    },
    created() {
      this.getList()
    },
    computed: {
      stepActive() {
        if (this.detailData.completeTime) {
          return 3
        } else {
          if (this.detailData.handlerTime) {
            return 2
          } else {
            if (this.detailData.createTime) {
              return 1
            }
          }
        }
        return 0
      }
    },
    methods: {
      getList() {
        this.listLoading = true
        viewSOReturnDetail(this.request).then(response => {
          console.log('response', response)
          this.list = response.data.data.products
          this.detailData = response.data.data
          console.log('response', response)
          this.listLoading = false
        })
      },
      change(form) {
        this.apply = true
        this.form1.orderNo = this.detailData.orderNo
        // modifyReturnSOStatus(this.form1).then(Response => {
        //   this.$message('修改成功')
        //   this.apply = false
        // })
      },
      submit(form1) {
        modifyReturnSOStatus(this.form1).then(Response => {
          this.$message('修改成功')
          this.apply = false
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
