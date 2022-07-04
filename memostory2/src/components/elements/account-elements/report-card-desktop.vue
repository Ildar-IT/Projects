<template>
	<div class="report-card-desktop">

		<v-row v-if="!!reports.reports && reports.reports.length > 0 " class="px-md-8 px-xl-0 pb-md-8 pb-lg-0">
			<v-col class="report-card-desktop__item mt-n8 mt-lg-0 pb-0 ml-7 "
			       cols="12">

				<!--            Btns -->
				<v-row class="justify-center d-flex align-center report-card-desktop__btns pa-0">
					<v-col class="pa-0 mr-4" cols="5">
						<v-btn large block @click="showBefore"
						       :class="isShowedBefore? 'show-current' : 'show-previous'">
							{{buttonContent.before ? buttonContent.before :  "Было"}}
						</v-btn>
					</v-col>
					<v-col class="pa-0" cols="5">
						<v-btn large block @click="showAfter"
						       :class="isShowedBefore? 'show-previous' : 'show-current'">
							{{buttonContent.after ? buttonContent.after :  "Стало"}}
						</v-btn>
					</v-col>

				</v-row>

				<v-row class="reportPhotoSwiper__wrapper">

					<swiper ref="cardsCareReportSwiper" :options="swiperOptions" class="reportPhotoSwiper">

						<swiper-slide class="reportPhotoSwiper__slide"
						              v-for="(img, i) of selectedReportPictures" :key="i"
						              :style="{ 'backgroundImage': 'url(' + img + ')' }">
						</swiper-slide>

						<!-- Pagination -->
						<div
								class="swiper-pagination light-pagination reportPhotoSwiper__pagination custom-pagination-light"
								slot="pagination" v-if="selectedReportPictures.length > 1"></div>
					</swiper>

					<div class="reportPhotoSwiper__nav d-flex justify-space-between mx-auto"
					     slot="navigation">

						<div class="reportPhotoSwiper-button-prev reportPhotoSwiper__button ">
							<v-btn fab large icon class="mr-6">
								<svgicon name="arrow-head-left" width="18" height="18" original :fill="false"
								         color="#DCCAB3"></svgicon>
							</v-btn>
						</div>
						<div class="reportPhotoSwiper__button reportPhotoSwiper-button-next ">
							<v-btn fab large icon>
								<svgicon name="arrow-head-right" width="18" height="18" original
								         :fill="false" color="#DCCAB3"></svgicon>
							</v-btn>
						</div>
					</div>
				</v-row>

				<!--Card content with position absolute -->
				<v-card class="card-light pa-lg-16 pa-8" elevation="0">
					<div class="text-left">

						<v-row class="margin-bottom-main justify-start hover-link" @click="goToMemoryPlace(reports)">
							<v-col cols="auto" class="pr-1 pb-0">

								<form-avatar :changeable="false" :card="reports"/>

							</v-col>
							<v-col cols="7" class="form-avatar__info pb-0">
								<h5 class="form-avatar__name grey-text">{{ reports.NAME_SHORT }}</h5>
								<span class="body-2 grey-text">{{ reports.NAME }}, {{ pageContent.site ? pageContent.site : "место" }} {{ reports.PLACE_NUMBER }}</span>
							</v-col>
						</v-row>

						<!--Date Swiper-->
						<v-row class="d-flex mb-12 text-left dateSwiper__wrapper">

							<swiper v-if='reports.reports' ref="dateSwiper" :options="dateSwiperOptions"
							        class="dateSwiper" @slideChange="onDateSwiperChange">
								<swiper-slide v-for="(report, index) in reports.reports" :key="report.date"
								              class="text-center align-center d-flex justify-center"
								>
									<!-- <h6 class="grey-text">{{ report.date }}, {{ report.time }}</h6> -->
									<div>
										<div class="h6 grey-text">{{ report.DATE_CREATE.slice(0, 10) }}</div>
										<div class="h7"> {{ pageContent.serviceProvided ? pageContent.serviceProvided  : "Выполнена услуга: "}}   {{ reportName(report) }}</div>
									</div>
								</swiper-slide>

							</swiper>

							<!--Btns-->
							<div v-if='reports.reports.length>1'
							     class="dateSwiper__nav d-flex justify-space-between mx-auto"
							     slot="navigation">

								<div class="dateSwiper-button-prev dateSwiper__button ">
									<v-btn fab large icon class="mr-6">
										<svgicon name="arrow-head-left" width="18" height="18" original :fill="false"
										         color="#DCCAB3"></svgicon>
									</v-btn>
								</div>
								<div class="dateSwiper__button dateSwiper-button-next ">
									<v-btn fab large icon>
										<svgicon name="arrow-head-right" width="18" height="18" original
										         :fill="false" color="#DCCAB3"></svgicon>
									</v-btn>
								</div>
							</div>
						</v-row>
						<!--Rating Stars-->
						<rating-stars class="mb-5" @updateRating="updateRating" :report="currentReport"/>

						<v-text-field  :placeholder="placeHolders.leaveReview ? placeHolders.leaveReview: 'Оставить отзыв'" class="text-center mb-4"
						              single-line v-model="comment"
						              hide-details/>

						<!--        BTN -->
						<v-btn type="submit" class="btn--secondary large d-flex align-center mb-5 mb-lg-16 mt-lg-7 mt-0 mx-auto"
						       elevation="6"
						       block
						       dark
						       @click="sendForm">
							<svgicon name="mail" width="24" height="24" original class="mr-4" :fill="false"
							         color="#fff"></svgicon>
							<span>{{buttonContent.send ? buttonContent.send :  "Отправить"}}</span>
						</v-btn>

					</div>
				</v-card>
			</v-col>
		</v-row>
		<div v-else class="d-flex flex-column">
			<h3 class="grey-text-light2 mb-md-8 mb-4">{{ pageContent.placeholder ? pageContent.placeholder : "Здесь будут отчеты."}}</h3>
			<p class="body-1 grey-text-light2 ">{{ pageContent.placeholderSubtitle ? pageContent.placeholderSubtitle : "После выполнения услуги мы разместим здесь фотоотчет о проделанной работе"}}</p>
		</div>
		<thank-you v-model="dialog" ref="thankYou" :message="this.message"/>
	</div>
</template>

<script>
	import '@/plugins/swiper';
	// import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
	// import 'swiper/swiper-bundle.css'
	// Import Swiper Vue.js components
	// import { Swiper, SwiperSlide } from 'swiper/vue';
	import 'swiper/swiper.scss';

	import ratingStars from '@/components/elements/account-elements/rating-stars';
	import formAvatar from '@/components/elements/account-elements/form-avatar';
	import thankYou from "@/components/elements/thankYou";

	export default {
		name: 'report-card-desktop',
		props: ['reports'],
		components: {ratingStars, formAvatar, thankYou},

		data() {
			return {
				lock: false,
				isShowedBeforeObj: {updateCounter: 1},
				isShowedBefore: false,
				selectedDateIndex: 0,
				myDateSwiper: null,
				comment: null,
				message: '',
				dialog: false,
				requestStatus: null,
				//Swiper
				isMoving: false,
				swiperOptions: {
					keyboard: {
						enabled: true,
					},
					slidesPerView: 'auto',
					preloadImages: false,
					autoHeight: false,
					spaceBetween: 16,
					// effect: 'fade',
					lazy: true,
					pagination: {
						el: '.reportPhotoSwiper__pagination',
						clickable: true,
						type: 'bullets'
					},
					navigation: {
						nextEl: '.reportPhotoSwiper-button-next',
						prevEl: '.reportPhotoSwiper-button-prev',
					},
				},
				dateSwiperOptions: {
					keyboard: {
						enabled: true
					},
					autoHeight: false,
					slidesPerView: 'auto',
					navigation: {
						nextEl: '.dateSwiper-button-next',
						prevEl: '.dateSwiper-button-prev',
					},
				}
			}
		},
		computed: {
			dialogs() {
				return this.$store.state.common.dialogs || {};
			},
			currentReport() {
				return this.reports.reports[this.selectedDateIndex];
			},
			services() {
				return this.$store.state.common.services;
			},
			selectedReportPictures() {
				if ( this.isShowedBefore) return this.currentReport.PICTURES_BEFORE;
				return this.currentReport.PICTURES;
			},
			pageContent() {
				return this.$store.state.page.ReportListController.texts.content || {}
			},
			pageButtons() {
				return this.$store.state.common?.buttons;
			},
			buttonContent() {
				return {
					before: this.pageButtons?.before ? this.pageButtons?.before : 'Было',
					after: this.pageButtons?.after ? this.pageButtons?.after :  'Стало',
					send: this.pageButtons?.send ? this.pageButtons?.send :  'Отправить'
				}
			},
			placeHolders() {
				return this.$store.state.common.formPlaceholders || {};
			},
		},
		methods: {
			reportName(report) {
				return 	this.services.find(el => el.ID == report['SERVICE'])['NAME'];
			},
			goToMemoryPlace(place) {
				this.$router.push('/account/settings/' + place.ID)
			},
			updateRating(rating) {
				this.currentReport.rating = rating;
			},
			showBefore() { //show photos from photosBefore in report
				/*      this.isShowedBeforeObj[this.selectedDateIndex.toString()] = true;
					  this.isShowedBeforeObj.updateCounter++;*/
				this.isShowedBefore = true
			},
			showAfter() { //show photos from photosAfter in report
				/*      this.isShowedBeforeObj[this.selectedDateIndex.toString()] = false;
					  this.isShowedBeforeObj.updateCounter++;*/
				this.isShowedBefore = false
			},
			/*    isShowedBefore() {
				  this.isShowedBeforeObj.updateCounter;
				  if (this.selectedDateIndex.toString() in this.isShowedBeforeObj) {
					return this.isShowedBeforeObj[this.selectedDateIndex.toString()]
				  }
				  this.isShowedBeforeObj[this.selectedDateIndex.toString()] = true;
				  this.$set(this.isShowedBeforeObj, this.selectedDateIndex.toString(), true);
				  return true;
				},*/
			onDateSwiperChange() {
				this.selectedDateIndex = this.$refs.dateSwiper.$swiper.activeIndex;
			},
			openThankYou() {
				this.$refs.thankYou.showThankyou();
			},
			sendForm() {
				this.$store.dispatch('post', {
					action: 'ReportFeedbackController',
					params: {
						'REPORT': this.currentReport.ID,
						'msg': this.comment,
						'rating': this.currentReport.RATING
					}
				}).then((response) => {
					this.comment = '';
					this.message = this.dialogs?.feedbackThanks ? this.dialogs.feedbackThanks : "Спасибо за ваш отзыв";
					this.openThankYou();
				}).catch((error) => {
					console.log('error', error);
					this.message = this.dialogs?.smthWentWrong ? this.dialogs.smthWentWrong : 'Что-то пошло не так. Попробуйте еще раз.'
					this.openThankYou();
					this.requestStatus = 'error';
				}).finally(() => {
					setTimeout(() => {
						this.requestStatus = null;
					}, 5000)
				})
			}
		},
	}
</script>

<style lang="scss">
	.report-card-desktop {
		position: relative;
		max-width: 1714px;
		width: 100%;
		margin: 0 auto;

		&__btns {
			position: absolute;
			left: 45%;
			bottom: 0;
			transform: translateX(-100%);
			background-color: $white4;
			border-radius: $border-radius-primary $border-radius-primary 0 0;
			max-width: 310px;
			width: 100%;
			height: 80px;
			padding: 16px;
			z-index: 2;

			button {
				height: 48px !important;
			}

		}

		&__item {
			position: relative;
			display: flex;
			flex-direction: row;
			width: 100%;
		}

		.reportPhotoSwiper {
			height: 100% !important;
			max-width: 1260px;
			width: 100%;
			&__wrapper {
				position: relative;
			}
			&__nav {
				width: 100%;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				z-index: 1;
				padding: 24px;
				padding-right: 64px;

				button {
					width: 48px;
					height: 48px;
					cursor: pointer;
				}

				div[aria-disabled=true] {
					button {
						background-color: #eeefef9e;

						svg {
							path {
								stroke: #C8CFD4;
							}
						}
					}
				}

				div[aria-disabled=false] {
					button {
						background: $gradient-dark;
						box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.15);

						svg {
							path {
								stroke: $white
							}
						}
					}
				}
			}

			&__pagination {
				position: relative;
				bottom: 147px;
			}

			.swiper-wrapper {
				max-width: 1260px;
			}

			&__slide {
				height: 100% !important;
				background-position: center;
				background-size: cover;
				max-width: 1260px;
				border-radius: $border-radius-primary 0 0 $border-radius-primary;
			}
		}

		.card-light {
			position: relative;
			left: -30px;
			top: 0;
			max-width: 483px;
			width: 100%;
			height: 100%;
			z-index: 1;
		}


		.dateSwiper {

			&__wrapper {
				position: relative;
				min-height: 64px;
				max-width: 355px;
				margin: 0 auto;
			}

			&__nav {
				width: 100%;
				position: absolute;
				top: -50%;
				margin-top: 38px;
				z-index: 1;

				button {
					width: 48px;
					height: 48px;
				}

				div[aria-disabled=true] {
					button {
						background-color: #EEEFEF;

						svg {
							path {
								stroke: #C8CFD4;
							}
						}
					}
				}

				div[aria-disabled=false] {
					button {
						background: $gradient-dark;
						box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.15);

						svg {
							path {
								stroke: $white
							}
						}
					}
				}
			}

		}

	}
</style>
