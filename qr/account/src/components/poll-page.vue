<template>
    <div class="poll-page layout-top">
        <template v-if="isNew">
            <div class="text-center">
                <h4>Опрос добавлен!</h4>
                <p class="body-1 mt-5 mb-15">Ваш новый QR-код готов к работе</p>
            </div>

            <v-row class="ma-0 flex-center mt-8">
                <v-col cols="12" sm="7" md="4">
                    <div class="margin-bottom-main">
                        <qr-card :image="page.item.QRHASH_IMAGE" :hash="page.item.QRHASH" :link="page.item.QRHASH_URL"/>
                    </div>
                </v-col>
            </v-row>

            <h6 v-if="!isWindowLG" class="gray-text mb-8 text-center">
                Опрос номер #{{ poll.ID }}
            </h6>
            <h1 class="mb-8" v-html="poll.NAME"></h1>
            <h6 v-if="isWindowLG" class="gray-text margin-bottom-main text-center">
                Опрос номер #{{ poll.ID }}
            </h6>
        </template>
        <template v-else>
            <card-warning v-if="isPollLimited"
                          class="margin-bottom-main"
                          :title="premiumMessage.title"
                          :text="premiumMessage.text"
                          :btnText="tpremiumMessage.btnText"/>

            <h6 v-if="!isWindowLG" class="gray-text mb-8 text-center">
                Опрос номер #{{ poll.ID }}
            </h6>
            <h1 class="mb-8" v-html="poll.NAME"> 
            </h1>
            <h6 v-if="isWindowLG" class="gray-text margin-bottom-main text-center">
                Опрос номер #{{ poll.ID }}
            </h6>

            <v-row class="ma-0 flex-center mt-8">
                <v-col cols="12" sm="7" md="4">
                    <div class="margin-bottom-main">
                        <qr-card :image="page.item.QRHASH_IMAGE" :hash="page.item.QRHASH" :link="page.item.QRHASH_URL"/>
                    </div>
                </v-col>
            </v-row>
        </template>

        <v-divider class="mb-8"/>

        <h4 class="margin-bottom-main text-center gray-text">
            Статистика
        </h4>

        <div class="block-max-width margin-bottom-main">
            <v-select
                    item-text="name"
                    item-value="number"
                    :items="periods"
                    v-model="period" />
        </div>

        <statistics-cards :countAnswers="poll.countAnswers"
                          :countReviews="poll.countReviews"/>

        <div v-if="chartData" class="anti-margin-row">
            <v-row class="ma-0">
                <v-col cols="12" md="6" lg="4" class="ma-0 pa-0">
                    <div class="margin-right-small margin-left-small margin-bottom-main">
                        <div class="margin-bottom-main">
                            <moods-card :chartData="chartData" :small="true"/>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="6" lg="8" class="ma-0 pa-0">
                    <div class="margin-right-small margin-left-small margin-bottom-main">
                        <dynamics-card :hash="poll.QRHASH" :period="period" :chartData="chartData" :small="true"/>
                    </div>
                </v-col>
            </v-row>
        </div>

        <h4 class="margin-bottom-small text-center gray-text">
            Вопросы
        </h4>

        <template v-if="poll.questions && poll.questions.length">
            <div v-for="(question,index) of poll.questions" :key="index" class="margin-bottom-main">
                <question-card :hash="poll.QRHASH" :question="question" :index="index"/>
            </div>
        </template>
        <div v-else class="text-center margin-bottom-main">
            <p class="body-1">Пока вопросы не добавлены.</p>
        </div>

        <div class="flex-center margin-bottom-main">
            <v-btn large class="primary" @click="redirectToEdit">
                <svgicon name="pen" color="white" width="24" height="24" class="mr-5"/>
                <span>Редактировать<span v-if="!isWindowXS"> опрос</span></span>
            </v-btn>
        </div>

        <!--<div class="anti-margin-row">
            <v-row class="ma-0">
                <v-col cols="12" sm="6" md="4" class="ma-0 pa-0">
                    <div class="margin-right-small margin-left-small margin-bottom-main">
                        <div class="margin-bottom-main">
                            <qr-card :image="page.item.QRHASH_IMAGE"/>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" sm="6" md="4" class="ma-0 pa-0">
                    <div class="margin-right-small margin-left-small margin-bottom-main">
                        <link-card :link="page.item.QRHASH_URL"/>
                    </div>
                </v-col>
            </v-row>
        </div>-->

        <!--<v-row class="ma-0 flex-center mt-8">
            <v-col cols="12" sm="6" md="4">
                <div class="margin-bottom-main">
                    <qr-card :image="page.item.QRHASH_IMAGE" :link="page.item.QRHASH_URL"/>
                </div>
            </v-col>
        </v-row>-->

        <h4 class="margin-bottom-main text-center gray-text">
            Готовые решения с QR-кодом
        </h4>

        <templates-cards :cards="page.templates" :poll="this.page.item" :formats="page.formats" :styles="page.styles"/>

        <v-btn v-if="isWindowLG" class="primary btn-fixed-big" @click="redirectToEdit">
            <svgicon name="pen" color="white" width="24" height="24" class="mr-2"/>
            <span>Редактировать</span>
        </v-btn>
        <v-btn v-else @click="redirectToEdit" fab class="primary btn-fixed-small">
            <svgicon name="pen" width="24" height="24" original/>
        </v-btn>
    </div>
</template>

<script>
    import PollCard from "./elements/poll-card";
    import StatisticsCards from "./elements/statistics-cards";
    import DynamicsCard from "./elements/dynamics-card";
    import PieChart from "./elements/pie-chart";
    import MoodsCard from "./elements/moods-card";
    import QuestionCard from "./elements/question-card";
    import QrCard from "./elements/qr-card";
    import LinkCard from "./elements/link-card";
    import TemplatesCards from "./elements/templates-cards";
    import CardWarning from './elements/card-warning';
    import Config from "@/config";

    export default {
        name: "poll-page",
        components: {
            TemplatesCards,
            LinkCard, QrCard, QuestionCard, MoodsCard, PieChart, DynamicsCard, StatisticsCards, PollCard, CardWarning
        },
        data: () => ({
            period: 7,
            premiumMessage: {
                title: 'Ваш опрос приостановлен!',
                text: 'Вы достигли максимального количества респондентов в этом опросе. Оформите «Премиум» подписку, чтобы пользоваться сервисом без ограничений.',
                btnText: 'Подробнее'
            }
        }),
        computed: {
            periods() {
                return this.$store.state.statPeriods;
            },
            isNew() {
                return !!this.$route.query?.new;
            },
            isWindowXS() {
                return this.$store.getters.isWindowXS;
            },
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
            isWindowXL() {
                return this.$store.getters.isWindowXL;
            },
            page() {
                return this.$store.state.page.PollItemController;
            },
            poll() {
                return this.page.item;
            },
            isPollLimited() {
                // достигли ли максимума сессия (просмотров), разрешенных тарифом?
                return this.$store.getters.tariff?.MAX_REVIEWS && this.poll.countReviews >= this.$store.getters.tariff?.MAX_REVIEWS;
            },
            chartData() {
                return this.poll.chartData;
            },
            cards() {
                return this.$store.state.templateCards;
            },
            isPremium() {
                return this.$store.getters.isPremium;
            },
             formats() {
                return this.$store.state.page.PollItemController.formats;
            }
        },
        watch: {
            period(newVal, oldVal) {
                let period = this.periods.find(el => el.number === this.period);
                if (period && period.isPremium && !this.isPremium) {
                    this.$store.state.common.premiumPopUpDialog = true;
                    setTimeout(()=>{
                        this.period = Config.DEFAULT_PERIOD;
                    },300);
                }
                else if ( newVal !== oldVal ) this.refetchPage();
            }
        },
        methods: {
            refetchPage() {
                this.$store.dispatch('fetchPage', {
                    action: 'PollItemController',
                    params: {'hash': this.poll.QRHASH, 'period': this.period}
                }).then((res) => {
                }).catch((error) => {
                });
            },
            redirectToEdit() {
                this.$router.push({name: 'poll-page-edit'})
            },
        },
        mounted() {
            this.period = Config.DEFAULT_PERIOD;
        }
    }
</script>

<style lang="scss">
    .poll-page {

    }
</style>
