<template>

	<div class="header_opened-menu header-account">
		<div class="header-account__wrap px-lg-0 px-8"
			 :class="noMenu? '':'header-account__wrap--between'">

			<div class="d-flex align-center ">
				<transition appear name="list-complete">
					<div v-if="isBackArrow" class="header-account__logo ml-n2">
						<svgicon @click.native="goBack" name="arrow-left-ios" color="#D8C69E" :fill="false" height="32"
								 width="32"/>
					</div>
					<div v-else class="header-account__logo">
						<router-link :to=homePage class="d-flex align-center hover-link_fill">

							<template v-if="isWindowLG || !isWindowMD">
								<svgicon  name="dandelion" original color="$beige1"
										 :class="isWindowLG ? 'mt-5 ml-n1' : 'mt-2 ml-n9'"
										 :width="isWindowLG? '106' : '72'"
										 :height="isWindowLG? '106':'72'"
								/>
								<svgicon name="logo-text" original color="$beige1"
										 :width="isWindowLG? '220' : '115'"
										 :height="isWindowLG? '114':'123'"
								/>
							</template>


							<template v-else>
								<svgicon  name="dandelion" original color="$beige1"
								         width="72"
								         height="72" class="mt-3 ml-n9"
								/>
								<svgicon name="logo-text" original color="$beige1"
								         width="180"
								         height="83" class="ml-2"
								/>
							</template>
						</router-link>
					</div>
				</transition>

				<!--   Balance  -->
				<router-link v-if="((isMobileApp&&!isBackArrow) || isWindowMD) && !managerHeader && $route.name !== 'payment-success'"
							 :to="{name:'balance'}"
							 class="header-account__balance d-flex align-center ml-4 ml-sm-8 hover-link hover-link_primary hover-link_primary_balance">
					<svgicon original name="money" width="24" height="24" color="#D8C69E" :fill="false"/>
					<div class="h5 ml-3"> {{ user && user.BALANCE? user.BALANCE : '0' | nf }} &#8381; </div>
				</router-link>
			</div>

			<div v-if="isWindowMD && !noMenu" class="header-account__menus">
				<div class="h5" v-for="(link, idx) in routes" :key="idx">
					<router-link :to="{name: link.name}" class="header-account__nav"
								 :class="[navClass(link),link.notification?'notification':'',link.icon=='money'?'balance':'']">
						<svgicon v-if="isWindowXL" original :name="link.icon"
								 width="24" height="24"
								 :fill="false"
								 color="$grey3"/>
						<span class="mx-4 mr-xl-8">{{ link.title }}</span>
					</router-link>
				</div>
			</div>

			<div class="header-account__contacts">
				<span v-if="!managerHeader" class="d-flex align-center px-3 mr-lg-0 header-account__block hover"
					  :class="isMobileApp? 'pr-1': 'mr-4'">

<!--				<span v-if="user.EMAIL && user.UF_EMAIL_CONFIRMED == 0" @click="confirmEmail" class="d-flex align-center pr-3 header__block ">-->
					<!--					<svgicon name="bell" color="#D8C69E"  width="24" height="24"/>-->
					<!--				</span>-->
			   <a :href="'tel:' + $store.state.common.phoneLink" class="d-flex hover-link hover-link_primary align-center">
					<svgicon name="smartphone" color="#D8C69E" :fill="false" width="24" height="24" class="header-account__smartphone"/>
					<h5 v-if="isWindowLG" class="ml-4">{{ $store.state.common.phone }}</h5>
			   </a>
				</span>
				<a :href="langSwitch.link" v-if="isWindowLG && !managerHeader"
				   class="d-flex align-center pl-3 pr-6 header-account__block hover header-account__lang">
					<svgicon name="globe" color="#D8C69E" :fill="false" width="24" height="24" class=" globe-icon"/>
					<h5 class="ml-4">{{langSwitch.name}}</h5>
				</a>
				<span v-if="isWindowLG && !isMobileApp"
					  class="d-flex align-center px-6 header-account__block header-account__login"
					  @click="toLogOut">
					<svgicon name="log-out" color="#fff" :fill="false" width="24" height="24" class="mb-1"/>
					<h5 v-if="isWindowXL" class="ml-4">{{logOutLinkContent}}</h5>
				</span>
				<span v-if="!isWindowLG && !isMobileApp"
					  class="d-flex align-center px-lg-3 header-account__block hover-link hover-link_primary"
					  @click="toLogOut">
					<svgicon name="log-out" color="#D8C69E" :fill="false" width="24" height="24"/>
				</span>

			</div>
		</div>

	</div>

</template>

<script>

    import Config from "../../config"

    export default {
        name: "header-component",
        data() {
            return {
                dialogValidation: false,
                smsCode: '',
                smsCodeRules: [
                    v => v.length < 5 ? this.validadtionErrors.short : true,
                    v => RegExp(/[\d{5}]+/g).test(v) || this.validadtionErrors.wrong
                ],
                // dialog: false,
            }
        },
        components: {},
        computed: {
            isMobileApp() {
                return this.$store.state.common.isMobileApp;
            },
            isBackArrow() {
                return this.$route.meta?.isChild && this.isMobileApp;
            },
            headerContent() {
                return this.$store.state.common?.header;
            },
            user() {
                return this.$store.state.session.user
            },
            isWindowXS() {
                return this.$store.getters.isWindowXS;
            },
            isWindowMD() {
                return this.$store.getters.isWindowMD;
            },
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
            isWindowXL() {
                return this.$store.getters.isWindowXL;
            },
            isEmailNotValidated() {
                return this.$store.getters.isEmailNotValidated;
            },
            isPhoneNotValidated() {
                return this.$store.getters.isPhoneNotValidated;
            },
            noMenu() {
                return this.$route.meta.noMenu || null
            },
            managerHeader() {
                return this.$route.meta.managerHeader || null
            },
            routes() {
                return [
                    {
                        title: this.headerContent?.memorySites ? this.headerContent?.memorySites : 'Места памяти',
                        icon: 'map-pin',
                        name: 'memory-places',
                        notification: false
                    },
                    {
                        title: this.headerContent?.careReports ? this.headerContent?.careReports : 'Отчеты',
                        icon: 'camera',
                        name: 'reports',
                        notification: false
                    },
                    {
                        title: this.headerContent?.payment ? this.headerContent?.payment : 'Оплата',
                        icon: 'money',
                        name: 'balance',
                        notification: false
                    },
                    {
                        title: this.headerContent?.account ? this.headerContent?.account : 'Профиль',
                        icon: 'user',
                        name: 'my-account',
                        notification: this.isEmailNotValidated || this.isPhoneNotValidated
                    },
                ]
            },
            route() {
                return this.$route
            },
            langSwitch() {
                return {
                    name: this.headerContent?.langSwitch ? this.headerContent?.langSwitch : "",
                    link: this.headerContent?.langSwitch == "ENG" ? Config.LINK_ENG + "account" : Config.LINK_RU + "account"
                }
            },
            logOutLinkContent() {
                return this.headerContent?.logout ? this.headerContent?.logout : "Выйти"
            },
            homePage() {
                if (this.isMobileApp) {
                    return this.$route.name === 'memory-places' ? {name: this.$route.name} : {name: 'memory-places'}
                } else return {name: 'home'}
            }

        },
        methods: {
            navClass(link) {
                return {
                    'header-account__menu--default': !this.$route.meta || !this.$route.meta.menuGroup || this.$route.name !== link.name,
                    'header-account__menu--active': this.$route.name === link.name,
                };
            },

            toggleOpenMenu() {
                this.isMenuOpen = !this.isMenuOpen
            },

            toLogOut() {
                this.$router.replace({name: 'logout'});

            },
            goBack() {
                this.$router.go(-1);
            },
        }
    }
</script>

<style lang="scss">
	.v-application {

		.list-complete-enter-active, .list-complete-leave-active {
			transition: all 0.5s ease;
		}

		.list-complete-leave-to, .list-complete-enter {
			opacity: 0;
		}

		.header-account {
			white-space: nowrap;
			overflow: hidden;
			position: fixed;
			top: 0;
			line-height: 1;
			width: 100%;
			border-radius: 0px 0px $border-radius-primary $border-radius-primary;
			display: flex;
			align-content: center;
			color: $beige5;
			height: $header-height-mobile;
			background: $gradient-dark;
			box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.15);
			z-index: 11;
			@include up($lg) {
				height: $header-height;
			}

			.noFillArrow {

			}

			&__menu {
				&--default {
					color: $grey3;
				}

				&--active {
					color: $beige5;
				}
			}

			&_menu-opened {
				background: transparent;
				box-shadow: none;
			}

			&_menu-closed {
				background: $gradient-dark;
				box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.15);
			}

			&__logo {
				@include transition();
				font-family: $heading-font-family;
				font-style: normal;
				font-weight: bold;
				font-size: 14px;
				line-height: 19px;
				text-transform: uppercase;
				@include up($md) {
					font-size: 24px;
					line-height: 29px;
				}
				@include up($xl) {
					font-size: 36px;
					line-height: 46px;
				}

			}

			&__balance {
				svg {
					path:nth-child(2) {
						fill: $beige5;
						stroke: none;
					}
				}
			}

			.balance {
				svg {
					path:nth-child(2) {
						@include transition();
						stroke: none;
					}
				}
			}

			&__lang {
				svg.globe-icon {
					path {
						@include transition();
						fill: $beige5;
						stroke: none;
					}
				}

				&:hover {
					svg.globe-icon {
						path {
							@include transition();
							fill: $beige2;
							stroke: none;
						}
					}
				}
			}

			&__block {
				display: flex;
				align-content: center;
				align-items: center;
				cursor: pointer;
			}

			&__btn-menu {
				filter: drop-shadow(0px 15px 15px rgba(77, 82, 101, 0.12));
			}

			&__contacts {
				display: flex;
				align-items: flex-start;
				@include up($md) {
					align-items: center;
				}
				/*justify-content: space-between;*/
			}

      &__smartphone {
        margin-bottom: 2px;
      }

			&__login {
				background: $gradient-light;
				color: white;
				border-radius: 0px 0px 30px 0px;
				height: $header-height-mobile;
				@include transition();
				@include up($lg) {
					height: $header-height;
				}

				&:hover {
					@include transition();
					background: $gradient-light-hover;
				}
			}

			&__wrap {
				@include transition();
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				&--center {
					justify-content: center;
				}

				&--between {
					justify-content: space-between;
				}
			}

			&__menus {
				display: flex;
				@include transition();
			}

			&__menu {
				cursor: pointer;
				@include transition();

				&--active {
					color: $beige5;
					stroke: $beige5;

					svg {
						stroke: $beige5;
						fill: transparent;
					}
				}

				&--default {
					@include transition();
					color: $grey3;
					fill: transparent;

					svg {
						@include transition();
						stroke: $grey3;
						fill: transparent;
					}

					&:hover {
						color: $beige5;
						stroke: $beige5;

						svg {
							stroke: $beige5;
						}
					}
				}

				@include transition();
			}

			&__nav {
				display: flex;
				align-items: center;
			}
		}

		.hover {
			@include transition();

			&:hover {
				@include transition();
				color: $beige2;

				svg {
					@include transition();

					path {
						@include transition();
						stroke: $beige2;
					}
				}
			}
		}

		.balance {
			path:nth-child(2) {
				fill: $grey3;
			}

			&:hover {
				path:nth-child(2) {
					fill: $beige5;
				}
			}
		}

		.notification {
			position: relative;

			&:after {
				content: '';
				height: 10px;
				width: 10px;
				background-color: #FF0000;
				border-radius: 100%;
				border: 2px solid $grey1;
				top: 2px;
				left: 22px;
				position: absolute;
				opacity: 0;
				@include up($xl) {
					opacity: 1;
				}
			}
		}
	}
</style>
