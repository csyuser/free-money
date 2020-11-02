import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import Verify from '../components/Verify.vue'
import DiaryList from '../views/DiaryList.vue'
import Label from '../views/Label.vue'
import Add from '../views/Add.vue'
import Statistics from '../views/Statistics.vue'
import User from '../views/User.vue'
import DiaryContent from '../components/DiaryContent.vue'



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
  {
    path: '/diaryList',
    name: 'DiaryList',
    component: DiaryList
  },
  {
    path: '/label',
    name: 'Label',
    component: Label
  },
  {
    path: '/add',
    name: 'Add',
    component: Add
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/diaryContent/:diaryId',
    name: 'DiaryContent',
    component: DiaryContent
  },
]

const router = new VueRouter({
  routes
})

export default router
