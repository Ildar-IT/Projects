<template>
	<div v-if="items && items.length" class="home-swiper">
		<div class="swiper home-swiper__swiper" :id="'homeSwiper'+this.idCounter">
			<div class="swiper-wrapper">
				<div v-for="(item, index) in items" :key="index"
					 class="swiper-slide">
					<div class="d-flex align-center justify-center pa-4">
						<animated-img v-if="activeIndex===index" :src="item.img"
									  :reversed="item.reversed"
									  :alt="alt"/>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-8 home-swiper__btns">
			<button class="home-swiper__btn-next"
					:class="{disabled:activeIndex===items.length-1}">
				<svgicon name="arrow-next"/>
			</button>
			<button class="home-swiper__btn-prev"
					:class="{disabled:activeIndex===0}">
				<svgicon name="arrow-prev"/>
			</button>
		</div>
	</div>
</template>

<script>
    import Swiper, {Navigation, Pagination, EffectFade} from 'swiper';
    //import {Navigation} from 'swiper/navigation';
    import 'swiper/swiper.min.css';
    import AnimatedImg from "@/components/animated-img";

    let idCounter = 1;

    export default {
        name: "home-swiper",
        props: ["items", "alt"],
        components: {
            AnimatedImg,
        },
        data() {
            return {
                activeIndex: 0,
                idCounter: 0
            }
        },
        mounted() {
            this.idCounter = idCounter++;

            setTimeout(()=>{
                const swiper = new Swiper('#homeSwiper'+this.idCounter, {
                    //freeMode: true,
                    slidesPerView: 1,
                    //spaceBetween: 0,
                    //allowTouchMove: false,
                    effect: "fade",
                    modules: [Navigation, EffectFade],
                    navigation: {
                        nextEl: ".home-swiper__btn-next",
                        prevEl: ".home-swiper__btn-prev",
                    },
                    on: {
                        slideChange: (event) => {
                            this.activeIndex = event.activeIndex;
                        },
                    },
                });
			},150);
        }
    }
</script>

<style lang="scss">
	.home-swiper {

		&__btns {
			display: flex;
			align-items: center;
			flex-direction: column;

			button {
				display: block;
				width: 65px;
				height: 30px;
				align-items: center;

				position: relative;

				svg {
					width: 100%;
					@include transition();
					fill: $golden;
				}

				&:hover {
					svg {
						opacity: 0.6;
					}
				}

				&.home-swiper__btn-next {
					//top: -5px;
					left: 25px;
				}

				&.home-swiper__btn-prev {
					//top: 5px;
					left: -25px;
				}

				&.disabled {
					svg {
						fill: rgba(25, 25, 26, 0.16);
					}
				}
			}
		}
	}
</style>