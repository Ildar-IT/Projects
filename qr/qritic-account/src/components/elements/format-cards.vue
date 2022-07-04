<template>
	<div class="format-cards">
		<div class="anti-margin-row">
			<v-row class="ma-0 justify-center">
				<v-col v-for="(card, idx) in cards" :key="idx" cols="12" sm="6" md="4" class="ma-0 pa-0">
					<div class="margin-right-small margin-left-small margin-bottom-main">
						<card class="d-flex flex-column justify-space-between">
							<div>
								<div class="text-center h7 gray-text mb-8">
									{{ card.NAME }}
								</div>
								<div class="format-cards__image__wrap mb-8">
									<v-img class=" format-cards__image"
									       v-if="formarAvailable(card)"
									       @click="hasFormatsToPick(card) ? goToStyles(card) : null"
									       :src="card.PICTURE"
									       aspect-ratio="1"/>

									<v-img class=" format-cards"
									       v-else
									       @click="openPremiumPopUpDialog"
									       aspect-ratio="1"
									       :src="card.PICTURE"
									       gradient="to bottom, rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5)"
									/>

								</div>
							</div>
							<div class="d-flex flex-column justify-space-between" v-if="formarAvailable(card)">

<!--								<v-btn @click="openModal(card)" block small class="secondary  flex-end">-->
<!--									<span>Скачать</span>-->
<!--								</v-btn>-->

								<v-btn v-if="hasFormatsToPick(card)"
								       block
								       small
								       class="secondary"
								       @click="goToStyles(card)"
								>
									Выбрать стиль
								</v-btn>
							</div>
							<div class="flex-column" v-else>
								<v-btn flex-end block small class=" mt-12 " color="#E6E7EE"
								       @click="openPremiumPopUpDialog">
									<span class="grey--text">Скачать</span>
								</v-btn>
							</div>
						</card>
					</div>
				</v-col>
			</v-row>
		</div>

		<template-download v-model="dialog"
		                   @download="download"
		                   :type="selectedType"
		                   :styleId="selectedStyle"
		                   :polls="polls"
		                   ref="modal"/>


		<v-dialog v-model="dialogNoPoll"
		          overlay-opacity="0.5"
		          overlay-color="#8189A8"
		          max-width="500">
			<card class="card__dialog pa-8 pa-md-12">
				<div class="d-flex flex-column pa-md-4">
					<div class="mb-8 d-flex align-center justify-center">
						<img src="@/assets/Warning.png"/>
					</div>

					<div class="h5 text-center pb-12">
						Создайте опрос, чтобы получить доступ к шаблону
					</div>
					<div class="block-max-width">
						<v-btn
								block
								class="primary box-shadow-primary"
								@click="dialogMakeNew"
						>
							Создать
						</v-btn>
					</div>
				</div>
			</card>
		</v-dialog>

	</div>

</template>

<script>
	import TemplateDownload from "@/components/templates-download";
	import {crossDownload} from "@/utils/utils";

	export default {
		name: "format-cards",
		props: ['poll', 'polls', 'cards', 'styles', 'formats'],
		components: {TemplateDownload},
		comments: {TemplateDownload},
		data() {
			return {
				dialog: false,
				dialogStyles: false,
				selectedType: null,
				dialogNoPoll: false,
				selectedStyle: null,
				styleId: null,
				templateStyles: null
			}
		},
		computed: {
			isPremium() {
				return this.$store.getters.isPremium;
			},
			userTariff() {
				return this.$store.state.session.user.TARIFF.ID || '';
			},
			currentTypeName() {

			}
		},
		methods: {
			hasFormatsToPick(card) {
				if (this.styles.filter(el => el.TEMPLATE_ID == card.ID).length !== 0) {
					return true
				}
				return false
			},
			formarAvailable(card) {
				console.log("CARD", card)
				//console.log("card.UF_TARIFFS.length", card.UF_TARIFFS.length)
				if (!card.UF_TARIFFS) return true
				else if (card.UF_TARIFFS && card.UF_TARIFFS.filter(el => el == this.userTariff).length !== 0) {
					return true
				}
				return false
			},
			closeDialogNoPoll() {
				this.dialogNoPoll = false;
			},
			dialogMakeNew() {
				this.$router.push({name: "poll-page-new"});
			},
			openPremiumPopUpDialog() {
				this.$store.state.common.premiumPopUpDialog = true;
			},
			openModal(card) {
				this.templateStyles = this.styles.filter(a => a.TEMPLATE_ID == card.ID)

				if (this.templateStyles.some(el => this.styleId == el.ID)) {

					this.selectedStyle = this.styleId;
				}
				this.selectedStyle = this.templateStyles.filter(a => a.TEMPLATE_ID == card.ID)[0].ID

				if (!this.isCardAvailable(card)) {
					this.$store.state.common.premiumPopUpDialog = true;
					return;
				}

				if (this.polls) {
					if (this.polls.length > 1) {
						this.selectedType = card.CODE;
						this.$refs.modal.showModal();
					} else {
						this.selectedType = card.CODE;
						this.download(this.selectedType, this.polls[0].QRHASH, this.selectedStyle)
					}
				} else if (this.poll) {
					this.selectedType = card.CODE;
					console.log("this.selectedType", this.selectedType);
					this.download(this.selectedType, this.poll.QRHASH, this.selectedStyle)
				} else this.dialogNoPoll = true
			},
			goToStyles(type) {
				console.log("type", type)
				if (!this.polls && !this.poll) {
					this.dialogNoPoll = true;
					return;
				}

				if (this.polls || this.poll) {
					this.selectedType = type;
					this.templateStyles = this.styles.filter(a => a.TEMPLATE_ID == this.selectedType.ID);
				}
				;

				this.$router.push({name: 'styles', params: {type: type.ID, poll: this.poll}})


			},
			download(type, hash, styleId) {
				console.log("type", type)
				let params = '?hash=' + hash + '&type=' + type + "&styleId=" + styleId;
				;
				if (this.pollHash)
					params += "&hash=" + this.pollHash;
				const url = "/api/DownloadTemplateController" + params;
				const filename = 'Qritic.ru-макет' + hash + '-' + type + '.tif';
				crossDownload(url, filename)
			},
			pickStyle(id) {
				console.log("Style")
				this.styleId = id;
				this.dialogStyles = false
			},
			isCardAvailable(card) {
				if (!card.isPremium) return true;
				return this.$store.getters.isPremium;
			}
		},

	}
</script>

<style lang="scss">
	.format-cards {
		overflow: hidden;

		.card {
			//min-height: 459px;
		}

		&__image {
			cursor: pointer;
			@include transition-long();

			&:hover {
				overflow: hidden;
				transform: scale(1.1);
			}

			&__wrap {
				overflow: hidden;
				border-radius: 32px;
			}
		}

		button.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
			background-color: #f5f5f5 !important;
			text-transform: inherit;
			font-family: $heading-font-family;
			font-style: normal;
			font-weight: bold;
			font-size: 17px;
			width: 100%;
			@include transition();

			span.v-btn__content {
				color: #FFFFFF
			}

			&:before {
				background-color: $gray-light !important;
			}
		}

	}
</style>
