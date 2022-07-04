<template>
	<div class="gallery-slider-fullscreen"
	     :class="withPointer?'gallery-slider-fullscreen--with-pointer': ''"
	     :style="backgroundColor">
		<swiper ref="homeSwiper" :options="swiperOptions" @slideChange="updateSwiper">
		<swiper-slide v-for="(slide, i) in slides" :key="i">
			<div @click="onClickSlide(slide)">
				<div class="gallery-slider-fullscreen__slide"
				     :class="slideClass"
				     :style="slide.PREVIEW_PICTURE? { 'backgroundImage': 'url(' + slide.PREVIEW_PICTURE + ')' } : { 'backgroundImage': 'url(' + slide + ')' }">

					<h2 v-if="textBottom || textCenter || textTop"
					    class="gallery-slider-fullscreen__slide__text white--text"
					    :class="textClass">
						{{ slide.NAME }}
					</h2>
					<!--					<div class="swiper-lazy-preloader"></div>-->
				</div>
				<div v-if="filterLight" class="gallery-slider-fullscreen__filter-light"></div>
				<div v-if="filterDark" class="gallery-slider-fullscreen__filter-dark"></div>
			</div>
		</swiper-slide>
		<div v-if="withPagination"
		     class="swiper-pagination gallery-slider-fullscreen__pagination"
		     slot="pagination"
		     :class="isWindowMD ? 'padding-bottom-main h5' : 'h7'"
		></div>

	</swiper>
		<div v-if="isWindowMD && !noArrows">
			<!--			<div class="gallery-slider-fullscreen__arrows">-->
			<div v-show="isShowPrev" id="swiper-controller-home-prev"
			     class="gallery-slider-fullscreen__arrow gallery-slider-fullscreen__arrow--left"
			     :class="filledButton ? 'gallery-slider-fullscreen__arrow--gray' : ''">
				<button>
					<svgicon class="rotate"
					         name="arrow-next"
					         width="32"
					         height="64"
					         color="white"
					         :fill="false"
					/>
				</button>
			</div>

			<div v-if="isShowNext" id="swiper-controller-home-next"
			     class="gallery-slider-fullscreen__arrow gallery-slider-fullscreen__arrow--right"
			     :class="filledButton ? 'gallery-slider-fullscreen__arrow--gray' : ''">
				<button>
					<svgicon class=""
					         name="arrow-next"
					         width="32"
					         height="64"
					         color="white"
					         :fill="false"
					/>
				</button>
			</div>
		</div>

	</div>
</template>

<script>
	import '@/plugins/swiper';
	export default {
		name: "gallery-slider-fullscreen",

		props: {
			slides: {
				type: Array,
				default: []
			},
			fullwidth: {
				type: Boolean,
				default: false
			},
			withPagination: {
				type: Boolean,
				default: false
			},
			contain: {
				type: Boolean,
				default: false
			},
			square: {
				type: Boolean,
				default: false
			},
			horizontal: {
				type: Boolean,
				default: false
			},
			textTop: {
				type: Boolean,
				default: false
			},
			textCenter: {
				type: Boolean,
				default: false
			},
			textBottom: {
				type: Boolean,
				default: false
			},
			filledButton: {
				type: Boolean,
				default: false
			},
			filterLight: {
				type: Boolean,
				default: false
			},
			filterDark: {
				type: Boolean,
				default: false
			},
			noArrows: {
				type: Boolean,
				default: false
			},
			withPointer: {
				type: Boolean,
				default: false
			},
			darkBackground: {
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
				backgroundColor:null,
				isMoving: false,
				isShowPrev:false,
				isShowNext:true,
				swiperOptions: {
					keyboard: {
						enabled: true,
					},
					slidesPerView: 1,
					autoHeight: true,
					// loop: true,

					navigation: {
						nextEl: "#swiper-controller-home-next",
						prevEl: "#swiper-controller-home-prev",
					},

					pagination: {
						el: '.swiper-pagination',
						type: 'fraction'
					},
				},

			};
		},
		watch: {

		},
		computed: {
			swiper() {
				return this.$refs.homeSwiper && this.$refs.homeSwiper.$swiper ? this.$refs.homeSwiper.$swiper : null;
			},
			isWindowXS() {
				return this.$store.getters.isWindowXS;
			},
			isWindowMD() {
				return this.$store.getters.isWindowMD;
			},
			/*slideStyle() {
				let height;
				if (this.square) height = '100%';
				else if (this.fullwidth) height = '100vh';
				else height = 'calc(100vh - 230px)';
				return {
					paddingTop: height,
					backgroundImage:'url(' + this.slides[0].PREVIEW_PICTURE + ')'
				};
			},*/
			slideClass() {
				return {
					'gallery-slider-fullscreen__slide--fullscreen': this.fullwidth,
					'gallery-slider-fullscreen__slide--square': this.square,
					'gallery-slider-fullscreen__slide--contain': this.contain,
					'gallery-slider-fullscreen__slide--horizontal': this.horizontal,
					'gallery-slider-fullscreen__slide--default': !this.square && !this.fullwidth && !this.contain && !this.horizontal,
				}
			},
			textClass() {
				return {
					"gallery-slider-fullscreen__slide__text--center": this.textCenter,
					"gallery-slider-fullscreen__slide__text--top": this.textTop,
					"padding-top-main": this.textTop,
					"gallery-slider-fullscreen__slide__text--bottom": this.textBottom,
					"padding-bottom-main": this.textBottom,
				}
			}
		},

		methods: {
			onClickSlide(slide) {
				this.$emit('click', slide);
			},
			updateSwiper() {
				// console.log(this.swiper.activeIndex);
				this.isShowPrev = this.swiper.activeIndex!==0;
				this.isShowNext = this.swiper.activeIndex!==this.slides.length-1;
			}
		},

		mounted() {
			this.$store.state.fullscreenSlider = this.$refs.homeSwiper.$swiper;
			if (this.darkBackground)  this.backgroundColor =   {background: '#262831'}
		}
	};
</script>

<style lang="scss">
	.gallery-slider-fullscreen {
		position: relative;
		&--with-pointer{
			cursor: pointer;
		}
		&--dark{
			background: #262831;
		}
		&__slide {
			background-position: center;
			background-size: cover;

			&__pagination {

			}

			&--contain {
				padding-top: 66%;
			}

			&--fullscreen {
				padding-top: 100vh;
			}

			&--square {
				padding-top: 100%;
			}

			&--horizontal{
				padding-top: 56%;
			}

			&--default {
				padding-top: calc(100vh - 230px);
			}

			&__text {
				position: absolute;
				width: 75%;
				z-index: 2;
				@include up($sm) {
					width: 50%;
				}

				&--center {
					top: 50%;
					left: 50%;
					margin-right: -50%;
					transform: translate(-50%, -50%);
					text-align: center;
				}

				&--top {
					top: 0;
					left: 50%;
					margin-right: -50%;
					transform: translate(-50%, 0);
					text-align: left;
				}

				&--bottom {
					top: 100%;
					left: 50%;
					margin-right: -50%;
					transform: translate(-50%, -100%);
					text-align: left;
				}
			}
		}

		&__filter-light {
			background: linear-gradient(0deg, rgba(38, 40, 49, 0.25), rgba(38, 40, 49, 0.25));
			height: 100%;
			position: absolute;
			width: 100%;
			top: 0;
			left: 0;
		}

		&__filter-dark {
			/*background: #262831;*/
			/*opacity: 0.4;*/
			background: linear-gradient(0deg, rgba(38, 40, 49, 0.4), rgba(38, 40, 49, 0.4));
			height: 100%;
			position: absolute;
			width: 100%;
			top: 0;
			left: 0;
		}

		&__arrows {
			position: absolute;
			top: 50%;
			width: 100%;
			/*width: calc(100% - 160px);*/
			transform: translate(0, -50%);
			z-index: 1;
			display: flex;
			justify-content: space-between;
		}

		&__arrow {
			/*position: absolute;*/
			padding: 64px 80px;
			position: absolute;
			top: 50%;
			/*width: 100%;*/
			/*width: calc(100% - 160px);*/

			z-index: 1;

			&--right {
				right: 192px;
				transform: translate(192px, -50%);
			}

			&--left {
				transform: translate(0, -50%);

			}

			&--gray {
				background: rgba(0, 0, 0, 0.1);
				@include transition();

				&:hover {
					background: rgba(0, 0, 0, 0.15);
				}
			}

			&:focus {
				outline-style: hidden;
			}
		}

		.gallery-slider-fullscreen__arrow {
			&:focus {
				outline: none;
			}
		}


		button {
			&:focus {
				outline: none;
			}
		}

		.swiper-pagination {
			color: white;
		}

	}

</style>
