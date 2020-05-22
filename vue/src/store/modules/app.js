import { Login } from "@/api/login";
import { setUserName, getUserName, setToken, removeToken, removeUserName } from "@/utils/app";
const state = {
    //获取传入的值
    isCollapse:JSON.parse(sessionStorage.getItem("isCollapse")) ||false,
    to_ken:"",
    username: getUserName() || ''
}
const getters = { //computed
  isCollapse: state => state.isCollapse //parse
  // username: state => state.username
}
const mutations = {
  SET_COLLAPSE(state){
    state.isCollapse = !state.isCollapse
    //html5本地存储
    sessionStorage.setItem("isCollapse",JSON.stringify(state.isCollapse))
  },
  SET_TOKEN(state,value){
    state.to_ken = value
  },
  SET_USERNAME(state,value){
    state.username = value
  },
  REMOVE_TOKEN(state){
    state.to_ken = ''
  }
}

const actions = { //回调处理事情
  //登录操作
  login(content, requestData){
    return new Promise((resolve,reject) => {
      Login(requestData)
      .then(response => {
        let data = response.data.data
        // console.log(response)
        content.commit("SET_TOKEN",data.token)
        content.commit("SET_USERNAME",data.username)
        setToken(data.token)
        setUserName(data.username)


        resolve()
      })
      .catch(error => {
        reject()
      });
    })
  },

  //退出操作
  exit({ commit }){
    return new Promise((resolve,reject) => {
      removeToken();
      removeUserName();
      commit("SET_TOKEN",'');
      commit("SET_USERNAME",'');
      resolve();
    })

  }
}


export default {
  namespaced:true,
  state,
  getters,
  actions,
  mutations
};