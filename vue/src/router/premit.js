//路由守卫
import router from "./index.js";
import { getToken } from "@/utils/app";

//设置白名单
const whiteRouter = ["./login"]
router.beforeEach((to,from, next) => {
  if(getToken()){
    console.log("exist")
  }else{
    // next("./login")
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