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
                                        <v-col>
                                        <div class="grey--text ml-4">
                                        4
                                        </div>
                                        </v-col>
                                        <v-col>

                                        <div> <a @click="triggerIngredientInput(my_recipe.id, 2)"
                                        > delete recipe</a></div>
                                        </v-col>
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
                                @click="triggerIngredientInput(my_recipe.id, 1)"
                                >
                                Add
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-list-item>
                </v-list>
                <div>
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
                </div>
                <template>
                    <v-row justify="center">
                        <v-dialog
                        v-model="deleteDialog"
                        max-width="290">
                        <v-card>
                            <v-card-title class="headline">
                                Are you sure you want to delete this recipe?
                            </v-card-title>
                            <v-card-text>
                                select delete button to delete recipe, otherwise cancel it
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                            <v-btn
                            color="green darken-1"
                            text
                            @click="deleteDialog = false">cancel</v-btn>
                            <v-btn
                            color="red"
                            text
                            @click="deleteRecipe(recipe_id)">delete</v-btn>
                        </v-card>

                        </v-dialog>
                    </v-row>
                </template>
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
        triggerIngredientInput(id, val) {
            if(val === 1) {
                this.dialog = true
            }
            if(val === 2) {
                this.deleteDialog = true
            }
            this.recipe_id = id

        },
        deleteRecipe(id) {
            this.$store.dispatch('deleteRecipe', id)
            .then(success => {
                this.snackbar = true
                this.snackbarText = 'recipe deleted successfully'
            })
            .catch(err => {
                this.snackbar = true
                this.snackbarText = 'something went wrong please try again'
            })
            this.deleteDialog = false
        }
    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem('authUser'))
        this.getMyRecipe(this.userInfo[0].id)
        this.getIngredientByUserId(this.userInfo[0].id)
    },
    data: () => ({
        snackbar: false,
        snackbarText: '',
        timeout: 3000,
        dialog: false,
        deleteDialog: false,
        ingredientDesc: '',
        recipe_id: 0,
        userInfo: {},
        description: '',
    }),
    
}
</script>