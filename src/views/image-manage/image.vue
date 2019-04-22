<template>
  <div class="app-container calendar-list-container">
    <div class="element">
      <span>图片管理</span>
    </div>
    <hr>
    <div>
      <img
        src="../../assets/401_images/1.png"
        style="width:150px;height:150px;"
        @click="clickImg($event)">
      <img
        src="../../assets/401_images/1.png"
        style="width:150px;height:150px;"
        @click="clickImg($event)">
      <img
        src="../../assets/401_images/1.png"
        style="width:150px;height:150px;"
        @click="clickImg($event)">
      <img
        src="../../assets/401_images/1.png"
        style="width:150px;height:150px;"
        @click="clickImg($event)">
      <!-- 放大图片 -->
      <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
    </div>
  </div>

</template>
<script>
  import {
    modifyUserPassword
  } from '@/api/article'
  import {
    getToken
  } from '@/utils/auth'
  import bigImage from './bigImage.vue'
  export default {
    components: {
      'big-img': bigImage
    },
    // props: ['../../assets/401_images/1.png'],
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
        showImg: false,
        imgSrc: '',
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
      },
      // bigImg() {
      //   // 发送事件
      //   this.$emit('clickit')
      // }
      clickImg(e) {
        this.showImg = true
        // 获取当前图片地址
        this.imgSrc = e.currentTarget.src
      },
      viewImg() {
        this.showImg = false
      }
    }
  }
</script>
<style>
  .label {
    width: 200px;
    text-align: left
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
  /*动画*/
  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s linear;
    transform: translate3D(0, 0, 0);
  }

  .fade-enter,
  .fade-leave-active {
    transform: translate3D(100%, 0, 0);
  }


  /* bigimg */

  .img-view {
    position: relative;
    width: 100%;
    height: 100%;
  }

  /*遮罩层样式*/
  .img-view .img-layer {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  /*不限制图片大小，实现居中*/
  .img-view .img img {
    max-width: 100%;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 1000;
  }
</style>
