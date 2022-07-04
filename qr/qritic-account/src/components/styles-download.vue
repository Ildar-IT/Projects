<template>
	<div class="layout-top">
		<h1 class="margin-bottom-main">
			Выберите размер
		</h1>
		<div class="template-cards">
			<div class="anti-margin-row">
				<v-row class="ma-0" :class='styles.length < 4 ? "justify-center": ""'>
					<v-col
							v-for="(style, idx) in styles"
							:key="idx"
							cols="12"
							sm="6"
							md="4"
							class="ma-0 pa-0"
					>
						<div class="margin-right-small margin-left-small margin-bottom-main">
							<card class="d-flex flex-column justify-space-between">
								<div>
									<div class="text-center h7 gray-text mb-8">
									</div>
									<div class="style-cards__image__wrap mb-8">
										<v-img class="style-cards__image"  :src="style.PREVIEW_PICTURE"
										       @click="openModal(style)"/>
									</div>
								</div>
								<div class="flex-column">
									<v-btn v-if="styleAvailable(style)" block small class="secondary" @click="openModal(style)">
                    Скачать
									</v-btn>
									<v-btn v-else flex-end block small  color="#e6e7ee80" @click="openPremiumPopUpDialog" >
                    <span class="primary--text">Скачать</span>
									</v-btn>
								</div>
							</card>
						</div>
					</v-col>
				</v-row>
			</div>
		</div>
		<template-download v-model="dialog"
		                   @download="download"
		                   :type="currentTypeCode"
		                   :styleId="styleId"
		                   :polls="page.polls"
		                   ref="modal"/>
	</div>
</template>

<script>
	import {crossDownload} from "@/utils/utils";
	import TemplateDownload from "@/components/templates-download";

	export default {
		name: "styles-download",
		props: ['type', "poll"],
		data: () => ({
			dialog: false,
			hash: null,
			styleId: null,
		}),
		components: {TemplateDownload},
		computed: {
			page() {
				return this.$store.state.page.TemplateListController;
			},
			cards() {
				return this.$store.state.templateCards;
			},
			styles() {
				console.log("this.page.styles", this.page.styles)
				return this.page.styles.filter(el => el.TEMPLATE_ID == this.type)
			},
			currentTypeCode() {
				return this.page.items.find(el => el.ID == this.type).CODE || ''
			},

		},
		methods: {
			styleAvailable(card) {
				console.log("CARD", card)
				//console.log("card.UF_TARIFFS.length", card.UF_TARIFFS.length)
				if (!card.TARIFFS ) return true
				return false
			},
			showModal() {
				console.log("showModal")
				this.dialog = true;
			},
			pickStyle(id) {
				console.log("Style from picker")
				this.$emit('pickStyle', id)
				this.dialogStyles = false
			},
			openPremiumPopUpDialog() {
				this.$store.state.common.premiumPopUpDialog = true;
			},
			openModal(style) {
				if (!this.styleAvailable(style)) {
					this.openPremiumPopUpDialog();
					return
				}
				this.styleId = style.ID
				if (this.poll) {
					this.download(this.currentTypeCode, this.poll.QRHASH, style.ID)
				} else if (this.page.polls) {
					if (this.page?.polls?.length > 1) {
						console.log("We have many polls")
						this.$refs.modal.showModal();
					} else {
						console.log("We have one poll")
						this.download(this.currentTypeCode, this.page.polls[0].QRHASH, style.ID)
					}
				} else this.dialogNoPoll = true
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
		}
	}
</script>

<style lang="scss">
	.template-cards {

	  .card {
	    padding: 50px;

	    @include up($sm) {
	      padding: 30px;
	    }

	    .primary--text:hover {
	      @include transition();
	      opacity: 0.7;
	    }
	  }

		.styles-download {
			background-color: $primary-light;
			height: 100%;
		}

		.style-cards {
			&__image {
				cursor: pointer;
				border-radius: 32px;

				&__wrap {
					overflow: hidden;
					border-radius: 32px;
				}
			}
		}

		.v-dialog {
			box-shadow: none;
		}

		.card__dialog {
			img {
				display: block;
				width: 128px;
				margin: auto;
			}
		}
	}
</style>
