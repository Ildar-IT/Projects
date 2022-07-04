<template>
	<div class="question-finish">
		<div class="question-finish__confetti"/>

		<div class="flex-center pb-8">
			<svgicon name="love" original width="128"/>
		</div>

		<h2 class="pb-4">Благодарим за участие!</h2>
		<div class="pb-8 body-2 text-center">
			<span v-if="page.questions.length===1">Ваш ответ учтен</span>
			<span v-else>Ваши ответы учтены</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "question-finish",
		computed: {
			page() {
				return this.$store.state.page.ReviewController;
			},
		},
		mounted() {
			setTimeout(()=> {
				this.$router.replace({name:'feedback'});
			},2000);
		}
	}
</script>

<style lang="scss">
	.question-finish {
		background: transparent;

		&__confetti {
			position: absolute;
			z-index: -1;
			height: 100%;
      top:0;
      background-position: top;
			margin: auto;
			width: 100%;
			left:0;
			background-image: url('../assets/confetti.jpg');
			@include up($sm){
				left: 50%;
				margin-left: -50%;
			}

			@include up($lg) {
				background-image: url('../assets/confetti-big.jpg');
			}
		}
	}
</style>