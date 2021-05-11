import axios from 'axios'

export default {
    state: {
        i_made_it: [],
        isUserMadeItYet: false,
        userMadeItData: []
    },
    getters: {
        getIMadeIt: state => state.i_made_it,
        getUserMadeIt: state => state.isUserMadeItYet,
        getUserMadeItData: state => state.userMadeItData
    },
    actions: {
        getUserIMadeIt({commit}, payload) {
            axios.post('getUserIMadeIt', payload)
            .then(data => {
                console.log('recipe is found', data)
                commit('userMadeIt', data.data)
            })
            .catch(err => {
                console.log({'err' : 'something went wrong'})
            })
        },
        getIMadeItByUserId({commit}, payload) {
                axios.post('getIMadeItByUserId', payload)
                .then(data => {
                    commit('setIMadeIt', data.data)
                })
                .catch(err => {})
        },
        addIMadeIt({commit}, payload) {
            axios.post('addIMadeIt', payload)
            .then(data => {
                commit('addIMadeItMutation', data.data)
            })
            .catch(err => {})
        },
        deleteIMadeIt({commit}, id) {
            axios.post('deleteIMadeItById', {id: id})
            .then(data => {
                // commit('deletedUserMadeIt', data.data)
            }).
            catch(err => {
                console.log({'err': 'something went wrong'})
            })
        }
    },
    mutations: {
        setIMadeIt: (state, response) => state.i_made_it = response,
        addIMadeItMutation: (state, response) => state.i_made_it.unshift(response),
        userMadeIt: (state, response) => {
            if(response.length === 0) {
                state.isUserMadeItYet = false
            } else {
                state.isUserMadeItYet = true
                state.userMadeItData = response
            }
        },
    }
}