<template>
    <div v-if="poll" class="poll-card margin-bottom-main">
        <card>
            <h5 class="flex-center mb-4 text-center" v-html="poll.NAME">
                
            </h5>

            <div class="flex-center mb-4 h7 gray-text" v-if="poll.countReviews">
                <svgicon class="mr-2" width="24" name="user2" color="#B3B8CB"/>
                {{textCountReviews}}
            </div>

            <v-divider v-if="isWindowLG" class="mb-4"/>

            <template v-if="!poll.questions || !poll.questions.length">
                <p class="body-1 text-center gray-text">У данного опроса пока нет вопросов...</p>
            </template>

            <v-row v-if="poll.questions">
                <v-col v-for="(question, index) in poll.questions" :key="index" cols="12" off_lg="4">
                    <div class="mb-2">
                        <div class="h7" :class="isWindowLG? 'mb-4' : 'mb-2'">
                            {{question.NAME}}
                        </div>
                        <template v-if="question.TYPE === 'SELECT'">
                            <v-row v-if="question.OPTIONS" class="pa-0 mx-4">
                                <v-col v-for="(option, idx) in question.OPTIONS"
                                       :key="idx" cols="12" lg="3">

                                    <div class="h8 dark-gray-text" :class="isWindowLG? 'mb-4' : 'mb-2'">
                                        {{option.NAME}}
                                    </div>
                                    <progress-bar-votes v-if="option.answerStats"
                                                        :answerStats="option.answerStats"
                                                        :questionType="question.TYPE"/>
                                    <div v-else class="body-2 gray-text">
                                        Пока нет ответов
                                    </div>
                                </v-col>
                            </v-row>
                        </template>
                        <template v-else>
                            <progress-bar-votes v-if="question.answerStats"
                                                :answerStats="question.answerStats"
                                                :questionType="question.TYPE"/>
                            <div v-else class="gray-text mx-8">
                                Пока нет ответов
                            </div>
                        </template>
                    </div>
                </v-col>
            </v-row>

        </card>
    </div>
</template>

<script>
    import {end} from "@/utils/string";
    import ProgressBarVotes from "./progress-bar-votes";

    export default {
        name: "poll-card",
        components: { ProgressBarVotes},
        props: {
            'poll': {},
            'popular': {
                type: Boolean
            }
        },
        computed: {
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
           
            textCountReviews() {
                return this.poll.countReviews + " " + end(this.poll.countReviews, "респондент", "респондента", "респондентов");
            },
            isPollLimited() {
                // достигли ли максимума сессия (просмотров), разрешенных тарифом?
                return this.$store.getters.tariff?.MAX_REVIEWS && this.poll.countReviews >= this.$store.getters.tariff?.MAX_REVIEWS;
            }
        },
        methods: {
        }
    }
</script>

<style lang="scss">
   
</style>
