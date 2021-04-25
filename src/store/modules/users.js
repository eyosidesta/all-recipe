import axios from 'axios'

export default {
    state: {
        authenticated: false
    },
    getters: {
        getAuthenticated: (state) => state.authenticated
    },
    actions: {
        SignIn: ({commit, getters},payload) => {
            return new Promise((resolve, reject) => {
                axios.post("getLogin", payload)
                .then((data) => {
                    if(data.status === 200) {
                        resolve(true)
                        // this.authenticated = true
                        console.log("ddata", data.data.token)
                        localStorage.setItem('authUser', {data: data.data})
                        commit('authenticated', true)
                        console.log("this.authenticated",getters.getAuthenticated)
                    }
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        SignUp: ({commit}, payload) => {
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
        },
    },
    mutations: {
        authenticated: (state, authenticated) => state.authenticated = authenticated

    },

}