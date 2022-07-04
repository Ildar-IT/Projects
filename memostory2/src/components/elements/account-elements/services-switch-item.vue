<template>
	<div class="services-switch-item">
		<!--    Head -->
		<div class="d-flex justify-space-between  justify-center align-center flex-nowrap mb-4">
			<div class="d-flex align-center">
				<v-img class=" mr-4 image-hoverable" v-on="!currentUnfinishedService ? { click: dialogOpen} : {}" width="100" height="100" :src="service.DETAIL_PICTURE"/>
				<!-- <div class="services-switch-item__logo mr-4">
					<svgicon :name="service.icon" color="#BA9568"/>
				</div> -->
				<div class="text-left">
					<h5 class="beige-text mb-4">
						{{ service.NAME }}
					</h5>
					<v-btn v-if="currentUnfinishedService" class="elevation-0">
						<span class="grey-text"> {{ pageContent.inProgress ? pageContent.inProgress : "В процессе исполнения" }}</span>
					</v-btn>
					<v-btn v-else class="btn--secondary " dark @click="dialogOpen">
						<span>
							{{ computedPrice(service) | nf }}  ₽
						</span>
					</v-btn>
				</div>
			</div>
			<!--      Switch -->
		</div>

		<!--    Description text-->
		<div class="d-flex" v-if="service.DETAIL_TEXT">
			<p class="grey-text-light text-left mb-0" :class="isWindowXS?'body-2':'body-1'">
				{{ service.DETAIL_TEXT }}
			</p>
		</div>
		<v-dialog
				class=""
				v-model="dialog"
				width="500"
				content-class="elevation-0"
		>
			<v-card class="pa-md-8 round">
				<div class="d-flex flex-column pa-4 pa-md-8">
					<div class="mb-8 d-flex align-center justify-center">
						<img src="@/assets/images/Question.png"/>
					</div>
					<v-card-text class="body-1 text-center pb-8" v-html="paymentMessage">
					</v-card-text>

					<div class="d-flex flex-column align-center block-max-width">
						<v-btn
								class="btn--secondary  mb-4" dark block
								@click="onOk"
						> {{ pageButtons.confirm ? pageButtons.confirm : "Подтвердить" }}

						</v-btn>

						<v-btn class="btn--primary"
						       dark
						       block
						       @click="dialog = false"
						> {{ pageButtons.back ? pageButtons.back : "Назад" }}

						</v-btn>
					</div>

				</div>
			</v-card>
		</v-dialog>
		<thank-you ref="thankYou" :message="this.message"/>
	</div>
</template>

<script>
	import {nf} from "../../../utils/string";
	import {format} from "../../../utils/utils";
	import thankYou from "@/components/elements/thankYou";

	export default {
		name: "services-switch-item",
		components: {thankYou},
		props: ['service', 'place'],
		data() {
			return {
				serviceTotal: 0,
				message: '',
				form: {},
				paymentMessage: null,
				dialog: false,
			}
		},
		computed: {
			dialogs() {
				return this.$store.state.common.dialogs || {};
			},
			cardId() {
				return this.$route.params.id;
			},
			isWindowXS() {
				return this.$store.getters.isWindowXS;
			},
			user() {
				return this.$store.state.session.user;
			},
			currentUnfinishedService() {
				if (this.place.reports) {
					return this.place.reports.some(el => el.SERVICE == this.service.ID && !el.IS_APPROVED)
				}
			},
      pageButtons() {
        return this.$store.state.common?.buttons;
      },
      pageContent() {
        return this.$store.state.page.PlaceItemController.texts?.content;
      },

		},
		methods: {
			computedPrice(service) {
				return service.PRICE ? service.PRICE : service.PRICE_PER_SQ_M * this.place.SQUARE
			},
			openThankYou() {
				this.$refs.thankYou.showThankyou();
			},
			dialogOpen() {
				let computedPrice = this.computedPrice(this.service)
				let diff = this.computedPrice(this.service) - parseInt(this.user.BALANCE || 0);
				diff = Math.round(diff)
				console.log('diff', diff)
				if (diff > 0) {
					this.paymentMessage = (this.dialogs?.serviceOrder1 ? this.dialogs.serviceOrder1 : "Для заказа услуги '")
              + this.service.NAME +
              (this.dialogs?.serviceOrder2 ? this.dialogs.serviceOrder2 : "' необходимо пополнить баланс<br />на <b>")
              + nf(diff) + " ₽</b>";
					this.dialog = true
					this.onAfterOk = () => {
						this.$router.push({name: 'balance', params: {amount: diff}});
					}
				} else {
					this.paymentMessage = (this.dialogs?.paymentMess1 ? this.dialogs.paymentMess1 : 'Вы заказываете услугу ')
              + this.service.NAME +
              (this.dialogs?.paymentMess2 ? this.dialogs.paymentMess2 : '.<br> С вашего лицевого счета будет списано ')
              + nf(computedPrice)  +
              (this.dialogs?.paymentMess3 ? this.dialogs.paymentMess3 : ' руб.<br> Заявка будет немедленно отправлена в работу.')
					this.dialog = true
					this.onAfterOk = () => {
						this.$store.dispatch('post', {
							action: "ServiceListController",
							params: {
								'SERVICE': this.service.ID,
								'SERVICE_NAME': this.service.NAME,
								'PRICE': computedPrice,
								'PLACE': this.place.ID,
								'SQUARE': this.place.SQUARE,
								'PRICE_PER_SQ_M': this.service.PRICE_PER_SQ_M
							}
						}).then(() => {
							this.message = this.dialogs?.serviceRequest ? this.dialogs.serviceRequest : "Заявка на услугу успешно отправлена"
							this.openThankYou();
							setTimeout(() => {
									this.$router.push({name: 'memory-places'})
								}
								, 2500
							)
						});
					}
				}
			},
			onOk() {
				this.dialog = false;
				if (this.onAfterOk) this.onAfterOk();
			},
		},
		mounted() {
			//this.$store.state.memories.filter(x => x.ID == this.cardId)[0].services;
		}

	}
</script>

<style lang="scss">
	.services-switch-item {
		&__logo {

			border-radius: 100%;
			background-color: $beige7;
			display: flex;
			align-items: center;
			justify-content: center;

			svg {
				width: 32px;
				height: 32px;
				@include up($xl) {
					width: 50px;
					height: 50px;
				}
			}

			@include up($xl) {
				width: 100px;
				min-width: 100px;
				height: 100px;
			}

			h5 {

			}
		}
	}
</style>
