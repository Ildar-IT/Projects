<template>
	<div class="mt-n8">
		<template v-if="items && items.length > 0  && hasApprovedReports">
			<div v-for="(report, index) in items" :key="report.ID"
				 class="report-card-mobile__item memory-place-card  mx-auto mt-lg-0" :id="'report' + report.ID"
			>
				<template v-if="report.IS_APPROVED">
					<!--Swiper-->
					<swiper ref="cardsCareReportSwiper" :options="swiperOptions">

						<swiper-slide v-for="(img, i) of selectedReportPictures" :key="i"
									  :style="{ 'backgroundImage': 'url(' + img + ')' }">
						</swiper-slide>

						<!-- Pagination -->
						<div class="swiper-pagination report-card-mobile__pagination custom-pagination-light"
							 slot="pagination" v-if="selectedReportPictures.length > 1"></div>

						<div class="h5 name">
							{{ place.NAME_SHORT }}
						</div>
					</swiper>

					<!--Card content with position absolute -->
					<v-card class="card-light mx-auto" elevation="0">
						<div class="pb-8 ">
							<!--            Btns -->
							<v-row class="justify-center mb-5 px-3 report-card-mobile__btn">
								<v-col class="pa-2" cols="6">
									<v-btn class="w100" large @click="showBefore(index)"
										   :class="getIsShowedBefore? ' show-current' : 'show-previous'">
										{{buttonContent.before ? buttonContent.before : "Было"}}
									</v-btn>
								</v-col>
								<v-col class="pa-2" cols="6">
									<v-btn class="w100" large @click="showAfter(index)"
										   :class="getIsShowedBefore? 'show-previous' : 'show-current '">
										{{buttonContent.after ? buttonContent.after : "Стало"}}
									</v-btn>
								</v-col>
							</v-row>

							<!--            Text -->
							<v-row>
								<v-col cols="12" class="d-flex mb-4 text-left py-0">

									<svgicon original name="camera" width="18" height="18" color="#234052" :fill="false"
											 class="mr-4 flex-shrink-0"></svgicon>
									<span class="body-2 grey-text">{{ report.DATE_CREATE }}</span>

								</v-col>
							</v-row>
							<v-row v-if="pendingServiceName(report)">
								<v-col cols="12" class="d-flex mb-4 text-left py-0">

									<svgicon original name="camera" width="18" height="18" color="#234052" :fill="false"
											 class="mr-4 flex-shrink-0"></svgicon>
									<span class="body-2 grey-text">«{{ pendingServiceName(report) }}» {{ pageContent.pendingService || '- услуга в процессе исполнения, скоро появится новый фотоотчет' }}</span>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" class="d-flex mb-4 flex-nowrap text-left py-0">

									<svgicon original name="map-pin" width="18" height="18" color="#234052"
											 :fill="false"
											 class="mr-4 flex-shrink-0"></svgicon>
									<span class="body-2 grey-text">{{ place.NAME }}</span>

								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" class="pb-0">
									<rating-stars @updateRating="updateRating" :report="report"/>
									<v-text-field
											:placeholder="placeHolders.leaveReview ? placeHolders.leaveReview: 'Оставить отзыв'"
											class="text-center mb-8"
											single-line v-model="comment"
											hide-details/>

									<!--        BTN -->
									<v-btn type="submit"
										   class="btn--secondary large flex align-center mb-5 mb-lg-16 mt-lg-7 mt-0 mx-auto"
										   elevation="6"
										   block
										   dark
										   @click="sendForm(report)">
										<svgicon name="mail" width="24" height="24" original class="mr-4" :fill="false"
												 color="#fff"></svgicon>
										<span> {{buttonContent.send ? buttonContent.send :  "Отправить"}}</span>
									</v-btn>
								</v-col>
							</v-row>
						</div>
					</v-card>
				</template>
			</div>
		</template>
		<template v-else>
			<div class="report-card-mobile__item mt-n8 mt-lg-0">
				<!--      <router-link :to="'settings/'+place.ID" class="memory-place-card mx-auto d-flex flex-md-row flex-column">-->
				<div class="memory-place-card__wrapper mx-auto">
					<h5 class="memory-place-card__name">
						{{ place.NAME_SHORT }}
					</h5>
					<v-img v-if="place.DETAIL_PICTURE" class="memory-place-card__photo photo-filter"
						   :style="{ 'backgroundImage': 'url(' + place.DETAIL_PICTURE + ')' }"></v-img>
					<v-img v-else class="memory-place-card__photo "
						   :style="{ 'backgroundImage': 'url(' + img + ')' }"></v-img>
				</div>
				<v-card class="card-light mx-auto flex align-center" elevation="0">
					<div class="pb-8 pt-5 px-5">
						<h2 class="beige-text mb-md-8 mb-4">{{ pageContent.placeholder ? pageContent.placeholder :
							"Здесь будут отчеты."}}</h2>
						<p class="body-1">{{ pageContent.placeholderSubtitle ? pageContent.placeholderSubtitle : `После
							выполнения услуги мы разместим здесь фотоотчет о проделанной работе`}}</p>
					</div>
				</v-card>
				<!--      </router-link>-->
			</div>
		</template>
		<thank-you v-model="dialog" ref="thankYou" :message="this.message"/>
	</div>
</template>

<script>
    import '@/plugins/swiper';
    import ratingStars from '@/components/elements/account-elements/rating-stars';
    import thankYou from "@/components/elements/thankYou";
    import beforeAfterSwiper from "@/components/elements/beforeAfterSwiper";

    export default {
        name: 'report-card-mobile',
        props: ['place', 'items'],
        components: {ratingStars, thankYou},
        data() {
            return {
                isShowedBeforeObj: {updateCounter: 1},
                comment: null,
                message: '',
                getIsShowedBefore: true,
                dialog: false,
                swiperOptions: {
                    keyboard: {
                        enabled: true,
                    },
                    slidesPerView: 'auto',
                    preloadImages: false,
                    autoHeight: true,
                    spaceBetween: 16,
                    // effect: 'fade',
                    lazy: true,
                    pagination: {
                        el: '.report-card-mobile__pagination',
                        clickable: true,
                        type: 'bullets'
                    },
                },
            }
        },
        computed: {
            dialogs() {
                return this.$store.state.common.dialogs || {};
            },
            swiper() {
                return this.$refs.cardsCareReportSwiper.swiper
            },
            img() {
                return require("@/assets/images/user.png");
            },
            services() {
                return this.$store.state.common.services;
            },
            currentReport() {
                return this.items[0];//this.selectedDateIndex];
            },
            selectedReportPictures() {
                if (this.getIsShowedBefore) return this.currentReport.PICTURES_BEFORE;
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
                    after: this.pageButtons?.after ? this.pageButtons?.after : 'Стало',
                    send: this.pageButtons?.send ? this.pageButtons?.send : 'Отправить'
                }
            },
            placeHolders() {
                return this.$store.state.common.formPlaceholders || {};
            },
            hasApprovedReports() {
                if (this.items && this.items.length > 0) {
                    return this.items.some(el => !!el.IS_APPROVED);
                }
            }
        },
        methods: {
            pendingServiceName(report) {
                console.log("Report for pending service: ", report);
            },
            updateRating(rating) {
                // todo ?
            },
            openThankYou() {
                this.$refs.thankYou.showThankyou();
            },
            showBefore(index) {
                this.getIsShowedBefore = true
                // this.isShowedBeforeObj[index.toString()] = true;
                // this.isShowedBeforeObj.updateCounter++;
            },
            showAfter(index) {
                this.getIsShowedBefore = false
                // this.isShowedBeforeObj[index.toString()] = false;
                // this.isShowedBeforeObj.updateCounter++;
            },
            // getIsShowedBefore(index) {
            //     this.isShowedBeforeObj.updateCounter;
            //     if (index.toString() in this.isShowedBeforeObj) {
            //         return this.isShowedBeforeObj[index.toString()]
            //     }
            //     this.isShowedBeforeObj[index.toString()] = true;
            //     this.$set(this.isShowedBeforeObj, index.toString(), true);
            //     return true;
            // },
            /*fetchReport(placeId) {
                let params = {placeId: placeId};
                this.$store.dispatch('request', {
                    action: 'ReportListController',
                    params
                }).then((res) => {
                    this.items = res.page.ReportListController.items

                    if (this.$route.params.report || this.$route.params.reportId) {
                        let reportId = this.$route.params.report ? this.$route.params.report.ID : this.$route.params.reportId;
                        let el = document.getElementById('report' + reportId);
                        console.log("el", el)
                        window.scrollTo({
                            top: el.offsetTop,
                            behavior: "smooth"
                        });
                    }
                    //console.log('response:', res)
                }).catch((error) => {
                    console.log('error:', error)
                });
            },*/
            sendForm(item) {
                this.$store.dispatch('post', {
                    action: 'ReportFeedbackController',
                    params: {'msg': this.comment, 'REPORT': item, 'rating': item.RATING}
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
            },
        },
        mounted() {
            /*this.$nextTick(function () {
                this.fetchReport(this.place.ID);
            })*/
        }
    }
</script>

<style lang="scss">
	.report-card-mobile {
		&__btn {
			position: relative;
			top: -10px;
		}

		.v-card {
			position: relative;
			top: -32px;
			bottom: 0;
			border-radius: $border-radius-primary;
			background: $white4;
			z-index: 2;
			@include up($sm) {
				max-width: 430px;
			}
		}

		.memory-place-card {
			//width: 328px;
			&__wrapper {
				position: relative;
				//width: 328px;
				height: 320px;
				border-radius: $border-radius-primary;
				@include up($sm) {
					width: 430px;
					height: 430px;
				}
			}

			&__photo {
				background-size: cover;
				background-position: center;
				border-radius: $border-radius-primary $border-radius-primary 0 0;
				// width: 328px;
				height: 320px;
				@include up($sm) {
					width: 430px;
					height: 430px;
					// border-radius: $border-radius-primary 0 0 $border-radius-primary;
				}
			}

			&__name {
				position: absolute;
				z-index: 1;
				color: $white4;
				bottom: 64px;
				left: 50%;
				transform: translateX(-50%);
			}

			.card-light {
				position: relative;
				bottom: 30px;
				min-width: 300px;
				padding: 32px;
			}
		}

		.name {
			position: absolute;
			z-index: 3;
			bottom: 64px;
			left: 50%;
			transform: translateX(-50%);
			color: $white;
		}

		.swiper-container {
			margin: 0 auto;
			@include up($sm) {
				max-width: 430px;
				height: 430px;
			}
		}

		.swiper-slide {
			min-height: 328px;
			height: 100%;
			border-radius: $border-radius-primary $border-radius-primary 0 0;
			height: 100%;
			background-size: cover;
			background-position: center;
			@include up($sm) {
				max-width: 430px;
				height: 430px !important;
			}
		}

		.swiper-pagination {
			bottom: 62px;
		}
	}
</style>
