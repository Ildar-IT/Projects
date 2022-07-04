<template>
	<div class="report-accepted text-center px-4 d-flex align-center justify-center">

		<div class="report-accepted__wrapper mx-auto text-center">
			<h3 class="report-accepted__title beige-text mb-8">Ваш отчет принят!</h3>
			<h2 class="beige-text mb-lg-8 ">Спасибо!</h2>
<!--			<p class="body-1 mb-lg-16">{{text}}</p>-->
			<div class="report-accepted__btn-wrapper mx-auto mt-lg-8 mt-8 mb-8">
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: "report-accepted"
	}
</script>


<style lang="scss">
	.report-accepted {
		height: 100%;
		padding-top: 30%;
		@include up($md) {
			padding-top: 12%;
		}

		&__wrapper {
			z-index: 1;
		}

		&__title {
			font-size: 96px;
			line-height: 101px;
			font-weight: bold;
			font-family: $heading-font-family;
		}


		p {
			color: $grey1;
		}
	}
	</style>