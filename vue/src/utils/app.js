import cookie from "cookie_js";

export function getToken() {
  return cookie.get("admin_token");
}