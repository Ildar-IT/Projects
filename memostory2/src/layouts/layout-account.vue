<template>
	<div class="layout-account">

		<header-account/>


		<dandelion-bg/>

		<!--		<transition appear :name="transitionName">-->

		<vue-pull-refresh v-if="isMobileApp" :on-refresh="refresh" :config="pullConfig">
			<transition :name="transitionName">
				<v-progress-circular v-if="isRouting"
				                     key="m3"
				                     class="layout-account__progress"
				                     indeterminate
				                     :size="50"
				                     :width="4"
				                     color="#000"
				></v-progress-circular>
				<main v-else key="m1">
					<!--        <transition :name="!îsMobileApp? 'route': 'routingApp'" mode="out-in">-->
					<router-view/>
					<!--        </transition>-->
				</main>
			</transition>
		</vue-pull-refresh>

		<template v-else>
			<main key="m1">
				<transition name="route" mode="out-in">
					<router-view/>
				</transition>
			</main>
		</template>


		<!--		</transition>-->

		<nav-bottom-menu v-if="!isWindowMD"/>
		<footer-component v-else-if="!isMobileApp" @click="scrollUpToId"/>
	</div>

</template>

<script>
	import headerAccount from '@/components/account/header-account';
	import navBottomMenu from '@/components/account/nav-bottom-menu';
	import dandelionBg from '@/components/elements/dandelion-bg'
	import footerComponent from "../components/footer-component";
	import VuePullRefresh from 'vue-pull-refresh';

	export default {
		name: 'layout-account',
		data() {
			return {
				iconLink: '',
			}
		},
		components: {
			headerAccount,
			navBottomMenu,
			dandelionBg,
			footerComponent,
			VuePullRefresh
			//mainBody
		},
		computed: {
			pageButtons() {
				return this.$store.state.common?.buttons;
			},
			pullConfig() {
				return {
					errorLabel: this.pageButtons?.errorLabel ? this.pageButtons?.errorLabel :  "Что-то пошло не так",
					startLabel: this.pageButtons?.startLabel ? this.pageButtons?.startLabel :  "Перезагрузка страницы",
					readyLabel: this.pageButtons?.startLabel ? this.pageButtons?.startLabel :  "Перезагрузка страницы",
					loadingLabel: this.pageButtons?.startLabel ? this.pageButtons?.startLabel :   "Обновление страницы",
					pullDownHeight: 100
				}
			},
			isMobileApp() {
				return this.$store.state.common.isMobileApp;
			},
			isWindowXS() {
				return this.$store.getters.isWindowXS;
			},
			isWindowMD() {
				return this.$store.getters.isWindowMD;
			},
			isWindowLG() {
				return this.$store.getters.isWindowLG;
			},
			isWindowXL() {
				return this.$store.getters.isWindowXL;
			},
			isRouting() {
				return this.$store.state.isRouting;
			},
			transitionName() {
				return this.$store.state.transitionName;
			}
		},
		methods: {
			refresh() {
				return this.$store.dispatch('fetchPage', {
					action: this.$route.meta.api, meta: this.$route.meta.api, params: this.$route.params
				})
			},
			scrollToId(section) {
				console.log('home scroll', section)
				this.$router.push({name: 'home', hash: section.linkTo}).catch(() => {
				});
				setTimeout(() => {
					const scrollTo = scroller();
					scrollTo(section.linkTo)
				}, 100)
			},
			scrollUpToId(section) {
				console.log('home scroll', section)
				this.$router.replace({name: 'home', hash: section.linkTo}).catch(() => {
				});
				setTimeout(() => {
					const scrollTo = scroller();
					scrollTo(section.linkTo)
				}, 10)
			},
		}
	}
</script>

<style lang="scss">
	.layout-account {
		position: relative;
		z-index: 0;

		.pull-down-header {
			background-color: $background;

			.pull-down-content {
				color: $grey1;
				height: 30px;
				bottom: 1px !important;
			}

		}

		main {
			padding-top: 72px;
			padding-bottom: 64px;
			min-height: 80vh;
			@include up($lg) {
				padding-top: 100px;
			}
		}

		&__progress {
			position: fixed;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			z-index: -1;
			opacity: 0.1;
		}

		.nav-bottom-menu {
			position: fixed !important;
		}
	}
</style>
