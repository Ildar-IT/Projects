import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/vuetify-mask';
import vueFilters from './utils/vueFilters.js';
import SvgIcon from 'vue-svgicon'
import './default-tags';
import './scss/index.scss';
import './plugins/swiper';
import './plugins/svgicon';

//icons
Vue.use(SvgIcon, {
	tagName: 'svgicon'
});

Vue.use(vueFilters);
Vue.config.productionTip = false;

new Vue({
	router,
	vuetify,
	store,
	iconfont: 'faSvg',
	render: h => h(App)
}).$mount('#app')
