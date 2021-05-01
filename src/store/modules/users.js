import axios from 'axios'

export default {
    state: {
        userAuthData: localStorage.getItem('authUser') || {},
        authenticated: false,
        user: {}
    },
    getters: {
        getAuthenticated: (state) => state.authenticated,
        getUserInfo: (state) => state.userAuthData,
        getUser: (state) => state.user
    },
    actions: {
        SignIn: ({commit, getters},payload) => {
            return new Promise((resolve, reject) => {
                axios.post("getLogin", payload)
                .then((data) => {
                    if(data.status === 200) {
                        const newData = {...data.data}
                        const user = {...newData[0]}
                        localStorage.setItem('authUser', JSON.stringify(newData))
                        // axios.defaults.headers.common = {'Content-Type': 'application/json','authHeader':'Bearer ' + newData.token}
                        commit('authenticated', newData, user, true)
                        resolve(data.data)
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
                .then((data) => {
                    if(data.status === 201) {
                        resolve(data.data)
                    }
                })
                .catch(err => {
                    reject(err)
                }) 
            })
        },
        isAuthenticated: ({commit}) => {
            if(localStorage.getItem('authUser')) {
                console.log("user is authenticated")
                commit('userAuthenticated', true)
            } else {
                commit('userAuthenticated', false)
            }
        },
        logout: ({commit}) => {
            localStorage.removeItem('authUser')
            // commit('userAuthenticated', false)
        }
    },
    mutations: {
        authenticated (state, userInfo, user, isTrue) {
            state.userAuthData = userInfo
            state.user = user,
            state.authenticated = isTrue
        },
        userAuthenticated(state, authenticated) {
            state.authenticated = authenticated
        }

    },

}