<template>
	<div class="questions mb-8 mb-md-16 mt-lg-0 mt-8 px-4 px-lg-0">
		<div class="padding-bottom-main beige-text">
			<h2 class="text-center">
				{{questionsTitle}}
			</h2>
		</div>

		<card class="mx-auto text-center">
			<v-form class="mx-auto mb-8"
					ref="questionForm">
				<!--                Name-->
				<v-text-field :placeholder="placeHolders.name"
							  class="text-center mb-3 mt-0 pt-2"
							  :rules="validationRules.name"
							  single-line
							  v-model="form.name"
				>

				</v-text-field>

				<!--         Phone and  Email -->
				<v-text-field :placeholder="placeHolders.contact" class="text-center mb-10"
							  single-line
							  v-model="form.contact"
							  :rules="validationRules.contact"
				>

				</v-text-field>

				<v-btn class="mt-2 mt-md-6 mx-auto btn--primary d-flex align-center d-flex align-end questions__btn btn-with-svg shadow"
					   block dark
					   @click="submit">
					<svgicon name="smartphone" width="24" height="24" original :fill="false" color="white"
							 class="mr-4"></svgicon>
					<span>{{buttonContent}}</span>
				</v-btn>

			</v-form>

			<router-link to="/privacy-policy" target="_blank" class="beige-text body-2 hover-link hover-link_primary">
				{{placeHolders.policy}}&nbsp;
			</router-link>
		</card>

		<thank-you v-model="dialog" ref="thankYou" :message="this.message" :title="this.messageTitle"/>
	</div>
</template>

<script>
    import thankYou from "@/components/elements/thankYou";

    export default {
        name: 'questions',
        components: {thankYou},
        data() {
            return {
                messageTitle: '',
                message: 'Ожидайте звонка в самое ближайшее время',
                dialog: false,
                validationRules: {
                    name: [
                        v => v.length >= 2 ? true : (this.dialogs?.validationErrorName ? this.dialogs?.validationErrorName : 'Слишком короткое имя'),
                        v => RegExp(/^[a-zA-Zа-яА-Я]/g).test(v) ? true : (this.dialogs?.invalidName ? this.dialogs.invalidName : 'Имя может содержать только буквы'),
                    ],
                    contact: [
                        // v => v.length < 1 ? true : 'Введите телефон или email',
                        v => (/.+@.+\.+[a-zA-Z]{2,}/.test(v) || !!(/\+7|7|8 \d{10}/).test(v)) ? true : (this.dialogs?.validationError ? this.dialogs?.validationError : "Неверный телефон или email"),
                    ]
                },
                form: {
                    name: '',
                    contact: '',
                },
            }
        },
        computed: {
            common() {
                // return this.$store.state.common;
            },
            page() {
                // return this.$store.state.page.HomeController;
            },
            commonText() {
                return this.$store.state.common.textsCommon;
            },
            questionsTitle() {
                return this.commonText.find(el => el.CODE == "QUESTIONS_TITLE").PREVIEW_TEXT
            },
            dialogs() {
                return this.$store.state.common?.dialogs || {};
            },
            pageButtons() {
                return this.$store.state.common?.buttons || {};
            },
            buttonContent() {
                return this.pageButtons?.callback ? this.pageButtons?.callback : 'Свяжитесь со мной'
            },
            placeHolders() {
                return this.$store.state.common.formPlaceholders || {};
            },
            isWindowXS() {
                return this.$store.getters.isWindowXS;
            },
            isWindowSM() {
                return this.$store.getters.isWindowSM;
            },
            isWindowMD() {
                return this.$store.getters.isWindowMD;
            },
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
            services() {
                return [
                    {
                        icon: 'clean',
                        name: 'Уборка',
                    },
                    {
                        icon: 'flower',
                        name: 'Озеленение',
                    },
                    {
                        icon: 'repairs',
                        name: 'Ремонт',
                    },
                    {
                        icon: 'video-report',
                        name: 'Видеоотчёт',
                    }

                ]
            },
        },
        methods: {
            validate() {
                return this.$refs.questionForm.validate();
            },
            reset() {
                this.$refs.questionForm.reset();
            },
            submit() {
                if (!this.validate()) return;
                this.$store.dispatch('post', {
                    action: 'HomeFeedbackController',
                    params: {'name': this.form.name, 'phoneoremail': this.form.contact}
                }).then((response) => {
                    this.comment = '';
                    this.messageTitle = this.dialogs?.thanks ? this.dialogs?.thanks : 'Спасибо',
                        this.message = this.dialogs?.weWillCall ? this.dialogs?.weWillCall : "Ожидайте звонка в самое ближайшее время";
                    this.openThankYou();
                }).catch((error) => {
                    console.log('error', error);
                    this.messageTitle = this.dialogs?.error ? this.dialogs?.error : 'Ошибка',
                    this.message = this.dialogs?.smthWentWrong ? this.dialogs?.smthWentWrong : 'Что-то пошло не так. Попробуйте еще раз.'
                    this.openThankYou();
                    this.requestStatus = 'error';
                }).finally(() => {
                    setTimeout(() => {
                        this.requestStatus = null;
                    }, 5000)
                })
                // this.openThankYou();
            },
            openThankYou() {
                this.$refs.thankYou.showThankyou();
            }
        },


    }
</script>

<style lang="scss">
	.questions {
		min-width: 360px;

		.card {
			max-width: 826px;
			box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.15) !important;
		}

		button.questions__btn.btn--primary {
			height: 48px;
		}

		&__btn {
			svg {
				circle {
					fill: $white;
				}
			}
		}

		.v-form {
			max-width: 264px;
			width: 100%;
		}

		.v-text-field {
			input {
				color: $white;
				font-size: 18px;
				line-height: 23px;
				text-align: center;
				padding-bottom: 13px;

				&::placeholder {
					color: inherit;
					opacity: 1;
					text-align: center;
				}
			}
		}

		.v-text-field > .v-input__control > .v-input__slot::before {
			border: 1px solid $grey2;
			background: $grey2;
			opacity: 1;
		}

		.v-text-field > .v-input__control > .v-input__slot::after {
			background: $beige5;
		}

		.theme--light.v-text-field:not(.v-input--has-state):hover > .v-input__control > .v-input__slot::before {
			border-color: $grey2;
		}

		.v-input__append-inner {
			display: none !important;
		}
	}

</style>
