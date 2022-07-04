<template>
	<div v-if="poll" class="poll-card margin-bottom-main"
		 :class="{'delegated':isDelegated}"
		 @click="redirectToPoll(poll)">
		<card>
			<div v-if="isPollLimited || poll.STATUS === 'Y'" class="d-flex align-center justify-center mb-4 red-text">
				<svgicon name="alert-circle" :fill="false" color="#F35A45" width="24" height="24" class="mr-4"/>
				<span class="body-2 red-text">Опрос приостановлен</span>
			</div>

			<div v-if="(!!poll.DATE_START && !!poll.DATE_START && poll.STATUS !== 'Y')"
				 class="d-flex align-center justify-center mb-4 gray-text">
				<svgicon name="hourglass" :fill="false" color="#B3B8CB" width="24" height="24" class="mr-3"/>
				<span class="body-2"> {{ pollLifespan }}</span>
			</div>

			<div v-if="poll.QRHASH_IS_PUBLISHED === 'Y'" class="d-flex align-center justify-center mb-4 gray-text">
				<svgicon name="qrcode" :fill="false" color="#B3B8CB" width="24" height="24" class="mr-4"/>
				<span class="body-2">Приобретён QR-код</span>
			</div>

			<div v-if="(popular && poll.countReviews)" class="flex-center mb-4">
				<svgicon name="award" :fill="false" color="#000" height="24" class="mr-1"/>
				Популярный опрос
			</div>

			<v-row>
				<v-col cols="12" md="6" offset-md="3" class="pt-0">
					<h5 class="flex-center text-center" v-html="poll.NAME"></h5>
				</v-col>
				<v-col cols="12" md="3" class="pt-0">
					<div class="flex justify-center justify-md-end">
						<span v-if="isDelegated" class="d-flex gray-text poll-card__owner"
							  :title="'Опрос передан Вам в управление от пользователя '+poll.owner.LOGIN">
							<svgicon name="arrow-left" :fill="false" color="#B3B8CB" height="24" class="mr-1"/>
							{{poll.owner.LOGIN}}
						</span>
            <svgicon v-if="isQlean" width="40" height="30" original name="qlean-broom"/>
					</div>
				</v-col>
			</v-row>


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
    import Templates from "../templates";

    export default {
        name: "poll-card",
        components: {Templates, ProgressBarVotes},
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
            pollLifespan() {
                const now = new Date();
                const dateStop = new Date(this.poll.DATE_STOP);
                //console.log("dateStop", dateStop);
                //console.log("now +", new Date(now.getTime() + 60 * 60 * 24 * 1000));
                //console.log("now", now);
                if (dateStop.getTime() <= new Date(now.getTime() + 60 * 60 * 24 * 1000).getTime()) { // Если до завершения опроса осталось менее 24 ч
                    let diff = dateStop.getTime() - now.getTime();
                    //console.log("diff", diff)
                    // let min = Math.floor((diff / 1000 / 60) % 60);
                    // let hh =  Math.floor((diff   / 1000 / 3600 ) % 24)
                    // return hh + ":" + min;
                    return new Date(new Date(diff).getTime() - 1000 * 60 * 60 * 2).toISOString().slice(11, 16)
                }
                return this.poll.DATE_START + " - " + this.poll.DATE_STOP
            },
            isDelegated() {
                return this.user.ID + '' !== this.poll.USER + '';
            },
            /*ratingQuestons() {
                if (this.poll.questions)
                    return this.poll.questions.filter(question => question.TYPE !== 'SELECT');
                else return [];
            },
            optionQuestions() {
                if (this.poll.questions)
                    return this.poll.questions.filter(question => question.TYPE === 'SELECT');
                else return [];
            },*/
            textCountReviews() {
                return this.poll.countReviews + " " + end(this.poll.countReviews, "респондент", "респондента", "респондентов");
            },
            isPollLimited() {
                // достигли ли максимума сессия (просмотров), разрешенных тарифом?
                return this.$store.getters.tariff?.MAX_REVIEWS && this.poll.countReviews >= this.$store.getters.tariff?.MAX_REVIEWS;
            },
            user() {
                return this.$store.state.session.user;
            },
            isQlean() {
              return this.poll.TYPE === 'Qlean';
            },
        },
        methods: {
            redirectToPoll(poll) {
                this.$router.push({name: 'poll-page', params: {hash: poll.QRHASH}});
            },
        },
        created() {
            if (this.poll.DATE_START) {
                this.poll.DATE_START = this.poll.DATE_START.split(".").reverse().join("-");
            }
            if (this.poll.DATE_STOP) {
                this.poll.DATE_STOP = this.poll.DATE_STOP.split(".").reverse().join("-");
            }
        }
    }
</script>

<style lang="scss">
	.poll-card {
		cursor: pointer;
	}
</style>
