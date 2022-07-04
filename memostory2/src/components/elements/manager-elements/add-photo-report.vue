<template>
	<v-container class="add-photo-report">
		<h5 class="grey-text mb-sm-4 mb-4">
			Загрузить фотоотчёт
		</h5>
		<!--    <v-row class="mb-sm-5 mb-sm-4 mb-0">-->
		<!--      <v-col cols="12" sm="6" class="mx-auto">-->
		<!--        <v-select-->
		<!--            prepend-icon="mdi-calendar"-->
		<!--            v-model="month"-->
		<!--            :items="months"-->
		<!--            label="Отчёт за"-->
		<!--        ></v-select>-->
		<!--      </v-col>-->
		<!--    </v-row>-->
		<p class="body-1 mb-8"> Важно! Необходимо сделать <b>от 3-х до 5-ти</b> горизонтальных (ландшафтных) фотографий "До" и столько же фотографий "После". На фотографиях "До" покажите наиболее проблемные элементы, с которыми Вы будете работать в рамках услуги, например растущая трава, мусор, сколы и т.п. <b>Обязательно</b> первая фотография "После" должна быть сделана общим планом, показывать могилу целиком, так, чтобы было видно весь Ваш результат работы.</p>
		<v-row class="manager-object__add-fields anti-margin-row-small justify-center">
			<v-col cols="12" sm="5" class="mr-sm-5 pt-0 pt-sm-3">
				<h6 class="text-left  mb-2 grey-text">Было</h6>
				<v-file-input v-model="photos.before" @change="loadFileBefore" ref="photosBefore"
				              multiple
				              accept="image/*"
				              prepend-icon=""
				              prepend-inner-icon="mdi-paperclip"
				              placeholder="Фотографии до"
				              class="text-center pt-0 mt-0 mb-2"
				              hide-details="auto"/>
				<v-row>
					<v-col class="pa-0 px-1 pt-2" cols="6" md="4" v-for="(picture, ïndex) in report.PICTURES_BEFORE" :key="ïndex"
					       v-if="picture">
						<div class="manager-object__add-fields__wrapper d-flex align-center justify-center ">
							<svgicon original name="cross" height="24" @click="removePhoto(ïndex, 'PICTURES_BEFORE')">
							</svgicon>
							<div class="manager-object__add-fields_preview"
							     :style="{ 'backgroundImage': 'url('+ picture + ')'}">
							</div>
						</div>
					</v-col>
				</v-row>

			</v-col>
			<v-col cols="12" sm="5">
				<h6 class="text-left grey-text mb-2">Стало</h6>
				<v-file-input v-model="photos.after" @change="loadFileAfter" ref="photosAfter"
				              multiple
				              accept="image/*"
				              prepend-icon=""
				              prepend-inner-icon="mdi-paperclip"
				              placeholder="Фотографии после"
				              class="text-center pt-0 mt-0 mb-2"
				              hide-details="auto"/>
				<v-row>
					<v-col class="pa-0 px-1 pt-2"  cols="6" md="4" v-for="(picture, index) in report.PICTURES" :key="index"
					       v-if="picture">
						<div class="manager-object__add-fields__wrapper d-flex align-center justify-center">
							<svgicon original name="cross" height="24" @click="removePhoto(index, 'PICTURES')">
							</svgicon>
							<div class="manager-object__add-fields_preview"
							     :style="{'backgroundImage': 'url('+ picture + ')'}">
							</div>
						</div>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
	export default {
		name: 'add-photo-report',
		props: ['report'],
		data() {
			return {
				month: '',
				photos: {
					before: [],
					after: []
				},
				files: {
					before: [],
					after: []
				}
			}
		},
		methods: {
			loadFileBefore() {
				console.log('loadFile')
				this.photos.before.map((el, idx) => {
					let reader = new FileReader();
					this.files.before[idx] = this.photos.before[idx]
					//console.log("idx", idx);
					reader.onload = (event) => {
						// console.log(event);
						//this.files.before[idx]= event.target.result;
					}

					if (this.files.before[idx]) {
						reader.readAsDataURL(this.files.before[idx]);
					}
				});
				this.$emit("uploadPhotos", this.files)
			},
			refetchPage() {
				this.$store.dispatch('fetchPage', {
					action: 'ReportItemController', params: {
						WORKER_LINK_HASH: this.$route.params.WORKER_LINK_HASH
					}
				}).then(() => {
				}).catch((error) => {
				});
			},
			removePhoto(photoIndex, code) {
				console.log("photo", photoIndex)
				//return
				this.$store.dispatch('post', {
					action: 'RemoveReportPictureController',
					params: {"ELEMENT_ID": this.report.ID, "CODE": code, "ID": photoIndex}
				}).then((res) => {
					this.refetchPage()
				}).catch((error) => {
					console.log("AuthController error", error)
					this.$store.state.isError = true;
					this.error = {
						title: "Что-то пошло не так",
						text: error.error ? error.error : "Пожалуйста, попробуйте еще раз."
					}
				});
			},
			emptyFields() {
				this.photos = {
					before: [], after: []
				}
				this.files = {
					before: [], after: []
				}
			},
			loadFileAfter() {
				console.log('loadFile')
				this.photos.after.map((el, idx) => {
					let reader = new FileReader();
					this.files.after[idx] = this.photos.after[idx]

					reader.onload = (event) => {
						// console.log(event);
						//this.files.after[idx]= event.target.result;
					}

					if (this.files.after[idx]) {
						reader.readAsDataURL(this.photos.after[idx]);
					}
				});
				this.$emit("uploadPhotos", this.files)
			}
		}
	}
</script>

<style lang="scss">
	.manager-object__add-fields {


		&__wrapper {
			position: relative;
			border: 2px solid #D8C69E;

			svg {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}

			@include up($md) {
				svg {
					display: none;
				}
			}

			&:hover {
				svg {
					z-index: 2;
					display: block;
					cursor: pointer;
				}
				.manager-object__add-fields_preview {
					filter: brightness(0.4);
				}
			}
		}

		&_preview {
			width: 100%;
			height: 85px;
			background-size: cover;
			background-position: center;

		}
	}
</style>
