import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

axios.defaults.baseURL="http://localhost:8000/"

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    Login({commit}, payload)  {
      return new Promise((resolve, reject) => {
        axios.post('getLogin', payload)
        .then((data, status) => {
          if(status === 200) {
            resolve(true);
          }
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    SignIn({commit}, payload) {
      return new Promise((resolve, reject) => {
        axios.post('signUp', payload)
        .then((data, status) => {
          if(status === 201) {
            resolve(true)
          }
        })
        .catch(err => {
          reject(err)
        })
      })
    }
  },
  modules: {
  }
})
