//路由守卫
import router from "./index.js";
import { getToken } from "@/utils/app";
import { remove } from "cookie_js";
import { removeToken, removeUserName } from "../utils/app.js";
import store from "../store/index";

//设置白名单
const whiteRouter = ["/login"]
router.beforeEach((to,from, next) => {
  // console.log(to)
  //判断用户退出至登录页面
  if(getToken()){
    if(to.path === "/login"){
      removeToken()
      removeUserName()
      store.commit("app/SET_TOKEN",'');
      store.commit("app/SET_USERNAME",'');

      next()
    }else{
      next()
    }


    console.log("exist")
  }else{
    console.log("not exist")
    if(whiteRouter.indexOf(to.path) !== -1){
      next() 
    }else{
      next("/login")
    }
    // next("/login")
  }
  // console.log(to)
  // console.log(from)
  // console.log(next)
  // next()
})