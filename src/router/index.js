import { createRouter, createWebHistory } from "vue-router";
import { store } from "@/store";
const Home = () => import("../views/Home.vue");
const Login = () => import("../views/Login.vue");
const HomeUser = () => import("../views/HomeUser.vue");
const ViewCard = () => import("../views/ViewCard.vue");
const Esercenti = () => import("@/views/Esercenti.vue");
const HomeEsercenti = () => import("@/views/HomeEsercenti.vue");

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
    path: "/esercenti",
    name: "Esercenti",
    component: Esercenti,
  },
  {
    path: "/home-esercenti",
    name: "RetailerHome",
    component: HomeEsercenti,
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

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
    ? `${to.meta.title} - De Giorgi's Card`
    : "De Giorgi's Card";
  next();
});
/*
router.afterEach((to, from, next) => {
  const redirectWhenLoggedIn = to.matched.some(
    (x) => x.meta.redirectWhenLoggedIn
  );
  if (redirectWhenLoggedIn && store.getters.isUserAuth) {
    console.log(store.getters.isUserRetailer);
    next({ name: store.getters.isUserRetailer ? "/UserHome" : "RetailerHome" });
  } else {
    next();
  }
});*/
