<template>
  <div id="login">
    <div class="login-wrap">
    <ul class="menu-tab">
      <li :class="{'current':item.current}" v-for="item in menuTab" :key="item.id" @click="toggleMenu(item)">{{item.txt}}</li>
    </ul>
    <!--表单-->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size='medium'>
      <el-form-item prop="email" class="item-form">
      <label for="email">邮箱</label>
        <el-input id="email" type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
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
          <el-button type="success" class="block" @click="getSms()">验证码</el-button>
        </el-col>

      </el-row>
        

      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" class="login-btn block" :disabled = "loginButtonStatus">{{model === "login" ? "登录":"注册"}}</el-button>
      </el-form-item>

    </el-form>
  </div>

  </div>
</template>

<script>

import {GetSms} from '@/api/login'
import {reactive,ref,isRef,toRefs,onMounted} from '@vue/composition-api'
import { stripscript,validateE,validatepwd,validcap}from '@/utils/validata';
export default {
  name:'login',
  setup(props,{refs,root}){
    /*context下的
      attrs: this.$attrs
      emit: this.$emit
      listeners:this.$listeners
      parent: this.parent
      refs:this.refs
      roots:this
      */
      //
    //data数据、生命周期、自定义函数
          //验证用户名
      let validateEmail = (rule, value, callback) => {
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
      let validatepsd = (rule, value, callback) => {
        ruleForm.password = stripscript(value)
        value = ruleForm.password

        if (value === '') {
          callback(new Error('请输入密码（必须包含数字和字母）'));
        } else if (validatepwd(value)) {
          callback(new Error('密码长度为6-20内（必须包含数字和字母）'));
        } else {
          callback();
        }
      };
      //重复密码验证
      let validatepsds = (rule, value, callback) => {
        //登录界面不用验证
        if(model.value === 'login'){ callback();}
        ruleForm.passwords = stripscript(value)
        value = ruleForm.passwords

        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value != ruleForm.password) {
          callback(new Error('密码不一致'));
        } else {
          callback();
        }
      };
          //验证码
      let checkcap = (rule, value, callback) => {
        //过滤特殊字符
        ruleForm.cap = stripscript(value)
        value = ruleForm.cap
        if (value === '') {
          return callback(new Error('验证码不能为空'));
        }else if(validcap(value)){
          return callback(new Error('验证码格式有误'))
        }else{
          callback()
        }
      };

        const menuTab = reactive([
        {txt:'Login',current:true,type:'login'},
        {txt:'Reg',current:false,type:'register'}
      ])

      //显示重复密码
      const model = ref('login')

      //登录状态
      const loginButtonStatus = ref(true)

      //表单绑定数据
      const ruleForm = reactive({
          email: '',
          password: '',
          passwords: '',
          cap: ''
      })

      //表单验证
      const rules = reactive({
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
        })


      //声明函数
    const toggleMenu = ((data)=>{
      // console.log(data)
      menuTab.forEach(elem => {
        elem.current = false
      })
      data.current = true
      model.value = data.type
    })

    /*获取验证码*/
    const getSms = (()=>{
      // 验证邮箱空值
      if(ruleForm.email == ''){
        root.$message.error('邮箱不能为空！');
        return false
      }

      // 验证邮箱格式
      if(validateE(ruleForm.email)){
        root.$message.error('邮箱格式有误！');
        return false
      }

      //获取验证码
      let requestData = {
        username:ruleForm.email,
        module:'login'
      }
        //接口
      GetSms(requestData)
      console.log(GetSms(requestData))
      .then(response=>{

      })
      .catch(err=>{
          console.log(error)
        })

      
    })
      


    /*提交表单*/
    const submitForm = ((formName)=>{
        refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log(valid)
            console.log('error submit!!');
            return false;
          }
        })
      })
  

      // // console.log(menuTab)
      // const model = ref('login')

      //生命周期
      //完成后
      onMounted()

      return {
        menuTab,
        model,
        toggleMenu,
        submitForm,
        ruleForm,
        rules,
        loginButtonStatus,
        getSms
      }
  },
  data(){


   return {


      // 表单数据


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