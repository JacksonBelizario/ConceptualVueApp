import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("@/containers/Home"),
            redirect: "/timeline",
            children: [
                {
                    path: "/timeline",
                    name: "TimeLine",
                    component: () => import("@/components/TimeLine")
                },
                {
                    path: "/cte/novo",
                    name: "CteNovo",
                    component: () => import("@/components/CteNovo")
                },
                {
                    path: "/cadastros/cliente/:id?",
                    name: "CadastroCliente",
                    component: () => import("@/components/CadastroCliente"),
                    props: true
                },
                {
                    path: "/cadastros/clientes",
                    name: "Clientes",
                    component: () => import("@/components/Clientes")
                }
            ]
        },
        {
            path: "/login",
            component: () => import("@/containers/Login")
        }
    ]
});
