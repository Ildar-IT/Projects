<template>
	<div class="data-form">
		<v-form class="mx-auto text-center" ref="dataForm">

			<!--     <add-photo-field/>-->
			<v-text-field v-model="card.PERSON_LAST_NAME"
			              :rules="nameRules"
			              maxlength="64"
			              :placeholder="pageContent.firstName ? pageContent.firstName : 'Фамилия умершего'"
			              class="text-center pt-0 mt-0 mb-8"
			              hide-details="auto"/>
			<v-text-field v-model="card.PERSON_FIRST_NAME"
			              :rules="nameRules"
			              maxlength="64"
			              :placeholder="pageContent.lastName ? pageContent.lastName: 'Имя умершего'"
			              class="text-center pt-0 mt-0 mb-8"
			              hide-details="auto"/>
			<v-text-field v-model="card.PERSON_PATRONYMIC_NAME"
			              :rules="nameRules"
			              maxlength="64"
			              :placeholder="pageContent.thirdName ? pageContent.thirdName : 'Отчество умершего'"
			              class="text-center pt-0 mt-0 mb-8"
			              hide-details="auto"/>
			<v-text-field v-model="card.NAME"
			              :rules="addressRules"
			              maxlength="256"
			              :placeholder="pageContent.address ? pageContent.address : 'Адрес кладбища'"
			              class="text-center pt-0 mt-0 mb-8"
			              hide-details="auto"/>

			<div class="data-form__inputs d-flex flex-md-row flex-column">
				<div class="d-flex flex-column  mr-0 mr-md-16">

					<v-text-field v-model="card.PLACE_NUMBER"
					              :rules="placeNumberRules"
					              maxlength="128"
					              :placeholder="pageContent.placeNumber ? pageContent.placeNumber : 'Участок и номер места'"
					              class="text-center pt-0 mt-0 mb-8"
					              hide-details="auto"/>
				</div>
				<div class="d-flex flex-column">
					<div class="d-flex">
						<v-file-input v-model="card.PROPERTY_DOCUMENT" @change="loadPassport" ref="passportInput"
						              multiple
						              accept="application/doc, application/docx,application/pdf, application/xlsx,application/xls,application/xlm, image/*"
						              prepend-icon=""
						              prepend-inner-icon="mdi-paperclip"
						              :placeholder="passportPlaceholder"
						              class="text-center pt-0 mt-0 mb-8"
						              hide-details="auto"/>
						<a download class="ml-2" :href="card.DOCUMENT" :target="isMobileApp ? '_blank' : ''" v-if="card.DOCUMENT"
						   title="Скачать текущий паспорт">
							<svgicon name="download-icon" original height="32"></svgicon>
						</a>
					</div>

				</div>
			</div>
			<v-text-field v-model="card.PREVIEW_TEXT"
			              maxlength="256"
			              :placeholder="pageContent.additionalInfo ? pageContent.additionalInfo : 'Дополнительная информация'"
			              class="text-center pt-0 mt-0"
			              hide-details="auto"/>
		</v-form>

	</div>
</template>

<script>
	import {fileSize} from "../../../utils/string";

	export default {
		name: 'data-form',
		props: ['card'],
		components: {},
		data() {
			return {}
		},
		computed: {
			passportPlaceholder() {
				let passportUploaded = this.pageContent?.documentPlaceholderUploaded || 'Загружен паспорт захоронения ';
				let passport = this.pageContent?.documentPlaceholder || 'Паспорт захоронения'
				return this.card.DOCUMENT ?  passportUploaded +  this.passportSize : passport
			},
			pageContent() {
        let placeController = this.$store.state.page.PlaceItemController?.texts.content;
        let reportListController = this.$store.state.page.ReportListController?.texts.content;
				return placeController ? placeController : reportListController;
      },
			passportSize() {
				//console.log("passportSize" , fileSize(parseInt(this.card.DOCUMENT_SIZE)));
				return fileSize(parseInt(this.card?.DOCUMENT_SIZE))
			},
			isMobileApp() {
				return this.$store.state.common.isMobileApp;
			},
			cardId() {
				return this.$route.params.id;
			},
			nameRules() {
				const rules = [];
				const rule1 = v => !!v || this.pageContent?.fill || `Пожалуйста, заполните`;
				const rule2 = v => RegExp(/^[a-zA-Zа-яА-Я]/g).test(v.trim()) || this.pageContent?.invalidName || 'Поле может содержать только буквы и должно быть полным';
				rules.push(rule1, rule2);
				return rules;
			},
			addressRules() {
				const rules = [];
				const rule = v => !!v || this.pageContent?.addAddressErr || `Пожалуйста, заполните`;
				rules.push(rule);
				return rules;
			},
			placeNumberRules() {
				const rules = [];
				const rule = v => !!v || this.pageContent?.addPlaceErr || `Пожалуйста, заполните`;
				rules.push(rule);
				return rules;
			},
			passportRules() {
				const rules = [];
				const rule = this.card.PROPERTY_DOCUMENT.length === 0 || `Пожалуйста, приложите паспорт захоронения`;
				rules.push(rule);
				return rules;
			},

		},
		methods: {
			getInitials() {
				console.log(this.card.NAME.charAt(0).toUpperCase() + this.card.NAME.slice(1));
				let initials = this.card.NAME.split(/\s+/).map((w, i) => i ? w.substring(0, 1).toUpperCase() + '.' : w).join(' ');
				// this.fio = initials;
				initials = initials.charAt(0).toUpperCase() + initials.slice(1);
				console.log('initials ', initials)
				this.$store.state.initials = initials;
				this.$emit('getInitialsEvent', initials);
				return this.$store.state.initials;
			},
			 validateForm() {
				  let validate = this.$refs.dataForm.validate()
				  this.$emit('validateForm',validate);
				  return validate;
				},
			// submit() {
			// 	console.log('inner submit');
			// 	this.needCheck = true;
			// },
			loadPassport(event) {
				this.file = this.card.PROPERTY_DOCUMENT;
				console.log('this.file passport',)
				this.file = this.file[0]
				let reader = new FileReader();

				reader.addEventListener("load", function () {
					// this.card.PROPERTY_DOCUMENT = reader.result;

				}.bind(this), false);

				if (this.file[0]) {
					reader.readAsDataURL(this.file);
				}

				this.$emit('fileUpload', this.file)
			}
		},
		mounted() {
			// this.card.NAME = this.$store.state.memories.filter(x => x.ID == this.cardId)[0].NAME;
			// this.card.address = this.$store.state.memories.filter(x => x.ID == this.cardId)[0].address;
			// this.card.placeNumber = this.$store.state.memories.filter(x => x.ID == this.cardId)[0].placeNumber;
			// this.card.geolocation = this.$store.state.memories.filter(x => x.ID == this.cardId)[0].geolocation;
			// this.card.passport = this.$store.state.memories.filter(x => x.ID == this.cardId)[0].passport;
			// this.card.photo = this.$store.state.memories.filter(x => x.ID == this.cardId)[0].photo;
			// this.card.remarks = this.$store.state.memories.filter(x => x.ID == this.cardId)[0].remarks;
		}
	}
</script>

<style lang="scss">
	.data-form {
		width: 100%;

		svg {
			fill: transparent;
		}

		&__inputs > div {
			width: 100%;
		}

		form {
			width: 100%;

			div.v-text-field__slot {
				width: fit-content;

				input {
					color: $grey1 !important;

					&::placeholder {
						color: $grey3 !important;
					}
				}
			}


			div.v-file-input__text.v-file-input__text--placeholder {
				width: fit-content;
				text-align: center;
				color: $grey3 !important;
				font-size: 18px;
				line-height: 23px;
				text-align: center;
			}

			.v-file-input__text--placeholder {
				margin: auto;
			}
		}
	}
</style>
