<template>
    <div class="feedback-finish">
        <links v-if="areReviewLinks && isPositive" />
        <template v-else>
            <h1 class="pb-4 text-center">Спасибо <br v-if="!isWindowSM"/> за отзыв!</h1>
            <div class="flex-center pb-8">
                <svgicon name="email" original width="128"/>
            </div>

            <div class="body-1 font-weight-bold  pb-8  text-center secondary-text">
                Мы уже читаем <br v-if="!isWindowSM"/> Ваши комментарии!
            </div>
        </template>

        <socials/>

<!--        <v-btn elevation="0" @click="goToFinish" width="200" class="flex-center mb-8 mt-10 mx-auto">
            Завершить отзыв
        </v-btn>-->

    </div>
</template>

<script>
    import socials from "./elements/socials";
    import links from "./feedback-links";

    export default {
        name: "feedback-finish",
        components: {
            socials,
            links
        },
        methods: {
            goToStatistics() {
                this.$router.replace({name: 'statistics'});
            },
            goToFinish() {
                this.$router.push({name:'feedback-finish2'});
            },
        },
        computed: {
            page() {
                return this.$store.state.page.ReviewStatsController;
            },
            areReviewLinks() {
                return !!Object.keys(this.$store.state.currentPage?.reviewLinks).length
            },
            isPositive() {
                return this.$route.params.isPositive > 0;
            },
	        isWindowSM() {
            	return this.$store.getters.isWindowSM;
	        }
        }
    }
</script>

<style lang="scss">
    .feedback-finish {
    }
</style>