<template>
	<div class="category-list">
		<v-container>
			<h3 class="text-center mb-8 mb-md-12">Make your choice</h3>
		</v-container>
		<div class="swiper category-list__list">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item, index) in items" :key="index">
					<router-link :to="{name:'category', params:{code:item.CODE}}"  class="pa-4 d-flex flex-column align-center category-list__image-link">
						<v-img :src="item.PICTURE" :alt="item.NAME"/>
					</router-link>
					<router-link :to="{name:'category', params:{code:item.CODE}}" class="px-4 mt-6 mt-md-8 d-flex flex-column align-center text-center">
						<h5>{{ item.NAME }}</h5>
						<p class="size2 mt-2 mt-md-3">{{ item.DESCRIPTION }}</p>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import {Swiper} from 'swiper';
    import 'swiper/swiper.min.css';

    export default {
        name: "category-list",
        props: ["items"],
        data() {
            return {
            }
        },
        mounted() {
            const swiper = new Swiper('.swiper.category-list__list', {
                freeMode: true,
                slidesPerView: 1,
                spaceBetween: 0,
                breakpoints: {
                    360: {
                        slidesPerView: 1,
                        //spaceBetween: 10
                    },
                    520: {
                        slidesPerView: 1.5,
                        //spaceBetween: 20
                    },
                    680: {
                        slidesPerView: 2.0,
                        //spaceBetween: 20
                    },
                    840: {
                        slidesPerView: 2.5,
                        //spaceBetween: 20
                    },
                    1000: {
                        slidesPerView: 3.0,
                        //spaceBetween: 20
                    },
                    1160: {
                        slidesPerView: 3.5,
                        //spaceBetween: 20
                    },
                    1320: {
                        slidesPerView: 4.0,
                        //spaceBetween: 20
                    }
                }
            })
        }
    }
</script>

<style lang="scss">
	.category-list {

		&__list {
			max-width: 1480px;	// todo for more categories
		}

		&__image-link {
			&:hover {
				opacity: unset;
				//transform: translateY(1px);
				filter: brightness(1.1) contrast(1.05);
			}
		}

		.v-image {
			//display: block;
			//margin: 0;
			width: 285px;
			height: 215px;

			@include up($lg) {
				width: 330px;
				height: 249px;
			}

			/*@include up($lg) {
				width: 330px;
				height: 249px;
			}*/
		}

		h5 {
			color: $golden;
			max-width: 215px;
		}
		p {
			color: $default-text-color;
			max-width: 215px;
		}

        &__bg {
            margin-bottom: 0;
            background-image: url("~@/assets/Shop/bg.jpg");
            background-position: center;
            width: 100%;
            height: 360px;
            margin-top: 64px;
            background-size: cover;
            @include up($sm) {
                margin: 96px 0;
                background-image: url("~@/assets/laurent/bg.jpg");
                height: 418px;
            }
            @include up($lg) {
                margin: 129px 0;
                background-image: url("~@/assets/Shop/bg.jpg");
                height: 552px;
            }

        }

	}
</style>