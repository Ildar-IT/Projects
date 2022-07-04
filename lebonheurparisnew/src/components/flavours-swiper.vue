<template>
	<div v-if="isWindowMD" class="swiper flavours-swiper">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(item, index) in items" :key="index">
				<div class="pa-4 d-flex flex-column justify-start align-center">
					<v-img :src="item.img" :alt="item.name" />
					<div class="size2 mt-4 text-center flavours-swiper__name">{{ name(item) }}</div>
				</div>
			</div>
		</div>
	</div>
	<div v-else class="swiper flavours-swiper">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(item, index) in items" :key="index">
				<div class="pa-4 d-flex flex-column justify-start align-center">
					<v-img :src="item.img" :alt="item.name" />
					<div class="size2 mt-4 text-center flavours-swiper__name">{{ name(item) }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import {Swiper} from 'swiper';
    import 'swiper/swiper.min.css';

    export default {
        name: "flavours-swiper",
		props: ["items"],
        data() {
            return {
            }
        },
		computed: {
            isWindowMD() {
                return this.$store.getters.isWindowMD;
			}
		},
		methods: {
            name(item) {
                return item.name.substr(0,1).toUpperCase() + item.name.substr(1).toLowerCase();
			}
		},
        mounted() {
            const swiper = new Swiper('.flavours-swiper', {
				freeMode: true,
                slidesPerView: 1,
                spaceBetween: 10,
                breakpoints: {
                    320: {
                        slidesPerView: 2.5,
                        spaceBetween: 10
                    },
                    480: {
                        slidesPerView: 3.5,
                        spaceBetween: 20
                    },
                    640: {
                        slidesPerView: 4.5,
                        spaceBetween: 20
                    },
                    800: {
                        slidesPerView: 5.5,
                        spaceBetween: 20
                    },
                    960: {
                        slidesPerView: 6.5,
                        spaceBetween: 20
                    }
                }
            })
        }
    }
</script>

<style lang="scss">
	.flavours-swiper {
		.v-image {
			//display: block;
			//margin: 0;
			width: 72px;
			height: 72px;

			@include up($md) {
				width: 132px;
				height: 132px;
			}
		}
		&__name {
			color: $black;
			max-width: 200px;
		}
		/*&__slide-img {
			width: 58px;
			height: 58px;
		}*/
	}

</style>