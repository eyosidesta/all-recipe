import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import users from './modules/users'
import recipes from './modules/recipes'

Vue.use(Vuex)

axios.defaults.baseURL="http://localhost:8000/"

export default new Vuex.Store({
  modules: {
    users,
    recipes
  }
})
