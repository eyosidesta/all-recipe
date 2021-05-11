<template>
  <div>
    <v-container>
      <v-btn
      class="ml-3 mr-4"
      elevation="1"
      fab
      small
      @click.stop="drawer = !drawer">
        <v-icon>
      {{'mdi-format-list-bulleted'}}
    </v-icon>
      </v-btn>
    </v-container>
     <v-navigation-drawer
     id="default-drawer"
      v-model="drawer"
      app
      :dark="false"
      :right="$vuetify.rtl"
      color="white"
      :mini-variant.sync = "mini"
      mini-variant-width="80"
      width="260"
      
    >
      <v-sheet
        color="grey lighten-4"
        class="pa-4"
      >
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"
        ></v-avatar>

        <div>{{userInfo[0].fullname}}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text, route] in links"
          :key="icon"
          link
          :to="route"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
            <v-card align="center" class="pa-3">
                <v-badge bordered bottom color="green" dot offset-x="10" offset-y="10" class="mb-8">
                    <v-avatar
                      class="mb-4"
                      color="grey darken-1"
                      size="40"
                    ></v-avatar>
                </v-badge>
                <h4 class="grey--text">Total Recipe</h4>
                <h3>15</h3>
                <h5 class="green--text">My Recipe is: 6</h5>
                <v-card color="deep-purple" dark class="mt-5">
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title>
                                Thanks for choosing us
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              <a style="color: white" @click="logout">logout</a>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>             
                </v-card>
            </v-card>
        </div>
        </template>
    </v-navigation-drawer>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getUser', 'allRecipes', 'getCountAllRecipe', 'getMyCount'])
  },
  methods: {
    ...mapActions(['getRecipes', 'getMyRecipe']),
    logout() {
      this.$store.dispatch('logout')
      .then(success => {
        this.$router.push('/login')
        console.log(success)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  data: () => ({
    // isLocallySaved: false,
    userInfo: {},
    cards: ['Today', 'Yesterday'],
    mini: false,
    drawer: null,
    links: [
      ['home', 'All Recipes', '/'],
      ['mdi-send', 'My Recipe', 'my-recipe'],
      ['mdi-inbox-arrow-down', 'Favorites', 'favorites'],
      ['mdi-alert-octagon', 'I Made It', 'i-made-it'],
    ]
  }),
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('authUser'))
    this.getRecipes()
    this.getMyRecipe(parseInt(this.userInfo[0].id))
  }
}
</script>
<style scoped>
  div >>> .v-list a {
    text-decoration: none;
}

</style>>




