import Vue from 'vue'
import VueRouter from 'vue-router'
import RegistrationLoginForm from '../components/RegistrationLoginForm.vue'
import AddRecipe from "../components/AddRecipe.vue"
import Login from '../components/Login.vue'
// import Home from '../views/Home.Vue'
import {mapGetters} from 'vuex'
import store from "../store"

Vue.use(VueRouter)


const routes = [
  {
    path: '/login',
    name: 'registrationLoginForm',
    component: RegistrationLoginForm,
  },
  {
    path: '/',
    name: 'Home',
    // component: Home,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Home.vue'),
    beforeEnter: (to, from, next) => {
      if(store.getters.getAuthenticated === true) {
        next();
      }
      else {
        next("/login")
      }
    }
  },
  {
    path: '/detail-recipe',
    name: 'detail-recipe',
    component: () => import('../views/DetailRecipe.vue'),
    // beforeEnter: (to, from, next) => {
    //   if(store.getters.getAuthenticated === true) {
    //     next()
    //   }
    //   else {
    //     next('/login')
    //   }
    // }
  },
  {
    path: '/add-recipe',
    name: 'add-recipe',
    component: AddRecipe
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
