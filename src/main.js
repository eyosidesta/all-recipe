import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase, {initializeApp} from 'firebase'
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate';
import VImageInput from 'vuetify-image-input';
// import 
import axios from 'axios';

Vue.use(Vuelidate)
Vue.component(VImageInput.name, VImageInput);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyBypuo1dd78SU54S3hSZMYtodaprzPAv7o",
      authDomain: "recipe-2db1a.firebaseapp.com",
      databaseURL: "https://recipe-2db1a-default-rtdb.firebaseio.com",
      projectId: "recipe-2db1a",
      storageBucket: "gs://recipe-2db1a.appspot.com",
      appId: "1:1039278625103:web:9019ee1eb3eff39211753a",
    })
  }
}).$mount('#app')
