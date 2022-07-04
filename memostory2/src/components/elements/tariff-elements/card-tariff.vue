<template>
	<!--	<v-col cols="12" sm="6" md="6" lg="3"  class="d-flex justify-center cards-tariff__item align-stretch px-8 mb-sm-8 mb-lg-0 ">-->
	<card :class="{homePageMargin:isHomePage}"
	      class="card-tariff  d-flex flex-column justify-space-between margin-left-small margin-right-small  margin-bottom-main  "
	     >
		<div class="card-tariff__icon mb-8" @click="dialogOpen">
			<v-img class="image-hoverable" width="100" height="100" contain :src="item.PREVIEW_PICTURE"/>
		</div>


		<h5 class="mb-8">
			{{item.NAME}}
		</h5>
		<!-- <div v-if="!classType" class="d-flex mb-8 justify-space-between card-tariff__icons">
			<svgicon v-for="service of services"
			         :key="service.id"
			         :name="service.icon"
			         :color="isServiceIncludes(service) ? '#D8C69E' : '#5A707D'"
			         width="32" height="32"
			/>
		</div> -->
		<div class="body-1 text-center mb-8">
			{{item.PREVIEW_TEXT}}
		</div>
		<div class="d-flex align-end card-tariff__btn w100">
			<v-btn v-if="place && place.PLACE_TARIFF == item.ID" block class="btn--primary" disabled dark>
				{{pageButtons.actualTariff ? pageButtons.actualTariff : "Текущий тариф"}}
			</v-btn>
			<v-btn v-else block class="btn--primary" dark @click="dialogOpen">
				<PulseLoader v-if="loading" :loading="true" color="#fff" size="5px"/>
				<span v-else> {{ isHomePage ? pageButtons.from || 'от ' : ''}} {{ computedPrice(item) | nf }} ₽ {{ periodLabel(item) }}  </span>
			</v-btn>
		</div>


		<v-dialog class="round"
		          v-model="dialog"
		          width="500"
		          content-class="elevation-0"
		>
			<v-card class="pa-8 round">
				<div class="d-flex flex-column pa-md-8">
					<div class="mb-8 d-flex align-center justify-center">
						<img src="@/assets/images/Question.png"/>
					</div>

					<v-card-text class="body-1 text-center pb-8" v-html="paymentMessage">
					</v-card-text>

					<div class="d-flex flex-column align-center block-max-width">
						<v-btn
								class="btn--secondary  mb-4" dark block
								@click="onOk"
						>  {{ pageButtons.confirm || 'Confirm' }}

						</v-btn>

						<v-btn class="btn--primary"
						       dark
						       block
						       @click="dialog = false"
						> {{ pageButtons.back || 'Back' }}
						</v-btn>
					</div>

				</div>
			</v-card>
		</v-dialog>
		<thank-you v-model="thankYouDialog" ref="thankYou" :message="this.message"
		           :title="this.messageTitle"></thank-you>
	</card>
	<!--	</v-col>-->
</template>

<script>
	import {nf} from "../../../utils/string";
	import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
	import thankYou from "@/components/elements/thankYou";

	export default {
		name: "card-tariff",
		props: ['item', 'classType', 'place'],
		components: {PulseLoader, thankYou},
		data() {
			return {
				loading: false,
				dialog: false,
				messageTitle: '',
				message: 'Ожидайте звонка в самое ближайшее время',
				thankYouDialog: false,
				paymentMessage: '',
				isTariffPage: false,
				isHomePage: false
			}
		},
		computed: {
			dialogs() {
				return this.$store.state.common.dialogs || {};
			},
			periods() {
				return {
					year: this.$store.state.common.buttons.year || "год",
					sixMonths: this.$store.state.common.buttons.sixMonths || "6 мес.",
					threeMonths: this.$store.state.common.buttons.theeMonths || "3 мес.",
					month: this.$store.state.common.buttons.month || "мес.",
				}
			},
			pageButtons() {
				return this.$store.state.common?.buttons || {};
			},
			services() {
				return [
					{
						icon: 'clean',
						name: 'Уборка',
						id: 1,
					},
					{
						icon: 'flower',
						name: 'Озеленение',
						id: 2,
					},
					{
						icon: 'repairs',
						name: 'Ремонт',
						id: 3,
					},
					{
						icon: 'video-report',
						name: 'Видеоотчёт',
						id: 4
					}
				]
			},
			user() {
				return this.$store.state.session.user;
			},
		},
		methods: {
			periodLabel() {
				return this.item.TARIFF_PAYMENT_PERIOD == 1 ? '/ ' + this.periods.year : this.item.TARIFF_PAYMENT_PERIOD == 6 ? '/ ' + this.periods.sixMonths : this.item.TARIFF_PAYMENT_PERIOD == 4 ? '/ ' + this.periods.threeMonths : this.item.TARIFF_PAYMENT_PERIOD == 12 ? '/ ' + this.periods.month : ''
			},
			isServiceIncludes(service) {
				return this.item.features?.includes(service.id)
			},
			computedPrice(item) {
				if (this.place) {
					return item.PRICE * this.place.SQUARE;
				}
				return item.PRICE;
			},
			dialogOpen() {
				if (this.isHomePage) {
					this.$router.push({name: 'memory-places'})
					return
				}

				let diff = this.computedPrice(this.item) - parseInt(this.user.BALANCE || 0);
				diff = Math.round(diff)

				if (diff > 0) {
					this.paymentMessage = this.dialogs.applyTariffConfirm2 ? this.dialogs.applyTariffConfirm2 + nf(diff) + " ₽" : "Для подключения тарифа '" + this.item.NAME + "' необходимо пополнить баланс<br />на <b>" + nf(diff) + " ₽</b>";
					this.dialog = true
					this.onAfterOk = () => {
						this.$router.push({name: 'balance', params: {amount: diff}});
					}
				} else {
					this.paymentMessage = (this.dialogs?.applyTariffConfirm1 ? this.dialogs.applyTariffConfirm1 : 'При нажатии "Подтвердить" вы будете переведены на Тариф ')
						+ this.item.NAME +
						(this.dialogs?.applyTariffConfirm2 ? this.dialogs.applyTariffConfirm2 : ' и с вашего лицевого счета будут списаны средства. Cумма списания составит '
						) +  nf(this.computedPrice(this.item) * Number(this.item.TARIFF_PAYMENT_PERIOD)) + ' ₽'
					this.dialog = true
					this.onAfterOk = () => {
						this.loading = true
						this.$store.dispatch('applyForTariff', {
							tariff: this.item,
							place: this.place,
							period: this.item.TARIFF_PAYMENT_PERIOD
						}).then(() => {
							this.loading = false;
							this.messageTitle = (this.dialogs?.tariffThanks ? this.dialogs.tariffThanks : "Спасибо за подключение тарифа ") + this.item.NAME + "!"
							this.message = this.dialogs?.reportSoon ? this.dialogs.reportSoon : "Скоро появится отчет о проделанной работе"
							this.openThankYou();
							setTimeout(() => {
								this.$router.push({name: 'memory-places'});
							}, 2400)
						}).catch((error) => {
							this.message = this.dialogs?.tryAgain ? this.dialogs.tryAgain : 'Что-то пошло не так. Попробуйте еще раз.'
							this.openThankYou();
						}).finally(() => {
							this.loading = false;
						});
					}
				}
			},
			onOk() {
				this.dialog = false;
				if (this.onAfterOk) this.onAfterOk();
			},
			openThankYou() {
				console.log("this.$refs.thankYou", this.$refs.thankYou);
				this.$refs.thankYou.showThankyou();
			}
		},
		watch: {
			$route: {
				immediate: true,
				handler(to, from) {
					if (this.$route.path == '/tariffs') {
						this.isTariffPage = true;
					} else if (this.$route.path == '/') {
						this.isHomePage = true;
					} else {
						this.isTariffPage = false;
					}
				}
			}
		}
	}
</script>


<style lang="scss">
	.card-tariff {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: auto;
		max-width: 380px;
		box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.15) !important;

		@include up($sm) {
			//width: 382px;
			width: 100%;
		}
		@include up($md) {
			width: 380px;
		}

		&.homePageMargin {
			@include up($xl) {
				&:last-of-type {
					margin-right: 0 !important;
				}
				&:first-of-type {
					margin-left: 0 !important;
				}
			}
		}

		//@include up($lg) {
		//	width: 380px;
		//}

		&__icons {
			height: 100px;
			width: 100px;
		}

		&__btn {
			//  height: 100%;
		}

		button.v-btn:not(.v-btn--round).v-size--default {
			padding: 0 !important;
			max-height: 48px !important;
			@include up($lg) {
				padding: 0 16px !important;
			}
		}
	}

	.light {
		background: white;
	}
</style>
