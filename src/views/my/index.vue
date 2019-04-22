<template>
  <div class="app-container calendar-list-container">
    <div class="element">
      <span>修改密码</span>
    </div>
    <hr>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input style="width:500px;" v-model="ruleForm2.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input style="width:500px;" type="password" v-model="ruleForm2.newPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input style="width:500px;" type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {
    modifyUserPassword
  } from '@/api/article'
import { getToken } from '@/utils/auth'
  export default {
    name: 'complexTable',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm2.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        ruleForm2: {
          authorization: '',
          oldPassword: '',
          checkPass: '',
          newPassword: ''
        },
        rules2: {
          oldPassword: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          newPassword: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          checkPass: [{
            validator: validatePass2,
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.ruleForm2.authorization = getToken('Admin-Token')
        this.$refs[formName].validate((valid) => {
          if (valid) {
            modifyUserPassword(this.ruleForm2).then(Response => {
              if (Response.data.code === '200') {
                this.$message('提交成功')
              } else {
                this.$message('原密码错误，请重新输入')
                return
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
<style>
  .label {
    width: 200px;
    text-align: left
  }
</style>
