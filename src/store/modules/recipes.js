import firebase, {database} from 'firebase'
import axios from 'axios'
import users from './users'

export default {
    state: {
        recipes: [],
        token: JSON.parse(localStorage.getItem('authUser')) || '',
        myRecipe: [],
        recipeById: {},
        countAllRecipes: 0,
        countMyRecipe: 0,
    },
    getters: {
        allRecipes: state => state.recipes,
        myRecipe: state => state.myRecipe,
        getToken: state => state.token,
        getRecipeById: state => state.recipeById,
        getCountAllRecipe: state => state.countAllRecipes,
        getMyCount: state => state.countMyRecipe
    },
    actions: {
         getRecipes ({commit, getters}) {
            return new Promise((resolve, reject) => {
                 axios.post('getRecipes',{})
                .then((data) => {
                    
                    console.log("all data is ", data.data)
                    const countRec = Object.keys(data.data).length
                    console.log("count please", countRec)
                    commit('setRecipes', data.data, countRec)
                    console.log("now getter val length", getters.getCountAllRecipe)
                })
                .catch(err => {
                    console.log("!Ooops something went wrong!", err)
                })
            })
            
        },
        getRecipeByIdAction: ({commit, getters}, payload) => {
            return new Promise((resolve, reject) => {
                axios.post('getRecipeById', payload)
                .then(data => {
                    
                    commit('setRecipeById', data.data)
                    console.log("recipe by id", getters.getRecipeById)
                    resolve(data.data)
                })
                .catch(err => {
                    console.log('oops something went wrong!', err)
                    reject(err)
                })
            })
        },
        getMyRecipe: ({commit, getters}, id) => {
            return new Promise((resolve, reject) => {
                axios.post('getRecipeByUserId', {id: id})
                .then(data => {
                    let countAllRec = Object.keys(data.data).length
                    console.log("count my recipe", countAllRec)
                    commit('setMyRecipe', data.data, countAllRec)
                    resolve(data)
                })
                .catch(err => {
                    console.log({'err': '!oops something went wrong'})
                    reject(err)
                })
            })
        },
        addRecipe: ({commit, getters}, payload) => {
            const recipe = {
                name: payload.name,
                description: payload.description
            }
            let imageUrl
            let key
            firebase.database().ref('recipes').push(recipe)
            .then((data) => {
                key = data.key
                return key;
            })
            .then(key => {
                const fileName = payload.image.name
                const ext = fileName.slice(fileName.lastIndexOf('.'))
                return firebase.storage().ref('recipes/'+ key + '' + ext).put(payload.image)
            })
            .then(snapshot => {
                return new Promise((resolve, reject) => {
                  snapshot.ref.getDownloadURL().then(url => {
                    snapshot.downloadURL = url
                    resolve(snapshot)
                  })
                })
              })
            .then(fileData => {
                console.log("fileddddddddddddddd", fileData.metadata)
                imageUrl = fileData.downloadURL
                console.log("url isssssssssssss", imageUrl)
                return firebase.database().ref('recipes').child(key).update({imageUrl: imageUrl})
            })
            .then(() => {
                return new Promise((resolve, reject) => {
                    axios.post('/addRecipe', {name: payload.name,
                        description: payload.description, image: imageUrl, user_id: getters.getToken[0].id})
                        .then(data => {
                            if(data.status === 200) {
                                console.log("sucessfully added to hasura database--amaizing grace", data.data)
                                commit('newRecipe', data.data)
                                
                                resolve(true)
                            }
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
                
            })
            .catch((err) => {
                console.log("error is: ", err)
            })
        }
    },
    mutations: {
        setRecipes: (state, recipes, countRec) => {
            state.recipes = recipes,
            state.countAllRecipes = countRec
        },
        newRecipe: (state, recipe) => {state.recipes.push(recipe)},
        setMyRecipe: (state, recipes, countMyRec) => {
            state.myRecipe = recipes,
            state.countMyRecipe = countMyRec},
        setRecipeById: (state, recipe) => {state.recipeById = recipe},

    }
}