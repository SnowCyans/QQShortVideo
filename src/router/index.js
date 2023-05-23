// index.js
import { createRouter, createWebHashHistory } from "vue-router";
import home from "../views/home.vue";
import my from "../views/my.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/my",
    name: "my",
    component: my,
    // 路由独享守卫 进入当前路由时触发
    beforeEnter: (to, from, next) => {
      if (to.path === "/my") {
        // 判断是否登录
        if (localStorage.getItem("Qy") === null) {
          // 未登录的话跳转到首页
          next("/");
        } else {
          // 已登录允许路由导航通过
          next();
        }
      }
    },
  },
  {
    path: "/authorHome",
    name: "authorHome",
    component: () => import("../views/author/authorHome.vue"),
  },
  {
    path: "/authorWork",
    name: "authorWork",
    component: () => import("../views/author/authorWork.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
