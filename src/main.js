import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import { Loading } from "element-ui";

import "@/style/index.scss";
import store from "./store";
import initAxios from "./utils/axios";

Vue.config.productionTip = false;
Vue.use(Loading);
Vue.use(initAxios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
