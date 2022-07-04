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
						v-model="currentPollId"
						item-text="NAME"
						item-value="ID"
						:items="allPolls"
						@change="refetchPage"/>
			</div>
			<div class="block-max-width margin-bottom-main ">
				<v-select
						v-model="periodNumber"
						item-text="name"
						item-value="number"
						:items="periods"
						@change="onChangePeriod"/>
			</div>

			<suspended-message v-if="isSuspendedPoll" class="margin-top-main margin-bottom-main"/>
			<template v-else>

				<statistics-cards :countPolls="page.countPolls"
								  :lastActivity="page.lastActivity ? page.lastActivity : '—'"
								  :countAnswers="page.countAnswers"
								  :countReviews="page.countReviews"/>

				<div v-if="chartData">
					<moods-card :chartData="chartData" class="margin-bottom-main"/>
					<dynamics-card :chartData="chartData" :noCard="noCard"/>
				</div>

				<template v-if="!currentPollId && polls && polls.length">

					<poll-card v-for="poll in page.polls" :poll="poll" :key="poll.ID"/>
					<!--<poll-card v-else-if="popularPoll && polls.length>1" :poll="popularPoll" popular/>-->
				</template>

			</template>

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
    import SuspendedMessage from "@/components/elements/suspended-message";
    import DynamicsCard from "./elements/dynamics-card";
    import Config from "@/config";

    export default {
        name: "dashboard",
        components: {DynamicsCard, StatisticsCards, PollCard, MoodsCard, PieChart, BarChart, SuspendedMessage},
        data: () => ({
            currentPollId: null,
            periodNumber: null,
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
            /*periodNumber(newVal, oldVal) {
                let period = this.periods.find(el => el.number === this.periodNumber);
                if (period && period.isPremium && !this.isPremium) {
                    // выбрали период, который доступен только в премиуме
                    this.$store.state.common.premiumPopUpDialog = true;
                    setTimeout(() => {
                        this.periodNumber = Config.DEFAULT_PERIOD;
                    }, 300);
                }
                //else if (oldVal && newVal !== oldVal) this.refetchPage();
            }*/
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
            popularPoll() {
                return this.page.popularPoll;
            },
            allPolls() {
                // клонируем, чтобы добавить "Все опросы"
                let allPolls = JSON.parse(JSON.stringify(this.polls));
                if (allPolls.length > 1) allPolls.unshift({NAME: 'Все опросы', ID: ''});
                return allPolls;
            },
            polls() {
                return this.page.polls;
            },
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
            isDelegate() {
                return this.poll?.USER + '' !== this.user.ID + '';
            },
            isSuspendedPoll() {
                return this.$store.getters.isSuspended && (!this.isDelegate || !this.currentPollId);
            },
            poll() {
                return this.polls?.find(el => el.ID === this.currentPollId);
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
            onChangePeriod() {
                let period = this.periods.find(el => el.number === this.periodNumber);
                if (period && period.isPremium && !this.isPremium) {
                    // выбрали период, который доступен только в премиуме
                    this.$store.state.common.premiumPopUpDialog = true;
                    setTimeout(() => {
                        this.periodNumber = Config.DEFAULT_PERIOD;
                    }, 300);
                } else this.refetchPage();
            },
            refetchPage() {
                let params = this.periodNumber ? {'period': this.periodNumber} : Config.DEFAULT_PERIOD;
                params.poll = this.currentPollId;
                this.$store.dispatch('fetchPage', {
                    action: 'DashboardController',
                    params: params
                }).then(() => {
                }).catch((error) => {
                });
            },
        },
        mounted() {
            // из установок пользователя берем предустановку поля "Опрос"
            //console.log("POLL: "+this.user['UF_SETTINGS']['statsPollId']);
            if (this.user['UF_SETTINGS'] && this.user['UF_SETTINGS']['statsPollId']) {
                if (this.polls.some(el => el.ID === this.user['UF_SETTINGS']['statsPollId'])) this.currentPollId = this.user['UF_SETTINGS']['statsPollId'];
                else this.currentPollId = null;
            }
            if (!this.currentPollId && this.polls.length) this.currentPollId = this.polls[0].ID;

            // из сохраненных установок пользователя берем предустановку поля "Период"
            this.periodNumber = Config.DEFAULT_PERIOD;
            if (this.user['UF_SETTINGS'] && this.user['UF_SETTINGS']['statsPeriod']) {
                if (this.periods.some(el => Number(el.number) === Number(this.user['UF_SETTINGS']['statsPeriod']))) this.periodNumber = Number(this.user['UF_SETTINGS']['statsPeriod']);
            }

            // отказались от storage в пользу бд (по просьбе клиента)
            /*let statsPollId = localStorage.getItem(Config.STORAGE_STATS_POLL);
            this.currentPollId = statsPollId;
            let storagePeriod = localStorage.getItem(Config.STORAGE_STATS_PERIOD);
            storagePeriod ? this.periodNumber = this.periods.find(el => el.number == storagePeriod).number  : this.periodNumber = Config.DEFAULT_PERIOD;*/
        }
    }
</script>

<style lang="scss">
</style>
