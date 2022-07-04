<template>
	<div class="cards-examples ">
		<div class="d-flex justify-center flex-wrap mx-auto mx-lg-0 ">
			<!--Начало карточки-->
			<div v-for="(example, index) in slidesMobile" :key="index"
			     class="cards-examples__item  d-flex flex-column justify-space-between margin-left-small margin-right-small  margin-bottom-main  "
			      >
				<div class="d-flex justify-center">
					<div class="swiper-slide  " :style="{ 'backgroundImage': 'url(' + example.img + ')' }"></div>
				</div>


				<!--Card content with position absolute -->
				<v-card class="card-light mx-auto" elevation="0">
					<div class="px-8 pb-4 pt-5">
						<!--            Btns -->
						<v-row class="justify-center mb-5">
							<v-col class="mr-4 pr-0 justify-end d-flex ">
								<v-btn block large @click="showBefore(example, index)"
								       :class="!example.showAfter? 'shadow  show-current' : 'show-previous'">
									{{buttonContent.before}}
								</v-btn>
							</v-col>
							<v-col block class="pl-0 justify-start d-flex">
								<v-btn block large @click="showAfter(example, index)"
								       :class="example.showAfter? 'shadow  show-current' : 'show-previous'">
									{{buttonContent.after}}
								</v-btn>
							</v-col>
						</v-row>
						<!--            Text -->
						<div class="px-3">
							<v-row class="d-flex justify-start" v-for="(ex, indx) of example.DETAIL_TEXT" :key="indx">
								<v-col class="d-flex pt-0 pb-4">
									<svgicon original :name="ex.icon" width="18" height="18" color="#234052"
									         class="mr-4"></svgicon>
									<span class="body-2">{{ ex.text }}</span>
								</v-col>
							</v-row>
						</div>
					</div>
				</v-card>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'

	export default {
		name: 'cards-examples',
		props: ['slides'],
		data() {
			return {
				isShowedBeforeObj: {updateCounter: 1},
				slidesMobile: [],

				isMoving: false,

			}
		},
		computed: {
			// beforeAfter() {
			//   return (index) =>  this.slidesMobile[index].showAfter == true ?  this.slidesMobile[index].DETAIL_PICTURE : this.slidesMobile[index].PREVIEW_PICTURE

			// },
			pageButtons() {
				return this.$store.state.common?.buttons;
			},
			buttonContent() {
				return {
					before: this.pageButtons?.before ? this.pageButtons?.before : 'Было',
					after: this.pageButtons?.after ? this.pageButtons?.after :  'Стало'
				}
			}
		},

		methods: {
			showBefore(example, index) {
				example.showAfter = false
				this.beforeAfter(example);
				console.log("example", example)
			},
			showAfter(example, index) {
				example.showAfter = true
				this.beforeAfter(example);
				console.log("example", example)
			},
			beforeAfter(example) {
				return example.showAfter == true ? example.img = example.DETAIL_PICTURE : example.img = example.PREVIEW_PICTURE
			},
			// showBefore(index) {
			//   this.isShowedBeforeObj[index.toString()] = true;
			//   this.isShowedBeforeObj.updateCounter++;
			// },
			// showAfter(index) {
			//   this.isShowedBeforeObj[index.toString()] = false;
			//   this.isShowedBeforeObj.updateCounter++;
			// },
			// getIsShowedBefore(index) {
			//   this.isShowedBeforeObj.updateCounter;
			//   if(index.toString() in this.isShowedBeforeObj){
			//     return this.isShowedBeforeObj[index.toString()]
			//   }
			//   this.isShowedBeforeObj[index.toString()] = true;
			//   this.$set(this.isShowedBeforeObj, index.toString(), true);
			//   return true;
			// }
		},
		created() {
			this.slidesMobile = JSON.parse(JSON.stringify(this.slides));
			this.slidesMobile = this.slidesMobile.map((el, index) => {
				Vue.set(el, 'showAfter', true)
				Vue.set(el, 'img', el.DETAIL_PICTURE)
				return el
			})
		}
	}
</script>

<style lang="scss">
	.cards-examples {
		&__item {
			position: relative;
			padding-top: 3px;
			height: auto;
			width: 100%;

			@include up($sm) {
				margin-bottom: 25px;
				height: auto;
			}
			@include up($md) {
				width: 380px;
				margin-bottom: 45px;

			}
			@include up($xl) {
				&:last-of-type {
					margin-right: 0 !important;
				}
				&:first-of-type {
					margin-left: 0 !important;
				}
			}


			&:first-child {
				margin-top: 0;
			}

			&:last-child {
				//padding-bottom: 0;
				//margin-bottom: 0px;
			}

			.v-btn {
				&.show-current {
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

				&.show-previous {
					box-shadow: none !important;
					border: 3px solid $grey1
				}
			}

			.swiper-container {
				border-radius: $border-radius-primary $border-radius-primary 0 0;

				.swiper-pagination {
					bottom: 62px;
				}
			}

			.v-sheet.v-card {
				border-radius: $border-radius-primary;
				@include up($md) {
					height: auto;
				}
			}

			.v-card {
				position: relative;
				top: -22px;
				bottom: 0;

				border-radius: $border-radius-primary;
				background: $white4;
				width: 100%;
				z-index: 2;

				@include up($sm) {

					max-width: 382px !important;
				}

				@include up($md) {
					max-width: 440px !important;
				}

				//@include up($lg) {
				//
				//  max-width: 382px !important;
				//}
			}


			button.v-btn {
				min-width: 124px;

			}

		}

		.card-light {
			@include up($sm) {
				box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.15) !important;
			}

			button.btn--secondary {
				max-width: 123px;


			}
		}

		.swiper-slide {
			min-height: 300px;
			border-radius: $border-radius-primary $border-radius-primary 0 0;
			@include up($xs) {
				height: 320px;
			}

			@include up($sm) {
				width: 100% !important;
				max-width: 382px !important;
			}

			@include up($md) {
				max-width: 440px !important;
			}

			@include up($lg) {

				min-height: 90px;

				//max-width: 382px !important;
			}

			background-size: cover;
			@include transition();

		}

		#care-examples-card-swiper-pagination {
			max-width: 265px;
			left: 50%;

			margin-left: -132px;

			span {
				width: 23%;
				height: 3px;
				border-radius: 1000px;
				opacity: .5;
			}

			.swiper-pagination-bullet-active {
				background-color: $white;
				opacity: 1;
			}
		}

		/*  div.care-examples-swiper-pagination{
			//padding: 0 28px;
			padding: 0 34px;
		  }*/
	}

</style>
