<!--
<template>
	<div class="gallery-slider" >
		<swiper ref="gallerySwiper"
		        :options="swiperOptions"
		>
			<swiper-slide v-for="(slide, i) in slides" :key="i" class="margin-left-main "
			              :class="i===slides.length-1 ? 'margin-right-main' : 'margin-right-small'">
				<div @click="onClickSlide(slide)" :class="withPointer?'gallery-slider__slide&#45;&#45;with-pointer':''">
					<div class="gallery-slider__slide "
					     :class="slideClass"
					     :style="{ 'backgroundImage': 'url(' + slide.PREVIEW_PICTURE + ')' }">
						<h1 v-if="textBottom || textCenter || textTop"
						    class="gallery-slider__slide__text white&#45;&#45;text"
						    :class="textClass">
							{{ slide.NAME }}
						</h1>
						<h6 v-if="withYear && slide.YEAR"
						    class="gallery-slider__slide__text gallery-slider__slide__text&#45;&#45;bottom white&#45;&#45;text padding-bottom-main"
						    :class="textClass">
							{{ slide.YEAR }}
						</h6>
						&lt;!&ndash;					<div class="swiper-lazy-preloader"></div>&ndash;&gt;
					</div>
					<div v-if="filterLight" class="gallery-slider__filter-light"></div>
					<div v-if="filterDark" class="gallery-slider__filter-dark"></div>
					<template v-if="textUnder">
						<div class="body-2 news__date margin-top-small">
							{{slide.ACTIVE_FROM}}
						</div>
						<h5 v-if="isWindowXS" class="news__title margin-top-small">
							{{slide.NAME.slice(0,30)}}
							<span v-if="slide.NAME.length>30">...</span>
						</h5>
						<h5 v-else class="news__title margin-top-small">
							{{slide.NAME}}
						</h5>
					</template>
				</div>
			</swiper-slide>
		</swiper>

		<div v-if="isWindowMD">
			<div class="gallery-slider__arrows">
				<div id="swiper-controller-gallery-prev">
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

				<div  id="swiper-controller-gallery-next">
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
	</div>
</template>

<script>
	import '@/plugins/swiper';
	export default {
		name: "gallery-slider",

		props: {
			slides: {
				type: Array,
				default: []
			},
			fullwidth: {
				type: Boolean,
				default: false
			},
			square: {
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
			textUnder: {
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
			withYear: {
				type: Boolean,
				default: false
			},
			initialSlide: {
				type: Number,
				default:0,
			},
			withPointer: {
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
				isMoving: false,
				swiperOptions: {
					keyboard: {
						enabled: true,
					},
					slidesPerView: 'auto',
					autoHeight: true,
					navigation: {
						nextEl: "#swiper-controller-gallery-next",
						prevEl: "#swiper-controller-gallery-prev",
					},
					initialSlide: this.initialSlide,
				},

			};
		},
		computed: {
			swiper() {
				return this.$refs.gallerySwiper.$swiper;
			},
			isWindowXS() {
				return this.$store.getters.isWindowXS;
			},
			isWindowMD() {
				return this.$store.getters.isWindowMD;
			},
			slideClass() {
				return {
					'gallery-slider__slide&#45;&#45;fullscreen': this.fullwidth,
					'gallery-slider__slide&#45;&#45;square': this.square,
					'gallery-slider__slide&#45;&#45;default': !this.square && !this.fullwidth,
					'gallery-slider__slide&#45;&#45;with-pointer': this.withPointer,
				}
			},
			textClass() {
				return {
					"gallery-slider__slide__text&#45;&#45;center": this.textCenter,
					"gallery-slider__slide__text&#45;&#45;top": this.textTop,
					"padding-top-main": this.textTop,
					"gallery-slider__slide__text&#45;&#45;bottom": this.textBottom,
					"padding-bottom-main": this.textBottom,
				}
			}
		},
		methods: {
			onClickSlide(slide) {
				this.$emit('click', slide);
			}
		},
		watch: {
			initialSlide() {
				this.swiper.slideTo(this.initialSlide, 1, false);
			}
		},
		mounted() {
		}
	};
</script>

<style lang="scss">
	.gallery-slider {
		&__slide {
			background-position: center;
			background-size: cover;

			&&#45;&#45;with-pointer{
				cursor: pointer;
			}

			&&#45;&#45;fullscreen {
				padding-top: 100vh;
			}

			&&#45;&#45;square {
				padding-top: 100%;
			}

			&&#45;&#45;default {
				padding-top: calc(100vh - 230px);
			}

			&__text {
				position: absolute;
				width: 75%;
				z-index: 2;
				@include up($sm) {
					width: 50%;
				}

				&&#45;&#45;center {
					top: 50%;
					left: 50%;
					margin-right: -50%;
					transform: translate(-50%, -50%);
					text-align: center;
				}

				&&#45;&#45;top {
					top: 0;
					left: 50%;
					margin-right: -50%;
					transform: translate(-50%, 0);
					text-align: left;
				}

				&&#45;&#45;bottom {
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
			width: calc(100% - 160px);
			transform: translate(80px, 0);
			z-index: 1;
			display: flex;
			justify-content: space-between;
		}

		.swiper-slide {
			width: 70%;
		}
	}

</style>
-->
