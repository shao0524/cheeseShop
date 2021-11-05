// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import "bootstrap";
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate";
import TW from "vee-validate/dist/locale/zh_TW.json";
import { required, email } from "vee-validate/dist/rules";
import Aos from "aos";
import "aos/dist/aos.css";

import formatTime from "./filters/formatTime";
import currency from "./filters/currency";
import "./bus";
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Aos);
Vue.component("VueLoading", VueLoading);
Vue.filter("formatTime", formatTime);
Vue.filter("currency", currency);
axios.defaults.withCredentials = true;

localize("zh_TW", TW);

extend("required", required);
extend("email", email);

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

new Vue({
  el: "#app",
  router,
  created() {
    Aos.init();
  },
  render: (h) => h(App),
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const url = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(url).then((res) => {
      console.log(res);
      if (res.data.success) {
        next();
      } else {
        //沒有登入的狀態
        next({
          path: "/login",
        });
      }
    });
  } else {
    next();
  }
});
