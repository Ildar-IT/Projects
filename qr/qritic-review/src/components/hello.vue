<template>
	<div class="home">
		<div class="flex-center pb-8">
			<svgicon name="smile" original class="svgicon" />
		</div>
		<h2 class="pb-4">
			Добро пожаловать!
		</h2>
		<div class="pb-8 body-2 text-center secondary-text">
			Отсканируйте QR-код, чтобы пройти опрос.
		</div>
	</div>
</template>

<script>

	export default {
		name: 'hello',
		components: {

		},
		data: () => ({
		}),
		computed: {
			common() {
				// return this.$store.state.common;
			},
			page() {
				// return this.$store.state.page.HomeController;
			},

			isWindowXS() {
				return this.$store.getters.isWindowXS;
			},
		},
		methods: {
			goToQuestion() {
				this.$router.replace({name:'question',params:{id: null}});
			}
		},
		mounted() {

		}
	}
</script>

<style lang="scss">
	.home{

	}
</style>
