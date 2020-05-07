import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./icons";
Vue.use(ElementUI);

import VueCompositionApi from "@vue/composition-api";

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;
//runtime运行模式
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
