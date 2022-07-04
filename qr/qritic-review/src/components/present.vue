<template>
	<div class="present">
   <div class="present__confetti"/>

		<div class="flex-center pb-8">
			<svgicon name="giftbox" original class="svgicon"/>
		</div>
		<h2 class="pb-4">
			{{page.poll.COUPON}}
		</h2>
		<div class="pb-8 body-2 text-center secondary-text">
			{{page.poll.COUPON_TEXT}}
		</div>
		<div class="flex-center">
			<v-btn @click="goToReview">
				Спасибо!
			</v-btn>
		</div>

		<socials/>

	</div>
</template>

<script>
	import socials from "./elements/socials";

	export default {
		name: "present",
		components: {
			socials
		},
		computed: {
			page() {
				return this.$store.state.currentPage;
			}
		},
		methods: {
			goToReview() {
				this.$router.replace({name: 'feedback'});
			}
		}
	}
</script>

<style lang="scss">
	.present {
		animation: ease-in-out;
		/*-webkit-animation: expand 5s;*/
    
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

	/*@-webkit-keyframes expand{*/
	/*	0%{height:0px}*/
	/*	100%{height:100%}*/
	/*}*/
</style>