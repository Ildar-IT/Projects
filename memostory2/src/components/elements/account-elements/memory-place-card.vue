<template>

	<div class="memory-place-card d-flex flex-md-row flex-column mb-md-16 mb-0">

		<div @click="goToEdit" class="memory-place-card__wrapper">
			<h5 class="memory-place-card__name">
				{{ place.NAME_SHORT }}
			</h5>
			<v-img v-if="place.DETAIL_PICTURE" class="memory-place-card__photo photo-filter"
			       :style="{ 'backgroundImage': 'url(' + place.DETAIL_PICTURE + ')' }"></v-img>
			<v-img v-else class="memory-place-card__photo" :style="{ 'backgroundImage': 'url(' + img + ')' }"></v-img>
		</div>
		<!--Card content with position relative -->
		<v-card class="card-light" elevation="0">
			<v-card-text class="text-left d-flex flex-column margin-bottom-main pa-0">
				<div class="d-flex flex-row" :class="!place.IS_CONFIRMED || !place.SQUARE ? 'margin-bottom-main' : '' ">
					<svgicon original name="map-pin" height="24" :fill="false" color="#234052"
					         class="mr-4 flex-shrink-0"/>
					<div class="flex-column d-flex">
						<!--              Location address-->
						<span class="subtitle-1 grey-text ">{{ place.NAME }} <br> {{ pageContent.site ? pageContent.site : "участок"}} {{ place.PLACE_NUMBER }}</span>
						<!--              Status-->

						<span v-if="place.IS_CONFIRMED && place.SQUARE"
						      class="memory-place-card__status font-weight-bold mt-1 mt-lg-3 mb-4 green-text">{{pageContent.confirmed || "Подтверждено"}}</span>


					</div>
				</div>

				<div v-if="!place.IS_CONFIRMED || !place.SQUARE" class="memory-place-card__withBg body-1 text-center">
					{{ pageContent.confirmationPlaceholder || 'Локация в процессе подтверждения' }}
				</div>

				<div v-if="place.PLACE_TARIFF" class="d-flex flex-row mb-4">
					<svgicon original name="swipe" width="24" height="24"  color="#234052"
					         class="mr-4 flex-shrink-0"/>
					<div class="flex-column d-flex">
						<span class="subtitle-1 grey-text"> {{pageContent.tariff ? pageContent.tariff : "Тариф "}} {{  getTariff(place.PLACE_TARIFF) }}</span>
					</div>
				</div>

				<div v-if="place.reports && place.reports.length > 0 && allreportsApproved " class="d-flex flex-row">
					<svgicon original name="camera" width="24" height="24" :fill="false" color="#234052"
					         class="mr-4 flex-shrink-0 hover-link"/>
					<div class="flex-column d-flex" @click="goToReport(place)">
						<span class="subtitle-1 hover-link grey-text"> {{ pageContent.lastReport ? pageContent.lastReport : "Фотоотчёт от" }} {{ lastReport(place).DATE_CREATE.slice(0,10) }}</span>
					</div>
				</div>
				<div v-else-if="place.reports && place.reports.length > 0" class="d-flex flex-row">
					<svgicon original name="camera" width="24" height="24" :fill="false" color="#234052"
					         class="mr-4 flex-shrink-0"/>
					<div class="flex-column d-flex">
						<span class="subtitle-1 grey-text"> «{{ deadlineService(lastUnfinishedReport(place)) }}» {{ pageContent.inProcess ||'- услуга в процессе исполнения, примерная дата завершения '}} {{lastUnfinishedReport(place).DEADLINE}} </span>
					</div>
				</div>
				<div v-else>
				</div>


				<!--          <v-btn class="margin-top-main tariff-btn btn&#45;&#45;primary" elevation="0"  v-if="card.PLACE_TARIFF">-->
				<!--          <span class="beige-text"> Текущий тариф: {{ getTariff(card.PLACE_TARIFF) }} </span>-->
				<!--        </v-btn>-->
				<!--          <v-btn large class="margin-top-main  tariff-btn btn&#45;&#45;primary" elevation="0" v-else>-->
				<!--            <span class="beige-text"> Выбрать тариф </span>-->
				<!--          </v-btn>-->

			</v-card-text>
			<div class="d-flex flex-column">
				<v-btn v-if="place.IS_CONFIRMED && place.SQUARE" block dark class="btn--secondary mb-4"
				       @click="goToServices">{{ buttonContent.select }}
				</v-btn>
				<v-btn class=" primary " block @click="goToEdit">{{ buttonContent.change }}</v-btn>
			</div>
		</v-card>

	</div>

</template>

<script>
	export default {
		name: 'memory-place-card',
		props: ['place'],
		data() {
			return {
				tariffName: null
			}
		},
		computed: {
			img() {
				return require("@/assets/images/user.png");
			},
			tariffs() {
				return this.$store.state.page.PlaceListController.tariffs
			},
			services() {
				return this.$store.state.page.PlaceListController.services
			},
			buttonContent() {
				return {
					select: this.$store.state.common.buttons.selectService || "Выбрать услугу",
					change: this.$store.state.common.buttons.change || "Изменить"
				}
			},
			pageTitle() {
				return this.$store.state.page.PlaceListController?.texts?.find(el => el.CODE === "MEMORY_SITES_TITLE").PREVIEW_TEXT;
			},
			pageContent() {
				return this.$store.state.page.PlaceListController.texts.content || {}
			},
			allreportsApproved() {
				if (this.place.reports && this.place.reports.some(el => !el.IS_APPROVED)) {
					return false
				}
				return true
			}
		},
		methods: {
			lastReport(card) {
				if (card.reports?.length > 0) {
					let reports = JSON.parse(JSON.stringify(card.reports))
					reports.sort((a, b) => b.ID - a.ID);
					return reports[0]
				}
			},
			lastUnfinishedReport(card) {
				if (card.reports?.length > 0) {
					let reports = JSON.parse(JSON.stringify(card.reports))
					reports = reports.filter(el => !el.IS_APPROVED);
					reports.sort((a, b) => b.ID - a.ID);
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
			getTariff(tariffId) {
				if (tariffId) {
					return this.tariffs.find(el => el.ID == tariffId)?.NAME
				}
			},
			goToReport() {
				const lastReport = this.lastReport(this.place);
				console.log("lastReport", lastReport);

				this.$router.push({name: 'reports', params: {reportId: lastReport.ID, placeId: this.place.ID}})
			},
			goToServices() {
				this.$router.push({name: 'settings', params: {ID: this.place.ID, services: true}})
			},
			goToEdit() {
				this.$router.push({name: 'settings', params: {ID: this.place.ID, edit: true}})
			}
		},
		mounted() {
			// this.getTariff(this.card.PLACE_TARIFF)
		}
	}
</script>

<style lang="scss">
	.memory-place-card {
		border-radius: $border-radius-primary;
		position: relative;
		min-width: 300px;
		width: 100%;
		//height: 328px;
		@include transition();
		@include up($md) {
			//height: 430px;
			width: auto;
		}

		.hover-link {
			&:hover {
				color: $beige5;
			}
		}

		svg {
			min-height: 16px !important;
			min-width: 16px !important;
			@include up($md) {
				min-height: 24px!important;
				min-width: 24px!important;
			}
		}

		.tariff-btn {
			background: #ECE3CF80 !important;
		}

		&__status {
			font-family: $btn-font-family;
			font-size: 18px;
			line-height: 23px;
		}

		&__withBg {
			width: 100%;
			padding: 45px;
			font-family: $btn-font-family;
			font-size: 18px;
			line-height: 23px;
			background: linear-gradient(0deg, rgba(200, 207, 212, 0.25), rgba(200, 207, 212, 0.25));
			border-radius: 24px;
		}

		&:hover {
			//opacity: .7;
			a {
				/*      box-shadow: 0px 20px 20px rgb(0 0 0 / 15%) !important;
					  @include transition();*/

				div.memory-place-card__wrapper, div.card-light {
					box-shadow: 0px 20px 20px rgb(0 0 0 / 15%) !important;

					@include transition();
				}
			}
		}

		&__wrapper {
			cursor: pointer;
			position: relative;
			min-width: 300px;
			min-height: 328px;
			height: 100%;
			border-radius: $border-radius-primary;
			@include up($md) {
				width: 430px;
				min-height: 430px;
			}
		}

		&__photo {
			background-size: cover;
			background-position: center;
			border-radius: $border-radius-primary $border-radius-primary 0 0;
			min-width: 300px;
			height: 100%;
			//height: 328px;
			@include up($md) {
				width: 430px;

				border-radius: $border-radius-primary 0 0 $border-radius-primary;
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

		&__services {
			width: 100%;
			background-color: rgba(236, 227, 207, 0.5);
		}

		.card-light {
			position: relative;
			bottom: 30px;
			min-width: 300px;
			padding: 32px;
			height: 100%;
			@include up($sm) {
				//max-height: 350px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
			@include up($md) {
				padding: 64px;
				width: 430px !important;
				//height: 430px;
				bottom: 0;
				left: -30px;
			}

			div {
				// max-width: 290px;
			}

		}
	}
</style>
