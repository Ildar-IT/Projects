import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./styles/index.scss"
import vuetify from './plugins/vuetify'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "",
    libraries: "places", // necessary for places input
    region: "ru, en"
  },
  installComponents: true
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
