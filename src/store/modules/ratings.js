import axios from 'axios'
export default {
    state: {
        ratings: [],
        userRecipeRating: [],
        count: 0,
        countUserRecipeRating: 0
    },
    getters: {
        getRatings: state => state.ratings,
        getCount: state => state.count,
        getUserRecipeCount: state => state.countUserRecipeRating,
        getUserRecipeRating: state => state.userRecipeRating
    },
    actions: {
        getRatingsByRecipeId ({commit}, id) {
            axios.post('countRating', {id: id})
            .then(data => {
                commit('getRatingMutation', data.data)
            })
            .catch(err => {
            })
        },
        addRating({commit}, payload) {
            axios.post('addRating', payload)
            .then(data => {
                commit('addRatingMutation', data.data)
            })
            .catch(err => {
            })
        },
        getRatingByUserIdRecipeId({commit}, payload) {
            axios.post('getRatingByUserIdRecipeId', payload)
            .then(data => {
                commit('ratingByUserIdRecipeId', data.data)
            })
            .catch(err => {
            })
        },
        deleteRatingById({commit}, id) {
                axios.post('deleteRating', {id: id})
                .then(data => {
                    commit('ratingDeleted', id)
                })
                .catch(err => {
                })
        }
    },
    mutations: {
        getRatingMutation(state, response) {
            state.ratings = response
            // state.count = Object.keys(response).length
            state.count = response.length
        },
        addRatingMutation(state, response) {
            state.ratings.push(response)
            state.count++
        },
        ratingByUserIdRecipeId(state, response) {
            state.countUserRecipeRating = response.length
            state.userRecipeRating = response
        },
        ratingDeleted(state, id) {
            state.ratings = state.ratings.filter(todo => todo.id !== id)
            state.count--
            state.countUserRecipeRating--
            state.userRecipeRating = []
        }
    },
}