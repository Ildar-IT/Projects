<template>
	<div class="question mx-auto">
		<!--        <div class="pb-4 h7 gray-text" v-html="page.poll.NAME"></div>-->

		<transition name="route" mode="out-in">
			<component :is="component" :question="question" :key="'q' + question.ID" class="question__component"
					   @click="onAnswer"/>
		</transition>

		<v-stepper class="mt-4 question__stepper" :value="displayedStep" id="stepper">
			<v-stepper-header>
				<template v-for="(item, idx) of questions">
					<v-stepper-step class=""
									:step="idx+1"
									:complete="idx+1<displayedStep">
						<!--						<svgicon v-if="idx+1<displayedStep" width='36' name="done"/>-->
					</v-stepper-step>
					<v-divider v-if="idx!==questions.length-1"></v-divider>
				</template>
			</v-stepper-header>
		</v-stepper>
		<v-dialog
				v-model="isError"
				max-width="500px"
		>
			<v-card>
				<v-card-title>
					<span>Что-то пошло не так...</span>
					<v-spacer></v-spacer>
				</v-card-title>
				<v-card-text>
					К сожалению, сейчас не получилось принять ваш ответ. Пожалуйста, попробуйте ещё раз. <br/>
					<i>{{ error }}</i>
				</v-card-text>
				<v-card-actions class="flex-center">
					<v-btn
							@click="error = null"
					>
						Ок
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<!--    <Feedback/>-->
	</div>
</template>

<script>
    import QuestionLike from "./elements/questions/question-like";
    import QuestionSelect from "./elements/questions/question-select";
    import QuestionSmile from "./elements/questions/question-smile";
    import QuestionStars from "./elements/questions/question-stars";
    import Feedback from "./feedback";

    export default {
        name: "questions",
        components: {QuestionStars, QuestionSmile, QuestionSelect, QuestionLike, Feedback},
        data: () => ({
            //считаем с единицы - первый вопрос
            displayedStep: 1,
            displayedId: null,
            error: null,
            answerSum: 0
        }),
        computed: {
            page() {
                return this.$store.state.page.ReviewController;
            },
            component() {
                const components = {
                    "STARS": QuestionStars,
                    "SMILE": QuestionSmile,
                    "SELECT": QuestionSelect,
                    "LIKE": QuestionLike,
                };

                if (!this.question || !this.question.TYPE || !components[this.question.TYPE]) {
                    return null;
                }

                return components[this.question.TYPE] || null;
            },
            canGoToReviewLinks() {
                return this.answerSum > 0 && !!this.page.reviewLinks;
            },

            isError() {
                return !!this.error;
            },

            question() {
                if (this.questions)
                    return this.questions.find(el => parseInt(el.ID) === parseInt(this.displayedId));
            },
            questions() {
                return this.$store.state.page.ReviewController.questions;
            }
        },
        methods: {
            onAnswer(answer) {

                let params = {
                    hash: this.$route.params.hash,
                    questionId: answer.id,
                    answer: answer.answer,
                    //pollId: this.page.poll.ID,
                    // type: this.question.TYPE,
                };

                this.$store.dispatch('post', {
                    action: 'ReviewController',
                    params
                }).then((res) => {
                    // считаем сумму "положительных" ответов
                    let result = res.page.ReviewController?.answer?.IS_POSITIVE;
                    this.answerSum += Number(result);

                    setTimeout(() => {
                        this.displayedStep++;
                        if (this.displayedStep - 1 === this.questions.length) {
                            // достигли конца опроса
							// идем далее в зависимости от суммы положительных ответов
                            if (this.canGoToReviewLinks) {
                                this.$router.push({name: 'feedback', params: {isPositive: this.answerSum}});
                            } else if (this.answerSum <= 0) {
                                this.$router.push({name: 'feedback', params: {isPositive: this.answerSum}});
                            } else if (this.answerSum > 0) {
                                this.$router.push({name: 'feedback-finish2'})
                            }
                            //console.log(this.displayedStep - 1, this.displayedStep )
                        } else {
                            // берем следующий вопрос
                            this.displayedId = this.questions[this.displayedStep - 1].ID;
                            ///this.$router.push({name: 'question', params: {id: this.displayedId}});
                        }
                    }, 150);
                }).catch(() => {
                    // this.error = error ? error : 'Всё плохо!';
                })
            }
        },
        created() {

            if (this.page.poll.STATUS == 'Y') {
                this.$router.replace({name: 'suspended'});
                return;
            }

            //Валидируем наличие вопросов
            if (!this.questions || !this.questions.length) {
                this.$router.replace({name: 'hello'});
                return;
            }

            // есть ли у нас хэш опроса?
            let hash = this.$route.params.hash;
            if (!hash) {
                this.$router.replace({name: 'hello'});
                return;
            }

            // определяем ID вопроса, который показываем
			// todo теперь вроде уже не берем из параметров URL??
            let id = this.$route.params.id;
            if (!id || !id.match(/\d+/)) {
                id = this.questions[0].ID;
                /*this.$router.replace({
                    name: 'question', params: {
                        hash,
                        id,
                    }
                });*/
            }
            this.displayedId = id;

            // ставим шаг степпера по индексу текущего вопроса
            let step = this.questions.indexOf(this.question);
            if (step === -1) {
                this.$router.replace({name: 'home', params: {hash}});
                return;
            }
            this.displayedStep = step + 1;
        }
    }
</script>

<style lang="scss">
	#review-app.v-application {
		.question {
			max-width: 800px;

			&__component {
				/*height: 141px;*/
			}

			#stepper {
				.v-stepper .v-stepper__step__step .v-icon {
					color: #6CC237 !important;
					background: linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), #87F345 !important;
					border-radius: 100%;
					border: 2px solid #CFF7CC !important;
				}
			}

			.v-stepper__step--complete {
				.v-stepper__step__step .primary {
					background: red;
				}

				.v-icon {
					color: #6CC237 !important;
					background: linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), #87F345 !important;
					border-radius: 100%;
					border: 2px solid #CFF7CC !important;
					height: 24px;
					width: 24px;
				}
			}

			&__stepper {
				width: 100%;
				background: transparent;
				margin-right: auto;
				margin-left: auto;
				@include up($sm) {
					max-width: 300px;
				}

				.v-stepper__header {
					height: 60px;
				}

				&--complete {
					color: $color-green !important;
					background-color: $color-good !important;
				}

				.primary {
					color: $gray !important;
					background-color: $light-gray !important;
					border-color: $light-gray !important;
				}
			}
		}
	}
</style>