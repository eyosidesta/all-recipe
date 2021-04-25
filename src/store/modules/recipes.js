import firebase, {database} from 'firebase'

export default {
    state: {

    },
    getters: {

    },
    actions: {
        addRecipe: ({commit}, payload) => {
            const recipe = {
                name: payload.name,
                description: payload.description
            }
            let imageUrl
            let key
            firebase.database().ref('recipes').push(recipe)
            .then((data) => {
                key = data.key
                console.log('and key is: ', key)
                console.log("data is: ", data)
                return key;
            })
            .then(key => {
                const fileName = payload.image.name
                const ext = fileName.slice(fileName.lastIndexOf('.'))
                console.log("image payloaddddddd", payload.image)
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

            })
            .catch((err) => {
                console.log("error is: ", err)
            })
            console.log("------------------")
            console.log("last line")
        }
    },
    mutations: {

    }
}