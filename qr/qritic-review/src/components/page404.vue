<template>
	<div class="page404">
		<div class="flex-center pb-8">
			<svgicon name="upside down" original width="128" />
		</div>
		<h2 class="pb-4">
			404
		</h2>
		<div class="pb-8 body-2 text-center secondary-text">
			Не можем найти то, что вы ищете, но вы не грустите :)
		</div>
	</div>
</template>

<script>

	export default {
		name: 'page404',
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
