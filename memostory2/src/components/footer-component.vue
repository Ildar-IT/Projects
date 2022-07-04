<template>
	<transition name="route" mode="out-in">
		<div class="footer__outwrapper">
			<footer class="footer ">
				<!--			Menu-->
				<v-row
						class="footer__wrapper mx-auto justify-md-space-between justify-sm-space-between justify-center padding-top-main px-sm-6 flex-column flex-sm-row">
					<router-link :to="{name: link.name}" v-if="isWindowLG" v-for="(link, idx) in routes" :key="idx"
								 class="h5 pa-0 text-center mb-2 mb-sm-0 hover-link" :class="navClassLight(link)">
						{{ link.title }}
					</router-link>
					<v-col v-if="!isWindowLG" v-for="(link, idx) in routes" :key="idx" lg="3" md="6" sm="12" cols="12"
						   class="text-center py-0 mb-8">
						<router-link :to="{name: link.name}"
									 class=" h5 pa-0 mt-8 text-center mb-2 mb-sm-0 mr-md-6 mx-auto hover-link"
									 :class="navClassLight(link)">
							{{ link.title }}
						</router-link>
					</v-col>
				</v-row>
				<!--			Social icons-->
				<v-row class="mx-auto mt-sm-16 mt-3 footer__wrapper justify-center">
					<!--          TODO: telegram chat link -->
					<a href="tg://resolve?domain=<USERNAME>" class="hover-link hover-link_light--fill">
						<svgicon name="telegram" width="32" height="32" color="#D8C69E" :fill="true"
								 class="mr-8"></svgicon>
					</a>
					<a href="https://www.instagram.com/?hl=ru" class="hover-link hover-link_light--fill">
						<svgicon name="instagram-filled" width="32" height="32" :fill="true" original></svgicon>
					</a>
				</v-row>
				<!--			Contacts-->
				<v-row class="footer__wrapper mx-auto mt-8 text-center justify-center flex-column flex-sm-row">
					<a href="tel:+78002229939" class="hover-link hover-link_light--fill">
						<h5 class="mr-0 mr-sm-8 mb-8 mb-sm-0 text-center">
							{{ contacts.PHONE }}
						</h5>
					</a>
					<a href="mailto:cs@memostory.ru" class="hover-link hover-link_light--fill">
						<h5 class="mb-8  text-center ">
							{{ contacts.EMAIL }}
						</h5>
					</a>
				</v-row>
				<!--			Address-->
				<!-- <v-row
					class="footer__wrapper px-16 px-sm-0  mx-auto mt-0 mt-sm-8 text-center justify-center flex-column flex-sm-row">
				  <h5>
					{{$store.state.common.address}}
				  </h5>
				</v-row> -->
				<!--            ENG btn for Mobile view -->
				<v-row v-if="!isWindowLG" class="px-7 footer__wrapper mx-auto">
					<a class="d-block mx-auto" :href="langSwitch.link">
						<v-btn outlined large class="mx-auto  outlined outlined_primary"
							   v-ripple="{ class: `$error--text` }">
							Switch to {{langSwitch.name}}
						</v-btn>
					</a>
				</v-row>

				<!--			Copyright-->
				<v-row class="footer__wrapper mx-auto justify-center mt-8 mt-sm-16">
					<span class="body-2 mr-1 footer__wrapper__copyright yellow-text">©&nbsp;{{ currentYear }}. {{ copyright }}</span><span
						class="body-2 "><a download href="./../assets/files/egrul-spb.pdf"
										   class="hover-link hover-link_light--fill"> {{ excerpt }} </a></span>
				</v-row>
				<!--        <v-row class="footer__wrapper mx-auto justify-center mt-8 mt-lg-16">-->
				<!--          <span class="body-2"><a download href="./../assets/files/egrul-spb.pdf">Выписка из ЕГРЮЛ</a></span>-->
				<!--        </v-row>-->
				<!--			PlayNext logo-->
				<v-row class="footer__wrapper mx-auto justify-center mt-8 mt-sm-16 pb-8 pb-sm-16  playnext-logo">
					<a href="https://playnext.ru/">
						<svgicon name="PlayNext-logo" width="100" height="25" original :fill="false"></svgicon>
					</a>
				</v-row>
			</footer>
		</div>
	</transition>
</template>

<script>
    import Config from "../config"

    export default {
        name: "footer-component",
        components: {},
        data: () => ({}),
        computed: {
            page() {
                return this.$store.state.page.HomeController || this.$store.state.page.PrivacyController;
            },
            isMobileApp() {
                return this.$store.state.common.isMobileApp
            },
            commonText() {
                return this.$store.state.common.textsCommon;
            },
            currentYear() {
                return new Date().getFullYear();
            },
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
            pageLinks() {
                return this.$store.state.common.footerLinks[0];
            },
            footerContent() {
                return {
                    payment: this.pageLinks?.payment ? this.pageLinks?.payment : 'Оплата',
                    requisites: this.pageLinks?.requisites ? this.pageLinks?.requisites : 'Реквизиты',
                    termsOfUse: this.pageLinks?.termsOfUse ? this.pageLinks?.termsOfUse : 'Условия использования',
                    privacyPolicy: this.pageLinks?.privacyPolicy ? this.pageLinks?.privacyPolicy : 'Политика конфиденциальности'
                }
            },
            routes() {
                return [
                    {
                        title: this.footerContent?.payment ? this.footerContent?.payment : 'Оплата',
                        name: 'payment-terms',
                        linkTo: 'payment-terms'
                    },
                    {
                        title: this.footerContent?.requisites ? this.footerContent?.requisites : 'Реквизиты',
                        name: 'requisites',
                        linkTo: 'requisites'
                    },
                    {
                        title: this.footerContent?.termsOfUse ? this.footerContent?.termsOfUse : 'Условия использования',
                        name: 'terms-of-use',
                        linkTo: 'terms-of-use'
                    },
                    {
                        title: this.footerContent?.privacyPolicy ? this.footerContent?.privacyPolicy : 'Политика конфиденциальности',
                        name: 'privacy-policy',
                        linkTo: 'confidentiality-policy'
                    },
                ]
            },
            route() {
                return this.$route
            },
            contacts() {
                return {
                    PHONE: this.commonText.find(el => el.CODE == "FOOTER_PHONE").PREVIEW_TEXT,
                    EMAIL: this.commonText.find(el => el.CODE == "FOOTER_EMAIL").PREVIEW_TEXT,
                    ADDRESS: this.commonText.find(el => el.CODE == "FOOTER_ADDRESS").PREVIEW_TEXT
                }
            },
            headerContent() {
                return this.$store.state.common.header;
            },
            langSwitch() {
                return {
                    name: this.headerContent?.langSwitch ? this.headerContent?.langSwitch : "",
                    link: this.headerContent?.langSwitch == "ENG" ? Config.LINK_ENG + "account" : Config.LINK_RU + "account"
                }
            },
            copyright() {
                return this.commonText.find(el => el.CODE == "FOOTER_COPY").PREVIEW_TEXT
            },
            excerpt() {
                return this.commonText.find(el => el.CODE == "FOOTER_EXCERPT").PREVIEW_TEXT
            }
        },
        methods: {
            navClass(link) {
                return {
                    'layout-header__menu--default': !this.$route.meta || !this.$route.meta.group || this.$route.meta.group !== link.name,
                    'layout-header__menu--active': this.$route.meta.group === link.name,
                };
            },
            navClassLight(link) {
                return {
                    'footer__hover--default-bright': !this.$route.meta || !this.$route.meta.group || this.$route.meta.group !== link.name,
                    'footer__hover--active-light': this.$route.meta.group === link.name,
                };
            },
        },
    }
</script>

<style lang="scss">
	.footer {
		z-index: 2;
		height: auto;
		width: 100%;
		background: $gradient-dark;
		color: $beige5;
		border-radius: 30px 30px 0 0;
		position: relative;
		top: -27px;

		h5 {
			font-size: 24px;
			line-height: 29px;
		}

		&__wrapper {
			min-width: 360px;
			@include up($sm) {
				width: fit-content;
			}
			@include up($lg) {
				width: 100%;
				max-width: 912px;
				h5:not(:last-child) {
					margin-right: 24px;
				}
			}
		}

		&__outwrapper {
			background: $gradient-dark;
			position: relative;
			bottom: 0px;
			z-index: 1;
		}

		&__hover {
			&--active-light {
				color: $beige8;

				svg {
					fill: transparent;

					path {
						stroke: $beige8;
						fill: none;
					}
				}
			}

			&--default-bright {
				@include transition();
				color: $beige5;
				stroke: $beige5;
				fill: transparent;

				svg {
					path {
						@include transition()
					}
				}

				&:hover {
					color: $beige8;
					stroke: $beige8;
					fill: transparent;

					svg {
						color: $beige8;
						stroke: $beige8;

						path {
							@include transition();
							fill: $beige8;
						}
					}
				}
			}
		}

		.playnext-logo {
			opacity: .2;
			@include transition();

			&:hover {
				opacity: .5;
			}
		}


	}
</style>
