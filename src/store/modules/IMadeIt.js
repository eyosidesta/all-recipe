import axios from 'axios'

export default {
    state: {
        i_made_it: []
    },
    getters: {
        getIMadeIt: state => state.i_made_it
    },
    actions: {
        getIMadeItByUserId({commit}, payload) {
            return new Promise((resolve, reject) => {
                axios.post('getIMadeItByUserId', payload)
                .then(data => {
                    commit('setIMadeIt', data.data)
                    resolve(data.data)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        addIMadeIt({commit}, payload) {
            return new Promise((resolve, reject) => {
                axios.post('addIMadeIt', payload)
                .then(data => {
                    console.log("i made it uploaded successfully", data.data)
                    commit('addIMadeItMutation', data.data)
                    resolve(data.data)
                })
                .catch(err => {
                    reject(err)
                })
            })
        }
    },
    mutations: {
        setIMadeIt: (state, response) => state.i_made_it = response,
        addIMadeItMutation: (state, response) => state.i_made_it.unshift(response)
    }
}