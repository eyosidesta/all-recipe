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
  <v-col
    v-for="(recipe, index) in allRecipes"
    :key="index"
    cols="12"
    sm="4"
    max-width="340"
  >
  <v-card
  
    :loading="loading"
    class="mx-auto my-6"
    max-width="340"

  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <router-link
:to="'/'+recipe.id">
    <v-img
      height="200"
      :src="recipe.image"
    ></v-img>
    </router-link>

    <v-card-title>{{recipe.name}} --- {{allRecipes.length}}</v-card-title>

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
          {{getRatings[index] && getRatings[index].id}}
          <!-- {{getRatings[index].id}} -->
          <!-- {{console.log(getRatings)}} -->
        </div>
      </v-row>

      <div class="my-4 subtitle-1">
        $ {{recipe.user.fullname}}
      </div>

      <div>{{recipe.description}}</div>
    </v-card-text>
    
    <v-divider class="mx-4"></v-divider>

    <!-- <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text> -->

    <!-- <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
      >
        Reserve
      </v-btn>
    </v-card-actions> -->
  </v-card>
  </v-col>
</v-row>

</v-container>
</v-main>
</template>
<script>

import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Home',
  actions: {

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
      // this.allRecipes.forEach(element => {
      //   console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[", element)
      //   return(
      //   this.getRatingsByRecipeId(element.id)
      //   )
      // });
      // this.getRatingsByRecipeId()
      console.log("here", this.getRatings)
      
    }
}
</script>
<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>