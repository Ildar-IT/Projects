<template>
	<div id="balance" class="balance text-center margin-top-main padding-bottom-main d-flex flex-column px-4 pb-0 pb-lg-15">
		<v-container>
			<h2 class="beige-text margin-bottom-main">{{pageContent.title || "Пополнить баланс"}}</h2>
			<v-row class="margin-bottom-main">
				<v-col cols="12" class="mx-auto balance__wrapper ">
					<v-card class="mx-auto card-light pa-8 pa-md-8" elevation="0">
						<v-card-actions>
							<div class="mx-auto text-center">
								<v-card-title class="mx-auto text-center grey-text">
									{{ pageContent.yourBalance || 'Ваш баланс:'}} {{ user.BALANCE? user.BALANCE : '0' | nf }} &#8381;
								</v-card-title>
								<!--                            <v-text-field placeholder="Укажите сумму" class="text-center pt-0 mt-0"
																		  hide-details="auto"/>-->
								<v-text-field-money
										v-model="form.amount"
										:properties="{
									      suffix: '',
									      placeholder:  pageContent.amount || 'Укажите сумму',
									      'hide-details': 'auto'
					                    }"
										:options="{
								                 inputMask: '### ### ##0,00 руб.',
								                 outputMask: '### ### ##0,00 руб.',
								                 precision: 0,
								                 length: 11,
								                 empty: null,
							                    }"/>

								<v-col col="12" class="my-8 pa-0">
									<v-btn type="submit" class="mx-auto btn--secondary large flex align-center balance__pay-btn shadow"
									       block @click="submit"
									       dark>
										<pulse-loader v-if="loading" :loading="true" color="#fff" size="5px"/>
										<span class="d-flex align-center" v-else> <svgicon name="money" width="24"
										                                                   height="24" original class="mr-4"
										                                                   :fill="false"
										                                                   color="#fff"></svgicon> {{ pageButtons.pay || 'Пополнить'}} </span>
									</v-btn>
								</v-col>

								<router-link to="/privacy-policy" target="_blank">
									<p class="body-2 hover-link_dark grey-text mb-0 px-8">
										{{ placeHolders.policy || 'Наша политика обработки персональных данных' }}
									</p>
								</router-link>

							</div>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>

			<h2 class="text-center beige-text">
				{{ pageContent.lastTransactions || 'Последние операции'}}
			</h2>
			<v-row>
				<v-col cols="12" md="8" lg="6" class="mx-auto pt-0">
					<template v-if="transactions && transactions.length">

	<!--					<div class="d-flex align-center justify-space-between justify-lg-center mb-8 mb-lg-13">-->
	<!--						<svgicon v-if="!isWindowLG" name="clock-reverse" :fill="true" width="24" height="24"-->
	<!--						         color="#B3B8CB"/>-->
	<!--					</div>-->

						<transaction-table :items="transactions"/>
					</template>

					<template v-else>
						<div>
							<p class="text-center mt-10">
								{{ pageContent.noTransaction ? pageContent.noTransaction : "Пока нет операций"}}
							</p>
						</div>
					</template>
				</v-col>
			</v-row>
			<v-dialog v-model="dialogError" class="mx-auto" width="414">
				<v-card class="error-dialog mx-auto text-center py-8 px-4">
					<h5 class="beige-text d-flex justify-center mb-4"> {{error}}</h5>
					<v-card-actions>
						<v-btn class="mx-auto btn--secondary w100"
						       text dark
						       @click="dialogError = false"
						>
							ОК
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<error-msg v-model="isError" ref="errorMsg" :error="this.error"/>
			<div v-if="paymentFormHTML" v-html="paymentFormHTML" id="your-balance__payment-form"></div>
		</v-container>
	</div>
</template>

<script>
	import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
	import TransactionTable from '../elements/account-elements/transaction-table.vue'
	import TransactionCard from '../elements/account-elements/transaction-card.vue'
	import errorMsg from '../elements/error-msg'

	export default {
		name: 'balance',
		components: {
			errorMsg,
			PulseLoader,
			TransactionTable,
			TransactionCard
		},
		data: () => ({
			form: {
				amount: null,
			},
			error: '',
			loading: false,
			dialogError: false,
			dialogThankYou: false,
			paymentFormHTML: '',
			paymentFormLink: ''
		}),
		computed: {
			pageContent() {
				return this.$store.state.page.SubscriptionController.texts.content || {}
			},
			placeHolders() {
				return this.$store.state.common.formPlaceholders || {};
			},
			dialogs() {
				return this.$store.state.common.dialogs;
			},
			user() {
				return this.$store.state.session.user
			},
			isWindowLG() {
				return this.$store.getters.isWindowLG;
			},
			isWindowXS() {
				return this.$store.getters.isWindowXS;
			},
			transactions() {
				return this.$store.state.page.SubscriptionController.transactions;
			},
			isError() {
				return this.$store.state.isError
			},
			pageButtons() {
				return this.$store.state.common?.buttons;
			},
			isMobileApp() {
				return this.$store.state.common.isMobileApp
			}

		},
		methods: {
			goToPayment() {
				window.location.href = this.paymentFormLink
			},
			submit() {
				if (parseInt(this.form.amount) >= 1) {
					this.loading = true;

					this.$store.dispatch('post', {
						action: 'PaymentController',
						params: this.form
					}).then((res) => {
						this.paymentFormHTML = res?.page?.PaymentController?.html;

						setTimeout(() => {
							const el = document.getElementById("your-balance__payment-form");
							const form = el.children[0];
							this.paymentFormLink = form.getElementsByTagName('a')[0].href;
							this.loading = false;

							if (this.isMobileApp) {
								window.location.href = this.paymentFormLink
							} else {
								window.location.href = this.paymentFormLink
							}

							//window.location.href =  this.paymentFormLink


						}, 100);
					}).catch((error) => {
						console.log("error", error)
						this.$store.state.isError = true;
						this.error = {
							title: this.dialogs?.smthWentWrong ? this.dialogs.smthWentWrong : "Что-то пошло не так",
							text: error.error ? error.error : this.dialogs?.reload ? this.dialogs.reload : "Пожалуйста, перезагрузите страницу и попробуйте еще раз"
						}
					}).finally(() => {
						this.loading = false;
					});
				} else if (parseInt(this.form.amount) < 1) {
					this.$store.state.isError = true;
					this.error = {
						title: this.dialogs?.checkInfo ? this.dialogs.checkInfo : "Проверьте введенную информацию",
						text: this.dialogs?.minPayment ? this.dialogs.minPayment : "Минимальная сумма платежа составляет <br> 1 рубль"
					}
				} else {
					this.$store.state.isError = true;
					this.error = {
						title: this.dialogs?.checkInfo ? this.dialogs.checkInfo : "Проверьте введенную информацию",
						text: this.dialogs?.specifyAmount ? this.dialogs.specifyAmount : "Пожалуйста, укажите сумму для пополнения"
					}
				}
			}
		},
		mounted() {
			if (this.$attrs.amount) this.form.amount = this.$attrs.amount
		}
	}

</script>

<style lang="scss">
	.balance {
		position: relative;

		h2 {
			margin-bottom: 32px;
			@include up($md) {
				margin-bottom: 64px;
			}
		}

		.v-card__title {
			width: fit-content;
		}

		&__wrapper {
			max-width: 416px;
		}

		&__pay-btn {
			svg {
				path:nth-child(2) {
					fill: $white !important;
					stroke: none;
				}
			}
		}

		.btn-white {
			box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.15);
		}

		button[type="submit"] {
			box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.15);
		}

		// h2 {
		//   margin-bottom: 32px;
		//   @include up($lg) {
		//     margin-bottom: 162px;
		//   }
		// }

		.v-image__image--cover {
			background-size: contain !important;
		}

		h5 {
			word-break: break-word;
		}

		#your-balance__payment-form {
			overflow: hidden;
			height: 0;
			opacity: 0;
		}

		.sberbank__price-string {
			display: none;
		}

		.sberbank__footer {
			display: none;
		}

		.sberbank__content {
			border: none;
		}

		.v-text-field__slot {
			input {
				color: $grey1 !important;

				&::placeholder {
					color: $grey3 !important;
				}
			}
		}
	}
</style>
