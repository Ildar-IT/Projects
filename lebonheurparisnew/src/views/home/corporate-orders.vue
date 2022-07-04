<template>
	<section class="section--padding corporate-orders">
		<v-container class="d-md-none pb-6 text-center">
			<h3>For your special occasion</h3>
		</v-container>
		<home-swiper v-if="!isWindowMD" :items="items" alt="For your special occasion" />
		<v-container class="container--narrow">
			<v-row justify="space-between">
				<v-col cols="12" md="6" lg="5" class="pr-md-8 pr-lg-0 pt-md-8">
					<h3 class="mb-8 d-none d-md-block">For your special occasion</h3>

					<div class="text-center text-md-left d-flex flex-column align-center align-md-start">
						<p class="limited">We use only premium quality packages made from textured cardboard with a
							press gilding for our products. Each box is tied with a corded silk ribbon to make it more
							unique and festive. 
							Also, there are gift sets for special occasions that can become a great souvenir or a lovely
							gift for your partner, wedding guests, or for any other special event that you have.</p>

						<p class="limited">To make it more personal, you can order it with your unique design.</p>

						<p class="limited">
							Let us know: <a href="mailto:oxana@lebonheurparis.com">oxana@lebonheurparis.com</a>
						</p>
					</div>
				</v-col>
				<v-col cols="12" md="6">
					<home-swiper v-if="isWindowMD" :items="items" alt="For your special occasion" />
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script>
    import HomeSwiper from "../../components/home-swiper";

    export default {
        name: "corporate-orders",
        components: {
            HomeSwiper,
        },
        data() {
            return {
                items: [
                    {img: require('@/assets/home/corporate-orders/S1.jpg'),},
                    {img: require('@/assets/home/corporate-orders/S2.jpg'),},
                    {img: require('@/assets/home/corporate-orders/S3.jpg'),},
                ],
            }
        },
        computed: {
            isWindowMD() {
                return this.$store.getters.isWindowMD;
            }
        },
    }
</script>

<style lang="scss">
	.corporate-orders {
		background: $primary-50;
	}

</style>