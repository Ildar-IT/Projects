import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import vuetify from './plugins/vuetify';
import vueFilters from '@/utils/vueFilters.js';
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';
import './plugins/svgicon';
import './scss/index.scss';
import './plugins/vue-lazyload';
import './default-tags';
import './plugins/vuetify-mask';
import './plugins/coolLightBox';

Vue.use(VueTelInputVuetify, {vuetify})
/*
Vue.directive('scroll2', {

	inserted: function (el, binding) {
		console.log('INSERTED')
		let f = function (evt) {
			console.log('F of INSERTED');
			if (binding.value(evt, el)) {
				window.removeEventListener('scroll', f)
			}
		}
		window.addEventListener('scroll', f)
	}
});
console.log('INSERTED2')*/

Vue.use(vueFilters);
Vue.config.productionTip = false;



new Vue({
	router,
	vuetify,
	store,
	render: h => h(App)
}).$mount('#memostory');


