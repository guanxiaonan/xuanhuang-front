<template>
  <div class="app-container calendar-list-container">
    <div class="element">
      <span>问题记录: {{deleteCount}}</span>
      <el-button class="filter-item" style="float:right;" icon="el-icon-edit" @click="handleCreate">添加记录</el-button>
    </div>
    <hr>
    <div class="filter-container">
      <el-button style="float:right" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-input v-model="requestList.searchString" clearable style="width:300px;float:right" placeholder="请输入时间"></el-input>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
      highlight-current-row style="width: 100%">
      <!-- <el-table-column float:left type="selection" align="center"></el-table-column> -->
      <!-- <el-table-column align="center" label="序号" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.sampleroomId}}</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" type="index" :index="sequenceNumber" label="序号" width="65">
      </el-table-column>
      <el-table-column label="时间">
        <template slot-scope="scope">
          <img :src="scope.row.sampleroomImg" alt="">
          <span style="float:right">{{scope.row.sampleroomName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="茶园编号区域">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="问题照片">
        <template slot-scope="scope">
          <span>{{scope.row.shopName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="问题描述" width="95">
        <template slot-scope="scope">
          <span>{{scope.row.saleAmount}}</span>
          <!-- <span v-if="scope.row.pageviews" class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>
          <span v-else>0</span> -->
        </template>
      </el-table-column>
      <el-table-column align="center" label="人员" width="95">
        <template slot-scope="scope">
          <span>{{scope.row.saleAmount}}</span>
          <!-- <span v-if="scope.row.pageviews" class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>
          <span v-else>0</span> -->
        </template>
      </el-table-column>
       <el-table-column align="center" label="状态" width="95">
        <template slot-scope="scope">
          <span>{{scope.row.saleAmount}}</span>
          <!-- <span v-if="scope.row.pageviews" class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>
          <span v-else>0</span> -->
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="mini" @click="recover(scope.row)">已解决</el-button> -->
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delete1(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="requestList.page"
        :page-sizes="[10,20,30, 50]" :page-size="requestList.limit" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogfaVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本" name="first">
            <!-- <el-form-item label="排序">
              <el-input placeholder="数字越大，排名越靠前，如果为空，默认排序时间为创建时间" v-model="form.sortedNum"></el-input>
            </el-form-item> -->
            <el-form-item label="时间" prop="name">

              <el-input v-model="form.name"></el-input>
            </el-form-item>
             <el-form-item label="茶园编号区域" prop="name">

              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="问题照片" prop="image">
              <el-upload class="upload-demo" :file-list="form.image" action="http://101.132.44.253:8767/background/setSampleStatus"
                :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture" :auto-upload="autoupload"
                :before-upload="beforeAvatarUpload" @on-change="changeImage">
                <el-button size="small" type="primary">选择图片</el-button>
                <!-- <div slot="tip" class="el-upload__tip">注：图片标签最多添加3个，大小为50*18</div> -->
              </el-upload>
              <!-- <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog> -->
            </el-form-item>
            <el-form-item label="问题描述" prop="shopName">
              <el-input v-model="form.shopName"></el-input>
            </el-form-item>
            <el-form-item label="人员" prop="postFare">
              <el-input v-model="form.postFare"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="designCost">
              <el-input v-model="form.designCost"></el-input>
            </el-form-item>
            <!-- </el-form> -->
          </el-tab-pane>
          <br>
          <el-button style="float:right" v-if="dialogStatus=='create'" type="primary" @click="submitForm('form')">确认</el-button>
          <el-button style="float:right" v-else type="primary" @click="submitForm('form')">确认</el-button>
        </el-tabs>

      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import Dropzone from '@/components/Dropzone'
  import Tinymce from '@/components/Tinymce'
  import {
    saveSample,
    getSampleList,
    getSample,
    getSelectProductList,
    setSampleStatus,
    getSampleCountDetail
  } from '@/api/article'
  import {
    getToken
  } from '@/utils/auth'
  export default {
    name: 'complexTable',
    components: {
      Dropzone,
      Tinymce
    },
    data() {
      return {

        autoupload: false,
        dialogImageUrl: '',
        dialogVisible: false,
        dialogStatus: '',
        request: {
          authorization: '',
          sampleIds: '',
          action: ''
        },
        requestList: {
          authorization: '',
          type: 3,
          sampleId: '',
          page: 1,
          size: 10,
          searchString: ''
        },
        form: {
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
          create: '添加方案'
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
        deleteCount: 0
      }
    },
    created() {
      this.getList()
      this.getNumber()
    },
    methods: {
      getNumber() {
        this.requestList.authorization = getToken('Admin-Token')
        getSampleCountDetail(this.requestList.authorization).then(response => {
          console.log('number', response)
          this.deleteCount = response.data.data.deleteCount
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
        getSelectProductList().then(res => {
          this.options = res.data.data
        })
      },
      change(row) {
        this.request.authorization = getToken('Admin-Token')
        this.request.sampleIds = row.sampleroomId
        this.$confirm('你确定将此方案下架吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.request.action = 1
          setSampleStatus(this.request).then(response => {
            console.log('response', response)
            if (response.data.code === '200') {
              this.getList()
              this.$message({
                type: 'success',
                message: '下架成功'
              })
            }
          })
        })
      },
      recover(row) {
        this.request.authorization = getToken('Admin-Token')
        this.request.sampleIds = row.sampleroomId
        this.$confirm('你确定将此方案恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.request.action = 3
          setSampleStatus(this.request).then(response => {
            console.log('response', response)
            if (response.data.code === '200') {
              this.getList()
              this.$message({
                type: 'success',
                message: '恢复成功'
              })
            }
          })
        })
      },
      delete1(row) {
        this.request.sampleIds = row.sampleroomId
        this.request.authorization = getToken('Admin-Token')
        this.$confirm('你确定将此方案删除吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.request.action = 0
          setSampleStatus(this.request).then(response => {
            console.log('response', response)
            if (response.data.code === '200') {
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
      submitForm(form) {
        console.log('image', this.form.image)
        this.$refs.form.validate(valid => {
          if (valid && this.form.image) {
            saveSample(this.form).then(Response => {
              this.$message('修改成功')
            })
          } else {
            this.$message('还有未填选项')
            return false
          }
        })
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
        this.requestList.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.requestList.size = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.requestList.page = val
        this.getList()
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      sequenceNumber(index) {
        return (this.requestList.page - 1) * this.requestList.size + index + 1
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
        this.requestList.sampleId = row.sampleId
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
        objArr.forEach(obj => {
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
</style>

<style>
  .element {
    height: 40px;
    line-height: 40px;
    margin-bottom: 12px;
  }
</style>
