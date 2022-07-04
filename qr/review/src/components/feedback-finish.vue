<template>
    <div class="feedback-finish">
        <div class="flex-center pb-8">
            <svgicon name="email" original width="128"/>
        </div>
        <h2 class="pb-4">Спасибо!</h2>
        <div class="body-2 pb-8  text-center secondary-text">
            Мы уже читаем Ваши комментарии!
        </div>

        <div class="flex-center" v-if="page.countReviews >= 1 && !page.poll.HIDDEN_RESULT">
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
        name: "feedback-finish",
        components: {
            socials
        },
        methods: {
            goToStatistics() {
                this.$router.replace({name: 'statistics'});
            }
        },
        computed: {
            page() {
                return this.$store.state.page.ReviewStatsController;
            },
        }
    }
</script>

<style lang="scss">
    .feedback-finish {
    }
</style>