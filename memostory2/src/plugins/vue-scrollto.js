import Vue from 'vue'
import VueScrollto from 'vue-scrollto'
// Vue.use(VueScrollto)

// You can also pass in the default options
Vue.use(VueScrollto, {
	container: "body",
	duration: 500,
	easing: "ease",
	offset: 0,
	force: true,
	cancelable: true,
	onStart: false,
	onDone: false,
	onCancel: false,
	x: false,
	y: true
})