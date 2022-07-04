<template>
	<div id="home" class="top-banner">
		<!--  Main banner      -->
		<v-row no-gutters class="top-banner__main flex-column">
			<!--  BG с розами      -->
			<swiper ref="topBannerSwiper" class="top-banner__bg" :options="swiperOptions">

				<swiper-slide v-for="(img, i) of slider" :key="i"
							  :style="{ 'backgroundImage': 'url(' + img.DETAIL_PICTURE + ')' }">

				</swiper-slide>
			</swiper>
			<div class="layout">
				<div class="top-banner__wrapper">
					<!--   Главная карточка        -->
					<v-col cols="auto" md="9" dense
						   class=" pa-0 pa-sm-4 pl-lg-2 ml-0 ml-md-8 ml-md-0 top-banner__card-wrapper">
						<card class="top-banner__card  pa-md-16 pa-sm-8">
							<h2 class="top-banner__card-title">{{ mainCard.NAME }}</h2>
							<div v-if="isWindowMD" class="body-1 font-italic mt-md-16 mt-xl-16 mt-sm-8 quote">
								{{ mainCard.TEXT }}
							</div>
							<v-row no-gutters
								   class="mt-8 mt-lg-16 top-banner__btns flex-md-nowrap">
								<v-col dense cols="12" sm="12" md="5" class="mb-8 mr-md-12 mr-xl-16">

									<v-btn large class="btn--primary shadow w100 d-flex align-center px-8" dark
										   @click="goToLogin">
										<svgicon class="mr-5 mr-sm-6" name="user" color="white"
												 :fill="false" width="24"
												 height="24"/>
										<span> {{mainCard.BTN}} </span>
									</v-btn>
								</v-col>
								<v-col dense cols="12" md="auto" class="mb-4 mr-md-6 mr-xl-6">
									<v-btn min-width="190" large class="black pa-0 shadow" dark>
										<svgicon class="position-absolute top-banner__icons"
												 :name="isEng ? 'google-en' : 'google'" original
												 :height="isWindowMD ?'69' : '60'" :fill="false"/>
									</v-btn>

								</v-col>
								<v-col dense cols="12">
									<v-btn min-width="190" large class="black pa-0  btn-with-svg shadow" dark>
										<svgicon class="position-absolute  top-banner__icons"
												 :name="isEng ? 'apple-en' : 'apple' " original
												 :height="isWindowMD ?'69' : '60'" :fill="false"/>
									</v-btn>
								</v-col>
							</v-row>
						</card>
						<!--   Цитата для mobile       -->
						<v-col v-if="!isWindowMD" class="d-flex quote mt-8 pa-0 pa-sm-4">
							<blockquote class="body-1 align-self-center beige-text font-italic">{{ mainCard.TEXT }}
							</blockquote>
						</v-col>
					</v-col>
				</div>
			</div>
		</v-row>
	</div>
</template>

<script>

    import Config from "../../config";


    export default {
        name: 'top-banner',
        components: {},
        data: () => ({
            swiperOptions: {
                keyboard: {
                    enabled: true,
                },
                slidesPerView: 'auto',
                preloadImages: false,
                spaceBetween: 16,
                // effect: 'fade',
                lazy: true,
            }
        }),
        computed: {
            user() {
                return this.$store.state.session.user
            },
            common() {
                return this.$store.state.common;
            },
            page() {
                return this.$store.state.page.HomeController;
            },
            isEng() {
                if (this.$store.state.common.header?.langSwitch == "RU") {
                    return true
                } else {
                    return false
                }
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
            slider() {
                return this.$store.state.page.HomeController.homeSlider || [];
            },
            swiper() {
                return this.$refs.topBannerSwiper.$swiper;
            },
            mainCard() {
                const cardName = this.page.texts.find(el => el.CODE === "HOME_SLIDER_TITLE").PREVIEW_TEXT
                const cardText = this.page.texts.find(el => el.CODE === "HOME_SLIDER_TEXT").PREVIEW_TEXT
                const cardBtn = this.page.texts.find(el => el.CODE === "HOME_SLIDER_BTN").PREVIEW_TEXT
                return {
                    NAME: cardName,
                    TEXT: cardText,
                    BTN: cardBtn,
                }
            },
        },
        methods: {
            goToLogin() {
                if (this.user) this.$router.push({name: "memory-places"})
                else this.$router.push({name: "login"});
            }
        },
        mounted() {

        }
    }
</script>

<style lang="scss">
	#memostory {
		.top-banner {
			min-width: 360px;

			&__icons {
				top: 50%;
				transform: translateY(-50%);
			}

			.v-btn:not(.v-btn--round).v-size--large {
				@include up($lg) {
					height: 69px;
				}
			}

			&__wrapper {
				max-width: 1720px;
				margin: 0 auto;
				width: 100%;

			}

			.swiper-slide {
				z-index: 0;
				background-position: center;
				background-size: cover;
			}

			&__main {
				position: relative;
				height: auto;
				@include up($md) {
					height: 600px;
				}

				@include up($lg) {
					height: 900px;
				}
			}

			&__bg {
				position: absolute;
				min-width: 360px;
				height: 330px;
				width: 100%;

				//background: url("../../assets/images/main.jpg") no-repeat top right 10%;
				//background-size: cover;

				/* @include up($md) {
				   position: absolute;
				   height: 900px;
				   background: url("./../assets/images/main.jpg") no-repeat top right 20%;
				   background-size: cover;
				 }*/

				@include up($md) {
					height: 600px;
				}
				@include up($lg) {
					height: 900px;
				}
			}

			&__card-wrapper {
				position: relative;
				margin-top: 252px;
				z-index: 1;


				@include up($sm) {
					margin-top: 12vh;
				}

				@include up($md) {
					max-width: 873px;
					width: 100%;
					margin-top: 15%;
				}
				@include up($lg) {
					max-width: 895px;
				}

				@include up($xl) {
					margin-top: 240px;
				}

				h2 {
					max-width: 733px;
				}
			}

			&__card {
				div:nth-child(3) {
					div:first-child {
						@include up($md) {
							max-width: 292px !important;
							width: 100%;
						}
					}
				}
			}

			&__card-title {
				@include adopt($xs) {
					font-size: 32px;
					line-height: 37px;
				}
			}

			&__btns {
				max-width: inherit;

				.col-12 {
					button {
						span.v-btn__content {
							display: flex;
							align-items: flex-end;
							@include up($md) {
								align-items: center;
							}
							@include up($xl) {
								align-items: flex-start;
							}
						}
					}

					&:last-child {
						button {
							@include up($md) {
								max-width: 193px;
								overflow: hidden;
							}
						}
					}
				}

				.v-btn {
					svg {
						@media screen and (max-width: 374px) {
							margin-right: 12px !important;
						}
					}
				}

				/* button.shadow{
				   .v-btn__content {
					 display: flex;
					 align-items: flex-end;
				   }
				 }*/
			}

			.v-btn__content {
				font-size: 16px;
				line-height: 19px;

				@include up($md) {
					//font-size: 1.7em;
					font-size: 22px;
					line-height: 29px;
				}
			}

			.quote {
				@include up($md) {
					max-width: 720px;
				}
				@include up($sm) {
					display: flex !important;
				}

				&::before {
					content: '';
					display: inline-block;
					height: 88px;
					width: 2px;
					background: $beige5;
					margin-right: 16px;
					border-radius: 1000px;
					@include adopt($xs) {
						height: 114px;
					}
					@include up($md) {
						height: 44px;
						//background: $grey1;
					}
				}

			}

		}
	}


</style>
