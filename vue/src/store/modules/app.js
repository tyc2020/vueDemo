import { Login } from "@/api/login";
import { setToken } from "@/utils/app";
const state = {
    //获取传入的值
    isCollapse:JSON.parse(sessionStorage.getItem("isCollapse")) ||false,
    to_ken:"",
    username:"" 
}
const getters = { //computed
  isCollapse: state => state.isCollapse //parse
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
  SET_USERNMAE(state,value){
    state.username = value
  }
}

const actions = { //回调处理事情
  login(content,requestData){
    return new Promise((resolve,reject) => {
      Login(requestData)
      .then(response => {
        let data = response.data.data
        // console.log(response)
        console.log(data.token)
        content.comit("SET_TOKEN",data.token)
        content.comit("SET_USERNMAE",data.username)
        setToken(data.token)

        resolve()
      })
      .catch(error => {
        reject()
      });
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