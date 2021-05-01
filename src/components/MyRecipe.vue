<template>
    <v-main>
        <v-container>
            <h1>My Recipes</h1>
                <v-list v-for="(my_recipe, index) in myRecipe" :key="index">
                    <v-list-item>
                        <v-row>
                            <v-col>
                                <h3>Recipe</h3>
                                <v-card
                                    class="mx-auto my-6"
                                    max-width="340"

                                >
                                    <v-img
                                    height="200"
                                    :src="my_recipe.image"
                                    ></v-img>
                                    <v-card-title>{{my_recipe.name}}</v-card-title>

                                    <v-card-text>
                                    <v-row
                                        align="center"
                                        class="mx-0"
                                    >
                                        <v-rating
                                        :value="4"
                                        color="amber"
                                        dense
                                        half-increments
                                        readonly
                                        size="14"
                                        ></v-rating>

                                        <div class="grey--text ml-4">
                                        4
                                        </div>
                                        <div><a>delete recipe</a></div>
                                    </v-row>
                                    <br/>
                                </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col>
                                <h3>Description</h3>
                                <div>{{my_recipe.description}}</div>
                            </v-col>
                            <v-col>
                                <h3>Ingredients</h3>
                                    <v-btn
                                    @click="triggerIngredientInput(my_recipe.id)"
                                    >
                                    Add
                                    </v-btn>
                                <!-- </v-dialog> -->
                                
                                
                                <!-- <v-btn @click="addIngredient(my_recipe.id)">Add Ingredient</v-btn> -->
                                
                                <!-- <v-card
                                class="pa-2"
                                outlined
                                title>
                                <div>
                                
                                    <p>{{my_recipe.description}}</p>
                                </div>
                                </v-card> -->
                            </v-col>
                        </v-row>
                    </v-list-item>
                </v-list>
                <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="500px"
                    >
                    <v-card>
                        <v-card-title>
                        <span class="headline">Add Ingredient</span>
                        </v-card-title>
                        <v-card-text>
                        <v-container>
                            <v-row>
                            <v-col
                                
                            >
                                <v-text-field
                                    v-model="description"
                                    name="description"
                                    label="add description*"
                                ></v-text-field>
                            </v-col>
                            
                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                        >
                            Close
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="addIngredient(recipe_id, description)"
                        >
                            Save
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
        </v-container>
    </v-main>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    name: "MyRecipe",
    computed: {
        ...mapGetters(['myRecipe', 'getUserIngredient'])
    },
    methods: {
        ...mapActions(['getMyRecipe', 'getIngredientByUserId']),
        addIngredient(id, description) {
            this.$store.dispatch("addRecipeIngredient", {recipe_id: id, 
            description: description})
            .then(success => {
                console.log('ingredient successfully added')
                // this.$router.push("/")
            })
            .catch(err => {
                console.log({'err': "something went wrong"})
            })
            this.dialog = false
        },
        triggerIngredientInput(id) {
            this.dialog = true
            this.recipe_id = id

        }
    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem('authUser'))
        this.getMyRecipe(this.userInfo[0].id)
        this.getIngredientByUserId(this.userInfo[0].id)
    },
    data: () => ({
        dialog: false,
        ingredientDesc: '',
        recipe_id: 0,
        userInfo: {},
        description: '',
    }),
    
}
</script>