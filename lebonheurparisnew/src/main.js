import Vue from 'vue'
import App from './App.vue'
import router from './router';
import "./styles/index.scss";
import store from './store';
import vuetify from './plugins/vuetify';
import vueFilters from './utils/vueFilters.js';
import './plugins/svgicon';
//import './plugins/vue-awsome-swiper';
//import 'animate.css';

Vue.config.productionTip = false;
Vue.use(vueFilters);

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
