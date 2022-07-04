<template>
	<div class="feedback-finish2">
		<links v-if="areReviewLinks && isPositive"/>
		<template v-else>
			<h1 class="pb-4 text-center">Спасибо <br class="d-inline d-sm-none" /> за отзыв!</h1>
			<div class="flex-center pb-8">
				<svgicon name="finish_star" original width="128"/>
			</div>
			<h2 class="pb-4">
				До новых встреч!</h2>
			<div class="pb-8 body-1 font-weight-bold text-center">
				... и хорошего дня!
			</div>
		</template>

		<socials/>

		<!--		<v-btn elevation="0" @click="goToFinish" width="200" class="flex-center mb-8 mt-10 mx-auto">
					Завершить отзыв
				</v-btn>-->

	</div>
</template>

<script>
    import socials from "./elements/socials";
    import links from "./feedback-links";

    export default {
        name: "feedback-finish2",
        components: {
            socials,
            links
        },
        computed: {
            page() {
                return this.$store.state.page.ReviewStatsController;
            },
            areReviewLinks() {
                return !!this.$store.state.currentPage?.reviewLinks
                    && !!Object.keys(this.$store.state.currentPage?.reviewLinks).length;
            },
            isPositive() {
                return this.$route.params.isPositive > 0;
            },
        },
        methods: {
            backHome() {
                this.$router.replace({name: 'hello'});
            },
            goToStatistics() {
                this.$router.replace({name: 'statistics'});
            },
            goToFinish() {
                this.$router.push({name: 'feedback-finish2'});
            },
        },

    }
</script>

<style lang="scss">
	// .feedback-finish2{
	// 	cursor: pointer;
	// }
</style>