<template>
	<div class="review-finish layout-top">
		<h2 class="pb-4"> Результаты опроса </h2>
		<div class="pb-8 body-2 text-center">
			Участие приняли: {{ page.countReviews }} человек
		</div>
     <poll-card :poll="page.poll" popular/>
	</div>
</template>

<script>
  import PollCard from "./elements/poll-card";
	export default {
		name: "statistics",
    components: { PollCard },
		mounted() {

		},
    computed: {
    common() {
        return this.$store.state.common;
    },
    page() {
        return this.$store.state.page.ReviewStatsController;
    },
  }
}
</script>

<style lang="scss">
</style>