<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{ current: item.current }"
          v-for="item in menuTab"
          :key="item.id"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!--表单-->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="email" class="item-form">
          <label for="email">邮箱</label>
          <el-input
            id="email"
            type="text"
            v-model="ruleForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="passwords"
          class="item-form"
          v-show="model === 'register'"
        >
          <label>重复密码</label>
          <el-input
            type="text"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="cap" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15"
              ><el-input v-model="ruleForm.cap"></el-input
            ></el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                @click="getSms()"
                :disabled="capBtnStatus.status"
                >{{ capBtnStatus.text }}</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            class="login-btn block"
            :disabled="loginButtonStatus"
            >{{ model === "login" ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from "js-sha1";
import Vuex from "vuex";
import { GetSms, Register, Login } from "@/api/login";
import { reactive, ref, onMounted } from "@vue/composition-api";
import {
  stripscript,
  validateE,
  validatepwd,
  validcap
} from "@/utils/validata";
export default {
  name: "login",
  setup(props, { refs, root }) {
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
      if (value === "") {
        callback(new Error("请输入邮箱！"));
      } else if (validateE(value)) {
        callback(new Error("邮箱格式有误！"));
      } else {
        callback(); //true
      }
    };
    //验证密码
    let validatepsd = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = ruleForm.password;

      if (value === "") {
        callback(new Error("请输入密码（必须包含数字和字母）"));
      } else if (validatepwd(value)) {
        callback(new Error("密码长度为6-20内（必须包含数字和字母）"));
      } else {
        callback();
      }
    };
    //重复密码验证
    let validatepsds = (rule, value, callback) => {
      //登录界面不用验证
      if (model.value === "login") {
        callback();
      }
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;

      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    //验证码
    let checkcap = (rule, value, callback) => {
      //过滤特殊字符
      ruleForm.cap = stripscript(value);
      value = ruleForm.cap;
      if (value === "") {
        return callback(new Error("验证码不能为空"));
      } else if (validcap(value)) {
        return callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    //声明数据`````````````````````````````````````````````````

    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);

    //显示重复密码
    const model = ref("login");

    //验证码状态
    const capBtnStatus = reactive({
      status: false,
      text: "验证码"
    });
    //倒计时
    const timer = ref(null);

    //登录状态
    const loginButtonStatus = ref(true);

    //表单绑定数据
    const ruleForm = reactive({
      email: "",
      password: "",
      passwords: "",
      cap: ""
    });

    //表单验证
    const rules = reactive({
      email: [{ validator: validateEmail, trigger: "blur" }],
      password: [{ validator: validatepsd, trigger: "blur" }],
      passwords: [{ validator: validatepsds, trigger: "blur" }],
      cap: [{ validator: checkcap, trigger: "blur" }]
    });

    //声明函数
    const toggleMenu = data => {
      // console.log(data)
      menuTab.forEach(elem => {
        elem.current = false;
      });
      data.current = true;
      model.value = data.type;

      //重置表单
      refs.ruleForm.resetFields();
      clearCountDown();
    };

    //更新按钮状态
    const updateBtnStatus = params => {
      capBtnStatus.status = params.status;
      capBtnStatus.text = params.text;
    };

    /*获取验证码*/
    const getSms = () => {
      // 验证邮箱空值
      if (ruleForm.email == "") {
        root.$message.error("邮箱不能为空！");
        return false;
      }

      // 验证邮箱格式
      if (validateE(ruleForm.email)) {
        root.$message.error("邮箱格式有误！");
        return false;
      }

      //获取验证码
      let requestData = {
        username: ruleForm.email,
        module: model.value
      };
      //改变验证码状态
      updateBtnStatus({
        status: true,
        text: "发送中"
      });

      GetSms(requestData)
        .then(response => {
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          //启用登录及注册按钮
          loginButtonStatus.value = false;
          //重新验证码倒计时
          countDown(5);
        })
        .catch(error => {
          console.log(error);
        });
    };

    /*提交表单`````````````````````````````````````````````````````````````````````````*/
    const submitForm = formName => {
      // //模拟注册成功
      // toggleMenu(menuTab[0])
      // clearCountDown()

      // return false
      refs[formName].validate(valid => {
        if (valid) {
          //验证通过，再判断是在注册页还是登录页
          model.value === "login" ? login() : register();
        } else {
          console.log(valid);
          console.log("error submit!!");
          return false;
        }
      });
    };

    //登录
    const login = (() => {
      let requestData = {
        username: ruleForm.email,
        password: sha1(ruleForm.password),
        code: ruleForm.cap,
        module: "login"
      };
      root.$store.dispatch("app/login",requestData)
      // Login(requestData)
        .then(response => {
          console.log(response + "login...登录成功");
          root.$router.push({
            name: "Console"
          });
        })
        .catch(error => {
          // console.log(error);
        });
    })

    //注册
    const register = () => {
      let requestData = {
        username: ruleForm.email,
        password: sha1(ruleForm.password),
        code: ruleForm.cap,
        module: "register"
      };
      Register(requestData)
        .then(response => {
          console.log(response);
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          //注册成功
          toggleMenu(menuTab[0]);
          clearCountDown();
        })
        .catch(error => {
          console.log(error);
        });
    };

    //倒计时方法

    const countDown = number => {
      if (timer.value) {
        clearInterval(timer.value);
      }
      timer.value = setInterval(() => {
        number--;
        if (number === 0) {
          clearInterval(timer.value);
          updateBtnStatus({
            status: false,
            text: "重新获取"
          });
        } else {
          capBtnStatus.text = `已发送 ${number}s`;
        }
      }, 1000);
    };

    /*
      clear倒计时方法
      */
    const clearCountDown = () => {
      //还原验证码按钮
      updateBtnStatus({
        status: false,
        text: "验证码"
      });
      clearInterval(timer.value);

      // const capBtnStatus = reactive(
      //   {
      //     status:false,
      //     text:'验证码'
      //   }
      // )
    };

    // // console.log(menuTab)
    // const model = ref('login')

    //生命周期
    //完成后
    onMounted();

    return {
      menuTab,
      model,
      toggleMenu,
      submitForm,
      ruleForm,
      rules,
      loginButtonStatus,
      capBtnStatus,
      getSms,
      login,
      register,
      updateBtnStatus
    };
  },
  data() {
    return {
      // 表单数据
    };
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
#login {
  background-color: #344a5f;
  height: 100vh;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    font-size: 14px;
    margin-bottom: 3px;

    color: #fff;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
