// 用于配置路由
import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/Index.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
