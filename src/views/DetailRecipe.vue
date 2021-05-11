<template>
    <v-main>
        <v-container>
            <h1>{{getRecipeById.name}} and {{getUserRecipeCount}}</h1>
            <v-container>
                <v-row
                
                dense
                >
                    <v-col
                    class="pa-2"
                    md="2">
                        <v-rating
                        :value="getCount/2"
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
                        <div v-if="getUserRecipeCount === 0">
                            <a @click="rateRecipe(loggedInUser[0].id, getRecipeById.id)">rate this recipe</a>
                        </div>
                        <div v-else>
                            <a @click="deleteRating(getUserRecipeRating[0].id)">dislike recipe</a>
                        </div>
                    </v-col>
                    <v-col>
                        <div v-if="getRatings.length > 0">
                            <div v-if="getRatings.length === 1">
                                <a @click="dialog = true">
                                    {{getRatings[0].user.fullname.split(' ')[0]}} like this
                                </a>
                            </div>
                            <div v-else>
                                <a @click="dialog = true">
                                    {{getRatings[0].user.fullname.split(' ')[0]}} and others like this
                                </a>
                            </div>
                        </div>
                        <!-- <v-row
                        justify="center">
                        
                        </v-row> -->
                        <v-dialog
                        v-model="dialog"
                        max-width="400px">
                        <v-card>
                            <v-card-title>
                            <span class="headline">users rated your recipe</span>
                            </v-card-title>
                            <div v-if="getRatings.length > 0">
                                <v-container v-for="(rating, index) in getRatings" :key="index">
                                    <v-row>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                        >
                                            <v-card-text>
                                                {{rating.user.fullname}}
                                            </v-card-text>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                        >
                                        <v-card-actions>
                                            <v-btn @click="addFriend">
                                                Add Friend
                                            </v-btn>
                                        </v-card-actions>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </div>
                        <div v-else>
                            <v-card-text>No one liked this recipe yet</v-card-text>
                        </div>
                    </v-card>
                </v-dialog>
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
                        <v-img max-width="500px" :src="getRecipeById.image"/>
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
                    md="4">
                        <div v-if="getUserMadeIt">
                            <v-btn v-if="loggedInUser[0].id !== getRecipeById.user_id" 
                            class="red"
                            text
                            @click="ImNotMadeIt(getUserMadeItData[0].id)">I'm not made It</v-btn>
                        </div>
                        <div v-else>
                            <v-btn v-if="loggedInUser[0].id !== getRecipeById.user_id" 
                            class="primary"
                            text
                            @click="IMadeIt(loggedInUser[0].id, getRecipeById.id)">I made It</v-btn>
                        </div>
                    </v-col>
                    <v-col>
                        <div v-if="isUserFavorite">
                            <v-btn v-if="loggedInUser[0].id !== getRecipeById.user_id" 
                            class="red"
                            text
                            @click="removeMyFavorite(userFavorite[0].id)"
                            >Remove From Favorite</v-btn>
                        </div>
                        <div v-else>
                            <v-btn v-if="loggedInUser[0].id !== getRecipeById.user_id" 
                            class="primary"
                            text
                            @click="addMyFavorite(loggedInUser[0].id, getRecipeById.id)"
                            >My Favorite</v-btn>
                        </div>
                    </v-col>
                    
                </v-row>
            </v-container>
            <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                :top="true"
            >
                {{snackbarText}}
            </v-snackbar>
        </v-container>
    </v-main>
</template>
<script> 
import { mapActions, mapGetters } from 'vuex'
export default {
    name: "DetailRecipe",
    data: () => ({
        isImadeItClicked: 0,
        isIMadeItNotClicked: 0,
        dialog: false,
        snackbarText: '',
        snackbar: false,
        errSnackbar: false,
        timeout: 3000,
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
    }),
    methods: {
        addFriend() {
            console.log({"message" : "add friend is not done yet"})
        },
        ...mapActions(['getRecipeByIdAction', 
        'getIngredientByRecipeId', 'getRatingsByRecipeId', 
        'getRatingByUserIdRecipeId', 'getUserIMadeIt', 'getUserFavorite']),
        IMadeIt(user_id, recipe_id) {
            this.isImadeItClicked = this.isImadeItClicked + 1
            this.$store.dispatch('addIMadeIt', {user_id: user_id, recipe_id: recipe_id})
            .then(success => {
                // this.getUserIMadeIt({user_id: user_id,
                // recipe_id: recipe_id})
                // this.getUserIMadeIt({user_id: parseInt(this.loggedInUser[0].id),
                //     recipe_id: parseInt(this.id)})
                this.snackbarText = "sucessfully added to my I Made It recipe"
                this.snackbar = true
            })
            .catch(err => {
                // this.snackbar = true
            })
        },
        ImNotMadeIt(id) {
            this.isIMadeItNotClicked = this.isIMadeItNotClicked + 1
            console.log("usermadeitidis", id)
            this.$store.dispatch('deleteIMadeIt', id)
            .then(sucess => {
                // this.getUserIMadeIt({user_id: parseInt(this.loggedInUser[0].id),
                // recipe_id: parseInt(this.id)})
                this.snackbarText = "successfully removed from my I made it recipe"
                this.snackbar = true
                // this.getUserIMadeIt({user_id: parseInt(this.loggedInUser[0].id),
                // recipe_id: parseInt(this.id)})
            })
            .catch(err => {
                this.snackbarText = "something went wrong. please try again"
                this.snackbar = true
            })
        },
        addMyFavorite(user_id, recipe_id) {
            this.$store.dispatch('addMyFavorite', {user_id: user_id, recipe_id: recipe_id})
            .then(success => {
                this.snackbarText = "successfully added to my Favorite recipe"
                this.snackbar = true
            })
            .catch(err => {
                console.log({'err': 'something went wrong'})
            })
        },
        removeMyFavorite(id) {
            this.$store.dispatch('deleteMyFavorite', id)
            .then(success => {
                this.snackbar = true
                this.snackbarText = "successfully removed from my favorite recipe"
            })
        },
        rateRecipe(user_id, recipe_id) {
            this.$store.dispatch('addRating', {user_id: user_id, recipe_id: recipe_id})
            .then(success => {
                // this.getRatingByUserIdRecipeId({user_id: user_id, recipe_id: recipe_id})
            })
            .catch(err => {
                console.log({'err': 'something went wrong'})
            })
        },
        deleteRating(id) {
            this.$store.dispatch('deleteRatingById', id)
            .then(success => {
                console.log('successfull deleted')
            })
            .catch(err => {
                console.log({'err': 'something went wrong'})
            })
        }
    },
    computed: {
        ...mapGetters(['getRecipeById', 'getRecipeIng', 
        'getMyFavorites', 'getCount', 
        'getRatings', 'getUserRecipeCount',
        'getUserRecipeRating', 'getUserMadeIt',
        'getUserMadeItData',
        'isUserFavorite', 'userFavorite'])
    },
    watch: {
        isImadeItClicked: function() {
            console.log('gete eski benatish', this.isImadeItClicked)
            this.getUserIMadeIt({user_id: parseInt(this.loggedInUser[0].id),
            recipe_id: parseInt(this.id)})
        },
        isIMadeItNotClicked: function() {
            console.log('not gete eski benatish', this.isImadeItNotClicked)
            this.getUserIMadeIt({user_id: parseInt(this.loggedInUser[0].id),
            recipe_id: parseInt(this.id)})
        }
        // console.log('updated lifecycle')
        // console.log("recipe idm", parseInt(this.id), 'user idm', parseInt(this.loggedInUser[0].id))
        // let val2: this.getRatingByUserIdRecipeId({user_id: parseInt(this.loggedInUser[0].id),
        //                                 recipe_id: parseInt(this.id)})
        // let val = this.getUserIMadeIt({user_id: parseInt(this.loggedInUser[0].id),
        // recipe_id: parseInt(this.id)})
        // this.getUserFavorite({user_id: parseInt(this.loggedInUser[0].id),
        // recipe_id: parseInt(this.id)})
    },
    created() {
        this.loggedInUser = JSON.parse(localStorage.getItem('authUser'))
        this.id = this.$route.params.id
        
        this.getRecipeByIdAction({id: parseInt(this.id)})
        this.getIngredientByRecipeId({id: parseInt(this.id)})
        this.getRatingsByRecipeId(parseInt(this.id))
        this.getRatingByUserIdRecipeId({user_id: parseInt(this.loggedInUser[0].id),
                                        recipe_id: parseInt(this.id)})
        this.getUserIMadeIt({user_id: parseInt(this.loggedInUser[0].id),
        recipe_id: parseInt(this.id)})
        this.getUserFavorite({user_id: parseInt(this.loggedInUser[0].id),
        recipe_id: parseInt(this.id)})
        
    },
    beforeUpdate() {
        // console.log('updated lifecycle')
        // console.log("recipe idm", parseInt(this.id), 'user idm', parseInt(this.loggedInUser[0].id))
        // this.getRatingByUserIdRecipeId({user_id: parseInt(this.loggedInUser[0].id),
        //                                 recipe_id: parseInt(this.id)})
        // this.getUserIMadeIt({user_id: parseInt(this.loggedInUser[0].id),
        // recipe_id: parseInt(this.id)})
        // this.getUserFavorite({user_id: parseInt(this.loggedInUser[0].id),
        // recipe_id: parseInt(this.id)})
    },
    updated() {
        // console.log('updated lifecycle')
        // console.log("recipe idm", parseInt(this.id), 'user idm', parseInt(this.loggedInUser[0].id))
        // this.getRatingByUserIdRecipeId({user_id: parseInt(this.loggedInUser[0].id),
        //                                 recipe_id: parseInt(this.id)})
        // this.getUserIMadeIt({user_id: parseInt(this.loggedInUser[0].id),
        // recipe_id: parseInt(this.id)})
        // this.getUserFavorite({user_id: parseInt(this.loggedInUser[0].id),
        // recipe_id: parseInt(this.id)})
    }
}
</script>