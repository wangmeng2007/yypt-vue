import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/main'
import Login from '../components/login'
import Register from '../components/register'
import Log from '../components/log'
import Users from '../components/users'
import Musics from '../components/musics'
import musicFind from '../components/music-find'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/log',
    name: 'log',
    component: Log
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '/musics',
    name: 'musics',
    component: Musics
  },
  {
    path: '/musicFind',
    name: 'musicFind',
    component: musicFind
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
