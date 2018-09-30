import Vue from "vue";
import VueRouter from "vue-router";
//import Home from './containers/Home.vue'
const Home = () => import("@/containers/Home");
const CadastroCliente = () => import("@/components/CadastroCliente");
const Clientes = () => import("@/components/Clientes");
const TimeLine = () => import("@/components/TimeLine");
const CteNovo = () => import("@/components/CteNovo");

Vue.use(VueRouter);
//Vue.component(Home);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      redirect: "/timeline",
      children: [
        {
          path: "/timeline",
          name: "TimeLine",
          component: TimeLine
        },
        {
          path: "/cte/novo",
          name: "CteNovo",
          component: CteNovo
        },
        {
          path: "/cadastros/cliente",
          name: "CadastroCliente",
          component: CadastroCliente
        },
        {
          path: "/cadastros/clientes",
          name: "Clientes",
          component: Clientes
        }
      ]
    }
  ]
});
