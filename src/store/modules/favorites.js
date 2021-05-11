import axios from 'axios'

export default {
    state: {
        my_favorites: [],
        user_favorite: [],
        is_user_favorite: false
    },
    getters: {
        myFavorites: state => state.my_favorites,
        userFavorite: state => state.user_favorite,
        isUserFavorite: state => state.is_user_favorite
    },
    actions: {
        getUserFavorite({commit}, payload) {
            axios.post('/getUserFavorite', payload)
            .then(data => {
                commit('userFavorite', data.data)
            })
            .catch(err => {})
        },
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
        },
        deleteMyFavorite({commit}, id) {
            axios.post('deleteFavorite', {id: id})
            .then(data => {})
            .catch(err => {})
        }
    },
    mutations: {
        setMyFavorite: (state, responses) => state.my_favorites = responses,
        addMyFavoriteRecipe: (state, response) => state.my_favorites.unshift(response),
        userFavorite: (state, response) => {
            if(response.length === 0) {
                state.is_user_favorite = false
            } else {
                state.is_user_favorite = true
                state.user_favorite = response
            }
        }
    }
}