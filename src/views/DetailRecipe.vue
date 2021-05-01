<template>
    <v-main>
        <v-container>
            <h1>Recipe Title</h1>
            <v-container>
                <v-row
                
                dense
                >
                    <v-col
                    class="pa-2"
                    md="2">
            <v-rating
            :value="ratingVal"
            color="amber"
            dense
            half-increments
            readonly
            size="20">
            </v-rating>
                    </v-col>
                    <v-col
                    class="pa-2"
                    md="2">
                        <div>{{getCount}} Ratings | </div>
                    </v-col>
                    <v-col
                    class="pa-2"
                    md="2">
            <div>
                <a @click="rateRecipe(loggedInUser[0].id, getRecipeById.id)">rate this recipe</a>
            </div>
                    </v-col>
                </v-row>
                <div>
                    {{getRecipeById.description}}
                </div>
                <br/>
                <v-row justify="start">
                    <v-col md="1">
                        <v-avatar
                        class="mb-4"
                        color="grey darken-1"
                        size="44"
                        ></v-avatar>
                    </v-col>
                    <v-col md="4">
                        <div>{{getRecipeById.user.fullname}}</div>
                    </v-col>
                </v-row>
                <v-row
                justify="start"
                >
                    <v-col>
                        <v-img :src="getRecipeById.image"/>
                    </v-col>
                    <v-col>
                        <v-card
                        class="pa-2"
                        outlined
                        title>
                            <v-card-text>
                                <!-- <div class="text--primary" :key="nutrition.id" v-for="nutrition in nutritionInfo"> -->
                                <div class="text--primary">
                                    <p>prep: {{nutritionInfo.prep}} minutes</p>
                                    <p>cook: {{nutritionInfo.cook}} minutes</p>
                                    <p>total: {{nutritionInfo.prep + nutritionInfo.cook}} minutes</p>
                                    <p>serving: {{nutritionInfo.servings}} people</p>
                                    <p>yield: {{nutritionInfo.yield}}</p>
                                    <h2>Nutrition Info</h2>
                                </div>
                                </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <br/>
                <v-row justify="start">
                    <!-- <v-col> -->
                <h2>Ingredients</h2>
                    <!-- </v-col> -->
                    
                </v-row>
                <v-list-item v-for="ingredient in getRecipeIng" :key="ingredient.id">
                    <v-list-item-title>-> {{ingredient.description}}</v-list-item-title>
                </v-list-item>
                <br/>
                <v-row>
                    <v-col
                    md="2">
                        <v-btn v-if="loggedInUser[0].id !== getRecipeById.user_id" 
                        class="primary" 
                        @click="IMadeIt(loggedInUser[0].id, getRecipeById.id)">I made It</v-btn>
                    </v-col>
                    <v-col>
                        <v-btn v-if="loggedInUser[0].id !== getRecipeById.user_id" 
                        class="primary"
                         @click="addMyFavorite(loggedInUser[0].id, getRecipeById.id)">My Favorite</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
    </v-main>
</template>
<script> 
import { mapActions, mapGetters } from 'vuex'
export default {
    name: "DetailRecipe",
    data: () => ({
        loggedInUser: '',
        ratingVal: 0,
        id: 0,
        dialog: false,
        description: '',
        nutritionInfo: {
            id: 1,
            prep: 10,
            cook: 10,
            total: 20,
            servings: 4,
            yield: 4

        },
        ingredients: [
            {
                id: 1,
                description: "1/2 cup of tea"
            },
            {
                id: 2,
                description: "2 spoon of sugar"
            },
            {
                id: 3,
                description: "3 litter oil"
            }
        ]
    }),
    methods: {
        ...mapActions(['getRecipeByIdAction', 'getIngredientByRecipeId', 'getRatingsByRecipeId']),
        IMadeIt(user_id, recipe_id) {
            this.$store.dispatch('addIMadeIt', {user_id: user_id, recipe_id: recipe_id})
        },
        addMyFavorite(user_id, recipe_id) {
            this.$store.dispatch('addMyFavorite', {user_id: user_id, recipe_id: recipe_id})
        },
        rateRecipe(user_id, recipe_id) {
            this.$store.dispatch('addRating', {user_id: user_id, recipe_id: recipe_id})
            location.reload()
            this.ratingVal = parseInt(this.getCount) / 2
        }
    },
    computed: {
        ...mapGetters(['getRecipeById', 'getRecipeIng', 'getMyFavorites', 'getCount'])
    },
    created() {
        this.loggedInUser = JSON.parse(localStorage.getItem('authUser'))
        this.id = this.$route.params.id
        
        this.getRecipeByIdAction({id: parseInt(this.id)})
        this.getIngredientByRecipeId({id: parseInt(this.id)})
        console.log("------------------------", this.id)
        this.getRatingsByRecipeId(parseInt(this.id))
        
    },
}
</script>