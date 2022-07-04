<template>
	<v-app id="memostory">
		<transition name="route" mode="out-in">
			<router-view />
		</transition>
	</v-app>
</template>

<script>
	import config from './config'
	import {iOSMobile} from "./utils/utils";
	export default {
		name: 'App',

		components: {},

		data: () => ({
			//
		}),
		computed: {
			isMobileApp() {
				return this.$store.state.common.isMobileApp
			},
			iOSMobile() {
				return iOSMobile();
			}
		},
		mounted() {
			window.addEventListener("resize", this.updateWindow);
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
			window.addEventListener('resize', () => {
				document.querySelector(':root').style
					.setProperty('--vh', window.innerHeight / 100 + 'px');
			});

			// document.addEventListener('touchmove', function (event) {
			// 	if (event.scale !== 1) { event.preventDefault(); }
			// }, false);

			//отключаем масштабирование
			if (this.iOSMobile) {
				document.addEventListener('gesturestart', this.preventTouchZoom);
				document.addEventListener('touchmove', this.preventTouchZoom);
			}

		},
		methods: {
			updateWindow() {
				this.$store.commit('updateWindowWidth')
				let vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty('--vh', `${vh}px`);
				window.addEventListener('resize', () => {
					document.querySelector(':root').style
						.setProperty('--vh', window.innerHeight / 100 + 'px');
				})
			},
			preventTouchZoom(e) {
				e.preventDefault();
			},
			preventTouchzoom2(event) {
					event = event.originalEvent || event;
					if(event.scale > 1) {
						event.preventDefault();
					}

			},
			refetchPage(routeInfo) {
				this.$store.dispatch('fetchPage', {
					action: routeInfo.meta.api, meta: routeInfo.meta.api, params: routeInfo.params
				}).then(() => {
					console.log('refetched');
				}).catch((error) => {
				});
			},
		},
		created() {
			window.addEventListener('appNSrefresh', () => {
				console.log("appNSrefresh this.$route", this.$route);
				this.refetchPage(this.$route);
			})
			//document.addEventListener('touchmove', this.preventTouchzoom2 , false);
		},
		destroyed() {
			if (iOSMobile) {
				window.removeEventListener("gesturestart", this.preventTouchZoom);
				//window.removeEventListener("touchmove", this.preventTouchZoom);
			}
			//document.removeEventListener('touchmove', this.preventTouchzoom2 )
		}
	};
</script>

<style lang="scss">
	#memostory {
		background: $background;
		z-index: -1;	// fixme
	}
</style>
