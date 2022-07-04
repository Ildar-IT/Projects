<template>
	<div class="payment-success layout-top">
		<h1 class="text-center margin-bottom-main">
			Спасибо за Ваш платеж!
		</h1>

		<your-balance hide-payment class="mb-8"/>

		<div v-if="newTariff" class="flex-center flex-column">
			<div class="mb-8">
				<!--<div v-if="newTariff.PRICE" class="text-center mb-4">
					Текущий тариф: {{currentTariff.NAME}}
				</div>-->
				<div class="mb-4">
					<v-btn large class="primary" @click="onConfirmTariff">
						<pulse-loader v-if="loading" :loading="true" color="#fff" size="5px"/>
						<span v-else class="d-flex align-center"> Подключить {{newTariff['NAME']}}</span>
					</v-btn>
				</div>
	
				<div v-if="newTariff.PRICE && newPeriod" class="h5 text-center">
					{{ computedPrice(newTariff.PRICE) | price }} ₽ {{pricePeriodLabel}}
				</div>

			</div>

			<v-btn large class="default" @click="$router.push({name:'tariffs'})">
				<span>К списку тарифов</span>
			</v-btn>
		</div>
		<div v-else class="flex-center flex-column">
			<div class="mb-8">
				<div class="mb-4">
					<v-btn large class="primary" @click="$router.push({name:'subscription'})">
						Управление подпиской
					</v-btn>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import YourBalance from "./elements/your-balance";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
	export default {
		name: 'payment-success',
		components: {
			YourBalance,
      PulseLoader
		},
		data() {
			return {
				loading: false,
			}
		},
		computed: {
			periodsDisplay() {
				return this.$store.getters.periodsDisplay
			},		
			currentPeriod() {
				return this.$store.state.session?.user?.UF_PAYMENT_PERIOD;
			},
			currentTariff() {
				return this.$store.state.session.user.TARIFF;
			},
			newTariff() {
				return this.$store.state.page.PaymentController?.tariff;
			},
			newPeriod() {
				return this.$store.state.page.PaymentController?.period;
			},
			pricePeriodLabel() {
				let label = this.periodsDisplay.find(el => el.value ==  this.newPeriod).priceTag;
				return label
			},
		},
		methods: {
			computedPrice(price) {
        console.log("price", price)
        console.log("this.currentPeriod", this.newPeriod)
				let tariffDiscount = this.periodsDisplay.find(el => el.value == this.newPeriod).discount;
			
				return price * this.newPeriod * (1 - tariffDiscount)
			},
			onConfirmTariff() {
				this.loading = true;

				let payload = {tariff: this.newTariff, period: this.newPeriod}
				this.$store.dispatch('applyForTariff', payload).then(() => {
					this.$router.push({name: 'subscription'});
				}).finally(() => {
					this.loading = false
				});
			}
		}
	}
</script>

<style lang="scss">
</style>
