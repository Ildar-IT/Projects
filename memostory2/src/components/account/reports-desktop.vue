<template>
	<div class="reports-desktop">
		<v-row class="justify-center mb-13">
			<div class="personSwiper__wrapper container">
				<v-radio-group v-model="radios" row mandatory
				               class="d-flex justify-center mx-auto" hide-details>
					<swiper :options="personSwiperOptions" class="personSwiper">
						<swiper-slide v-for="(person, i) in places" :key="person.ID">
							<v-radio :value="person.i" off-icon="" on-icon="">
								<template v-slot:label>
									<div class="d-flex align-center  reports-desktop__radio-wrapper"
									     :style="i==radios?'opacity:1':'opacity:0.3'" @click="fetchReport(person.ID)">
										<div class="reports-desktop__radio">
											<div v-if="person.DETAIL_PICTURE"
											     class="form-avatar__photo mr-4 photo-filter"
											     :style="{ 'backgroundImage': 'url(' + person.DETAIL_PICTURE + ')' }"></div>
											<div v-else class="form-avatar__photo mr-4"
											     :style="{ 'backgroundImage': 'url(' + img + ')' }"></div>
										</div>
										<div>
											<h5 class="grey-text">{{person.NAME_SHORT }}</h5>
											<span v-if="person.reports && person.reports.length > 0 && !allreportsApproved(person)" class="body-2 mt-2 grey-text"> «{{ deadlineService(lastUnfinishedReport(person)) }}» {{ pageContent.inProcess ? pageContent.inProcess :"- Услуга в процессе исполнения" }}</span>
										</div>
									</div>
								</template>
							</v-radio>
						</swiper-slide>
					</swiper>
				</v-radio-group>
				<!--Btns-->
				<div class="personSwiper__nav d-flex justify-space-between mx-auto" slot="navigation">

					<div class="personSwiper-button-prev personSwiper__button ">
						<v-btn fab large icon class="mr-6">
							<svgicon name="arrow-head-left" width="18" height="18" original :fill="false"
							         color="#DCCAB3"></svgicon>
						</v-btn>
					</div>
					<div class="personSwiper__button personSwiper-button-next ">
						<v-btn fab large icon>
							<svgicon name="arrow-head-right" width="18" height="18" original
							         :fill="false" color="#DCCAB3"></svgicon>
						</v-btn>
					</div>
				</div>
			</div>

		</v-row>
		<v-row class="flex-column mb-13">
			<!-- <div v-for="(place, i) in reportsWithPlaces"
				 :key="place.ID" v-if="i==radios">
			</div> -->
			<report-card-desktop :reports="reportsOfSelectedPlace"/>

		</v-row>
	</div>
</template>

<script>
	import reportCardDesktop from "@/components/elements/account-elements/report-card-desktop.vue"

	export default {
		name: 'reports-desktop',
		components: {reportCardDesktop},
		props: ['places'],
		data() {
			return {
				radios: 0,
				personSwiperOptions: {
					keyboard: {
						enabled: true
					},
					spaceBetween: 30,
					autoHeight: false,
					slidesPerView: 'auto',
					navigation: {
						nextEl: '.personSwiper-button-next',
						prevEl: '.personSwiper-button-prev',
					},
				}
			}
		},
		computed: {
			pageContent() {
				return this.$store.state.page.ReportListController.texts.content || {}
			},
			services() {
				return this.$store.state.common.services;
			},
			img() {
				return require("@/assets/images/user.png");
			},
			items() {
				return this.$store.state.page.ReportListController.items || []
			},
			reportsWithPlaces() {
				let places = JSON.parse(JSON.stringify(this.places))
				 places = places.map((el, index) => {
					if (!this.$route.params.reportId || this.$route.params.placeId ) {
						//alert("")
						if ( el.reports) el.reports = el.reports.filter(el => el.IS_APPROVED == true)
						return el
					} else {
						el.reports = [this.items]
						return el
					}
				})
				return places || []
			},
			reportsOfSelectedPlace() {
				console.log('this.radios', this.radios)
				return this.reportsWithPlaces[this.radios];
			}
		},
		methods: {
			allreportsApproved(place) {
				console.log("allreportsApproved",  place.reports)
				console.log("Approved",  place.reports.some(el => !el.IS_APPROVED))
				if (place.reports && place.reports.some(el => !el.IS_APPROVED)) {
					return false
				}
				return true
			},
			lastUnfinishedReport(place) {
				if(place.reports?.length > 0) {
					let reports = JSON.parse(JSON.stringify(place.reports))
					reports = reports.filter(el => !el.IS_APPROVED);
					reports.sort((a,b) => b.ID - a.ID);
					console.log("reports[0]" , reports[0]);
					return reports[0]
				}
			},
			dealineDate(report) {
				let temp = report['DATE_CREATE'].split('.');

				const t = temp[0];
				temp[0] = temp[1];
				temp[1] = t;
				temp = temp.join(".");

				let date = new Date(temp);
				date = date.setDate(date.getDate() + 14);
				date = new Date(date).toLocaleDateString();
				return date
			},
			deadlineService(report) {
				return this.services.find(el => el.ID == report.SERVICE).NAME
			},
			showPersonCard(index) {
				return index === this.radios;
			},
			lastReportDate(person) {
				console.log(person);
				return person.reports.sort(function (a, b) {
					return new Date(b.DATE_CREATE) - new Date(a.DATE_CREATE);
				})[0].DATE_CREATE || '';
			},
			fetchReport(placeId) {
				let params = {placeId: placeId, withReport: true};
				this.$store.dispatch('fetchPage', {
					action: 'ReportListController',
					params
				}).then((res) => {
					console.log('response:', res)
				}).catch((error) => {
					console.log('error:', error)
				});
			}
		},
		mounted() {
			if (this.$route.params.report) {
				const temp = this.reports.sort((a, b) => {
					return a.id - b.id
				})
				//const place = temp.find(el => el.ID == this.$route.params.report)
				const place = this.items.find(el => el.PLACE == this.$route.params.report)['PLACE']
				this.fetchReport(place)
				this.radios = this.reportsWithPlaces.indexOf(place)
			} else if (this.$route.params.reportId) {
				let placeId = this.$route.params.placeId ? this.$route.params.placeId : this.items['PLACE']
				let place = this.places.find(el => el.ID == placeId);
				//console.log("place  ", place, "placeId" , placeId);
				//this.fetchReport(place.ID)
				this.radios = this.reportsWithPlaces.findIndex( el => el.ID == placeId);
				console.log("this.reportsWithPlaces.indexOf(place)  this.radios  ", this.radios);
			}
		}
	}
</script>

<style lang="scss">

	.reports-desktop {
		&__radio {
			position: relative;

			div.v-radio {
				.v-input--selection-controls__input {
					display: none;
				}

				input[aria-checked="false"] {
					opacity: .2;
				}
			}
		}

		.swiper-wrapper {
			max-width: 1714px;
			z-index: 1;
		}

		.personSwiper {
			.swiper-slide {
				width: fit-content
			}

			i {
				&::after {
					display: none;
				}
			}
			.v-input--selection-controls__ripple {
				display: none;
			}

			&__wrapper {
				position: relative;
				min-height: 64px;
				margin: 0 auto;
				width: 100vw;
			}

			&__nav {
				width: 100%;
				position: absolute;
				top: -50%;
				left: 50%;
				transform: translate(-50%, 125%);
				margin-top: 38px;


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
