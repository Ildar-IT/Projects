import Vue from 'vue'
import vuetify from './plugins/vuetify';
import App from './App.vue'
import router from './router'
import store from './store';

import vueFilters from './utils/vueFilters.js';
import './plugins/svgicon';
import './plugins/vuetify-mask';
import './scss/index.scss';
import './default-tags';

Vue.config.productionTip = false;
Vue.use(vueFilters);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
