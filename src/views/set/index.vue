<template>
  <div class="app-container calendar-list-container">
    <div class="element">
      <span>商城设置</span>

    </div>
    <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="200px">
      <el-form-item class="label" label="商户名称" prop="shop_name">
        <el-input style="width:640px;float:left" v-model="ruleForm.shop_name"></el-input>
      </el-form-item>
      <el-form-item class="label" label="联系人" prop="shop_person">
        <el-input style="width:640px;float:left" v-model="ruleForm. shop_person	"></el-input>
      </el-form-item>
      <el-form-item class="label" label="联系电话" prop="shop_phone">
        <el-input style="width:640px;float:left" v-model="ruleForm.shop_phone"></el-input>
      </el-form-item>
      <el-form-item class="label" label="提现账号" prop="shop_bank">
        <el-input style="width:640px;float:left" v-model="ruleForm.shop_bank"></el-input>
      </el-form-item>
      <el-button class="filter-item" style="float:right;" @click="submit('ruleForm')">提交</el-button>
    </el-form>
  </div>
</template>
<script>
  import {
    getShopConfig,
    setShopConfig
  } from '@/api/article'
  import waves from '@/directive/waves' // 水波纹指令

  export default {
    name: 'complexTable',

    directives: {
      waves
    },
    data() {
      return {
        res: {},

        ruleForm: {
          shop_name: '',
          shop_person: '',
          shop_phone: '',
          shop_bank: '',
          shopId: 1
        },
        rules: {
          shop_name: [{
            required: true,
            message: '请输入商户名称',
            trigger: 'blur'
          } // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          shop_person: [{
            required: true,
            message: '请输入联系人',
            trigger: 'blur'
          }],
          shop_phone: [{
            required: true,
            message: '请输入联系点话',
            trigger: 'blur'
          }],
          shop_bank: [{
            required: true,
            message: '请输入账户',
            trigger: 'blur'
          }]
        },
        activeName: 'first',

        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        downloadLoading: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.shopId = 1
            setShopConfig(this.ruleForm).then(Response => {
              if (Response.data.code === '200') {
                this.$message('提交成功')
              } else {
                this.$message('失败')
                return
              }
            })
          }
        })
      },
      getList() {
        this.listLoading = true
        getShopConfig(this.res).then(response => {
          this.ruleForm = response.data.data
          console.log('ruleForm', response)
          this.listLoading = false
        })
      }
    }
  }

</script>
<style>
  .label {
    height: 40px;
    line-height: 40px;
    text-align: left
  }

</style>
