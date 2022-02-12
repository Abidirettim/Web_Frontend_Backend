import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import See_Posts from "../views/See_Posts.vue"
import New_Posts from "../views/New_Posts.vue"
import NotFound from "../views/404NotFound.vue"

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/notfound',
    name: '404NotFound',
    component: NotFound,
  },
  {
    path: '/see_posts',
    name: 'See_Posts',
    component: See_Posts,
  },
  {
    path: '/new_posts',
    name: 'New_Posts',
    component: New_Posts,
  },
  {
    path: '/:catchAll(.*)',
    redirect: 'NotFound',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
