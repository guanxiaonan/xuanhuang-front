<template>
  <div class="app-container calendar-list-container">
    <div class="element">
      <span>农事管理: {{saleingCount}}</span>
      <el-button class="filter-item" style="float:right;" icon="el-icon-edit" @click="handleCreate">添加记录</el-button>
    </div>
    <hr>
    <div class="filter-container">
      <el-button style="float:right" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-input v-model="requestList.searchString" clearable style="width:300px;float:right" placeholder="请输入时间"></el-input>
    </div>
    <el-table :key='tableKey' :data="agricultural_data" v-loading="listLoading" element-loading-text="给我一点时间" border fit
      highlight-current-row style="width: 100%">
      <!-- <el-table-column float:left type="selection" align="center"></el-table-column> -->
      <el-table-column align="center" label="序号" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.taskId}}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间">
        <template slot-scope="scope">
          <!--<img :src="scope.row.sampleroomImg" alt="">-->
          <span style="float:right">{{scope.row.task_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作事项">
        <template slot-scope="scope">
          <!--<img :src="scope.row.sampleroomImg" alt="">-->
          <span style="float:right">{{scope.row.task_type}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="区域（茶园编号等）">
        <template slot-scope="scope">
          <span>{{scope.row.garden}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作量">
        <template slot-scope="scope">
          <!--<img :src="scope.row.sampleroomImg" alt="">-->
          <span style="float:right">{{scope.row.task_data}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="计量单位">
        <template slot-scope="scope">
          <span>{{scope.row.task_units}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="110px" align="center" label="反馈">
        <template slot-scope="scope">
          <span>{{scope.row.shopName}}</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="操作人员" width="95">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
          <!-- <span v-if="scope.row.pageviews" class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>
          <span v-else>0</span> -->
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="备注" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.beizhu}}</span>
          <!--<button type="primary" size="mini" @click="change(scope.row)">{{scope.row.status}}</button>-->
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delete1(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogfaVisible">
      <el-form ref="form_task" :model="form_task" :rules="rules" label-width="80px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="农事管理" name="first">

            <el-form-item label="操作类型">
              <el-select v-model="form_task.task_type" placeholder="请选择">
                <el-option
                  v-for="item in taskTypeList"
                  :key="item.task_type"
                  :label="item.task_type"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

             <el-form-item label="计量单位" prop="stock">
               <el-select v-model="form_task.task_units" placeholder="请选择">
                 <el-option
                   v-for="item in taskUnitsList"
                   :key="item.task_units"
                   :label="item.task_units"
                   :value="item.id">
                 </el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="操作的量" prop="stock">
              <el-input v-model="form_task.task_data"></el-input>
            </el-form-item>
            <el-form-item label="茶园号"  prop="stock">
              <el-input width="110px" v-model="form_task.task_data"></el-input>
            </el-form-item>
            <el-form-item label="工作人员">
              <span>&nbsp;</span>
              <el-input v-model="form_task.username"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <span>&nbsp;</span>
              <el-input v-model="form_task.beizhu"></el-input>
            </el-form-item>
          </el-tab-pane>

          <br>
          <el-button @click="dialogfaVisible = false">取 消</el-button>
          <el-button style="float:right" v-if="dialogStatus=='create'" type="primary" @click="submitFormTask('form_task')">确认</el-button>
          <el-button style="float:right" v-else type="primary" @click="submitForm1('form')">确认</el-button>
        </el-tabs>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import Dropzone from '@/components/Dropzone'
  import Tinymce from '@/components/Tinymce'
  import {
    getTaskUnits,
    getSampleList,
    getSample,
    getSelectProductList,
    setSampleStatus,
    getSampleCountDetail,
    getTaskType,
    taskInput
  } from '@/api/article'
  import { getToken } from '@/utils/auth'

  export default {
    name: 'complexTable',
    components: {
      Dropzone,
      Tinymce
    },
    data() {
      return {
        test: '',
        saleingCount: '',
        autoupload: false,
        dialogImageUrl: '',
        dialogVisible: false,
        dialogStatus: '',
        request: {
          authorization: '',
          sampleIds: '',
          action: ''
        },
        agricultural_data: [
          {
            taskId: 1,
            task_time: '2019-03-10 10:05',
            task_type: '种苗',
            garden: '茶园1',
            task_data: 500,
            task_units: '棵',
            username: 'admin',
            beizhu: '茶苗质量达标'
          },
          {
            taskId: 2,
            task_time: '2019-03-10 14:25',
            task_type: '喷药',
            garden: '茶园1',
            task_data: 0.5,
            task_units: 'L',
            username: 'admin',
            beizhu: '叶片有虫眼'
          },
          {
            taskId: 3,
            task_time: '2019-03-10 16:05',
            task_type: '浇水',
            garden: '茶园2',
            task_data: 3,
            task_units: '亩',
            username: 'admin',
            beizhu: '土壤水分值正常'
          },
          {
            taskId: 4,
            task_time: '2019-03-11 10:30',
            task_type: '浇水',
            garden: '茶园1',
            task_data: 2,
            task_units: '亩',
            username: 'admin',
            beizhu: '正常'
          },
          {
            taskId: 5,
            task_time: '2019-03-11 15:10',
            task_type: '培土',
            garden: '茶园1',
            task_data: 2,
            task_units: '亩',
            username: 'admin',
            beizhu: '土质紧密'
          },
          {
            taskId: 6,
            task_time: '2019-03-12 10:25',
            task_type: '浇水',
            garden: '茶园3',
            task_data: 1,
            task_units: '亩',
            username: 'admin',
            beizhu: '正常'
          },
          {
            taskId: 7,
            task_time: '2019-03-12 14:05',
            task_type: '除草',
            garden: '茶园2',
            task_data: 3,
            task_units: '亩',
            username: 'admin',
            beizhu: '杂草较多'
          },
          {
            taskId: 8,
            task_time: '2019-03-12 16:15',
            task_type: '施肥',
            garden: '茶园2',
            task_data: 3,
            task_units: 'kg',
            username: 'admin',
            beizhu: '正常'
          }
        ],

        requestList: {
          authorization: '',
          type: 0,
          sampleId: '',
          page: 1,
          size: 5,
          searchString: ''
        },
        form_task: {
          username: '',
          task_type: '',
          task_units: '',
          task_data: '',
          garden: '',
          beizhu: ''
        },
        taskTypeList: [],
        taskUnitsList: [],
        form: {
          fileList: [],
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
          designCost: '',
          installCost: '',
          isvalid: '',
          componentVos: [{
            productName: '',
            products: []
          }]
          // newcomponentVos: []
        },
        textMap: {
          update: '编辑',
          create: '添加记录'
        },
        rules: {
          name: [{
            required: true,
            message: '请输入商品名称',
            trigger: 'change'
          }],
          shopName: [{
            required: true,
            message: '请输入供应商名称',
            trigger: 'blur'
          }],
          postFare: [{
            required: true,
            message: '请输入运费',
            trigger: 'blur'
          }],
          designCost: [{
            required: true,
            message: '请输入设计费',
            trigger: 'blur'
          }],
          installCost: [{
            required: true,
            message: '请输入安装费',
            trigger: 'blur'
          }],
          detial: [{
            required: true,
            message: '请输入详情',
            trigger: 'blur'
          }]
        },
        activeName: 'first',
        tableKey: 0,
        list: null,
        list1: [],
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
        dialogfaVisible: false,
        downloadLoading: false,
        options: [],
        productIds: [],
        stockCount: 0
      }
    },
    created() {
      this.getList()
      this.getNumber()
    },
    methods: {
      getNumber() {
        this.request.authorization = getToken('Admin-Token')
        getSampleCountDetail(this.request.authorization).then(response => {
          console.log('number', response)
          this.saleingCount = response.data.data.saleingCount
        })
      },
      getList() {
        this.listLoading = true
        this.requestList.authorization = getToken('Admin-Token')
        getSampleList(this.requestList).then(response => {
          const sampleList = response.data.data.sampleList
          for (let i = 0; i < sampleList.length; i++) {
            if (sampleList[i].status === 0) {
              sampleList[i].status = '下架'
            }
            if (sampleList[i].status === 1) {
              sampleList[i].status = '上架'
            }
          }
          this.list = response.data.data.sampleList
          this.listLoading = false
        })
        getTaskType().then(res => {
          this.taskTypeList = res.data.data
          console.log('操作类型', res.data.data)
        })
        getTaskUnits().then(res => {
          this.taskUnitsList = res.data.data
        })
        getSelectProductList(this.request.authorization).then(res => {
          this.options = res.data.data
        })
      },
      handleSuccess(response, file, fileList) {
        this.form.image = response.data.imageUrl
      },
      change(row) {
        this.request.sampleIds = row.sampleroomId
        this.$confirm('你确定将此方案下架吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.request.action = 1
          this.request.authorization = getToken('Admin-Token')
          setSampleStatus(this.request).then(response => {
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
        this.request.sampleIds = row.sampleroomId
        this.$confirm('你确定将此方案删除吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.request.action = 0
          this.request.authorization = getToken('Admin-Token')
          setSampleStatus(this.request).then(response => {
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
      changeImage(file) {
        this.form.image.push(file)
      },
      taskTypeCommand(command) {
        this.$message('click on item ' + command)
      },

      submitFormTask() {
        // /////////////////////////////////////////////////////////////////
        console.log('+++++++++++++++++++++:' + this.form_task.task_type)
        // console.log('image', this.form.image)
        this.dialogStatus = 'update'
        this.dialogfaVisible = false
        console.log('提交的农事数据为：', this.form_task)
        taskInput(this.form_task).then(res => {
          // if()
          console.log('农事管理提交成功', res.data.data)
        })
        // this.$refs.form.validate(valid => {
        //   if (valid && this.form.image) {
        //     saveSample(this.form).then(Response => {
        //       this.$message('修改成功')
        //     })
        //   } else {
        //     this.$message('还有未填选项')
        //     return false
        //   }
        // })
      },
      // create: function() {
      //   this.componentVos.push(this.newcomponentVos)
      //   // 添加完newPerson对象后，重置newPerson对象
      //   this.newcomponentVos = []
      // },
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
      handleRemove(file, image) {
        console.log('file', file)
        console.log('image', image)
      },
      handlePreview(file) {
        console.log(file)
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
        this.form = {
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
          designCost: '',
          installCost: '',
          isvalid: '',
          componentVos: [{
            productName: '',
            products: []
          }]
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogfaVisible = true
        this.productIds = []
        this.$nextTick(() => {
          this.$refs['form'].clearValidate()
        })
      },
      handleUpdate(row) {
        this.dialogStatus = 'update'
        this.dialogfaVisible = true
        this.$nextTick(() => {
          this.$refs['form'].clearValidate()
        })
        this.requestList.sampleId = row.sampleroomId
        this.requestList.authorization = getToken('Admin-Token')
        getSample(this.requestList).then(response => {
          this.form = response.data.data.sampleDetail
          this.form.componentVos.forEach(item => {
            this.productIds = this.filterId(item.products)
          })
          // console.log('responseaaaaa', response)
        })
      },
      addItem() {
        this.form.componentVos.push({
          productName: '',
          products: []
        })
      },
      filterId(objArr) {
        const arr = []
        objArr.forEach((obj) => {
          arr.push(obj.productId + '')
        })
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        console.log(this.options)
        console.log(arr)
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
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
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
