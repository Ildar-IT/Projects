<template>
	<div class="d-flex align-center justify-center flex-column payment-success">
		<v-container>
			<v-row>
				<v-col cols="12" sm="8" md="6" class="mx-auto">
					<div class="text-center margin-bottom-main">
						<h2 class="beige-text mb-8"> {{ dialogs.thanksForPay ? dialogs.thanksForPay : "Спасибо за Ваш платеж!"
							}}
						</h2>
						<p class="body-1"> {{ dialogs.creditFunds ? dialogs.creditFunds : "Средства будут зачислены на лицевой счет в течение 2-х минут." }}
						</p>
					</div>
					<v-btn large class="primary mx-auto" @click="goMemoryPlaces">
						<span> {{ pageButtons.continue ? pageButtons.continue : "Продолжить" }}</span>
					</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
    export default {
        name: 'payment-success',
        methods: {
            goMemoryPlaces() {
                this.$router.replace({name: 'memory-places'});
            }
        },
        computed: {
            dialogs() {
                return this.$store.state.common.dialogs || {};
            },
            pageButtons() {
                return this.$store.state.common.buttons || {};
            }
        }

    }
</script>

<style lang="scss">
	.payment-success {
		position: relative;
		height: 80vh;
		z-index: 3;
	}
</style>