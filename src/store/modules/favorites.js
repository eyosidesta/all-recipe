import axios from 'axios'

export default {
    state: {
        my_favorites: [],
    },
    getters: {
        myFavorites: state => state.my_favorites
    },
    actions: {
        getMyFavorites({commit}, payload) {
            axios.post('getMyFavorite', payload)
            .then(data => {
                console.log("my favorite data is ", data.data)
                console.log('type of my axios data is ', typeof data.data)
                commit('setMyFavorite', data.data)
            })
            .catch(err => {
                console.log({'err': 'something went wrong'})
            })
        },
        addMyFavorite({commit}, payload) {
            axios.post('addFavorite', payload)
            .then(data => {
                console.log('added my favorite data is, ', data.data)
                commit('addMyFavoriteRecipe', data.data)
            })
        }
    },
    mutations: {
        setMyFavorite: (state, responses) => state.my_favorites = responses,
        addMyFavoriteRecipe: (state, response) => state.my_favorites.unshift(response)
    }
}