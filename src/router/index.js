import { createRouter, createWebHistory } from "vue-router";
import { store } from "@/store";
const Home = () => import("../views/Home.vue");
const Login = () => import("../views/Login.vue");
const HomeUser = () => import("../views/HomeUser.vue");
const ViewCard = () => import("../views/ViewCard.vue");
const LoginEsercenti = () => import("@/views/LoginEsercenti.vue");
const HomeEsercenti = () => import("@/views/HomeEsercenti.vue");
const Error404 = () => import("@/views/404.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/user",
    name: "UserHome",
    component: HomeUser,
    meta: {
      requiresAuth: true,
      title: "Dashboard",
      forbidRetailer: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Accedi",
    },
  },
  {
    path: "/viewcard/:id",
    name: "ViewCard",
    component: ViewCard,
    meta: {
      /*requiresAuth: true,*/
      title: "Visualizza Carta",
    },
  },
  {
    path: "/LoginEsercenti",
    name: "LoginEsercenti",
    component: LoginEsercenti,
    meta: {
      title: "Accedi",
    },
  },
  {
    path: "/home-esercenti",
    name: "RetailerHome",
    component: HomeEsercenti,
    meta: {
      requiresAuth: true,
      title: "Dashboard",
      forbidUser: true,
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: Error404,
    meta: {
      title: "Errore 404",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  if (requiresAuth && !store.getters.isUserAuth) {
    next({ path: "/login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

router.beforeEach(async (to, from, next) => {
  const forbidRetailer = to.matched.some((x) => x.meta.forbidRetailer);
  const forbidUser = to.matched.some((x) => x.meta.forbidUser);
  if (
    (forbidRetailer && store.getters.isUserRetailer) ||
    (forbidUser && !store.getters.isUserRetailer)
  ) {
    return next({ name: "404" });
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
    ? `${to.meta.title} - De Giorgi's Card`
    : "De Giorgi's Card";
  next();
});
