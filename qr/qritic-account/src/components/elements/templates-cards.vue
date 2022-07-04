<template>
	<div class="template-cards">
		<div class="anti-margin-row">
			<v-row class="ma-0 justify-center">
				<v-col v-for="(card, idx) in cards" :key="idx" cols="12" sm="6" md="6" class="ma-0 pa-0">
					<div class="margin-right-small margin-left-small margin-bottom-main">
						<card class="d-flex flex-column justify-space-between">
							<div>
								<div class="text-center h5 black--text mb-12">
									{{ card.NAME }}
								</div>
								<div class="template-cards__image__wrap mb-12">
									<v-img class=" template-cards__image"
										   :src="card.PICTURE"
										   @click="hasStylesToPick(card) ? goToStyles(card) : openModal(card)"
										   aspect-ratio="1"
										   contain
									/>

									<!--									<v-img class=" template-cards"
																		       v-else
									                         contain
																		       @click="openModal(card)"
																		       aspect-ratio="1"

																		       :src="card.PICTURE"
																		       gradient="to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,0)"
																		/>-->

								</div>
							</div>
							<div class="flex-column">
								<v-btn
										block
										height="50"
										elevation="0"
										class="secondary"
										@click="goToStyles(card)"
								>
									Выбрать
								</v-btn>

								<!--								<v-btn v-else block small class="secondary   mb-4" @click="openModal(card)">
																	Скачать
																</v-btn>-->
							</div>
							<!--							<div class="flex-column" v-else>
															<v-btn flex-end block small class="mb-4" color="#e6f7f8"
															       @click="openPremiumPopUpDialog">
																<span class="black&#45;&#45;text">Скачать</span>
															</v-btn>
														</div>-->
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
    import templatesDownload from "@/components/templates-download";
    import TemplateDownload from "@/components/templates-download";
    import StylesDownload from "@/components/styles-download";
    import {crossDownload} from "@/utils/utils";

    export default {
        name: "templates-cards",
        props: ['poll', 'polls', 'cards', 'styles', 'formats'],
        components: {TemplateDownload, StylesDownload},
        comments: {templatesDownload},
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

        },
        methods: {
            openPremiumPopUpDialog() {
                this.$store.state.common.premiumPopUpDialog = true;
            },
            hasStylesToPick(card) {
                //console.log(" this.formats ", this.formats)
                console.log("card", card)

                if (this.styles?.some(el => el.TEMPLATE_ID == card.ID)) {
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

            openModal(card) {
                // if (!this.isPremium && card.CODE !== 'STICKER') {
                // 	this.$store.state.common.premiumPopUpDialog = true;
                // 	return;
                // }
                this.templateStyles = this.styles.filter(a => a.TEMPLATE_ID == card.ID)

                if (this.templateStyles.some(el => this.styleId == el.ID)) {

                    this.selectedStyle = this.styleId;
                }
                this.selectedStyle = this.templateStyles.filter(a => a.TEMPLATE_ID == card.ID)[0].ID

                // if (!this.isCardAvailable(card)) {
                // 	this.$store.state.common.premiumPopUpDialog = true;
                // 	return;
                // }

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
                if (this.styles.some(el => el.CODE == type.CODE)) {
                    this.$router.push({name: 'formats', params: {type: type.CODE, poll: this.poll}});
                } else {
                    this.$router.push({name: 'styles', params: {type: type.ID, poll: this.poll}})
                }

            },
            download(type, hash, styleId) {
                console.log("type", type)
                let params = '?hash=' + hash + '&type=' + type + "&styleId=" + styleId;
                ;
                if (this.pollHash)
                    params += "&hash=" + this.pollHash;
                const url = "/api/DownloadTemplateController" + params;
                const filename = 'Qitic.ru-макет' + hash + '-' + type + '.tif';
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
	#account-app {
		.template-cards {
			overflow: hidden;

			.card {
				padding: 40px 60px;
			}

			&__image {
				cursor: pointer;
				@include transition-long();

				&:hover {
					overflow: hidden;
					opacity: 0.8;
					//transform: scale(1.001);
				}

				&__wrap {
					overflow: hidden;
					border-radius: 32px;
				}
			}

			/*button.secondary.v-btn.v-btn--block.theme--light.v-size--default {
				font-size: 17px;
				font-family: $heading-font-family;
				font-weight: bold;
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
					color: #FFFFFF;
				}

				&:before {
					background-color: $gray-light !important;
				}
			}*/
		}
	}
</style>
