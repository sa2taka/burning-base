import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Register from "./views/Auth/register.vue";
import Signin from "./views/Auth/signin.vue";
import Todo from "./views/Todo.vue";

import firebase from "@/firebase";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { guest: true }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { guest: true }
    },
    {
      path: "/signin",
      name: "signin",
      component: Signin,
      meta: { guest: true }
    },
    {
      path: "/todo",
      name: "todo",
      component: Todo,
      meta: { auth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const guest = to.matched.some(record => record.meta.guest);
  const auth = to.matched.some(record => record.meta.auth);
  if (!auth && !guest) {
    next();
    return;
  }

  firebase.auth().onAuthStateChanged(user => {
    if (user && auth) {
      next();
    } else if (user && guest) {
      next({
        path: "/todo"
      });
    } else if (!user && guest) {
      next();
    } else if (!user && auth) {
      next({
        path: "/"
      });
    }
  });
});

export default router;
