import cookie from "cookie_js";

const adminToKen = "admin_toKen"
export function getToken() {
  return cookie.get(adminToKen);
}

export function setToken(toKen) {
  cookie.set(adminToKen,toKen)
}