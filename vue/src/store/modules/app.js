
const state = {
    //获取传入的值
    isCollapse:JSON.parse(sessionStorage.getItem("isCollapse")) ||false
}
const getters = { //computed
  isCollapse: state => state.isCollapse //parse
}
const mutations = {
  SET_COLLAPSE(state){
    state.isCollapse = !state.isCollapse
    //html5本地存储
    sessionStorage.setItem("isCollapse",JSON.stringify(state.isCollapse))
  }
}

const actions = {
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


export default {
  namespaced:true,
  state,
  getters,
  actions,
  mutations
};