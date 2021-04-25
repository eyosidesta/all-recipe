<template>
<v-main>
  <v-btn
  to="/add-recipe">
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
    cols="4"
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

    <v-img
      height="200"
      :src="recipe.image"
    ></v-img>

    <v-card-title>{{recipe.title}}</v-card-title>

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
          {{recipe.numberOfLikes}}
        </div>
        <div>
          <a @click="postLiked">
          Like
          </a>
        </div>
      </v-row>

      <div class="my-4 subtitle-1">
        $ Eyosias Desta
      </div>

      <div>{{recipe.description}}</div>
    </v-card-text>
    <div @click="comment">comment</div>
    <v-divider class="mx-4"></v-divider>
    <!-- <div v-if="isComment==='true'"> -->

    <v-card-title>Tonight's availability</v-card-title>

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
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
      >
        Reserve
      </v-btn>
    </v-card-actions>
    <!-- </div> -->
  </v-card>
  </v-col>
</v-row>
</v-container>
</v-main>
</template>
<script>
export default {
  name: 'Home',
  methods: {

  },
  actions: {

  },
  data: () => ({
    isComment: 'true',
    loading: false,
    selection: 1,
    classObject: {
      backgroundColor: 'red'
    },
    allRecipes: [
      {
        id: 1,
        title: 'lorem ipsum',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ipsum sit amet lacus tincidunt, sodales commodo urna condimentum. Nam',
        image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        numberOfLikes: 4
      },
      {
        id: 2,
        title: 'lorem ipsum two',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ipsum sit amet lacus tincidunt, sodales commodo urna condimentum. Nam',
        image: "https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/master/pass/Basically-Gojuchang-Chicken-Recipe-Wide.jpg",
        numberOfLikes: 2
      },
      {
        id: 3,
        title: 'lorem ipsum three',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ipsum sit amet lacus tincidunt, sodales commodo urna condimentum. Nam',
        image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/salmonpasta-7845868.jpg?quality=90&resize=960,872",
        numberOfLikes: 3
      },
      {
        id: 4,
        title: 'lorem ipsum four',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ipsum sit amet lacus tincidunt, sodales commodo urna condimentum. Nam',
        image: "https://static.toiimg.com/thumb/70551342.cms?width=571&height=382&imgsize=60677",
        numberOfLikes: 5
      },
      {
        id: 5,
        title: 'lorem ipsum five',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ipsum sit amet lacus tincidunt, sodales commodo urna condimentum. Nam',
        image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        numberOfLikes: 6
      },
      {
        id: 6,
        title: 'lorem ipsum six',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ipsum sit amet lacus tincidunt, sodales commodo urna condimentum. Nam',
        image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        numberOfLikes: 7
      },
      {
        id: 7,
        title: 'lorem ipsum seven',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ipsum sit amet lacus tincidunt, sodales commodo urna condimentum. Nam',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxFFuydIsCmQ_VeH7PGqk9MAgvOPgGuS69fg&usqp=CAU",
        numberOfLikes: 8
      },
    ],
  }),
  methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
      comment() {
        console.log("working")
        this.isComment = 'true'
      },
      postLiked() {

      },
    },
}
</script>
<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>