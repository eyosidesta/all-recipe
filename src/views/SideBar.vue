<template>
     <v-navigation-drawer
      v-model="drawer"
      app
      permanent
      color="white"
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

        <div>Eyosias Desta</div>
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
                    <v-avatar size="40">
                        <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
                    </v-avatar>
                </v-badge>
                <h4 class="grey--text">Total Recipe</h4>
                <h3>922</h3>
                <h5 class="green--text">My Recipe is: 0</h5>
                <v-card color="deep-purple" dark class="mt-5">
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title>
                                Your Wallet Address
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                3QjwF2YkhdygZ47Akjh
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>             
                </v-card>
            </v-card>
        </div>
        </template>
    </v-navigation-drawer>
</template>
<script>
export default {
    data: () => ({
        cards: ['Today', 'Yesterday'],
      drawer: null,
      links: [
        ['mdi-inbox-arrow-down', 'All Recipes', '/'],
        ['mdi-send', 'My Recipe', 'my-recipe'],
        ['mdi-delete', 'Favorites', 'favorites'],
        ['mdi-alert-octagon', 'I Made It', 'i-made-it'],
      ]
        })
}
</script>
<style scoped>
div >>> .v-list a {
    text-decoration: none;
}
</style>