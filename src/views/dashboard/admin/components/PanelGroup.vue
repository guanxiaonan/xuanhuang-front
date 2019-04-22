<template>
  <div>
    <!--<div><h3 style="color:#00ff00;">黄茶数据采集系统</h3></div>-->
    <!-- <el-row class="panel-group" :gutter="80">
      <el-col :xs="24" :sm="24" :lg="6" class="card-panel-col">
        <div @click="chuli(1)" class='card-panel'>
          <div class="card-panel-description">
            <div class="card-panel-text">茶园1</div>
            <span>{{data.saleoutproducts}}</span>
          </div>
        </div>
        <div>
          <el-collapse v-model="activeNames">
            <el-collapse-item title="实时采集点" name="1">
              <div>
                <el-popover
                  placement="right"
                  width="500"
                  trigger="click">
                  <el-table :data="gridData1">
                    <el-table-column width="150" property="date" label="日期"></el-table-column>
                    <el-table-column width="100" property="name" label="传感器类型"></el-table-column>
                    <el-table-column width="100" property="address" label="数据"></el-table-column>
                    <el-table-column width="300" property="state" label="状态"></el-table-column>
                  </el-table>
                  <el-button slot="reference">采集点5实时数据</el-button>
                </el-popover>
              </div>
              <div>
              <el-popover
                placement="right"
                width="500"
                trigger="click">
                <el-table :data="gridData1">
                  <el-table-column width="150" property="date" label="日期"></el-table-column>
                  <el-table-column width="100" property="name" label="传感器类型"></el-table-column>
                  <el-table-column width="100" property="address" label="数据"></el-table-column>
                  <el-table-column width="300" property="state" label="状态"></el-table-column>
                </el-table>
                <el-button slot="reference">采集点6实时数据</el-button>
              </el-popover>
              </div>
              <div>
              <el-popover
                placement="right"
                width="500"
                trigger="click">
                <el-table :data="gridData1">
                  <el-table-column width="150" property="date" label="日期"></el-table-column>
                  <el-table-column width="100" property="name" label="传感器类型"></el-table-column>
                  <el-table-column width="100" property="address" label="数据"></el-table-column>
                  <el-table-column width="300" property="state" label="状态"></el-table-column>
                </el-table>
                <el-button slot="reference">采集点7实时数据</el-button>
              </el-popover>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div @click="chuli2" class="card-panel">
          <div class="card-panel-description">
            <div class="card-panel-text">茶园2</div>
            <span>{{data.deliverySO}}</span>
          </div>
        </div>
        <div>
          <el-collapse v-model="activeNames">
            <el-collapse-item title="实时采集点" name="1">
              <div>
                <el-popover
                  placement="right"
                  width="500"
                  trigger="click">
                  <el-table :data="gridData1">
                    <el-table-column width="150" property="date" label="日期"></el-table-column>
                    <el-table-column width="100" property="name" label="传感器类型"></el-table-column>
                    <el-table-column width="100" property="address" label="数据"></el-table-column>
                    <el-table-column width="300" property="state" label="状态"></el-table-column>
                  </el-table>
                  <el-button slot="reference">采集点3实时数据</el-button>
                </el-popover>
              </div>
              <div>
                <el-popover
                  placement="right"
                  width="500"
                  trigger="click">
                  <el-table :data="gridData1">
                    <el-table-column width="150" property="date" label="日期"></el-table-column>
                    <el-table-column width="100" property="name" label="传感器类型"></el-table-column>
                    <el-table-column width="100" property="address" label="数据"></el-table-column>
                    <el-table-column width="300" property="state" label="状态"></el-table-column>
                  </el-table>
                  <el-button slot="reference">采集点4实时数据</el-button>
                </el-popover>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div @click="chuli3" class="card-panel">
          <div class="card-panel-description">
            <div class="card-panel-text">茶园3</div>
            <span>{{data.questionSO}}</span>
          </div>
        </div>
        <div>
          <el-collapse v-model="activeNames">
            <el-collapse-item title="实时采集点" name="1">
              <div>
                <el-popover
                  placement="right"
                  width="500"
                  trigger="click">
                  <el-table :data="gridData1">
                    <el-table-column width="150" property="date" label="日期"></el-table-column>
                    <el-table-column width="100" property="name" label="传感器类型"></el-table-column>
                    <el-table-column width="100" property="address" label="数据"></el-table-column>
                    <el-table-column width="300" property="state" label="状态"></el-table-column>
                  </el-table>
                  <el-button slot="reference">采集点1实时数据</el-button>
                </el-popover>
              </div>
              <div>
                <el-popover
                  placement="right"
                  width="500"
                  trigger="click">
                  <el-table :data="gridData1">
                    <el-table-column width="150" property="date" label="日期"></el-table-column>
                    <el-table-column width="100" property="name" label="传感器类型"></el-table-column>
                    <el-table-column width="100" property="address" label="数据"></el-table-column>
                    <el-table-column width="300" property="state" label="状态"></el-table-column>
                  </el-table>
                  <el-button slot="reference">采集点2实时数据</el-button>
                </el-popover>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
    </el-row> -->
    <el-row class="panel-group" :gutter="80">
      <el-col :xs="24" :sm="24" :lg="10" class="card-panel-col">
        <img src="../../../../assets/401_images/dashboard.jpeg" border="0" usemap="#teamap">
        <map name="teamap" id="teamap">
          <area shape="rectangle" coords="368,60,387,80" target="_blank" @click="chuli(3)" @mouseover="displayms(1)"
                @mouseout="hidems()">
          <area shape="rectangle" coords="386,94,406,114" target="_blank" @click="chuli(3)" @mouseover="displayms(2)"
                @mouseout="hidems()">
          <area shape="rectangle" coords="414,210,433,230" target="_blank" @click="chuli(2)" @mouseover=" displayms(3)"
                @mouseout="hidems()">
          <area shape="rectangle" coords="378,221,397,242" target="_blank" @click="chuli(2)" @mouseover=" displayms(4)"
                @mouseout="hidems()">
          <area shape="rectangle" coords="349,244,370,265" target="_blank" @click="chuli(1)" @mouseover=" displayms(5)"
                @mouseout="hidems()">
          <area shape="rectangle" coords="314,304,334,325" target="_blank" @click="chuli(1)" @mouseover=" displayms(6)"
                @mouseout="hidems()">
          <area shape="rectangle" coords="358,303,378,323" target="_blank" @click="chuli(1)" @mouseover=" displayms(7)"
                @mouseout="hidems()">
        </map>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="11" id="message">
        <!--<div class='card-panel'>-->
        <!--<div class="card-panel-description">-->
        <!--<Form v-if="operMessage === 'caijidian1'" :model="formjs" :label-width="80" style="width:50%;dispaly:block;">-->
        <!---->
        <!--</Form>-->
        <el-form v-if="operMessage === 'caijidian1'" :label-position="labelPosition" label-width="100px"
                 :model="realData">
          <el-form-item label="土壤温度" class="redItem">
            <el-input v-model="realData.turangwendu">℃</el-input>
          </el-form-item>
          <el-form-item label="土壤湿度" class="redItem">
            <el-input v-model="realData.turangshidu">%</el-input>
          </el-form-item>
          <el-form-item label="空气温度" class="redItem">
            <el-input v-model="realData.kongqiwendu">℃</el-input>
          </el-form-item>
          <el-form-item label="空气湿度" class="redItem">
            <el-input v-model="realData.kongqishidu">%</el-input>
          </el-form-item>
          <el-form-item label="CO2浓度" class="redItem">
            <el-input v-model="realData.CO2">ppm</el-input>
          </el-form-item>
          <el-form-item label="光照强度" class="redItem">
            <el-input v-model="realData.guangzhao">LX</el-input>
          </el-form-item>
        </el-form>
        <!--<div v-if="caijidian1" class="card-panel-text">茶园2</div>-->
        <!--<span>{{data.saleoutproducts}}</span>-->
        <!--</div>-->
        <!--</div>-->
        <div>
        </div>
      </el-col>
      <!--<el-col :xs="24" :sm="24" :lg="4" class="card-panel-col" id="caijidian2">-->
      <!--<div class='card-panel'>-->
      <!--<div class="card-panel-description">-->
      <!--<div class="card-panel-text">caijidian2</div>-->
      <!--&lt;!&ndash;<span>{{data.saleoutproducts}}</span>&ndash;&gt;-->
      <!--</div>-->
      <!--</div>-->
      <!--<div>-->
      <!--</div>-->
      <!--</el-col>-->
    </el-row>
    <!-- <a href=""><img src="../../../../assets/401_images/位置.png" style="width:32px;height:32px;position:absolute;margin-top:60px;margin-left:-80px;"></a> -->
  </div>
</template>

<script>
  import { getRealData } from '@/api/article'

  export default {
    components: {},
    props: {
      data: {
        saleoutproducts: {
          type: Number,
          default: 0
        },
        deliverySO: {
          type: Number,
          default: 0
        },
        questionSO: {
          type: Number,
          default: 0
        },
        shenheCash: {
          type: Number,
          default: 0
        }
      }

    },
    data() {
      return {
        gridData1: [{
          date: '2016-05-02',
          name: '土壤温湿度',
          address: '',
          state: '开启'
        }, {
          date: '2016-05-04',
          name: '光照度',
          address: ''
        }, {
          date: '2016-05-01',
          name: '空气温湿度',
          address: '',
          state: '开启'
        }, {
          date: '2016-05-03',
          name: '离子浓度',
          address: '',
          state: '开启'
        }],
        realData: {
          turangwendu: '7.3 ℃',
          turangshidu: '30 %',
          kongqiwendu: '23.1 ℃',
          kongqishidu: '40 %',
          CO2: '488.3 ppm',
          guangzhao: '3582.16 LX'
        },
        turangwenduall: [],
        turangshiduall: [],
        kongqiwenduall: [],
        kongqishiduall: [],
        CO2all: [],
        operMessage: ''
      }
    },
    created() {
      this.getList()
    },
    methods: {
      chuli(i) {
        if (i === 1) {
          this.$router.push({
            name: 'chayuan1'
          })
        }
        if (i === 2) {
          this.$router.push({
            name: 'chayuan2'
          })
        }
        if (i === 3) {
          this.$router.push({
            name: 'chayuan3'
          })
        }
        // alert('chuli1')
      },
      chuli2() {
        // this.$router.push({
        //   name: 'home_index'
        // })
        alert('chuli2')
      },
      chuli3() {
        // this.$router.push({
        //   name: 'home_index'
        // })
        alert('chuli3')
      },
      getList() {
        console.log('============运行==========')
        // this.listLoading = true
        // this.requestList.authorization = getToken('Admin-Token')
        getRealData().then(response => {
          console.log('list', response)
          var kqwd = 0
          var kqsd = 0
          var trwd = 0
          var trsd = 0
          var co2 = 0
          for (var i = 0; i < response.data.data.length; i++) {
            // 湿度
            if (response.data.data[i].types === 'SHT21/SHT25温湿度传感器' && response.data.data[i].units === '%') {
              this.kongqishiduall[kqsd++] = response.data.data[i].datas
            }
            if (response.data.data[i].types === 'SHT21/SHT25温湿度传感器' && response.data.data[i].units === '℃') {
              this.kongqiwenduall[kqwd++] = response.data.data[i].datas
            }
            if (response.data.data[i].types === '土壤湿度传感器' && response.data.data[i].units === '%') {
              this.turangshiduall[trsd++] = response.data.data[i].datas
            }
            if (response.data.data[i].types === '土壤温度传感器' && response.data.data[i].units === '℃') {
              this.turangwenduall[trwd++] = response.data.data[i].datas
            }
            if (response.data.data[i].types === 'CO2传感器' && response.data.data[i].units === 'ppm') {
              this.CO2all[co2++] = response.data.data[i].datas / 100
            }
          }
          console.log('空气湿度', this.kongqishiduall)
          console.log('空气温度', this.kongqiwenduall)
          console.log('土壤湿度', this.turangshiduall)
          console.log('土壤温度', this.turangwenduall)
          console.log('CO2', this.CO2all)
          // this.list = response.data.data
          // for (var i = 0; i < response.data.data.length; i++) {
          //   if (response.data.data[i].types === 'SHT21/SHT25温湿度传感器' && response.data.data[i].units === '%') {
          //     this.kongqishiduall[i] = response.data.data[i].datas
          //   }
          // }
          // console.log('空气湿度', this.kongqishiduall)
          // this.list = response.data.data
          // this.total = response.data.data.total
          // this.listLoading = false
        })
      },
      displayms(i) {
        this.operMessage = 'caijidian1'
        // var e = window.event
        const div1 = document.getElementById('message')
        div1.style.visibility = 'visible'
      },
      hidems() {
        const div1 = document.getElementById('message')
        div1.style.visibility = 'hidden'
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .card {
    margin-left: 100px;
  }

  .el-card__body {
    padding: 5px;
  }

  .panel-group {
    margin-top: 18px;
    text-align: center;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      text-align: center;
      height: 80px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05); // &:hover {

      //   .card-panel-icon-wrapper {
      //     color: #fff;
      //   }
      //   .icon-people {
      //      background: #40c9c6;
      //   }
      //   .icon-message {
      //     background: #36a3f7;
      //   }
      //   .icon-money {
      //     background: #f4516c;
      //   }
      //   .icon-shoppingCard {f
      //     background: #34bfa3
      //   }
      // }
      // .icon-people {
      //   color: #40c9c6;
      // }
      // .icon-message {
      //   color: #36a3f7;
      // }
      // .icon-money {
      //   color: #f4516c;
      // }
      // .icon-shoppingCard {
      //   color: #34bfa3
      // }
      // .card-panel-icon-wrapper {
      //   float: left;
      //   margin: 14px 0 0 14px;
      //   padding: 16px;
      //   transition: all 0.38s ease-out;
      //   border-radius: 6px;
      // }
      // .card-panel-icon {
      //   float: left;
      //   font-size: 48px;
      // }
      .card-panel-description {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100px;
        height: 60px;
        font-weight: bold;
        margin-left: -50px;
        margin-top: -15px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

</style>
<style>
  .el-card__body {
    padding: 5px;
  }

  #message {
    margin-left: 20%;
    width: 400px;
    /*height:1000px;*/
    visibility: hidden;
  }

  .redItem .el-form-item__label {
    color: goldenrod;
  }
</style>

