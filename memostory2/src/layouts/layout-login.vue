<template>
	<div class="layout-login">
		<header-login/>
		<main>
			<transition name="route" mode="out-in">
				<router-view/>
			</transition>
		</main>
		<dandelion-bg/>
		<footer-component v-if="!isMobileApp" @click="scrollUpToId"/>
	</div>
</template>

<script>
	import headerLogin from "@/components/login/header-login";
	import login from "@/components/login/login";
	import loginCode from "@/components/login/login-code"
	import dandelionBg from '@/components/elements/dandelion-bg'
	import footerComponent from "../components/footer-component";

	export default {
		name: 'layout-login',
		components: {headerLogin, login, loginCode, dandelionBg, footerComponent},
		computed: {
			isMobileApp() {
				return this.$store.state.common.isMobileApp;
			},
		},
		methods: {
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
	.layout-login {
		position: relative;
		z-index: 1;

		main {
			min-height: 80vh;
		}
	}
</style>