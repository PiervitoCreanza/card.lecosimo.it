import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import ('../views/Home.vue')
const Login = () => import('../views/Login.vue')
const UserHome = () => import('../views/UserHome.vue')
const ViewCard = () => import('../views/ViewCard.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
        title: "Home"
    }
  },
  {
    path: '/user',
    name: 'User',
    component: UserHome,
    meta: {
        requiresAuth: true,
        title: "Dashboard"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
    title: "Accedi"
    }
  },
  {
      path: '/viewcard/:id',
      name: 'Visualizza Carta',
      component: ViewCard,
      meta: {
        requiresAuth: true,
        title: 'Visualizza Carta'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
