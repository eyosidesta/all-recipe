<template>
    <v-container>
    <v-card
    class="mx-auto my-6"
    max-width="340"
    >
        <router-link
        :to="'/'+recipe.id">
             <v-img
                height="200"
                :src="recipe.image"
            ></v-img>

        </router-link>
    <v-card-title> --- {{recipe.name}} --- </v-card-title>
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

        <!-- <div class="grey--text ml-4">
          {{getRatings[index] && getRatings[index].user.fullname}}
        </div> -->
        <div class="grey--text ml-4">
            5
        </div>
      </v-row>

      <div class="my-4 subtitle-1">
        $ {{recipe.user.fullname}}
      </div>

      <div>{{recipe.description}}</div>
    </v-card-text>
    
    <v-divider class="mx-4"></v-divider>
    
    </v-card>
    </v-container>
</template>
<script>

import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'Recipes',
    props: ['recipe', 'id'],
    methods: {
        ...mapActions(['getRatingsByRecipeId'])
    },
    computed: {
        ...mapGetters(['getRatings'])
    },
    created() {
        // console.log('id[0', this.recipe[0])
        // this.id.map(val => {
        //     return(
        //         this.getRatingsByRecipeId(val)
        //     )
        // })
        // this.getRatingsByRecipeId(this.id[0])
    }

}
</script>