import Vue from "vue";
import Vuex from "vuex";
import Cookie from "cookie_js";
import { Login } from "@/api/login";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //获取传入的值
    isCollapse:JSON.parse(sessionStorage.getItem("isCollapse")) ||false
  },
  getters: { //computed
    isCollapse: state => state.isCollapse //parse
  },
  mutations: {
    SET_COLLAPSE(state){
      state.isCollapse = !state.isCollapse
      //html5本地存储
      sessionStorage.setItem("isCollapse",JSON.stringify(state.isCollapse))
    }
  },
  actions: {
    login(content,requestData){
      return new Promise((resolve,reject) => {
        Login(requestData)
        .then(response => {
          resolve()
        })
        .catch(error => {
          reject()
        });
      })
    }
  }
})