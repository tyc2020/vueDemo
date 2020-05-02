import service from "@/utils/request"
/*
获取验证码
*/
export function GetSms(data){
    service.request({
    method:"POST",
    url:"/getSms/",
    data:data
  })
}
/*
  获取用户
*/

/*
登录

*/

/*
注册
*/
