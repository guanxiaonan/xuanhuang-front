<template>
  <div class="app-container calendar-list-container">
    <!--<div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart"></div>-->
    <div class="element">
      <span>传感器采集数据:{{saleoutCount}}</span>
    </div>

    <el-dropdown @command="typesClick">
      <el-button type="primary">
        传感器类型<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu  slot="dropdown">
        <el-dropdown-item command="土壤湿度">土壤湿度</el-dropdown-item>
        <el-dropdown-item command="空气温度">空气温度</el-dropdown-item>
        <el-dropdown-item command="空气湿度">空气湿度</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <hr>
    <div class="filter-container">
      <el-button style="float:right" class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-input @keyup.enter.native="handleFilter" style="float:right; width:300px " class="filter-item" placeholder="检测时间/茶园编号/传感器编号"
        v-model="requestList.searchString">
      </el-input>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" type="index" :index="tIndex" label="序号" width="60">
      </el-table-column>
      <el-table-column min-width="80px" label="传感器类型">
        <template slot-scope="scope">
          <span style="text-align:center;float:left">{{scope.row.types}}</span>
        </template>
      </el-table-column>
      <el-table-column width="160px" align="center" label="采集时间">
        <template slot-scope="scope">
          <span>{{scope.row.data_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="数据" width="95">
        <template slot-scope="scope">
          <span>{{scope.row.datas}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="单位" width="95">
        <template slot-scope="scope">
          <span>{{scope.row.units}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="数据" width="100">
        <template slot-scope="scope">
          <button type="primary" size="mini" @click="change(scope.row)">{{scope.row.status| statusFilter}}</button>
        </template>
      </el-table-column> -->
      <el-table-column align="center" :label="$t('table.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="delete1(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--<el-form :model="">-->
      <!--&lt;!&ndash;<el-form-item label="活动名称" :label-width="formLabelWidth">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-input v-model="form.name" autocomplete="off"></el-input>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
      <!--<el-form-item label="查询数据" :label-width="formLabelWidth">-->
        <!--<el-select v-model="" placeholder="选择查询的数据">-->
          <!--<el-option label="土壤温湿度" value="turang"></el-option>-->
          <!--<el-option label="空气温湿度" value="kongqi"></el-option>-->
          <!--<el-option label="光照强度" value="guanngzhao"></el-option>-->
          <!--<el-option label="离子浓度" value="lizi"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
    <!--</el-form>-->

  </div>
</template>

<script>
  import Dropzone from '@/components/Dropzone'
  import Tinymce from '@/components/Tinymce'
  import echarts from 'echarts'
  import {
    getProductInfo, // 组件-查看组件详情
    getRealData, // 组件-组件列表
    getSelectProductList,
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
      id: {
        type: String,
        default: 'yourID'
      },
      width: {
        type: String,
        default: '500px'
      },
      height: {
        type: String,
        default: '400px'
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
        differentData: {
          types: ''
        }, // 表示获取不同的传感器的值
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
          searchString: '', // 存在
          status: 3
        },
        list: [],
        total: null,
        listLoading: true,
        dialogfaVisible: false,
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
        }
      }
    },
    created() {
      this.getList()
      this.getNumber()
    },
    mounted() {
      this.initChart()
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$refs.myEchart)
        // 把配置和数据放这里
        this.chart.setOption(
          {
            title: {
              text: '土壤温湿度变化',
              subtext: '纯属虚构'
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
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value} °C'
              }
            },
            series: [
              {
                name: '最高气温',
                type: 'line',
                data: [11, 11, 15, 13, 12, 13, 10],
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
                name: '最低气温',
                type: 'line',
                data: [1, -2, 2, 5, 3, 2, 0],
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

      // 选择传感器类型
      typesClick(command) {
        // this.$message('click on item ' + command)
        this.differentData.types = command
        console.log(this.differentData.types)
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
      // 获取real_time_data
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
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

<style>
  .element {
    height: 40px;
    line-height: 40px;
    margin-bottom: 12px;
  }
</style>
