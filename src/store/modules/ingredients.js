import axios from 'axios'

export default {
    state: {
        userIngredient: [],
        recipeIngredient: [],
    },
    getters: {
        getUserIngredient: state => state.userIngredient,
        getRecipeIng: state => state.recipeIngredient
    },
    actions: {
        getIngredientByUserId({commit}, user_id) {
            return new Promise((resolve, reject) => {
                axios.post('getIngredientByUserId', {id: user_id})
                .then(data => {
                    console.log("user ingredient issssss: ",data.data)
                    commit('getUserIngredient', data.data)
                })
            })
        },
        addRecipeIngredient({commit}, payload) {
            return new Promise((resolve, reject) => {
                axios.post('addIngredients', payload)
                .then(data => {
                    commit('addIngredient', data.data)
                    resolve(true)
                })
            })
        },
        getIngredientByRecipeId({commit}, payload) {
            return new Promise((resolve, reject) => {
                axios.post('getRecipeIngredient', payload)
                .then(data => {
                    console.log("byyyyyyyy", data.data)
                    commit('getRecipeIngredient', data.data)
                    resolve(true)
                })
                .catch(err => {
                    reject(err)
                })
            })
        }
    },
    mutations: {
        getUserIngredient: (state, data) => state.userIngredient = data,
        addIngredient: (state, data) => state.userIngredient.unshift(data),
        getRecipeIngredient: (state, data) => state.recipeIngredient = data
    }
}