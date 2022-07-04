<template>
    <div class="question-card">
        <v-expansion-panels>
            <v-expansion-panel @click="visible=!visible">
                <v-expansion-panel-header>
                    <div>
                        <h6 class="question-card__header" :class="{'margin-bottom-small':question.countAnswers}">
							<span class="gray-text mr-4">
								#{{index+1}}
							</span>
                            <span>{{question.NAME}}</span>
                        </h6>

                        <progress-bar-votes v-if="question.answerStats
                                        && (question.TYPE=='LIKE' || question.TYPE=='SMILE')"
                                            class="mt-4"
                                            :answerStats="question.answerStats"
                                            :questionType="question.TYPE"/>
                        <progress-stars v-if="question.answerStats && question.TYPE==='STARS'"
                                            class="mt-4"
                                            :answerStats="question.answerStats"
                        />

                        <div v-if="question.TYPE==='SELECT' && popularOption"
                             class="h8 mt-4 dark-gray-text" :class="isWindowLG? 'mb-4' : 'mb-2'">
                            {{popularOption.NAME}}
                        </div>
                        <progress-bar-votes v-if="question.TYPE==='SELECT' && popularOption"
                                            class="mt-4"
                                            :answerStats="popularOption.answerStats"
                                            :questionType="question.TYPE"/>
                    </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-divider/>
                    <template v-if="question.TYPE === 'SELECT'">
                        <v-row v-if="question.OPTIONS" class="pa-0 mt-4 mx-8">
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
                    <template v-else-if="question.chartData" class="anti-margin-row">
                        <v-row class="ma-0">
                            <v-col cols="12" md="6" lg="4" class="ma-0 pa-0">
                                <div class="margin-right-small margin-left-small ">
                                    <moods-card :chartData="question.chartData" :noCard="true" :small="true"/>
                                </div>
                            </v-col>
                            <v-col cols="12" md="6" lg="8" class="ma-0 pa-0">
                                <div class="margin-right-small margin-left-small">
                                    <dynamics-card :chartData="question.chartData" :noCard="true" :small="true"
                                                   :visible="visible"/>
                                </div>
                            </v-col>
                        </v-row>
                    </template>
                    <template v-else class="anti-margin-row">
                        <div class="body-1 mt-4 gray-text text-center">
                            Пока нет ответов
                        </div>
                    </template>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
    import MoodsCard from "./moods-card";
    import DynamicsCard from "./dynamics-card";
    import ProgressBarVotes from "./progress-bar-votes";
    import ProgressStars from "./progress-stars";

    export default {
        components: {ProgressStars, ProgressBarVotes, DynamicsCard, MoodsCard},
        props: ['question', 'index'],
        name: "question-card",
        data: () => ({
            visible: false,
        }),
        computed: {
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
            popularOption() {
                let options = this.question.OPTIONS;
                if (options && options.length){
                    options.sort( function(a, b) {
                        if (a.answerStats && b.answerStats) {
                            if (a.answerStats[0].value < b.answerStats[0].value) {
                                return 1;
                            }
                            if (a.answerStats[0].value > b.answerStats[0].value) {
                                return -1;
                            }
                            return 0;
                        }

                    });
                    return options[0];
                }
                else return null;
            }
        }
    }
</script>

<style lang="scss">
    #account-app {
        .question-card {
            &__title {
                width: calc(100% - 20px);
            }

            &__header {
                display: grid;
                grid-template-columns: 40px 1fr;
                width: calc(100% - 10px);
            }

            .v-expansion-panel-header__icon {
                margin-left: auto;
                position: absolute;
                top: 32px;
                right: 20px;
            }

            .v-expansion-panel-header {
                padding: 32px;
            }

            .v-expansion-panels:not(.v-expansion-panels--accordion):not(.v-expansion-panels--tile) > .v-expansion-panel--active {
                border-radius: 32px;
            }
             .v-icon {
                position: absolute;
                right: 0;
            }
        }
    }
</style>