<template>
	<div class="review-finish">
		<h2 class="pb-4"> Результаты опроса </h2>
		<div class="pb-8 body-2 text-center">
			Приняли участие {{ countReviews }}
		</div>
		<poll-card :poll="page.poll" popular/>
	</div>
</template>

<script>
    import PollCard from "./elements/poll-card";
    import {end} from "@/utils/string";

    export default {
        name: "statistics",
        components: {PollCard},
        mounted() {

        },
        computed: {
            common() {
                return this.$store.state.common;
            },
            page() {
                return this.$store.state.page.ReviewStatsController;
            },
            countReviews() {
                return this.page.countReviews + end(this.page.countReviews,
                    " человек",
                    " человека",
                    " человек"
                );
            }
        }
    }
</script>

<style lang="scss">
</style>