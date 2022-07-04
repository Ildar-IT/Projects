<template>
	<div class="manager-object margin-top-main px-4 text-center padding-bottom-main">
		<div class="manager-object__bg">
			<svgicon name="dandelion-big" original color="#ECE3CF"/>
		</div>

		<div class="manager-object__wrapper">
			<h2 class="beige-text text-center margin-bottom-main">Отчет о проделанной работе</h2>

			<v-card class="card-light mx-auto py-8 py-lg-16 px-md-13 px-8">

				<div class="d-flex align-center mx-auto margin-bottom-main">
					<div v-if="place.DETAIL_PICTURE" class="form-avatar__photo mr-4 photo-filter"
					     :style="{ 'backgroundImage': 'url(' + place.DETAIL_PICTURE + ')' }"></div>
					<div v-else class="form-avatar__photo mr-4"
					     :style="{ 'backgroundImage': 'url(' + img + ')' }"></div>
					<div class="h5 grey-text"> {{place.NAME_SHORT }}</div>
				</div>
				<!--Info about object-->
				<output-info :address="place.NAME" :place-number="place.PLACE_NUMBER" :geo-position="geoPosition"
				             :document="place.DOCUMENT" :notes="place.DETAIL_TEXT" class="margin-bottom-main"/>

				<!--      Included services -->

				<!--       <included-services :services="services" />-->
				<div class="margin-bottom-small">
					<h5 class="grey-text">
						Заказанная услуга
					</h5>
					<div class="mb-4 body-1">
						{{ service.NAME }}, выполнить до {{ report.DEADLINE }}
					</div>
				</div>
				<v-divider class="margin-bottom-small"></v-divider>
				<!--      Add Photo Report-->
				<add-photo-report :report="report" ref="addPhoto" @uploadPhotos="uploadPhotos"/>
				<!--      Btn SAVE -->

				<v-row class="margin-bottom-main">
					<v-col cols="12" class="pb-0 pt-0 pt-sm-3 mt-sm-2 mx-auto px-sm-9 px-3">
						<v-checkbox
								class="mx-auto"
								v-model="report.IS_DONE"
								label="Завершить отчет (при сохранении отчета будет оповещен модератор)"
						></v-checkbox>
					</v-col>
				</v-row>
				<v-row class="margin-bottom-main">
					<v-col cols="12" md="5" class="pb-0 pt-0 pt-sm-3 mt-sm-2 mx-auto px-sm-9 px-3">
						<v-btn @click="submit" type="submit" class="btn--secondary large flex align-center"
						       elevation="6" block
						       dark>
							<PulseLoader v-if="loading" :loading="true" color="#fff" size="5px"/>
							<span class="d-flex align-center" v-else>
				                <svgicon name="save" width="24" height="24" original class="mr-4" :fill="false"
				                         color="#fff"></svgicon>
				                <span>Загрузить</span>
							</span>
						</v-btn>
					</v-col>
				</v-row>

				<v-divider class="mb-1"></v-divider>

			</v-card>
		</div>
		<thank-you v-model="dialog" ref="thankYou" :message="this.message"/>
		<error-msg v-model="isError" ref="errorMsg" :error="this.error"/>
	</div>
</template>

<script>
	import errorMsg from '../elements/error-msg'
	import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
	import OutputInfo from "@/components/elements/manager-elements/output-info";
	import includedServices from '@/components/elements/manager-elements/included-services';
	import addPhotoReport from '@/components/elements/manager-elements/add-photo-report';
	import expansionPhotoReports from '@/components/elements/manager-elements/expansion-photo-reports'
	import thankYou from "@/components/elements/thankYou";

	export default {
		name: 'manager-object',
		components: {
			OutputInfo,
			errorMsg,
			includedServices,
			addPhotoReport,
			PulseLoader,
			expansionPhotoReports,
			thankYou
		},
		data() {
			return {
				error: '',
				loading: false,
				placeNumber: 354,
				geoPosition: 'Отсутствует',
				message: '',
				dialog: false,
				//months: ['Декабрь 2020', 'Январь 2021', 'Февраль 2021', 'Март 2021',],
				photos: {
					before: [],
					after: []
				}
			}
		},
		computed: {
			memories() {
				return this.$store.state.memories;
			},
			service() {
				return this.page.services.find(el => el.ID == this.report.SERVICE)
			},
			report() {
				return this.page.report;
			},
			cardId() {
				return this.$route.params?.id;
			},
			currentCard() {
				return this.page.item
			},
			place() {
				return this.page.item || null
			},
			page() {
				return this.$store.state.page.ReportItemController
			},
			img() {
				return require("@/assets/images/user.png");
			},
			isError() {
				return this.$store.state.isError;
			},
		},
		methods: {
			uploadPhotos(payload) {
				this.photos = payload;
			},
			openThankYou() {
				this.$refs.thankYou.showThankyou();
			},
			refetchPage() {
				this.$store.dispatch('fetchPage', {
					action: 'ReportItemController', params:
						{WORKER_LINK_HASH: this.$route.params.WORKER_LINK_HASH}
				}).then(() => {
				}).catch((error) => {
				});
			},
			submit() {
				console.log(this.photos) // а что если я сохраила фотки раньше, а теперь хочу подтвердить ?
				console.log("this.report.PICTURES.length", Object.keys(this.report.PICTURES));
				console.log("this.report.PICTURES_BEFORE.length", Object.keys(this.report.PICTURES_BEFORE));
				const emptyReportPhotos = (Object.keys(this.report.PICTURES).length == 0 && Object.keys(this.report.PICTURES_BEFORE).length == 0)
				if ((this.photos.before.length == 0 && this.photos.after.length == 0) && emptyReportPhotos) {
					this.$store.state.isError = true;
					this.error = {
						title: "Проверьте ввод",
						text: "Пожалуйста, добавьте фотографии."
					}
					// if (this.photos.before.length == 0) {
					// 	this.$store.state.isError = true;
					// 	this.error = {
					// 		title: "Проверьте ввод",
					// 		text: "Пожалуйста, добавьте фотографии сделанные до начала работ."
					// 	}
					// } else if (this.photos.after.length == 0) {
					// 	this.$store.state.isError = true;
					// 	this.error = {
					// 		title: "Проверьте ввод",
					// 		text: "Пожалуйста, добавьте фотографии с результатами вашей работы."
					// 	}
				} else {
					this.loading = true;
					let formData = new FormData();
					for (var i = 0; i < this.photos.before.length; i++) {
						formData.append('before[]', this.photos.before[i]);
					}
					for (var i = 0; i < this.photos.after.length; i++) {
						formData.append('after[]', this.photos.after[i]);
					}
					formData.append('report', JSON.stringify(this.report));

					for (var pair of formData.entries()) {
						console.log(pair[0] + ', ' + pair[1])
					}
					this.$store.dispatch('post', {
						action: 'ReportItemController',
						params: formData
					}).then((res) => {
						console.log("ReportItemController res ", res);
						this.loading = false;
						this.error = {
							title: "Спасибо",
							text: "Отчет загружен"
						}
						this.$store.state.isError = true;
						this.$refs.addPhoto.emptyFields()
						this.photos = {
							before: [], after: []
						}
						this.refetchPage()
					}).catch((err) => {
						console.log("ReportItemController error ", err);
						this.error = {
							title: "Что-то пошло не так",
							text: "Пожалуйста, попробуйте еще раз."
						}
						this.$store.state.isError = true;
					})
				}
			}
		},
		watch: {
			report() {
				console.log("PICTURES_BEFORE", Object.keys(this.report.PICTURES_BEFORE)[0], this.report.PICTURES_BEFORE[Object.keys(this.report.PICTURES_BEFORE)[0]]);
				console.log("PICTURES", Object.keys(this.report.PICTURES)[0], this.report.PICTURES[Object.keys(this.report.PICTURES)[0]]);
				if (Object.keys(this.report.PICTURES).length == 1 && Object.keys(this.report.PICTURES_BEFORE).length == 1 && !this.report.PICTURES_BEFORE[Object.keys(this.report.PICTURES_BEFORE)[0]] && !this.report.PICTURES_BEFORE[Object.keys(this.report.PICTURES)[0]]) {
					this.report.PICTURES_BEFORE = {};
					this.report.PICTURES = {};
				}
			}
		},
		mounted() {

		}
	}
</script>

<style lang="scss">
	#memostory {
		.manager-object {
			div.v-input--selection-controls__ripple.primary--text {
				transform: none !important;
				top: -12px !important;
			}

			div.v-input--selection-controls__ripple {
				top: -12px;
			}
		}
	}

	.manager-object {
		height: 100%;
		//position: relative;

		&__bg {
			position: absolute;
			z-index: 0;
			top: 74px;
			left: 0;
			width: 100%;
			height: 95%;

			svg {
				height: 100%;
			}
		}

		&__wrapper {
			position: relative;
		}

		.card-light {
			max-width: 845px;
			width: 100%;

			& > div:first-child {
				width: fit-content;
			}

			input {
				text-align: left !important;
			}

		}

		.form-avatar__photo {
			height: 100px;
			width: 100px;
			border-radius: 100%;
			background-image: url("../../assets/images/old-man.jpg");
			background-size: cover;
			background-position: center;
		}

		.v-textarea textarea {
			line-height: 1.5rem;
		}
	}
</style>
