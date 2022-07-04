<template>
	<div class="report-card">
		<template v-if="report.IS_APPROVED">
			<!--Swiper-->
			<swiper ref="swiper" :options="swiperOptions">

				<swiper-slide v-for="(img, i) of photos" :key="i"
							  :style="{ 'backgroundImage': 'url(' + img + ')' }">
				</swiper-slide>

				<!-- Pagination -->
				<div class="swiper-pagination report-card__pagination custom-pagination-light"
					 slot="pagination" v-if="photos.length > 1"></div>

				<div class="h5 name">
					{{ place.NAME_SHORT }}
				</div>
			</swiper>

			<v-card class="card-light mx-auto pa-8 report-card__with-photos" elevation="0">
				<v-row class="justify-center mb-5 px-3 report-card__btn">
					<v-col class="pa-2" cols="6">
						<v-btn class="w100" large @click="showBefore"
							   :class="isBefore? ' show-current' : 'show-previous'">
							{{buttonContent.before ? buttonContent.before : "Было"}}
						</v-btn>
					</v-col>
					<v-col class="pa-2" cols="6">
						<v-btn class="w100" large @click="showAfter"
							   :class="isBefore? 'show-previous' : 'show-current '">
							{{buttonContent.after ? buttonContent.after : "Стало"}}
						</v-btn>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12" class="d-flex mb-4 text-left py-0">

						<svgicon original name="camera" width="18" height="18" color="#234052" :fill="false"
								 class="mr-4 flex-shrink-0"></svgicon>
						<span class="body-2 grey-text">{{ report.DEADLINE }} &mdash; {{ serviceName }}</span>

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
						<rating-stars @updateRating="updateRating" :report="report" :readonly="!withoutRating"/>

						<template v-if="withoutRating">
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
						</template>
					</v-col>
				</v-row>
			</v-card>
		</template>
		<template v-else>

			<v-card class="card-light mx-auto pa-8 report-card__no-photos" elevation="0">

				<h4 class="beige-text mb-4">Скоро появится новый отчет</h4>

				<v-row v-if="serviceName">
					<v-col cols="12" class="d-flex mb-4 text-left py-0">

						<svgicon original name="camera" width="18" height="18" color="#234052" :fill="false"
								 class="mr-4 flex-shrink-0"></svgicon>
						<span class="body-2 grey-text">{{ serviceName }} {{ pageContent.pendingService || '&mdash; услуга в процессе исполнения' }}</span>
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
			</v-card>
		</template>

		<thank-you v-model="dialog" ref="thankYou" :message="message"/>
	</div>
</template>

<script>
    import '@/plugins/swiper';
    import ratingStars from '@/components/elements/account-elements/rating-stars';
    import thankYou from "@/components/elements/thankYou";
    import beforeAfterSwiper from "@/components/elements/beforeAfterSwiper";

    export default {
        name: 'report-card',
        props: ['report', 'place'],
        components: {ratingStars, thankYou},
        data() {
            return {
                comment: null,
                message: '',
                isBefore: true,
                dialog: false,
                withoutRating: true,
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
                        el: '.report-card__pagination',
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
            services() {
                return this.$store.state.common.services;
            },
            photos() {
                if (this.isBefore) return this.report.PICTURES_BEFORE;
                return this.report.PICTURES;
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
            serviceName() {
                const service = this.$store.state.common.services.find(el => el.ID === this.report.SERVICE);
                return service?.NAME || "";
            },
        },
        methods: {
            updateRating(rating) {
                // todo ?
            },
            openThankYou() {
                this.$refs.thankYou.showThankyou();
            },
            showBefore(index) {
                this.isBefore = true
            },
            showAfter(index) {
                this.isBefore = false
            },
            sendForm(item) {
                this.$store.dispatch('post', {
                    action: 'ReportFeedbackController',
                    params: {'msg': this.comment, 'REPORT': item, 'rating': item.RATING}
                }).then((response) => {
                    this.comment = '';
                    this.message = this.dialogs?.feedbackThanks ? this.dialogs.feedbackThanks : "Спасибо за ваш отзыв";
                    this.withoutRating = false;
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
            this.withoutRating = !this.report?.RATING;
		}
    }
</script>

<style lang="scss">
	.report-card {
		&__btn {
			position: relative;
			top: -10px;
		}

		.v-btn {
			&.show-current {	// todo move to component
				box-shadow: none !important;
				background-color: $grey1 !important;
				color: $white !important;

				&:hover {
					cursor: initial;

					&:before {
						opacity: 1 !important;
					}
				}

				&:before {
					content: "";
					position: absolute;
					top: -12px;
					bottom: auto;
					left: 50%;
					transform: translateX(-40%);
					border-width: 0 12px 12px;
					background-color: #FBFAF8;
					border-style: solid;
					border-color: $grey1 transparent;
					border-radius: unset;
					display: block;
					width: 0;
					opacity: 1;

				}
			}

			&.show-previous {	// todo move to component
				box-shadow: none !important;
				border: 3px solid $grey1
			}
		}

		.v-card {
			border-radius: $border-radius-primary;
			background: $white4;

			&.report-card__with-photos {
				position: relative;
				top: -32px;
				bottom: 0;
				z-index: 2;
			}

			&.report-card__no-photos {
				margin-bottom: 32px;
			}
		}

		.name {
			position: absolute;
			z-index: 3;
			bottom: 80px;
			left: 50%;
			transform: translateX(-50%);
			color: $white;
		}

		.swiper-container {
			margin: 0 auto;
			@include up($sm) {
				//max-width: 430px;
				height: 430px;
			}
		}

		.swiper-slide {
			min-height: 328px;
			height: 100%;
			border-radius: $border-radius-primary $border-radius-primary 0 0;
			background-size: cover;
			background-position: center;
			@include up($sm) {
				//max-width: 430px;
				height: 430px !important;
			}
		}

		.swiper-pagination {
			bottom: 62px;
		}
	}
</style>
