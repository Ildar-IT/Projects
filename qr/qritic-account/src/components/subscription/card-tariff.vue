<template>
	<card class="card-tariff d-flex flex-column text-center pa-8">
        <span v-if="tariff" class="gray-text text-center mb-8">
			Ваш тариф «{{tariff.NAME}}»
        </span>
		<span v-else class="gray-text text-center mb-8">
			Тариф не установлен
        </span>

		<template v-if="tariff">
			<template v-if="tariff.PRICE">
				<span class="card-tariff__amount mb-4">{{ computedPrice(tariff.PRICE) | nf}} ₽ {{ pricePeriodLabel }}</span>
				<span class="gray-text body-2 mb-8">Следующее списание {{ nextPayment }}</span>
			</template>

			<tariff-features :tariff="tariff" class="mb-4"/>
		</template>

		<v-btn block small class="secondary" @click="$router.push({name:'tariffs'})">Сменить</v-btn>

	</card>
</template>

<script>
    import tariffFeatures from "../elements/tariff-features";

    export default {
        name: 'card-tariff',
        components: {
            tariffFeatures
        },
        computed: {
            currentPeriod() {
                return this.$store.state.session?.user?.UF_PAYMENT_PERIOD;
            },
            periods() {  // перенести в геттер 
                let periodsTemp = JSON.parse(this.tariff.PERIOD_DISCOUNTS.TEXT);
                for (let key in periodsTemp) {
                    periodsTemp[key] = Number(periodsTemp[key]);
                }
                return periodsTemp;
            },
            periodsDisplay() {
                let values = [];
                for (let key in this.periods) {
                    if (key == 1) values.push({
                        name: "Месячная оплата",
                        value: key,
                        discount: this.periods[key],
                        priceTag: "/ мес."
                    })
                    if (key == 6) values.push({
                        name: "Полугодовая оплата",
                        value: key,
                        discount: this.periods[key],
                        priceTag: "/ 6 мес."
                    })
                    if (key == 12) values.push({
                        name: "Ежегодная оплата",
                        value: key,
                        discount: this.periods[key],
                        priceTag: "/ год."
                    })
                }
                return values
            },
            pricePeriodLabel() {
                let label = this.periodsDisplay.find(el => el.value == (this.currentPeriod.value || this.currentPeriod)).priceTag;
                return label
            },
            tariff() {
                // TODO берем не юзерский тариф, а из списка common, так правильнее
                // TODO в будущем - убрать у пользователя полный объект TARIFF, оставить только TARIFF ID
                return this.$store.state.common.tariffs.find(el => el.ID === this.$store.state.session.user.TARIFF?.ID);
            },
            nextPayment() {
                return this.$store.state.session.user.UF_PAYMENT_DATE;
            },

        },
        methods: {
            computedPrice(card) {
                let tariffPrice = this.tariff.PRICE;
                let tariffDiscount = this.periodsDisplay.find(el => el.value == this.currentPeriod).discount;
                console.log(tariffDiscount)
                return tariffPrice * this.currentPeriod * (1 - tariffDiscount)
            },
        }
    }
</script>

<style lang="scss">
	.card-tariff {
		&__amount {
			font-family: $heading-font-family;
			font-weight: bold;
			font-size: 24px;
			line-height: 29px;
		}
	}
</style>
