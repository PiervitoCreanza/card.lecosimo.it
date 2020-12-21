import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/bootstrap.min.css'
import './assets/css/global.scss'
import { auth } from './assets/js/firebase'

createApp(App).use(router).mount('#app')


router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    if (requiresAuth && !await auth.getCurrentUser()) {
        next({path: '/login', query: {redirect: to.fullPath}})
    } else {
        next()
    }   
})

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} - De Giorgi's Card` || 'De Giorgi\'s Card'
    next();
  });