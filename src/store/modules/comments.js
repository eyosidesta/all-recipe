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
            return new Promise((resolve, reject) => {
                axios.post('getCommentByRecipeId', {recipe_id: recipe_id})
                .then(data => {
                    console.log('comments data is', data.data)
                    commit('getRecipeData', data.data)
                    resolve(true)
                })
                .catch(err => {
                    console.log({'err' : 'something went wrong'})
                    reject(err)
                })
            })
        },
        addComment({commit}, payload) {
            return new Promise((resolve, reject) => {
                axios.post('addComment', payload)
                .then(data => {
                    console.log("comment data is ", data.data)
                    commit('setComment', data.data)
                    resolve(true)
                })
                .catch(err => {
                    console.log({'err' : 'something went wrong'})
                    reject(err)
                })
            })
        }
    },
    mutations: {
        setComment: (state, response) => state.comments.push(response),
        getRecipeData: (state, response) => state.comments = response
    }
}