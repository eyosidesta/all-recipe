<template>
    <v-main>
        <v-container>
            <h1>My Favorites</h1>
            <v-row>
                <v-col
                v-for="(favorite, index) in myFavorites"
                :key="index"
                cols="12"
                md="4"
                sm="4">
                    <v-card
                        class="mx-auto"
                        max-width="344"
                    >
                        <v-img
                        :src="favorite.recipe.image"
                        height="200px"
                        ></v-img>

                        <v-card-title>
                        {{favorite.recipe.name}}
                        </v-card-title>

                        <v-card-subtitle>
                        posted by {{favorite.recipe.user.fullname}}
                        </v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name: "MyFavorites",
    methods: {
        ...mapActions(['getMyFavorites'])
    },
    computed: {
        ...mapGetters(['myFavorites'])
    },
    created() {
        this.loggedInUser = JSON.parse(localStorage.getItem('authUser'))
        this.getMyFavorites({id: parseInt(this.loggedInUser[0].id)})
        console.log("my favorite data is: ", this.myFavorites)
    },
    data: () => ({
        loggedInUser: '',
    }),

}
</script>