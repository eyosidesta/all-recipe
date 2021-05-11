<template>
  <v-app>
    <v-container>
      <div v-if="$route.name !== 'login'">
        <SideBar />
      </div>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>


<script>
import SideBar from "./views/SideBar"
import { mapGetters, mapActions } from 'vuex'
  export default {
    name: "App",
    computed: {
      ...mapGetters(['getAuthenticated']),
      },
    methods: {
      ...mapActions(['isAuthenticated'])
    },
    data: () => ({
      isLoggedIn: false
    }),
    components: {
      SideBar
    },
    created() {
      this.isAuthenticated()
    }
  }
</script>
