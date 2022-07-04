<template>
	<div class="layout-top support ">
		<h1 class="mb-8 text-center">
			Есть вопросы?
		</h1>
		<div class="body-1 margin-bottom-main text-center">
			Отправьте их нам и мы свяжемся с Вами в ближайшее время.
		</div>

		<div class="secondary-text margin-bottom-main">
			<v-textarea class="secondary-text"
			            outlined
			            name="input-7-4"
			            auto-grow
			            rows="1"
			            placeholder="Ваш вопрос"
			            label=""
			            v-model="question"
			></v-textarea>
		</div>

		<div class="flex-center mb-8 " :class="isWindowSM?'block-max-width':''">
			<v-btn :disabled="!question" block class="primary" @click="onSubmit">
				<svgicon class="mr-4" name="mail" :fill="false" width="24" height="24" color="white"/>
				Отправить
			</v-btn>
		</div>
		<transition name="fade" mode="out-in">
			<div v-if="requestStatus" class="support__alert">
				<v-alert
						dense
						:type="requestStatus"
				>
					{{message}}
				</v-alert>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		name: "support",
		data: () => ({
			question: '',
			message: '',
			requestStatus: null,

		}),
		computed: {
			isWindowSM() {
				return this.$store.getters.isWindowSM;
			}
		},
		methods: {
			onSubmit() {
				this.$store.dispatch('post', {
					action: 'FeedbackController',
					params: {'msg': this.question}
				}).then((response) => {
					console.log('response', response);
					this.question = '';
					this.requestStatus = 'success';
					this.message = 'Ваше обращение отправлено!'
				}).catch((error) => {
					console.log('error', error);
					this.requestStatus = 'error';
					this.message = 'Что-то пошло не так :( Попробуйте еще раз.'
				}).finally(() => {
					setTimeout(() => {
						this.requestStatus = null;
					}, 5000)
				});
			}
		}
	}
</script>

<style lang="scss">
	.support {
		display: flex;
		flex-direction: column;

		&__alert {
			position: fixed;
			z-index: 5;
			width: 100%;
			right: 0;
			display: flex;
			justify-content: center;
			justify-items: center;

			.v-sheet.v-alert:not(.v-sheet--outlined) {
				box-shadow: $box-shadow;
			}

			.v-alert {
				border-radius: 1000px;
			}
		}
	}
</style>