<template>
    <div class="home" v-if="page.poll">
        <div class="flex-center pb-8">
            <svgicon name="giftbox" original class="svgicon"/>
        </div>
        <h2 class="pb-4">
            {{page.poll.NAME}}
        </h2>
        <div class="pb-8 body-2 text-center secondary-text">
            {{page.poll.PREVIEW_TEXT}}
        </div>
        <div class="flex-center">
            <v-btn @click="goToQuestions">
                {{ page.poll.BTN_LABEL || "Давайте начнем!" }}
            </v-btn>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Home',
        components: {},
        data: () => ({}),
        computed: {
            common() {
                return this.$store.state.common;
            },
            page() {
                return this.$store.state.page.ReviewController;
            },

            isWindowXS() {
                return this.$store.getters.isWindowXS;
            },
            questions() {
                return this.$store.state.page.ReviewController.questions;
            }
        },
        methods: {
            goToQuestions() {
                this.$router.push({name: 'question', params: {id: this.questions[0].ID}});
            }
        },
        mounted() {

            //Валидируем наличие вопросов
            if (!this.questions || !this.questions.length) {
                this.$router.replace({name: 'hello'});
                return;
            }

        }
    }
</script>

<style lang="scss">
    .home {

    }
</style>
