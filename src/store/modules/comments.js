import axios from 'axios'

export default {
    state: {
        comments: []
    },
    getters: {
        getComments: state => state.comments
    },
    actions: {
        getCommentByRecipeId({commit}, recipe_id) {
            axios.post('getCommentByRecipeId', {recipe_id: recipe_id})
            .then(data => {
                console.log('comments data is', data.data)
                commit('getRecipeData', data.data)
            })
            .catch(err => {
            })
        },
        addComment({commit}, payload) {
            axios.post('addComment', payload)
            .then(data => {
                console.log("comment data is ", data.data)
                commit('setComment', data.data)
            })
            .catch(err => {
            })
        }
    },
    mutations: {
        setComment: (state, response) => state.comments.unshift(response),
        getRecipeData: (state, response) => state.comments = response
    }
}