import axios from 'axios'
export default {
    state: {
        ratings: [],
        count: 0,
    },
    getters: {
        getRatings: state => state.ratings,
        getCount: state => state.count
    },
    actions: {
        getRatingsByRecipeId ({commit}, id) {
            console.log("--------------------")
            return new Promise((resolve, reject) => {
                axios.post('countRating', {id: id})
                .then(data => {
                    console.log("------------------------------------------------")
                    console.log('length of rating is ', Object.keys(data.data).length)
                    commit('getRatingMutation', data.data)
                    resolve(data.data)
                })
                .catch(err => {
                    console.log({'err': 'something went wrong'})
                    reject(err)
                })
            })
        },
        addRating({commit}, payload) {
            return new Promise((resolve, reject) => {
                axios.post('addRating', payload)
                .then(data => {
                    console.log('rating data added successfull')
                    commit('addRatingMutation', data.data)
                    resolve(data.data)
                })
                .catch(err => {
                    console.log({'err': 'something went wrong'})
                    reject(err)
                })
            })
        }
    },
    mutations: {
        getRatingMutation(state, response) {
            state.ratings = response
            state.count = Object.keys(response).length
        },
        addRatingMutation(state, response) {
            state.ratings.push(response)
            state.count++
        }
    },
}