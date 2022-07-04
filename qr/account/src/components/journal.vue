<template>
    <div class="layout-top journal margin-bottom-main">
        <h1 class="margin-bottom-main">
            Журнал визитов и ответов
        </h1>

        <div class="anti-margin-row">
            <v-row class="ma-0">
                <v-col cols="12" md="4" lg="4" class="ma-0 pa-0">
                    <div class="margin-right-small margin-left-small margin-bottom-main">
                        <v-select
                                :label="allPolls.length === 0 ? 'Нет опросов' : 'Выберите опрос'"
                                :items="allPolls"
                                item-text="NAME"
                                item-value="QRHASH"
                                :class="{ disabled: allPolls.length === 0 }"
                                v-model="pollHash"/>
                    </div>
                </v-col>
                <v-col cols="12" md="4" lg="4" class="ma-0 pa-0">
                    <div class="margin-right-small margin-left-small margin-bottom-main">
                        <v-select
                                item-text="name"
                                item-value="number"
                                :items="periods"
                                v-model="period"/>
                    </div>
                </v-col>
                <v-col cols="12" md="4" lg="4" class="ma-0 pa-0">
                    <div class="margin-right-small margin-left-small margin-bottom-main">
                        <v-btn block small class="secondary margin-bottom-main" @click="downloadXLS">
                            <!--							<a :href="downloadXLSLink" target="_blank">-->
                            <pulse-loader v-if="loading" :loading="true" color="#fff" size="5px"/>
                            <span v-else>Экспорт в XLS</span>
                            <!--							</a>-->
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </div>

        <template v-if="reviews && reviews.length">

            <v-alert
                    :type="countNotProcessed?'error':'success'"
                    text
                    close-text="Закрыть"
                    dismissible
            >
                <span v-if="countNotProcessed">{{ textNotProcessed }}</span>
                <span v-else>Нет отзывов, требующих обратной связи</span>
            </v-alert>

            <!--		expanded table if large screen -->
            <div v-if="isWindowLG">
                <!--table header-->
                <div class="flex pa-4 align-center justify-space-between h7 ml-12">
                    <div class="flex align-center">
                        <div class="mr-8 journal__expanded__date">Дата</div>
                        <div class="journal__expanded__name">Название опроса</div>
                    </div>
                    <div class="flex justify-end align-center">
                        <div class="mr-4 journal__expanded__id">
                            Ответы
                        </div>
                        <div class="mr-4 journal__expanded__id">
                            ID сессии
                        </div>
                        <!--<div class="mr-4">
                            ID опроса
                        </div>-->

                        <div class="journal__expanded__contact text-right pr-2">
                            Обратная связь
                        </div>
                    </div>
                </div>
                <v-expansion-panels accordion>
                    <v-expansion-panel v-for="(review, idx) in reviews"
                                       :key="idx"
                                       @change="toggleOpen(idx)"
                                       class="no-box-shadow">
                        <v-expansion-panel-header>
                            <template v-slot:actions>
                                <svgicon :name="openedPanel===idx? 'minus' : 'plus'"
                                         width="30" height="30" color="#272933" :fill="false"/>
                            </template>
                            <div class="flex align-center justify-space-between body-2 ml-12">
                                <div>
									<span v-if="review.DATE_CREATE" class="mr-8">
										{{ dateFormat(review.DATE_CREATE) }}
									</span>
                                    <span v-if="review.POLL">
										<span v-if="getPoll(review)">
											{{ getPoll(review).NAME }}
										</span>
									</span>
                                </div>
                                <div class="gray-text flex justify-end align-center">
                                    <div class="mr-4 journal__expanded__id text-center ">
										<span v-if="review.answers"
                                              :class="review.answers.length=== answersCount(review) && 'primary-text'">
											{{ review.answers.length }} / {{ answersCount(review) }}
										</span>
                                    </div>
                                    <div v-if="review.ID" class="mr-4 align-center journal__expanded__id">
                                        {{ review.ID }}
                                    </div>
                                    <!--<div v-if="review.ID" class="mr-4 journal__expanded__id">
                                            <span v-if="getPoll(review)">
                                            {{getPoll(review).ID}}
                                        </span>
                                    </div>-->
                                    <div class="w-193">
                                       <!-- По просьбе заказчика показываем "связаться с клиеном" если есть коммент-->
                                        <div v-if="(!!review.COMMENTS) && !review.IS_PROCESSED"
                                             class="body-2 red-text flex justify-end align-center">
                                            <span class="mr-2">Связаться с клиентом</span>
                                            <!--<svgicon name="info" color="#F35A45" width="24" :fill="false"/>-->
                                            <v-icon color="#F35A45">mdi-alert</v-icon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div v-if="review.answers && review.answers.length">
                                <div v-for="(answer, index) in review.answers" :key="index">
                                    <component class="question__component flex-space-between py-3"
                                               :answer="answer"
                                               :index="index+1"
                                               :is="component(getQuestion(getPoll(review),answer))"
                                               :question="getQuestion(getPoll(review),answer)"
                                    />
                                </div>
                            </div>
                            <div v-else class="py-3 text-center">
                                Нет ответов
                            </div>
                            <div class="flex-space-between pt-3">
                                <div class="w-865">
                                    <!-- По просьбе заказчика показываем "связаться с клиеном" если есть коммент-->
                                    <div v-if="review.COMMENTS"
                                         v-html="review.COMMENTS.TEXT" class="body-1 mr-4 mb-2">
                                    </div>
                                     <div v-if="review.FILE" class="body-2">
                                       <v-icon class="mb-1"> mdi-paperclip </v-icon> <a download :href="review.FILE"> {{ review.DETAIL_TEXT }} </a>
                                    </div>
                                </div>
                                <div>
                                    <div v-if="review.PHONE" class="body-2 mb-2 wh-space-nowrap text-end">
                                        <a :href="'tel:'+review.PHONE">{{ review.PHONE }}</a>
                                    </div>
                                    <div v-if="review.EMAIL" class="body-2">
                                        <a :href="'mailto:'+review.EMAIL">{{ review.EMAIL }}</a>
                                    </div>
                                </div>
                            </div>
                            <div v-if="!!review.COMMENTS" class="flex justify-end">
                                <v-checkbox dense
                                            v-model="review.IS_PROCESSED"
                                            @change="onProcessed(review)"
                                            label="Обработано"/>
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>

            <!--		cards if small screen -->
            <div v-else>
                <card v-for="(review, idx) in reviews" :key="idx"
                      class="margin-bottom-main">
                    <div class="mb-8 flex justify-space-between align-start flex-wrap-reverse flex-sm-nowrap">
                        <div class="mr-8 body-2">
                            <div class="mb-2 gray-text wh-space-nowrap">
                                {{ dateFormat(review.DATE_CREATE) }}
                            </div>
                            <div class="gray-text wh-space-nowrap">
                                ID сессии: {{ review.ID }}
                            </div>
                        </div>

                        <div v-show="!!review.COMMENTS && review.COMMENTS.TEXT && !review.IS_PROCESSED">
                            <div class="flex justify-end mb-4 mb-sm-0">
                                <v-icon color="#F35A45" class="mr-2">mdi-alert</v-icon>
                                <span class="wh-space-nowrap">Связаться с клиентом</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="review.ID && getPoll(review)" class="body-1 mb-2">
                        {{ getPoll(review).NAME }}
                    </div>
                    <!--<div v-if="review.ID && getPoll(review)" class="mb-8 body-2 gray-text">
                        {{getPoll(review).ID}}
                    </div>-->

                    <div v-for="(answer, index) in review.answers" :key="index">
                        <component class="question__component flex-space-between_column"
                                   :question="getQuestion(getPoll(review),answer)"
                                   :index="index+1"
                                   :answer="answer"
                                   :is="component(getQuestion(getPoll(review),answer))"
                        />
                    </div>

                    <div v-if="review.COMMENTS">
                        <div class="body-2 mb-2 gray-text">Сообщение</div>
                        <div v-html="review.COMMENTS.TEXT" class="body-1 mb-2"></div>
                    </div>
                    <div v-if="review.FILE" class="body-2 mb-8 mt-8">
                        <v-icon class="mb-1"> mdi-paperclip </v-icon> <a download :href="review.FILE"> {{ review.DETAIL_TEXT }} </a>
                    </div>

                    <div v-if="reviewWithContacts(review)">
                        <div class="body-2 mb-2 gray-text">Контактные данные</div>
                        <div v-if="review.PHONE" class="body-2 mb-2">
                            <a :href="'tel:'+review.PHONE">{{ review.PHONE }}</a>
                        </div>

                        <div v-if="review.EMAIL" class="body-2 mb-2">
                            <a :href="'mailto:'+review.EMAIL">{{ review.EMAIL }}</a>
                        </div>

                        <v-checkbox dense
                                    v-model="review.IS_PROCESSED"
                                    @change="onProcessed(review)"
                                    label="Обработано"/>
                    </div>
                </card>
            </div>

        </template>

        <template v-else>
            <div>
                <p class="text-center mt-10">
                    Пока нет отзывов за выбранный период
                </p>
            </div>
        </template>
    </div>
</template>

<script>
    import AnswerSmile from "./elements/answers/answer-smile";
    import AnswerSelect from "./elements/answers/answer-select";
    import AnswerStars from "./elements/answers/answer-stars";
    import AnswerLike from "./elements/answers/answer-like";
    import {crossDownload} from "@/utils/utils";
    import {end} from "@/utils/string";
    import Config from "@/config";
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

    export default {
        name: "journal",
        components: {AnswerLike, AnswerStars, AnswerSelect, AnswerSmile, PulseLoader},
        data: () => ({
            pollHash: null,
            openedPanel: -1,
            period: 7,
            allPolls: [],
            loading: false
        }),
        watch: {
            period(newVal, oldVal) {
                let period = this.periods.find(el => el.number === this.period);
                if (period && period.isPremium && !this.isPremium) {
                    this.$store.state.common.premiumPopUpDialog = true;
                    setTimeout(()=>{
                        this.period = Config.DEFAULT_PERIOD;
                    },300);
                }
                else if ( newVal !== oldVal ) this.fetchJournal();
            },
            pollHash() {
                this.fetchJournal();
            }
        },
        computed: {
            periods() {
                return this.$store.state.statPeriods;
            },
            isWindowXL() {
                return this.$store.getters.isWindowXL;
            },
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
            page() {
                return this.$store.state.page.AnswerListController;
            },
            reviews() {
                return this.page.reviews || null;
            },
            polls() {
                return this.page.polls || null
            },
            countNotProcessed() {
                return this.reviews.reduce((total, item) => total + (this.reviewWithContacts(item) && !item.IS_PROCESSED ? 1 : 0), 0);
            },
            textNotProcessed() {
                return end(this.countNotProcessed,
                    this.countNotProcessed + " отзыв требует обработки",
                    this.countNotProcessed + " отзыва требуют обработки",
                    this.countNotProcessed + " отзывов требуют обработки",
                );
            },
            isPremium() {
                return this.$store.getters.isPremium;
            },
        },
        methods: {
            reviewWithContacts(review) {
                return review.EMAIL || review.PHONE || review.COMMENTS;
            },
            onProcessed(review) {
                this.$store.dispatch('post', {
                    action: 'AnswerListController',
                    params: {
                        reviewId: review.ID,
                        isProcessed: review.IS_PROCESSED,
                    }
                }).then((res) => {
                }).catch((error) => {
                    //this.error = error ? error : 'Что-то пошло не так...';
                });
            },
            fetchJournal() {
                let params = {};
                if (this.pollHash) params.hash = this.pollHash;
                if (this.period) params.period = this.period;

                this.$store.dispatch('fetchPage', {
                    action: 'AnswerListController',
                    params
                }).then((res) => {
                }).catch((error) => {
                });
            },
            getPoll(review) {
                if (this.polls) return this.polls.find(el => el.ID === review.POLL)
                else return null;
            },
            getQuestion(poll, question) {
                if (poll && poll.questions)
                    return poll.questions.find(el => el.ID === question.QUESTION)
                else return null;
            },
            dateFormat(date) {
                if (date) {
                    let newDate = date.split(' ').reverse();
                    newDate[0] = newDate[0].split(":").splice(0, 2).join(':');
                    newDate = newDate.join(', ');
                    return newDate
                } else return null
            },
            toggleOpen(i) {
                if (this.openedPanel === i) this.openedPanel = -1;
                else this.openedPanel = i;
            },
            component(question) {
                const components = {
                    "STARS": AnswerStars,
                    "SMILE": AnswerSmile,
                    "SELECT": AnswerSelect,
                    "LIKE": AnswerLike,
                };

                if (!question || !question.TYPE || !components[question.TYPE]) {
                    return null;
                }

                return components[question.TYPE] || null;
            },
            answersCount(review) {
                if (this.polls) {
                    const poll = this.polls.find(el => el.ID === review.POLL)
                    return poll.questions?.length
                } else return 0

            },
            downloadXLS() {
                if (this.isPremium) {
                    let params = '?period=' + this.period;
                    if (this.pollHash)
                        params += "&hash=" + this.pollHash;
                    const url = "/api/ExportXLSController" + params;
                    crossDownload(url, 'qr-journal.xlsx')
                } else {
                    this.$store.state.common.premiumPopUpDialog = true;
                }
            }
        },
        mounted() {
            this.period = Config.DEFAULT_PERIOD;
            // this.allPolls = [...this.polls];
            this.allPolls = this.polls;
        }
    }
</script>

<style lang="scss">
    #account-app {
        .journal {
            .disabled {
                pointer-events:none;
                color: #bfcbd9;
                cursor: not-allowed;
                background-image: none;
                border-color: #d1dbe5;
            }

            &__card-mobile {
                &--new {
                    border: 4px solid $yellow3;
                }
            }

            &__expanded {
                &__id {
                    width: 70px;
                    white-space: nowrap;
                    text-align: center;
                }

                &__date {
                    width: 120px;
                    white-space: nowrap;
                }


                &__contact {
                    width: 190px;
                }

            }

            .question__component {
                margin-bottom: 25px;
                position: relative;
                @media screen and (min-width: $lg) {
                    margin-bottom: 0;
                    &::after {
                        content: '';
                        height: 1px;
                        width: 100%;
                        background: linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), $gray-light;
                        position: absolute;
                        bottom: 0;
                        border-radius: 100%;
                    }
                }

                .body-2:first-child {
                    margin-bottom: 16px;
                    @media screen and (min-width: $lg) {
                        margin-bottom: 0;
                    }
                }

                .answer-stars {
                    margin-bottom: 2px;
                    @media screen and (min-width: $lg) {
                        margin-bottom: 0;
                    }
                }

                .answer-select {
                    margin-bottom: 7px;
                    @media screen and (min-width: $lg) {
                        margin-bottom: 0;
                    }
                }
            }

            .v-expansion-panel-content__wrap {
                padding: 0 13px 14px 13px;
            }
        }

        .v-expansion-panels {
            filter: drop-shadow(0px 16px 24px rgba(103, 110, 134, 0.1));
        }

        .v-expansion-panel {
            .v-expansion-panel-header {
                @include transition();

                &:focus, &:hover {
                    background-color: $yellow4;

                    &::before {
                        opacity: 0;
                    }

                    &:last-child {
                        border-radius: inherit;
                    }
                }

                &__icon {
                    margin-left: auto;
                    position: absolute;
                    top: 17px;
                    left: 16px;
                }
            }
        }

        .v-expansion-panel--active {
            .v-expansion-panel-header__icon {
                margin-left: auto;
                position: absolute;
                top: 22px;
                left: 16px;
            }
        }

        .v-expansion-panel-header {
            padding: 16px;
            display: flex;
            align-items: center;
        }

        .v-expansion-panels:not(.v-expansion-panels--accordion):not(.v-expansion-panels--tile) > .v-expansion-panel--active {
            border-radius: 16px;

        }

        .w-193 {
            width: 193px;
        }

        .w-865 {
            width: 865px;
        }

    }


</style>
