import axios from "axios"

export default {
    state: {

    },
    actions: {
        login: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios.post("getLogin", payload)
                .then((data, status) => {
                    if(status === 200) {
                        resolve(true)
                    }
                })
                .catch(err => {
                    reject(err)
                })
            })
        }
    },
    mutations: {

    },

}