<template>

	<div class="header_opened-menu header">
		<div class="header__wrap "
			 :class="noMenu? '':'header__wrap--between'">

			<!--      <div class="header__logo" :class="isLogIn?'':'header__menu&#45;&#45;default-bright'">-->
			<router-link to="/" class="d-flex align-center header__menu--default-bright header__logo">
				<!--          <svgicon v-if="isWindowLG" name="logo" original color="#D8C69E" width="340" height="114"-->
				<!--                   class="mt-4"/>-->

				<!--          <svgicon v-if="!isWindowLG && !isWindowMD" name="logo" original color="#D8C69E" height="123" width="163"-->
				<!--                   class="ml-2 mt-2" />-->
				<!--            <svgicon v-if="!isWindowLG && isWindowMD" name="logo" original color="#D8C69E" height="110"-->
				<!--                     width="300"-->
				<!--                     class=" mt-6"/>-->
				<!--                    <span v-if="isWindowMD && !isWindowLG && !isWindowXS">{{ $store.state.common.NAME }}</span>-->
				<svgicon v-if="isWindowLG || !isWindowMD" name="dandelion" original color="$beige1"
						 :width="isWindowLG? '106' : '72'"
						 :height="isWindowLG? '106':'72'" :class="isWindowLG? 'mt-5 ml-n1' : 'mt-2 ml-n1'"
				/>
				<svgicon v-if="isWindowLG || !isWindowMD" name="logo-text" original color="$beige1"
						 :width="isWindowLG? '200' : '120'"
						 :height="isWindowLG? '100':'123'"
				/>


				<svgicon v-if="isWindowMD && !isWindowLG" name="dandelion" original color="$beige1" width="72"
						 height="72" class="mt-3 ml-n1"
				/>
				<svgicon v-if="isWindowMD && !isWindowLG" name="logo-text" original color="$beige1" width="150"
						 height="73" class="ml-2"
				/>


			</router-link>
			<!--      </div>-->

			<div v-if="isWindowXL && !noMenu" class="header__menus">
				<div class="h5" v-for="(link, idx) in routes" :key="idx">
					<a href="#" class="mx-2 mx-xl-3 header__nav hover-link"
					   :class="navClass(link)" @click.prevent="scrollToId(link.linkTo)">
						{{ link.title }}
						<!--                  <a :href="link.name" class="hover-link" :class="navClassLight(link)">
											{{ link.title }}
										  </a>-->
					</a>
				</div>
			</div>
			<div v-else-if="isWindowHeaderMD && !isWindowXL && !noMenu" class="header__menus">
				<div class="h5" v-for="(link, idx) in routesMini" :key="idx">
					<a href="#" class="mx-2 mx-xl-3 header__nav hover-link"
					   :class="navClass(link)" @click.prevent="scrollToId(link.linkTo)">
						{{ link.title }}
						<!--                  <a :href="link.name" class="hover-link" :class="navClassLight(link)">
											{{ link.title }}
										  </a>-->
					</a>
				</div>
			</div>

			<div class="header__contacts">
				<span class="flex align-center pr-lg-3 header__block ">
				<a href='tel:+78002229939' class="d-flex hover-link_light align-center">
							<svgicon name="smartphone" color="#D8C69E" :fill="false" width="24" height="24"
									 class="header__smartphone"/>
							<h5 class="d-none d-md-block ml-md-4">{{ $store.state.common.phone }}</h5>
				</a>
				</span>
				<a :href="langSwitch.link" v-if="isWindowMD" class="d-flex align-center pl-3 pr-6 header__block header__menu--default-bright">
					<svgicon name="globe" color="#D8C69E" width="24" height="24" class=" "/>
					<h5 class="ml-4">{{langSwitch.name}}</h5>
				</a>
				<router-link v-if="isWindowMD" :to="{name: 'memory-places'}">
					<span class="d-flex align-center pl-6 pr-7 header__block header__login">
						<svgicon name="user" color="#fff" :fill="false" width="24" height="24" class=" "/>
						<h5 class="ml-3">{{loginLinkContent}}</h5>
					</span>
				</router-link>
				<router-link v-else :to="{name: 'memory-places'}">
					<span class="d-flex align-center px-3 header__block">
						<svgicon name="user" color="#D8C69E" :fill="false" width="24" height="24"/>
					</span>
				</router-link>
				<!--  Burger menu -->
				<v-dialog @click="scrollToId"
						  v-model="dialog"
						  fullscreen
						  scrollable
						  transition="fade-transition">
					<mobile-menu @click="scrollToId"/>
				</v-dialog>
				<span v-if="!isWindowMD" class="flex align-center pl-3 pr-7 header__block"
					  @click="toggleOpenMenu">
					<svgicon name="menu" color="#D8C69E" :fill="false" width="24" height="24"/>
				</span>

			</div>
		</div>
	</div>

</template>

<script>
    import MobileMenu from "./mobile-menu";
    import Config from "../config"

    export default {
        name: "header-component",
        data() {
            return {
                // dialog: false,
            }
        },
        components: {
            MobileMenu
        },
        computed: {
            user() {
                return this.$store.state.session.user
            },
            isWindowXS() {
                return this.$store.getters.isWindowXS;
            },
            isWindowMD() {
                return this.$store.getters.isWindowMD;
            },
            isWindowHeaderMD() {
                return this.$store.getters.isWindowHeaderMD;
            },
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
            isWindowXL() {
                return this.$store.getters.isWindowXL;
            },
            noMenu() {
                return this.$route.name !== "home";
            },
            headerContent() {
                return this.$store.state.common?.header;
            },
            isMenuOpen: {
                set(v) {
                    this.$store.state.isMenuOpen = v;
                },
                get() {
                    return this.$store.state.isMenuOpen
                }
            },
            dialog() {
                return this.isMenuOpen
            },
            routes() {
                return [
                    {
                        title: this.headerContent?.ourService ? this.headerContent?.ourService : 'Наши услуги',
                        name: 'services',
                        linkTo: 'services'
                    },
                    {
                        title: this.headerContent?.examples ? this.headerContent?.examples : 'Примеры работ',
                        name: 'works',
                        linkTo: 'examples'
                    },
                    {
                        title: this.headerContent?.tariffs ? this.headerContent?.tariffs : 'Тарифы',
                        name: 'tariffs',
                        linkTo: 'tariffs'
                    },
                    {
                        title: this.headerContent?.aboutUs ? this.headerContent?.aboutUs : 'О нас',
                        name: 'about',
                        linkTo: 'about'
                    },
                    {
                        title: this.headerContent?.feedback ? this.headerContent?.feedback : 'Отзывы',
                        name: 'reviews',
                        linkTo: 'reviews'
                    },
                ]
                //return this.$store.state.page.home.menuSections;
            },
            routesMini() {
                return [
                    {
                        title: this.headerContent?.ourService ? this.headerContent?.ourService : 'Услуги',
                        name: 'services',
                        linkTo: 'services'
                    },
                    {
                        title: this.headerContent?.examples ? this.headerContent?.examples : 'Примеры работ',
                        name: 'works',
                        linkTo: 'examples'
                    },
                    {
                        title: this.headerContent?.tariffs ? this.headerContent?.tariffs : 'Тарифы',
                        name: 'tariffs',
                        linkTo: 'tariffs'
                    },
                ]
            },
            loginLinkContent() {
                return this.headerContent?.auth ? this.headerContent?.auth : "Войти"
            },
            langSwitch() {
                return {
                    name: this.headerContent?.langSwitch ? this.headerContent?.langSwitch : "ENG",
                    link: this.headerContent?.langSwitch == "ENG" ? Config.LINK_ENG : Config.LINK_RU
                }
            },
            route() {
                return this.$route
            }
        },
        methods: {
            navClass(link) {
                return {
                    'header__menu--default': !this.route.meta || !this.route.meta.group || !this.route.name === link.name || this.$route.hash !== link.linkTo,
                    'header__menu--active': this.route.name === link.name || this.$route.hash == link.linkTo,
                };
            },
            navClassLight(link) {
                return {
                    'header__menu--default-bright': !this.route.meta || !this.route.meta.group || this.route.meta.group !== link.name,
                    'header__menu--active-light': this.route.meta.menuGroup === link.name && this.$route.hash == link.linkTo,
                };
            },

            toggleOpenMenu() {
                this.isMenuOpen = !this.isMenuOpen;
            },

            scrollToId(section, offset) {
                const el = document.getElementById(section);
                if (!el) return;
                window.scrollTo({
                    top: el.offsetTop - (offset || 50),
                    behavior: "smooth"
                });
            },
        }
    }
</script>

<style lang="scss">
	.v-application {
		.header {
			overflow: hidden;
			position: fixed;
			top: 0;
			line-height: 1;
			min-width: 360px;
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

			&_menu-opened {
				background: transparent;
				box-shadow: none;
			}

			&_menu-closed {
				background: $gradient-dark;
				box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.15);
			}

			&__logo {
				cursor: pointer;

				span {
					text-transform: uppercase;
					font-family: $btn-font-family;
					font-weight: bold;
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
				/*span:first-child{
				  svg{
					display: block;
					@include adopt(1050px){
					  display: none;
					}
				  }
				}*/
			}

			&__login {
				background: $gradient-light;
				color: white;
				border-radius: 0px 0px 30px 0px;
				height: $header-height-mobile;
				@include transition();

				@include up(1280px) {
					height: $header-height;
				}

				&:hover {
					// gradients do not transform smoothly...
					//background: $gradient-light-hover;
					filter: brightness(1.1);
				}
			}

			&__wrap {
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
				margin: 0 auto;
				white-space: nowrap;
				@include up($xl) {
					margin-left: 165px;
					margin-right: 0;
				}
			}

			h5 {
				font-size: 24px;
				line-height: 29px;
				@include adopt(1180px) {
					font-size: 18px;
				}
			}

			&__menu {
				cursor: pointer;
				@include transition();

				&--active {
					color: $beige8;

					svg {
						fill: transparent;

						path {
							stroke: $beige8;
							fill: none;
						}
					}
				}

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

				&--default {
					@include transition();
					color: $beige5;
					stroke: $beige5;
					fill: transparent;

					svg {
						@include transition();
						stroke: $beige5;
						fill: transparent;
					}

					&:hover {
						color: $beige8;
						stroke: $beige8;

						svg {
							stroke: $beige8;
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

				@include transition();
			}

			&__nav {
				display: flex;
				align-items: center;
			}

			&__smartphone {
        margin-bottom: 2px;
				circle {
					fill: $beige5;
				}

				&:hover {
					circle {
						fill: $beige8;
					}
				}
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
	}
</style>
