import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import iView from "iview";
import "iview/dist/styles/iview.css";
import locale from "iview/dist/locale/pt-BR";
import "./assets/css/style.css";
import "bootstrap-nucleus";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTruck,
  faShieldAlt,
  faAsterisk,
  faDollarSign,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTruck, faShieldAlt, faAsterisk, faDollarSign, faUser);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(iView, { locale });
/*Vue.filter("formatarValor", function(valor) {
  return accounting.formatMoney(valor, "R$ ", 2, ".", ",");
});*/

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
