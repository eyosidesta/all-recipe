<template>
<v-main>
  <v-btn
   to="add-recipe">
  Add Recipe
</v-btn>
<v-container
  class="px-6"
  fluid
>

  <v-row>
    <v-col v-for="(recipe, index) in allRecipes"
    :key="index"
    cols="12"
    sm="4"
    max-width="340">
    <Recipes :recipe="recipe" :id="recipe.id"></Recipes>
    </v-col>
  </v-row>
</v-container>
</v-main>
</template>
<script>

import {mapGetters, mapActions} from 'vuex'
import Recipes from '../components/Recipes'
export default {
  name: 'Home',
  actions: {

  },
  components: {
    Recipes
  },
  data: () => ({
    dynamicComment: [],
    comments: [],
    show: false,
    authUser: '',
    lengthh: 0,
    allRecipesss: [],
    userInfo: {},
    isComment: 'true',
    loading: false,
    selection: 1,
    classObject: {
      backgroundColor: 'red'
    },
  }),
  methods: {
    
    ...mapActions(["getRecipes", "getCommentByRecipeId", "getRatingsByRecipeId"]),
    btn_clicked() {
      // const user =  JSON.parse(this.getUserInfo)
      console.log('user info is: ', this.allRecipes)
    },
    addComment(comment, recipe_id, user_id) {
      this.$store.dispatch('addComment', {comment: comment, 
      recipe_id: recipe_id, user_id: user_id})
      .then(sucess => {
        console.log('comment added successfully')
      })
      .catch(err => {
        console.log({'err': 'something went wrong'})
      })
    },
    showComment(id) {
      console.log("ttt", id)
    },
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
      postLiked() {

      },
    },
    computed: {
      ...mapGetters(['allRecipes', 'getUserInfo', 'getUser', 'getComments', 'getRatings', 'getCount'])
    },
    created() {
      this.getRecipes()
      this.lengthh = this.allRecipes.length
      this.authUser = JSON.parse(localStorage.getItem('authUser'))
      this.allRecipesss = this.allRecipes
      let i = 0;
      while(i < this.allRecipes.length) {
        this.getRatingsByRecipeId(this.allRecipes[i].id)
        i++
      }
      
    }
}
</script>
<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>