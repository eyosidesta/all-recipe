<template>
  <v-app>
    <v-container>
      <!-- <div v-if="getAuthenticated"> -->
        <SideBar />
      <!-- </div> -->
      <router-view></router-view>
    </v-container>
  </v-app>
</template>


<script>
import SideBar from "./views/SideBar"
import { mapGetters } from 'vuex'
  export default {
    name: "App",
    computed: mapGetters(['getAuthenticated']),
    data: () => ({
      isLoggedIn: true
    }),
    components: {
      SideBar
    }
  }
</script>
