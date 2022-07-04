<template>
	<div class="feedback-finish2">
		<div class="flex-center pb-8">
			<svgicon name="kiss" original width="128"/>
		</div>
		<h2 class="pb-4 pb-lg-8">
			До новых встреч!</h2>
		<div class="pb-8 body-1 text-center">
			... и хорошего дня!
		</div>

		<div class="flex-center" v-if="page.countReviews > 1 && !page.poll.HIDDEN_RESULT">
			<v-btn @click="goToStatistics">
				Результаты опроса
			</v-btn>
		</div>

		<socials/>
	</div>
</template>

<script>
	import socials from "./elements/socials";

	export default {
		name: "feedback-finish2",
		components: {
			socials
		},
		methods: {
			backHome() {
				this.$router.replace({name:'hello'});
			},
			goToStatistics() {
                this.$router.replace({name: 'statistics'});
            }
		},
		computed: {
            page() {
                return this.$store.state.page.ReviewStatsController;
            }
        }
	}
</script>

<style lang="scss">
	// .feedback-finish2{
	// 	cursor: pointer;
	// }
</style>