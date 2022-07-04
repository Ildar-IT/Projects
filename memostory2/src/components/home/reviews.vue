<template>
	<div id="reviews" class="reviews padding-top-main mx-auto px-0 px-md-0 mt-lg-4" v-if="reviews.length > 0">

		<div class="padding-bottom-main beige-text">
			<h2 class="text-center">
				{{ pageTitle ? pageTitle : "Клиенты о нас"}}
			</h2>
		</div>
		<!--    Swiper -->
		<div class="reviews__swiper-wrapper mx-auto mb-lg-16 ">
			<swiper ref="clientsAboutUsSwiper" :options="swiperOptions" class=" reviews__swiper"
					@slideChange="changeArrowClasses">

				<swiper-slide v-for="review of reviews" :key="review.ID">
					<div>
						<div class="avatar photo-filter"
							 :style="{ 'backgroundImage': 'url(' + review.DETAIL_PICTURE + ')' }"></div>
						<h5 class=" beige-text text-center mt-4 mt-md-8">
							{{ review.NAME }}
						</h5>
						<div class="body-1 font-italic text-center mt-4 mt-md-8 mx-auto px-8">
							{{ review.DETAIL_TEXT }}
						</div>
					</div>
				</swiper-slide>
			</swiper>
		</div>

		<!--Btns-->
		<div v-if="isWindowLG" class="reviews__swiper__nav" slot="navigation">
			<v-row class="justify-space-between">
				<div id="swiper-controller-reviews-prev" class="swiper-btn swiper-btn_not-active">
					<v-btn fab large icon class="mr-6">
						<svgicon name="arrow-head-left" width="32" height="32" original :fill="false" color="#DCCAB3"
						></svgicon>
					</v-btn>
				</div>
				<div id="swiper-controller-reviews-next" class="swiper-btn swiper-btn_active">
					<v-btn fab large icon>
						<svgicon name="arrow-head-right" width="32" height="32" original :fill="false" color="#DCCAB3"
						></svgicon>
					</v-btn>
				</div>
			</v-row>
		</div>
		<!--        Pagination-->
		<div class="reviews__pagination swiper-pagination custom-pagination"
			 id="reviews-swiper-pagination"
			 slot="pagination">
		</div>

	</div>
</template>

<script>
    export default {
        name: 'reviews',
        data() {
            return {

                //Swiper
                isMoving: false,
                swiperOptions: {
                    keyboard: {
                        enabled: true,
                    },
                    slidesPerView: 'auto',
                    autoHeight: false,
                    navigation: {
                        nextEl: "#swiper-controller-reviews-next",
                        prevEl: "#swiper-controller-reviews-prev",
                    },
                    spaceBetween: 32,
                    pagination: {
                        el: '#reviews-swiper-pagination',
                        type: 'bullets',
                    },
                }
            }
        },
        computed: {
            page() {
                return this.$store.state.page.HomeController;
            },
            pageTitle() {
                return this.page.texts.find(el => el.CODE === "REVIEWS_TITLE")?.PREVIEW_TEXT || "Клиенты о нас"
            },
            reviews() {
                return this.page.reviews;
            },
            isWindowXS() {
                return this.$store.getters.isWindowXS;
            },
            isWindowSM() {
                return this.$store.getters.isWindowSM;
            },
            isWindowMD() {
                return this.$store.getters.isWindowMD;
            },
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
        },
        methods: {
            changeArrowClasses() {
                let mySwiper = this.$refs.clientsAboutUsSwiper.$swiper;
                let leftBtn = document.querySelector('#swiper-controller-reviews-prev');
                let rightBtn = document.querySelector('#swiper-controller-reviews-next');
                if (mySwiper.activeIndex === 0) {
                    leftBtn.classList.add('swiper-btn_not-active');
                    rightBtn.classList.add('swiper-btn_active');
                } else if (mySwiper.activeIndex == mySwiper.slides.length - 1) {
                    rightBtn.classList.add('swiper-btn_not-active');
                    leftBtn.classList.add('swiper-btn_active');
                } else {
                    rightBtn.classList.remove('swiper-btn_not-active');
                    leftBtn.classList.remove('swiper-btn_not-active');
                    rightBtn.classList.add('swiper-btn_active');
                    leftBtn.classList.add('swiper-btn_active');
                }
            },
        }
    }
</script>

<style lang="scss">
	.reviews {
		min-width: 360px;
		max-width: 1092px;
		position: relative;

		&__swiper {
			h5 ~ div {
				color: $grey1;
			}

			&-wrapper {

				max-width: 826px;

			}

			&__nav {
				position: absolute;
				top: 60%;
				transform: translateY(-50%);
				width: 100%;

				.swiper-btn {
					width: 62px;
					border-radius: 100%;


					&_active {
						@include transition();
						background: linear-gradient(252deg, $beige2 0%, $beige1 100.43%);
						box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.15);

						svg {
							path {
								stroke: $white;
							}
						}
					}

					&_not-active {
						@include transition();
						background: $beige7;
						box-shadow: none;

						svg {
							path {
								stroke: $beige3;
							}
						}
					}
				}
			}
		}

		.swiper-pagination {
			position: relative;
			display: block;
			@include up($lg) {
				display: none;
			}
		}

		.avatar {
			background-size: cover;
			width: 100px;
			height: 100px;
			border-radius: 100%;
			margin: 0 auto;
		}

	}

</style>
