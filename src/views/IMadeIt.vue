<template>
    <v-main>
        <v-container>
            <h1>I Made It</h1>
        
            <v-container>
            <v-list v-for="(i_made_it, index) in getIMadeIt" :key="index">
                <v-list-item>
                    <h2>Recipe</h2>
                </v-list-item>
                <v-container>
                    <h3>{{i_made_it.recipe.name}}</h3>
                    <p>{{i_made_it.recipe.description}}</p>
                </v-container>
                <v-list-item>
                    <v-row>
                        <!-- <v-col>
                            <h2>Ingredients</h2>
                            <div  v-for="(ingredient, index) in i_made_it.ingredients" :key="index">
                                <p>-> {{ingredient.description}}</p>
                            </div>
                        </v-col> -->
                        <v-col>
                            <h2>Image</h2>
                            <v-img
                                :src="i_made_it.recipe.image"
                                max-height="100"
                                max-width="150"/>
                        </v-col>
                        <v-col>
                            <h2>Nutrition Info</h2>
                            <v-card
                                class="pa-2"
                                outlined
                                title>
                                    <v-card-text>
                                        <!-- <div class="text--primary" :key="nutrition.id" v-for="nutrition in nutritionInfo"> -->
                                        <div class="text--primary">
                                            <p>prep: 10 minutes</p>
                                            <p>cook: 5 minutes</p>
                                            <p>total: 15 minutes</p>
                                        </div>
                                        </v-card-text>
                                </v-card>
                        </v-col>
                    </v-row>
                </v-list-item>
            </v-list>
            </v-container>
        </v-container>
    </v-main>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    name: "IMadeIt",
    methods: {
        ...mapActions(['getIMadeItByUserId'])
    },
    computed: {
        ...mapGetters(['getIMadeIt'])
    },
    created() {
        this.loggedInUser = JSON.parse(localStorage.getItem('authUser'))
        this.getIMadeItByUserId({id: parseInt(this.loggedInUser[0].id)})
        console.log("get made it", this.getIMadeIt)
    },
    data: () => ({
        loggedInUser: '',
        i_made_it: [
            {
                id: 1,
                name: "pizza",
                description: "Boneless, skinless chicken breast, again? Amp up the flavor of your chicken with bacon! These are butterflied: either do it yourself or ask your butcher to do it for you. You can then stuff them with cheese and asparagus, wrap them up in a bacon blanket, and air fry! While they cook, toss a green salad, add a veggie or potato, and some bread, and you'll be enjoying your dinner in no time. ",
                image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/salmonpasta-7845868.jpg?quality=90&resize=960,872",
                ingredients: [
                    {
                        id: 1,
                        description: "1/2 cup of tea"
                    },
                    {
                        id: 2,
                        description: "2 litters oil"
                    }
                ],
                nutritionInfo: {
                    id: 1,
                    prep: 10,
                    cook: 10,
                    total: 20,
                    servings: 4,
                    yield: 4

                },
            },
            {
                id: 2,
                name: "burger",
                description: "Boneless, skinless chicken breast, again? Amp up the flavor of your chicken with bacon! These are butterflied: either do it yourself or ask your butcher to do it for you. You can then stuff them with cheese and asparagus, wrap them up in a bacon blanket, and air fry! While they cook, toss a green salad, add a veggie or potato, and some bread, and you'll be enjoying your dinner in no time. ",
                image: "https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/master/pass/Basically-Gojuchang-Chicken-Recipe-Wide.jpg",
                ingredients: [
                    {
                        id: 1,
                        description: "1/2 cup of tea"
                    },
                    {
                        id: 2,
                        description: "2 litters oil"
                    }
                ],
                nutritionInfo: {
                    id: 1,
                    prep: 10,
                    cook: 10,
                    total: 20,
                    servings: 4,
                    yield: 4

                },
            },
            {
                id: 3,
                name: "ktfo",
                description: "Boneless, skinless chicken breast, again? Amp up the flavor of your chicken with bacon! These are butterflied: either do it yourself or ask your butcher to do it for you. You can then stuff them with cheese and asparagus, wrap them up in a bacon blanket, and air fry! While they cook, toss a green salad, add a veggie or potato, and some bread, and you'll be enjoying your dinner in no time. ",
                image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                ingredients: [
                    {
                        id: 1,
                        description: "1/2 cup of tea"
                    },
                    {
                        id: 2,
                        description: "2 litters oil"
                    }
                ],
                nutritionInfo: {
                    id: 1,
                    prep: 10,
                    cook: 10,
                    total: 20,
                    servings: 4,
                    yield: 4

                },
            },
        ],
    }),
}
</script>