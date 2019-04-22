<template>
    <!--<div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart">-->
    <!--</div>-->
  <div class="app-container calendar-list-container">
    <el-dropdown @command="typesClick">
      <el-button type="primary">
        采集点<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu  slot="dropdown">
        <el-dropdown-item command="1">采集点1号</el-dropdown-item>
        <el-dropdown-item command="2">采集点2号</el-dropdown-item>
        <el-dropdown-item command="3">采集点3号</el-dropdown-item>
        <el-dropdown-item command="4">采集点4号</el-dropdown-item>
        <el-dropdown-item command="5">采集点5号</el-dropdown-item>
        <el-dropdown-item command="6">采集点6号</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="监测类型"
        prop="date">
      </el-table-column>
      <el-table-column
        label="当前值"
        prop="name">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">设定阈值</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleDelete(scope.$index, scope.row)">正常</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
    import echarts from 'echarts'
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
      data() {
        return {
          data1: [5, 6, 2, 3, 4, 1, 2, 3, 5, 7, 8, 90, 6, 4, 4, 2, 2, 3, 6, 6, 86, 87, 6, 5, 43, 23, 342],
          data2: [2016 - 1 - 2, 2016 - 1 - 3, 2016 - 1 - 4, 2016 - 1 - 5, 2016 - 1 - 2, 2016 - 1 - 3, 2016 - 1 - 4, 2016 - 1 - 5, 2016 - 1 - 2, 2016 - 1 - 3, 2016 - 1 - 4, 2016 - 1 - 5],
          chart: null,
          tableData: [{
            date: '土壤温度',
            name: '6.35℃',
            address: ''
          }, {
            date: '土壤湿度',
            name: '35%',
            address: ''
          }, {
            date: '空气温度',
            name: '12℃',
            address: ''
          }, {
            date: '空气湿度',
            name: '55%',
            address: ''
          }, {
            date: 'CO2浓度值',
            name: '414.5ppm',
            address: ''
          }
          //   {
          //   date: '离子浓度',
          //   name: '王小虎',
          //   address: ''
          // }
          ],
          search: ''
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
        handleEdit(index, row) {
          console.log(index, row)
        },
        handleDelete(index, row) {
          console.log(index, row)
        },
        typesClick(command) {
          this.$message('click on item ' + command)
        }
      }
    }
</script>

<style>
  .box {
    width: 400px;

    .top {
      text-align: center;
    }

    .left {
      float: left;
      width: 60px;
    }

    .right {
      float: right;
      width: 60px;
    }

    .bottom {
      clear: both;
      text-align: center;
    }

    .item {
      margin: 4px;
    }

    .left .el-tooltip__popper,
    .right .el-tooltip__popper {
      padding: 8px 10px;
    }
  }
</style>
