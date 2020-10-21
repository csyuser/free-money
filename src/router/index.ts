import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import Verify from '../components/Verify.vue'


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'SignUp',
    component: SignUp
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/verify',
    name: 'Verify',
    component: Verify
  },
]

const router = new VueRouter({
  routes
})

export default router
