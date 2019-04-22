<template>
  <div class="dashboard-editor-container">
    <github-corner></github-corner>
    <div><h1 style="color:#000000;">黄茶生长大数据管理系统</h1></div>
     <!--<panel-group :data="data"></panel-group>-->
<iframe width="600" scrolling="no" height="50" frameborder="0" allowtransparency="true" src="//i.tianqi.com/index.php?c=code&id=12&icon=1&py=jinyun&num=3&site=12"></iframe>
    <panel-group :data="data"></panel-group>
     <!--<d-chart></d-chart> -->
    <!--<div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart">-->
    <!--</div>-->
  </div>
</template>
<script>
import echarts from 'echarts'
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import DChart from './components/DChart'
import {
  getShopCountDetail
} from '@/api/shouye'
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
      default: '1000px'
    },
    height: {
      type: String,
      default: '500px'
    }
  },
  name: 'dashboard-admin',
  components: {
    GithubCorner,
    PanelGroup,
    DChart
  },
  data() {
    return {
      data: {
        saleoutproducts: '',
        deliverySO: '',
        questionSO: '',
        shenheCash: ''
      },
      request: {
        authorization: ''
      },
      data1: [5, 6, 2, 3, 4, 1, 2, 3, 5, 7, 8, 90, 6, 4, 4, 2, 2, 3, 6, 6, 86, 87, 6, 5, 43, 23, 342],
      data2: [2016 - 1 - 2, 2016 - 1 - 3, 2016 - 1 - 4, 2016 - 1 - 5, 2016 - 1 - 2, 2016 - 1 - 3, 2016 - 1 - 4, 2016 - 1 - 5, 2016 - 1 - 2, 2016 - 1 - 3, 2016 - 1 - 4, 2016 - 1 - 5],
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  created() {
    this.getList()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart)
      // 把配置和数据放这里
      this.chart.setOption({
        title: {
          text: '黄茶EC'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: this.data2
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        toolbox: {
          left: 'center',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [{
          startValue: '2014-06-01'
        }, {
          type: 'inside'
        }],
        visualMap: {
          top: 10,
          right: 10,
          pieces: [{
            gt: 0,
            lte: 50,
            color: '#096'
          }, {
            gt: 50,
            lte: 100,
            color: '#ffde33'
          }, {
            gt: 100,
            lte: 150,
            color: '#ff9933'
          }, {
            gt: 150,
            lte: 200,
            color: '#cc0033'
          }, {
            gt: 200,
            lte: 300,
            color: '#660099'
          }, {
            gt: 300,
            color: '#7e0023'
          }],
          outOfRange: {
            color: '#999'
          }
        },
        series: {
          name: 'Beijing AQI',
          type: 'line',
          data: this.data1,
          markLine: {
            silent: true,
            data: [{
              yAxis: 50
            }, {
              yAxis: 100
            }, {
              yAxis: 150
            }, {
              yAxis: 200
            }, {
              yAxis: 300
            }]
          }
        }
      })
    },
    getList() {
      this.request.authorization = getToken('Admin-Token')
      getShopCountDetail(this.request).then(response => {
        this.data = response.data.data
        console.log(this.data)
        console.log(response)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
</style>
