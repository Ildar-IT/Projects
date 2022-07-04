<template>
    <div class="dashboard layout-top">
        <template v-if="page.countPolls">

            <template v-if="isWelcome">
                <h1>Поздравляем!</h1>
                <h2 class="mt-3">Вы зарегистрированы и Ваш QR-код готов к работе</h2>
                <div class="body-1 mt-10">
                    <p class="text-center">Попробуйте снова отсканировать его.</p>
                    <p class="text-center">Мы уже создали тестовый опрос, который будет открываться через этот
                        QR-код.</p>
                    <p class="text-center">И не забудьте отредактировать вопросы!</p>
                </div>
                <div class="flex-center mt-10 mb-10">

                    <!--- TODO если опросов более одного - это ведет не туда! --->

                    <v-btn large class="primary" @click="goEditFirstPoll">
                        <span>Редактировать вопросы</span>
                    </v-btn>
                </div>

                <v-divider/>

                <div class="body-1 mt-10 mb-10">
                    <p class="text-center">Ниже представлена статистика, которая будет пополняться данными, когда
                        начнут поступать ответы на вопросы.</p>
                </div>
            </template>

            <h1 class="margin-bottom-main">Ваша статистика</h1>

            <div class="block-max-width margin-bottom-small mt-10">
                <v-select
                        @change="refetchPage()"
                        item-text="NAME"
                        item-value="ID"
                        :items="allPolls"
                        v-model="currentPoll" />
            </div>
            <div class="block-max-width margin-bottom-main ">
                <v-select
                        @change="refetchPage()"
                        item-text="name"
                        item-value="number"
                        :items="periods"
                        v-model="period" />
            </div>

            <statistics-cards :countPolls="page.countPolls"
                              :lastActivity="page.lastActivity ? page.lastActivity : '—'"
                              :countAnswers="page.countAnswers"
                              :countReviews="page.countReviews"/>

            <div v-if="chartData">
                <moods-card :chartData="chartData" class="margin-bottom-main"/>
                <dynamics-card :chartData="chartData" :noCard="noCard"/>
            </div>

            <template v-if="!currentPoll && page.polls.length > 0" >
                <poll-card v-for="poll in page.polls"  :poll="poll" :key="poll.ID" />
            </template>
            <poll-card v-else-if="popularPoll" :poll="popularPoll" popular/>
        </template>
        <template v-else>
            <h1>Добро пожаловать!</h1>
            <p class="text-center mt-10">У Вас пока не создан ни один опрос. Создайте его, чтобы получать отзывы.</p>
            <div class="flex-center mt-10">
                <v-btn large class="primary" @click="goNewPoll">
                    <span>Создать опрос</span>
                </v-btn>
            </div>
        </template>
    </div>
</template>

<script>
    import BarChart from "./elements/bar-chart";
    import PieChart from "./elements/pie-chart";
    import MoodsCard from "./elements/moods-card";
    import PollCard from "./elements/poll-card";
    import StatisticsCards from "./elements/statistics-cards";
    import DynamicsCard from "./elements/dynamics-card";
    import Config from "@/config";

    export default {
        name: "dashboard",
        components: {DynamicsCard, StatisticsCards, PollCard, MoodsCard, PieChart, BarChart},
        data: () => ({
            currentPoll: null,
            period: null,
            // select: this.periods[0],
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: 25,
                            // max: this.chartdata.max,
                            // min:  this.chartdata.min,

                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            display: true
                        }
                    }]
                },
                legend: {
                    display: false
                },
                responsive: true,
                maintainAspectRatio: false,
            },
        }),
        watch: {
            // period(newVal, oldVal) {
            //     let period = this.periods.find(el => el.number === this.period);
            //     if (period && period.isPremium && !this.isPremium) {
            //         this.$store.state.common.premiumPopUpDialog = true;
            //         setTimeout(()=>{
            //             this.period = Config.DEFAULT_PERIOD;
            //         },300);
            //     }
            //     else if ( newVal !== oldVal ) this.refetchPage();
            // },
            // currentPoll(newVal, oldVal) {
            //     if ( newVal !== oldVal ) this.refetchPage();
            // }
        },
        computed: {
            user() {
              return this.$store.state.session.user
            },
            periods() {
                return this.$store.state.statPeriods;
            },
            isWelcome() {
                return !!this.$route.query?.welcome;
            },
            page() {
                return this.$store.state.page.DashboardController;
            },
            allPolls() {
                let allPolls = JSON.parse(JSON.stringify(this.page.polls)) || [];
                allPolls.push({NAME: 'Все опросы', ID: ''});
                return allPolls;
            },
            popularPoll() {
                return this.page.popularPoll;
            },
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
            chartData() {
                return this.page.chartData;
            },
            noCard() {
                return !this.page.countAnswers;
            },
            isPremium() {
                return this.$store.getters.isPremium;
            },
        },
        methods: {
            goEditFirstPoll() {
                // TODO если опросов более одного - это ведет не туда!
                this.$router.push({name: 'poll-page-edit', params: {hash: this.popularPoll?.QRHASH}});
            },
            goNewPoll() {
                this.$router.push({name: 'poll-page-new'});
            },
            refetchPage() {
                    if (this.period && this.period.isPremium && !this.isPremium) {
                        this.$store.state.common.premiumPopUpDialog = true;
                        setTimeout(()=>{
                            this.period = Config.DEFAULT_PERIOD;
                        },300);
                        return
                    }
                let params =  this.period ? {'period': this.period} : Config.DEFAULT_PERIOD
                params.poll = this.currentPoll;
                this.$store.dispatch('fetchPage', {
                    action: 'DashboardController',
                    params: params
                }).then(() => {
                }).catch((error) => {
                });
            },
        },
        mounted() {
            this.user['UF_SETTINGS'] && this.user['UF_SETTINGS']['statsPeriod'] ? this.period = Number(this.user['UF_SETTINGS']['statsPeriod']) : this.period = Config.DEFAULT_PERIOD;
            this.user['UF_SETTINGS'] && this.user['UF_SETTINGS']['statsPoll'] ?  this.currentPoll = this.user['UF_SETTINGS']['statsPoll'] : "";
            if (!this.currentPoll)  this.currentPoll = this.allPolls.find(el=> el.ID == '').ID;
            let storagePeriod = localStorage.getItem(Config.STORAGE_STATS_PERIOD);
            //storagePeriod ? this.period = this.periods.find(el => el.number == storagePeriod).number  : this.period = Config.DEFAULT_PERIOD;
            let statsPoll = localStorage.getItem(Config.STORAGE_STATS_POLL);
           // this.currentPoll = statsPoll
        }
    }
</script>

<style lang="scss">
</style>
