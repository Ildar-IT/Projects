<template>
	<section class="section--padding partnership">
		<v-container class="d-md-none pb-6 text-center">
			<h3>Partnership and franchise</h3>
		</v-container>
		<home-swiper v-if="!isWindowMD" :items="items" alt="Partnership and franchise"/>
		<v-container class="container--narrow">
			<v-row justify="space-between">
				<v-col cols="12" md="6">
					<home-swiper v-if="isWindowMD" :items="items" alt="Partnership and franchise"/>
				</v-col>
				<v-col cols="12" md="6" lg="5" class="pl-md-8 pl-lg-0 pt-md-10">
					<h3 class="mb-8 d-none d-md-block">Partnership and franchise</h3>

					<div class="text-center text-md-left d-flex flex-column align-center align-md-start">
						<p class="limited">There are no boundaries for Le Bonheur Manufacture! We have already
							captivated Scandinavian hearts in Sweden and Denmark, reached the sublime island of Bali,
							the Côte d'Azur, and also the land of the rising Sun capital — Tokyo.</p>

						<p class="limited">If you desire to get a part of Paris in your country or city, please, contact us:
							<a href="mailto:oxana@lebonheurparis.com">oxana@lebonheurparis.com</a>
						</p>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script>
    import HomeSwiper from "@/components/home-swiper";

    export default {
        name: "partnership",
        components: {
            HomeSwiper
        },
        data() {
            return {
                items: [
                    {img: require('@/assets/partnership/P1.jpg'), reversed: true},
                    {img: require('@/assets/partnership/P2.jpg'), reversed: true},
                    {img: require('@/assets/partnership/P3.jpg'), reversed: true},
                    {img: require('@/assets/partnership/P4.jpg'), reversed: true},
                    {img: require('@/assets/partnership/P5.jpg'), reversed: true},
                    {img: require('@/assets/partnership/P6.jpg'), reversed: true},
                    {img: require('@/assets/partnership/P7.jpg'), reversed: true},
                ]
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
	.partnership {
	}
</style>