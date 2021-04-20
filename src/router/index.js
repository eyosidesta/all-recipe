import Vue from 'vue'
import VueRouter from 'vue-router'
import RegistrationLoginForm from '../components/RegistrationLoginForm.vue'
import Login from '../components/Login.vue'
// import Home from '../views/Home.Vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'registrationLoginForm',
    component: RegistrationLoginForm
  },
  {
    path: '/home',
    name: 'Home',
    // component: Home,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Home.vue')
  },
  {
    path: "/login",
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
