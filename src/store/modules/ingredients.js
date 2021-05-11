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
            axios.post('getIngredientByUserId', {id: user_id})
            .then(data => {
                commit('getUserIngredient', data.data)
            })
            .catch(err=>{})
        },
        addRecipeIngredient({commit}, payload) {
            axios.post('addIngredients', payload)
            .then(data => {
                commit('addIngredient', data.data)
            })
            .catch(err => {})
        },
        getIngredientByRecipeId({commit}, payload) {
            axios.post('getRecipeIngredient', payload)
            .then(data => {
                commit('getRecipeIngredient', data.data)
            })
            .catch(err => {
            })
        }
    },
    mutations: {
        getUserIngredient: (state, data) => state.userIngredient = data,
        addIngredient: (state, data) => state.userIngredient.unshift(data),
        getRecipeIngredient: (state, data) => state.recipeIngredient = data
    }
}