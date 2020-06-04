import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import login from '../views/login'
import register from '../views/register'
import wishList from '../views/wishlist'
import history from '../views/history'
import topup from '../views/topup'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: home
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: wishList
  },
  {
    path: '/history',
    name: 'history',
    component: history
  },
  {
    path: '/topup',
    name: 'topup',
    component: topup
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
