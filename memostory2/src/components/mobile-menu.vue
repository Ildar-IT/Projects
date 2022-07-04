<template>
	<div class="mobile-menu">
		<svgicon class="mobile-menu__bg" name="dandelion" original color="#5A707D" height="482" width="642"/>

		<div class="d-flex justify-space-between mobile-menu__header">
			<div>
				<router-link :to="{name: 'home'}" class="d-flex align-center">
				<span class="mobile-menu__logo-wrapper">
					<svgicon name="logo-xs" original color="#D8C69E" height="83" width="163" class="ml-2 mt-3"/>
				</span>
					<!--          <span>{{ $store.state.common.NAME }}</span>-->
					<!--          <span style="margin-top: -2px">ЗАБОТА</span>-->
				</router-link>
			</div>
			<div class="d-flex justify-end pr-7 py-0 mobile-menu__icons">
				<svgicon class="mr-8 mt-3" name="smartphone" color="#D8C69E" :fill="false" width="24" height="24"/>
				<!--              Cross menu icon -->
				<svgicon class="mt-3" name="cross" color="#D8C69E" :fill="false" width="24" height="24"
						 @click="closeMenu"/>
			</div>
		</div>

		<div class="mobile-menu__body">
			<div class="text-center mobile-menu__menu">
				<div class="mobile-menu__menu__login-btn mx-auto px-4">
					<v-btn large class="btn--primary shadow" dark @click="goToLogin">
						<svgicon class="mr-lg-6 mr-md-6 mr-sm-6 mr-xs-5 mr-5" name="user" color="white"
								 :fill="false" width="24"
								 height="24"/>
						<span> {{ headerContent.personalAccount ? headerContent.personalAccount : 'Личный кабинет' }}</span>
					</v-btn>
				</div>
				<div class="mx-auto justify-center pt-8 flex-column">
					<h5 v-for="(link, idx) in routes" :key="idx" class="pa-0 text-center mb-8 "
						@click="scrollToId(link)">
						<div class="hover-link">
							{{ link.title }}
						</div>
					</h5>

				</div>
				<!--            ENG btn for Mobile view -->
				<div class="px-7 mb-8 mx-auto">
					<a :href="langSwitch.link">
						<v-btn outlined large class="mx-auto outlined outlined_primary"
							   v-ripple="{ class: `$error--text` }">
							Switch to {{langSwitch.name}}
						</v-btn>
					</a>
				</div>
				<!--			Social icons-->
				<div class="mx-auto mt-sm-16 justify-center">
					<!--          TODO: telegram chat link -->
					<a href="tg://resolve?domain=<USERNAME>" class="hover-link">
						<svgicon name="telegram" width="32" height="32" color="#D8C69E" :fill="true"
								 class="mr-8"></svgicon>
					</a>
					<a href="https://www.instagram.com/?hl=ru" class="hover-link">
						<svgicon name="instagram-filled" width="32" height="32" :fill="true" original></svgicon>
					</a>
				</div>
				<!--			Contacts-->
				<div class="mx-auto mt-8 text-center justify-center flex-column flex-sm-row">
					<a href="tel:+78002229939" class="hover-link">
						<h5 class="mr-sm-8 mb-8 text-center">
							{{ phone }}
							<!--          {{ contacts.PHONE }}-->
						</h5>
					</a>
					<a href="mailto:cs@memostory.ru" class="hover-link">
						<h5 class="mb-8 text-center ">
							{{ email }}
							<!--          {{ contacts.EMAIL }}-->
						</h5>
					</a>
				</div>
				<!--			Address-->
				<div class="px-10 px-sm-0 mb-8 mx-auto mt-0 mt-sm-8 text-center justify-center flex-column flex-sm-row">
					<h5>
						{{ address }}
					</h5>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import Config from "../config";

    export default {
        name: "mobile-menu",
        data() {
            return {
                dialog: false,
                scrollPosition: null
            }
        },
        computed: {
            user() {
                return this.$store.state.session.user;
            },

            // todo использовать общий список страниц с обычным хедером, например из state
            routes() {
                return [
                    {
                        title: this.headerContent?.ourService ? this.headerContent?.ourService : 'Наши услуги',
                        name: 'services',
                    },
                    {
                        title: this.headerContent?.examples ? this.headerContent?.examples : 'Примеры работ',
                        name: 'examples',
                    },
                    {title: this.headerContent?.tariffs ? this.headerContent?.tariffs : 'Тарифы', name: 'tariffs',},
                    {title: this.headerContent?.feedback ? this.headerContent?.feedback : 'Отзывы', name: 'reviews',},
                ]
                //return this.$store.state.page.home.menuSections;

            },
            headerContent() {
                return this.$store.state.common?.header;
            },
            langSwitch() {
                return {
                    name: this.headerContent?.langSwitch ? this.headerContent?.langSwitch : "",
                    link: this.headerContent?.langSwitch == "ENG" ? Config.LINK_ENG + "account" : Config.LINK_RU + "account"
                }
            },
            email() {
                return this.$store.state.common.email;
            },
            phone() {
                return this.$store.state.common.phone;
            },
            address() {
                return this.$store.state.common.address;
            }
        },
        methods: {
            closeMenu() {
                this.$store.state.isMenuOpen = false;
            },
            goToLogin() {
                if (this.user) this.$router.push({name: "memory-places"});
                else this.$router.push({name: "login"})
            },
            scrollToId(section) {
                this.closeMenu();
                section ? this.$emit('click', section.name, 80) : '';
            },
        }
    }

</script>

<style lang="scss">
	.mobile-menu {
		position: absolute;
		top: 0;
		background: $gradient-dark;
		height: 100vh;
		width: 100vw;
		color: $beige5;
		z-index: 10;
		overflow: auto;
		/* хром, сафари */
		&::-webkit-scrollbar {
			width: 0;
		}

		/* ie 10+ */
		-ms-overflow-style: none;
		/* фф */
		overflow: -moz-scrollbars-none;

		&__header {
			width: 100%;
			z-index: 3;
			position: fixed;
		}

		&__logo-wrapper {
			height: 72px;
		}

		&__bg {
			position: fixed;
			top: 411px;
			left: -80%;
			opacity: 0.15;
		}

		&__body {
			//height: 100vh;
			//height: calc(var(--vh, 1vh)*100);
			height: 100%;
			//height: 600px;
			margin-top: 72px;
			//padding-top: 32px;
			overflow: auto;
			overflow-y: hidden;
			@include up($sm) {
				height: auto;
			}
		}

		&__menu {
			position: fixed;
			width: 100%;
			height: 100%;
			overflow-y: scroll;
			padding-bottom: 75px;
			@include up($sm) {
				position: relative;
				height: auto;
				overflow-y: auto;
				padding-bottom: 0;
			}

			&__login-btn {
				padding-top: 32px
			}

			h5 {
				font-size: 24px;
				line-height: 29px;
			}

			.v-btn.v-size--large {
				max-width: 263px;
			}
		}

		&__icons {
			display: flex;
			align-content: center;
			align-items: center;
			cursor: pointer;

			svg:first-child {
				circle {
					fill: $beige5
				}
			}
		}

		div.row:first-child {
			height: 72px;
		}

	}
</style>
