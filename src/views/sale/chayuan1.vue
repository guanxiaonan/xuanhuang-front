<template>
  <div class="app-container calendar-list-container">
    <el-card class="box-card">
      <h1>茶园1</h1>
      <el-table
        :data="tablechayuan"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="caijidian"
          label="采集点"
          width="150">
        </el-table-column>
        <el-table-column
          fixed
          label="节点状态"
          width="150">
          <template slot-scope="scope">开启</template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="查看"
          width="150"
          >
          <template slot-scope="scope">
            <!--<el-button @click="selectRealTimedata(scope.row)" type="text" size="small">实时数据</el-button>-->
            <el-button @click="selectHistory(scope.row)" type="text" size="small">历史数据</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="block">
      <span class="demonstration">选择日期</span>
      <el-date-picker
        v-model="value4"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>
    <div id="main">
      <!--<div id="left">-->
        <!--<div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart"></div>-->
      <!--</div>-->
      <!--<div id="right">-->
        <!--<img src="../../assets/401_images/1.png" alt="" style="width:150px;height:150px;">-->
        <!--<img src="../../assets/401_images/1.png" alt="" style="width:150px;height:150px;">-->
        <!--<img src="../../assets/401_images/1.png" alt="" style="width:150px;height:150px;">-->
        <!--<img src="../../assets/401_images/1.png" alt="" style="width:150px;height:150px;">-->
        <!--<img src="../../assets/401_images/1.png" alt="" style="width:150px;height:150px;">-->
        <!--<img src="../../assets/401_images/1.png" alt="" style="width:150px;height:150px;">ß-->
        <!--<el-button class="filter-item" style="margin-top:2%;margin-left:38%;" @click="viewMore">查看更多</el-button>-->
      <!--</div>-->
      <!--<div id="right">-->
        <div :class="className1" :id="id1" :style="{height:height1,width:width1}" ref="myEchart"></div>
      <!--</div>-->
    </div>
    <hr>
    <!--<div class="filter-container">-->
      <!--<el-button class="filter-item" style="float:left;" icon="el-icon-edit" @click="handleCreate">添加记录</el-button>-->
      <!--<el-button style="float:right" class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>-->
      <!--<el-input @keyup.enter.native="handleFilter" style="float:right; width:300px " class="filter-item" placeholder="检测时间/茶园编号/传感器编号"-->
        <!--v-model="requestList.searchString">-->
      <!--</el-input>-->
    <!--</div>-->
    <!--<el-table :key='tableKey' :data="listbiaoge" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row-->
      <!--style="width: 100%">-->
      <!--<el-table-column align="center" type="index" :index="tIndex" label="序号" width="60">-->
      <!--</el-table-column>-->
      <!--<el-table-column min-width="80px" label="传感器类型">-->
        <!--<template slot-scope="scope">-->
          <!--<span style="text-align:center;float:left">{{scope.row.types}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column width="160px" align="center" label="采集时间">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.data_time}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="数据" width="95">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.datas}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="单位" width="95">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.units}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--&lt;!&ndash; <el-table-column class-name="status-col" label="数据" width="100">-->
        <!--<template slot-scope="scope">-->
          <!--<button type="primary" size="mini" @click="change(scope.row)">{{scope.row.status| statusFilter}}</button>-->
        <!--</template>-->
      <!--</el-table-column> &ndash;&gt;-->
      <!--<el-table-column align="center" :label="$t('table.actions')" width="230" class-name="small-padding fixed-width">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>-->
          <!--<el-button size="mini" type="danger" @click="delete1(scope.row)">删除</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->


    <!--<div class="pagination-container">-->
      <!--<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="request.page"-->
        <!--:page-sizes="[10,20,30,50]" :page-size="request.size" layout="total, sizes, prev, pager, next, jumper" :total="total">-->
      <!--</el-pagination>-->
    <!--</div>-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogfaVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="土壤数据记录" name="first">
            <el-form-item label="检测时间">
              <span>&nbsp;</span>
              <el-col :span="6">
                <el-input style="margin-left:9px" v-model="form.price"></el-input>
              </el-col>
              <el-col style="margin-left:20px" :span="4">检测人姓名</el-col>
              <el-col :span="6">
                <el-input v-model="form.cost"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="茶园编号">
              <span>&nbsp;</span>
              <el-col :span="6">
                <el-input style="margin-left:9px" v-model="form.price"></el-input>
              </el-col>
              <el-col style="margin-left:20px" :span="4">传感器编号</el-col>
              <el-col :span="6">
                <el-input v-model="form.cost"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="土壤数据">
              <span>&nbsp;</span>
              <el-input style="width:150px" v-model="form.postFare"></el-input>
            </el-form-item>
          </el-tab-pane>
          <br>
          <el-button style="float:right" v-if="dialogStatus=='create'" type="primary" @click="submitForm('form')">确认</el-button>
          <el-button style="float:right" v-else type="primary" @click="submitForm1('form')">确认</el-button>
        </el-tabs>
      </el-form>
    </el-dialog>
    <!-- 选择查看数据类型-->

    <!--<el-button type="text" @click="history_5 = true">打开嵌套表单的 Dialog</el-button>-->
    <el-dialog title="数据查询" :visible.sync="history_5">
      <el-form :model="form_his">
        <!--<el-form-item label="活动名称" :label-width="formLabelWidth">-->
          <!--<el-input v-model="form.name" autocomplete="off"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="查询数据" :label-width="formLabelWidth">
          <el-select v-model="form_his.type" placeholder="选择查询的数据">
            <el-option label="土壤温湿度" value="turang"></el-option>
            <el-option label="空气温湿度" value="kongqi"></el-option>
            <el-option label="光照强度" value="guangzhao"></el-option>
            <el-option label="CO2浓度" value="CO2"></el-option>
            <el-option label="离子浓度" value="lizi"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="history_5 = false">取 消</el-button>
        <el-button type="primary" @click="history_Submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Dropzone from '@/components/Dropzone'
  import Tinymce from '@/components/Tinymce'
  import echarts from 'echarts'
  import {
    getProductInfo, // 组件-查看组件详情
    getProductList, // 组件-组件列表
    getSelectProductList,
    getRealData, // 实时数据
    setProductInfo, // 组件保存组件
    getProductDetail, // 组件-统计信息
    setProductStatus, // 组件-设置方案状态
    getAllShopList // 组件方案 - 商家列表
  } from '@/api/article'
  import waves from '@/directive/waves' // 水波纹指令
import { getToken } from '@/utils/auth'
  export default {
    props: {
      className: {
        type: String,
        default: 'yourClassName'
      },
      className1: {
        type: String,
        default: 'yourClassName1'
      },
      id: {
        type: String,
        default: 'yourID'
      },
      id1: {
        type: String,
        default: 'yourID'
      },
      width: {
        type: String,
        default: '500px'
      },
      width1: {
        type: String,
        default: '850px'
      },
      height: {
        type: String,
        default: '450px'
      },
      height1: {
        type: String,
        default: '500px'
      }
    },
    name: 'complexTable',
    components: {
      Dropzone,
      Tinymce
    },
    directives: {
      waves
    },
    data() {
      return {
        tablechayuan: [
          {
            caijidian: '数据采集点5'
          },
          {
            caijidian: '数据采集点6'
          },
          {
            caijidian: '数据采集点7'
          }
        ],
        value4: [new Date(2019, 2, 7, 15, 43), new Date(2019, 2, 7, 16, 32)],
        kongqiwenduall: [],
        kongqishiduall: [],
        turangshiduall: [],
        turangwenduall: [],
        CO2all: [],
        lightall: [],
        showallhigh: [],
        showalllow: [],
        caiji: '', // 采集点确定
        form_his: {
          type: ''
        },
        formLabelWidth: '120px',
        request: {
          authorization: '',
          productId: '',
          action: '',
          page: 1,
          size: 5
        },
        requestList: {
          authorization: '',
          type: 1,
          productId: '',
          page: 1,
          size: 5,
          searchString: '',
          status: 3
        },
        saleingCount: 0,
        stockCount: 0,
        saleoutCount: 0,
        form: {
          categoryId: '',
          productNo: '',
          id: '',
          name: '',
          shopId: '',
          shopName: '',
          price: '',
          detail: '',
          image: [],
          sortedNum: '',
          status: '',
          postFare: '',
          cost: '',
          primecost: '',
          stock: '',
          isvalid: '',
          fileList: [],
          shopIds: [],
          replaceProductVos: [{
            id: '',
            productId: '',
            productName: ''
          }]
          // newcomponentVos: []
        },
        form1: {
          content: ''
        },
        activeName: 'first',
        tableKey: 0,
        list: [],
        listbiaoge: [],
        total: null,
        listLoading: true,
        dialogfaVisible: false,
        history_5: false,
        history_show: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '添加土壤数据'
        },
        rules: {
          name: [{
            required: true,
            message: 'name is required',
            trigger: 'change'
          }],
          image: [{

            required: true,
            message: 'image is required',
            trigger: 'change'
          }],
          stock: [{
            required: true,
            message: 'stock is required',
            trigger: 'change'
          }]
        },
        options: [],
        options1: [],
        biaoti: '',
        unitshigh: '',
        unitslow: '',
        downloadLoading: false,
        productIds: []
      }
    },
    filters: {
      statusFilter(type) {
        const typeMap = {

          '0': '下架',
          '1': '上架'
        }
        return typeMap[type]
      }
    },
    created() {
      this.getList()
      this.getNumber()
      this.getHistoryData()
    },
    mounted() {
      // this.initChart()
      // this.history_Submit()
    },
    methods: {
      // init() {
      //   this.history_5 = false
      // },
      initChart() {
        this.chart = echarts.init(this.$refs.myEchart)
        // 把配置和数据放这里
        this.chart.setOption(
          {
            title: {
              text: this.biaoti,
              subtext: '红色温度，深绿湿度'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['标准温湿度', '实际温湿度']
            },
            toolbox: {
              show: true,
              feature: {
                dataZoom: {
                  yAxisIndex: 'none'
                },
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
                '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
                '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31',
                '32', '33', '34', '35']
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value}'
              }
            },
            series: [
              {
                name: this.unitshigh,
                type: 'line',
                data: [this.showallhigh[0], this.showallhigh[1], this.showallhigh[2], this.showallhigh[3], this.showallhigh[4], this.showallhigh[5], this.showallhigh[6],
                  this.showallhigh[7], this.showallhigh[8], this.showallhigh[9], this.showallhigh[10], this.showallhigh[11], this.showallhigh[12], this.showallhigh[13],
                  this.showallhigh[14], this.showallhigh[15], this.showallhigh[16], this.showallhigh[17], this.showallhigh[18], this.showallhigh[19], this.showallhigh[20],
                  this.showallhigh[21], this.showallhigh[22], this.showallhigh[23], this.showallhigh[24], this.showallhigh[25], this.showallhigh[26], this.showallhigh[27],
                  this.showallhigh[28], this.showallhigh[29], this.showallhigh[30], this.showallhigh[31], this.showallhigh[32], this.showallhigh[33], this.showallhigh[34],
                  this.showallhigh[35]],
                markPoint: {
                  data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                  ]
                },
                markLine: {
                  data: [
                    { type: 'average', name: '平均值' }
                  ]
                }
              },
              {
                name: this.unitslow,
                type: 'line',
                data: [this.showalllow[0], this.showalllow[1], this.showalllow[2], this.showalllow[3], this.showalllow[4], this.showalllow[5], this.showalllow[6],
                  this.showalllow[7], this.showalllow[8], this.showalllow[9], this.showalllow[10], this.showalllow[11], this.showalllow[12], this.showalllow[13],
                  this.showalllow[14], this.showalllow[15], this.showalllow[16], this.showalllow[17], this.showalllow[18], this.showalllow[19], this.showalllow[20],
                  this.showalllow[21], this.showalllow[22], this.showalllow[23], this.showalllow[24], this.showalllow[25], this.showalllow[26], this.showalllow[27],
                  this.showalllow[28], this.showalllow[29], this.showalllow[30], this.showalllow[31], this.showalllow[32], this.showalllow[33], this.showalllow[34],
                  this.showalllow[35]],
                markPoint: {
                  data: [
                    { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
                  ]
                },
                markLine: {
                  data: [
                    { type: 'average', name: '平均值' },
                    [{
                      symbol: 'none',
                      x: '90%',
                      yAxis: 'max'
                    }, {
                      symbol: 'circle',
                      label: {
                        normal: {
                          position: 'start',
                          formatter: '最大值'
                        }
                      },
                      type: 'max',
                      name: '最高点'
                    }]
                  ]
                }
              }
            ]
          }
        )
      },
      change(row) {
        this.request.authorization = getToken('Admin-Token')
        this.request.productId = row.productId
        this.$confirm('你确定将此方案下架吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          setProductStatus(this.request).then(response => {
            this.request.action = 1
            console.log('response', response)
            if (response.data.code ===
              '200') {
              this.getList()
              this.$message({
                type: 'success',
                message: '下架成功'
              })
            }
          })
        })
      },
      delete1(row) {
        this.request.authorization = getToken('Admin-Token')
        this.request.productId = row.productId
        this.$confirm('你确定将此方案删除吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          setProductStatus(this.request).then(response => {
            this.request.action = 0
            console.log('response', response)
            if (response.data.code ===
              '200') {
              this.getList()
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            }
          })
        })
      },
      getNumber() {
        this.requestList.authorization = getToken('Admin-Token')
        getProductDetail(this.requestList.authorization).then(response => {
          console.log('number', response)
          this.saleoutCount = response.data.data.saleoutCount
        })
      },
      addItem() {
        this.form.productVos.push({
          productName: ''
        })
      },
      submitForm(form) {
        console.log('image', this.form.image)
        this.$refs.form.validate(valid => {
          if (valid && this.form.image) {
            setProductInfo(this.form).then(Response => {
              this.$message('修改成功')
              this.resetTemp()
              this.dialogfaVisible = false
            })
          } else {
            this.$message('还有未填选项')
            return false
          }
        })
      },
      submitForm1(form) {
        console.log('image', this.form.image)
        this.$refs.form.validate(valid => {
          if (valid && this.form.image) {
            // this.request.sampleIds = row.sampleIds
            setProductInfo(this.form).then(Response => {
              this.$message('修改成功')
              this.resetTemp()
              this.dialogfaVisible = false
            })
          } else {
            this.$message('还有未填选项')
            return false
          }
        })
      },
      handleRemove(file, image) {
        console.log('file', file)
        console.log('image', image)
      },
      changeImage(file) {
        this.form.image.push(file)
      },
      handleSuccess(response, file, fileList) {
        this.form.image = response.data.imageUrl
      },
      handlePreview(file) {
        console.log(file)
      },
      tIndex(index) {
        return (index + 1 + (this.request.page - 1) * this.request.size)
      },
      onSubmit() {
        console.log('submit!')
      },
      getList() {
        this.listLoading = true
        this.requestList.authorization = getToken('Admin-Token')
        getRealData().then(response => {
          console.log('list', response)
          for (var i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].units === '') {
              response.data.data[i].units = '电池电量'
            }
          }
          this.list = response.data.data
          // this.total = response.data.data.total
          this.listLoading = false
        })
        getSelectProductList(this.requestList.authorization).then(res => {
          this.options = res.data.data
        })
        getAllShopList(this.requestList.authorization).then(res => {
          this.options1 = res.data.data
        })
      },
      getHistoryData() {
        console.log('============运行==========')
        // this.listLoading = true
        // this.requestList.authorization = getToken('Admin-Token')
        getRealData().then(response => {
          this.data
          console.log('list', response)
          var kqwd = 0
          var kqsd = 0
          var trwd = 0
          var trsd = 0
          var co2 = 0
          var gzqd = 0

          for (var i = 0; i < response.data.data.length; i++) {
            // 湿度
            if (response.data.data[i].types === 'SHT21/SHT25温湿度传感器' && response.data.data[i].units === '%' &&
            response.data.data[i].dev_addr === '4004') {
              this.kongqishiduall[kqsd++] = response.data.data[i].datas
            }
            if (response.data.data[i].types === 'SHT21/SHT25温湿度传感器' && response.data.data[i].units === '℃' &&
              response.data.data[i].dev_addr === '4004') {
              this.kongqiwenduall[kqwd++] = response.data.data[i].datas
            }
            if (response.data.data[i].types === '土壤湿度传感器' && response.data.data[i].units === '%') {
              this.turangshiduall[trsd++] = response.data.data[i].datas
            }
            if (response.data.data[i].types === '土壤温度传感器' && response.data.data[i].units === '℃') {
              this.turangwenduall[trwd++] = response.data.data[i].datas
            }
            if (response.data.data[i].types === 'CO2传感器' && response.data.data[i].units === 'ppm') {
              this.CO2all[co2++] = response.data.data[i].datas / 10
            }
            if (response.data.data[i].types === '光照探测器' && response.data.data[i].units === 'Lx') {
              this.lightall[gzqd++] = response.data.data[i].datas
            }
          }
          console.log('空气湿度', this.kongqishiduall)
          console.log('空气温度', this.kongqiwenduall)
          console.log('土壤湿度', this.turangshiduall)
          console.log('土壤温度', this.turangwenduall)
          console.log('CO2', this.CO2all)
          console.log('光照强度', this.lightall)
          this.list = response.data.data
          // this.total = response.data.data.total
          // this.listLoading = false
        })
      },
      beforeAvatarUpload(file) {
        console.log('length', file)
        const isJPG = file.type === 'image/jpeg/png/jpg'
        // const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG/png/jpeg 格式!')
        }
        // if (!isLt2M) {
        //   this.$message.error('上传图片大小不能超过 2MB!')
        // }
        return isJPG
        // && isLt2M
      },
      handleFilter() {
        this.request.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.request.size = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.request.page = val
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
        this.form = {
          categoryId: '',
          productNo: '',
          id: '',
          name: '',
          shopId: '',
          shopName: '',
          price: '',
          detail: '',
          image: [],
          sortedNum: '',
          status: '',
          postFare: '',
          cost: '',
          primecost: '',
          stock: '',
          isvalid: '',
          productVos: [{
            productIds: ''
          }],
          replaceProductVos: [{
            productName: ''
          }]
        }
      },
      selectHistory(row) {
        console.log('点击的行数', row)
        if (row.caijidian === '数据采集点5') {
          this.caiji = '采集点5'
        } else if (row.caijidian === '数据采集点6') {
          this.caiji = '采集点6'
        } else if (row.caijidian === '数据采集点6') {
          this.caiji = '采集点7'
        }
        console.log('初步点击', this.caiji)
        this.history_5 = true
        // this.history_show = true
      },
      selectRealTimedata(row) {
        console.log('实时数据方法', row)
      },
      history_Submit() {
        // console.log(row)
        console.log('采集点', this.caiji)
        if (this.form_his.type === 'turang') {
          this.biaoti = '茶园1' + this.caiji + '-土壤温湿度表' + '     ' + '2019-03-07 15:43:02 ~  2019-03-07 16:32:11'
          this.showallhigh = this.turangwenduall
          this.unitshigh = '温度℃'
          this.showalllow = this.turangshiduall
          this.unitslow = '湿度%'
        } else if (this.form_his.type === 'kongqi') {
          this.biaoti = '茶园1' + this.caiji + '-空气温湿度表' + '     ' + '2019-03-07 15:43:02 ~  2019-03-07 16:32:11'
          this.showallhigh = this.kongqiwenduall
          this.unitshigh = '温度℃'
          this.showalllow = this.kongqishiduall
          this.unitslow = '湿度%'
        } else if (this.form_his.type === 'guangzhao') {
          this.biaoti = '茶园1' + this.caiji + '-光照度表' + '     ' + '2019-03-08 07:20:58 ~  2019-03-08 07:54:28'
          this.showallhigh = this.lightall
          this.unitshigh = '光照LX'
          this.showalllow = 0
        } else if (this.form_his.type === 'CO2') {
          this.biaoti = '茶园1' + this.caiji + '-CO2浓度表' + '     ' + '2019-03-07 15:43:02 ~  2019-03-07 16:32:11'
          this.showallhigh = this.CO2all
          this.unitshigh = 'CO2 ppm'
          this.showalllow = 0
        }
        this.initChart()
        this.history_5 = false
        // alert(this.form_his.type)
        this.history_show = true
        console.log('history_show:', this.history_show)
        const div1 = document.getElementById('right')
        div1.style.visibility = 'visible'
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogfaVisible = true
        this.productIds = []
        this.shopIds = []
        this.$nextTick(() => {
          this.$refs['form'].clearValidate()
        })
      },
      handleUpdate(row) {
        this.dialogStatus = 'update'
        this.dialogfaVisible = true
        this.$nextTick(() => {
          this.$refs['form'] && this.$refs['form'].clearValidate()
        })
        this.requestList.productId = row.productId
        this.requestList.authorization = getToken('Admin-Token')
        getProductInfo(this.requestList).then(response => {
          console.log('111', response)
          this.form = response.data.data
          console.log(this.form)
          const productIds = this.filterId(this.form.replaceProductVos)
          this.form.productVos = [{
            productIds
          }]
          // this.form.forEach(item => {
          //   this.shopIds = this.filterId1(item.shopName)
          // })

          // console.log('responseaaaaa', response)
        })
      },
      filterId(objArr) {
        const arr = []
        if (objArr && objArr.length > 0) {
          objArr.forEach((obj) => {
            arr.push(obj.productId + '')
          })
        }
        return arr
      },
      filterId1(objArr) {
        const arr = []
        if (objArr && objArr.length) {
          objArr.forEach((obj) => {
            arr.push(obj.shopId + '')
          })
        }
        return arr
      },
      viewMore() {
        this.$router.push({
          name: 'image'
        })
      }
    },
    watch: {
      history_show(val) {
        console.log(val)
        this.history_show = val
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

<style>
  .element {
    height: 40px;
    line-height: 40px;
    margin-bottom: 12px;
  }
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
    width: 480px;
  }
  #main{
    height: 500px;
    margin-top:30px;
  }
  #left{
    position: absolute;
    width: 500px;
    height:400px;
  }
  #right{
    margin-left: 520px;
    visibility: hidden;
    height:400px;
  }
</style>
