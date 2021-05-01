import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import users from './modules/users'
import recipes from './modules/recipes'
import comments from './modules/comments'
import ingredients from './modules/ingredients'
import directions from './modules/directions'
import nutritionInfo from './modules/nutritionInfo'
import ratings from './modules/ratings'
import IMadeIt from './modules/IMadeIt'
import favorites from './modules/favorites'

Vue.use(Vuex)

axios.defaults.baseURL="http://localhost:8000/"

export default new Vuex.Store({
  modules: {
    users,
    recipes,
    comments,
    ingredients,
    directions,
    nutritionInfo,
    ratings,
    IMadeIt,
    favorites,
  }
})
