<template>
  <div id="login">
    <div class="login-wrap">
    <ul class="menu-tab">
      <li :class="{'current':item.current}" v-for="item in menuTab" :key="item.id" @click="toggleMenu(item)">{{item.txt}}</li>
    </ul>
    <!--表单-->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size='medium'>
      <el-form-item prop="email" class="item-form">
      <label>邮箱</label>
        <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="password" class="item-form">
      <label>密码</label>
        <el-input type="text" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
      </el-form-item>

       <el-form-item prop="passwords" class="item-form" v-show = "model === 'register'">
      <label>重复密码</label>
        <el-input type="text" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
      </el-form-item>

      <el-form-item prop="cap" class="item-form">
      <label>验证码</label>
      <el-row :gutter="10">
        <el-col :span="18"><el-input v-model="ruleForm.cap"></el-input></el-col>
        <el-col :span="6">
          <el-button type="success" class="block">验证码</el-button>
        </el-col>

      </el-row>
        

      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
      </el-form-item>

    </el-form>
  </div>

  </div>
</template>

<script>
import { stripscript,validateE,validatepwd,validcap}from '@/utils/validata';
export default {
  name:'login',
  data(){

      //验证用户名
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱！'));
        } else if(validateE(value)){
          callback(new Error('邮箱格式有误！'));
        }
        else{
          callback();//true
        }
      };
      //验证密码
      var validatepsd = (rule, value, callback) => {
        this.ruleForm.password = stripscript(value)
        value = this.ruleForm.password

        if (value === '') {
          callback(new Error('请输入密码（必须包含数字和字母）'));
        } else if (validatepwd(value)) {
          callback(new Error('密码长度为6-20内（必须包含数字和字母）'));
        } else {
          callback();
        }
      };
      //重复密码验证
      var validatepsds = (rule, value, callback) => {
        //登录界面不用验证
        if(this.model === 'login'){ callback();}
        this.ruleForm.passwords = stripscript(value)
        value = this.ruleForm.passwords

        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value != this.ruleForm.password) {
          callback(new Error('密码不一致'));
        } else {
          callback();
        }
      };
          //验证码
          var checkcap = (rule, value, callback) => {
            //过滤特殊字符
            this.ruleForm.cap = stripscript(value)
            value = this.ruleForm.cap
            if (value === '') {
              return callback(new Error('验证码不能为空'));
            }else if(validcap(value)){
              return callback(new Error('验证码格式有误'))
            }else{
              callback()
            }
          };
    return {
      menuTab:[
        {txt:'Login',current:true,type:'login'},
        {txt:'Reg',current:false,type:'register'}
      ],
      //显示重复密码
      model:'login',
      // 表单数据
      ruleForm: {
          email: '',
          password: '',
          passwords: '',
          cap: ''
        },
        rules: {
          email: [
            { validator: validateEmail, trigger: 'blur' }
          ],
          password: [
            { validator: validatepsd, trigger: 'blur' }
          ],
          passwords: [
            { validator: validatepsds, trigger: 'blur' }
          ],
          cap: [
            { validator: checkcap, trigger: 'blur' }
          ]
        }
    }
  },
  created() {
    
  },
  mounted() {
    
  },
  methods: {
    toggleMenu(data){
      this.menuTab.forEach(elem => {
        elem.current = false
      })
      data.current = true
      this.model = data.type
    },
   submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log(valid)
            console.log('error submit!!');
            return false;
          }
        });
      }
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
  #login{
    background-color:#344a5f;
    height:100vh
  }
  .login-wrap{
    width:330px;
    margin:auto;
  }
  .menu-tab{
    text-align: center;
    li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 5px;
    cursor:pointer;
    }
    .current{
      background-color:rgba(0,0,0,0.1)
    }
  }
  .login-form{
    margin-top:29px;
    label{
      display:block;
      font-size:14px;
      margin-bottom:3px;

      color:#fff;
    }
    .item-form{
      margin-bottom:13px;
    }
    .block{
      display:block;
      width:100%;
    }
    .login-btn{
      margin-top:19px;
    }
  }


</style>