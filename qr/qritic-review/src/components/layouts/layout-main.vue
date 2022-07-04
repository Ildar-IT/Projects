<template>
	<div class="layout-main">
		<layout-header/>
		<main>
			<transition name="route" mode="out-in">
				<router-view></router-view>
			</transition>
		</main>
		<layout-footer/>
	</div>
</template>

<script>
	import LayoutHeader from "./layout-header";
	import LayoutFooter from "./layout-footer";

	export default {
		name: "layout-main",
		components: {
			LayoutHeader,
			LayoutFooter
		},

		data() {
			return {};
		},
		computed: {
			isWindowXS() {
				return this.$store.getters.isWindowXS;
			},
			isWindowSM() {
				return this.$store.getters.isWindowSM;
			},
			route() {
				return this.$route.name
			},
		},
		mounted() {

		},
	}
</script>


<style lang="scss">
	.layout-main {
		width: 100%;
		max-width: $layout-width;
		padding-top: $layout-margin-xs;
		padding-bottom: 16px;
		padding-right: 20px;
		padding-left: 20px;
		margin-right: auto;
		margin-left: auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/*min-height: calc(100vh - 48px);*/
		min-height: calc(var(--vh, 1vh)*100);
		@include up($lg) {
			padding-top: $layout-margin-lg;
			margin-right: auto;
			margin-left: auto;
		}
	}

</style>