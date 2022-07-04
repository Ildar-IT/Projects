<template>
	<header ref="header" class="the-header" v-scroll="handleScroll"
			:class="headerClass">
		<v-container class="py-3 py-md-7 py-lg-5">

			<transition name="burger" appear>
				<burger-menu v-if="isBurgerMenuShown"/>
			</transition>

			<div class="d-flex d-md-none justify-space-between align-center px-4 the-header__mobile">

				<div @click="onToggleBurgerMenu" class="the-header__hamburger d-flex  flex-column"
					 :class="{'the-header__hamburger-active' : isBurgerMenuShown}">
					<span></span>
					<span></span>
					<span></span>
				</div>

				<router-link :to="{name: 'home'}">
					<svgicon :name="isLogoWhite?'logo':'logo-dark'" class="the-header__logo "/>
				</router-link>

				<button class="the-header__basket" @click="popupBasket">
					<svgicon width="20" height="24" name="shop"/>
				</button>
			</div>

			<div class="d-none d-md-flex justify-space-between align-center the-header__desktop">
				<router-link :to="{name: 'home'}">
					<svgicon :name="isLogoWhite?'logo':'logo-dark'" class="the-header__logo "/>
				</router-link>

				<div class="d-flex justify-space-between">
					<template v-for="(item,index) of items">
						<a v-if="item.scrollTo" href="#" @click.prevent="scrollTo(item.scrollTo)">{{item.name}}</a>
						<router-link v-else :to="item.to">{{item.name}}</router-link>
					</template>
				</div>
				<div class="d-flex">
					<a href="#" @click.prevent="scrollTo('about')">EN</a>
					<button class="d-none the-header__basket-btn" @click="popupBasket">
						<svgicon width="20" height="24" name="shop" class="ml-14"/>
					</button>
				</div>
			</div>
		</v-container>
	</header>
</template>

<script>
    import BurgerMenu from './burger-menu.vue';
    import {scrollTo} from '@/utils/utils';

    export default {
        name: "the-header",
        components: {
            BurgerMenu,
        },
        data() {
            return {
                isHeaderScrolled: false,
                isHeaderBurgered: false,
            }
        },
        computed: {
            items() {
                return this.$store.state.menuItems;
            },
            headerClass() {
                return {
                    'inversed': (
                        this.isHeaderInversed
                        || this.isRouteHeaderInversed),
                    'scrolled': this.isHeaderScrolled,
                    'burgered': this.isHeaderBurgered,
                }
            },
            isBurgerMenuShown() {
                return this.$store.state.isBurgerMenuShown;
            },
            isLogoWhite() {
                // стейт может форсировать инверсивный хедер
                return this.$store.state.isHeaderInversed && !this.isHeaderBurgered;
            },
            isHeaderInversed() {
                // стейт может форсировать инверсивный хедер
                return this.$store.state.isHeaderInversed;
            },
            isRouteHeaderInversed() {
                // роут может форсировать инверсивный хедер
                return this.$route.meta.isHeaderInversed;
            },
            headerHeight() {
                return this.$store.state.headerHeight;
            }
        },
        methods: {
            onResize() {
                this.$store.state.headerHeight = this.$refs.header.clientHeight;
            },
            scrollTo(id) {
                scrollTo(id, -this.$store.state.headerHeight);
            },
            popupBasket() {
                this.$store.state.isPopupBasket = true;
            },
            onToggleBurgerMenu() {
                this.$store.state.isBurgerMenuShown = !this.$store.state.isBurgerMenuShown;
                if (this.$store.state.isBurgerMenuShown) setTimeout(() => {
                    this.isHeaderBurgered = true;
                }, 100);
                else this.isHeaderBurgered = false;
            },
            handleScroll() {

                this.$store.state.headerHeight = this.$refs.header.clientHeight;
                if (this.isBurgerMenuShown) return;
                if (this.isHeaderClassWhite) return;

                if (window.scrollY > 100) this.isHeaderScrolled = true;
                else this.isHeaderScrolled = false;
                /*if (window.scrollY > this.headerHeight && window.scrollY < (this.$store.state.introHeight - this.headerHeight)) {
                    this.isHeaderScrolled = true;
                } else {
                    this.isHeaderScrolled = false;
                }*/

                /*this.isHeaderWhite = false;
                const y = window.scrollY;
                this.$store.state.whiteHeaderSections.forEach(el=>{
                    if (y >= el.height - this.headerHeight && y < el.y )) {
                        this.isHeaderWhite = true;
                    }
				})*/

            }
        },
        mounted() {
            window.addEventListener("resize", this.onResize);
            this.onResize();
        },
        destroyed() {
            window.removeEventListener("resize", this.onResize);
        }
    }
</script>

<style lang="scss">
	.the-header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		@include transition();
		//background: transparent;
		background: $header-white;//$white;


		/*&.scrolled {
			background: rgba(95, 95, 95, 0.25);//$white;
		}*/

		&.inversed {
			background: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2));

			&.scrolled {
				background: rgba(95, 95, 95, 0.25);
			}

			&:not(.burgered) {
				.the-header {
					&__logo {
						fill: $white;
					}

					&__basket {
						svg {
							fill: $white;
						}
					}

					&__hamburger {
						span {
							background: $white;
						}
					}

					&__desktop {
						a {
							color: $white !important;
							//font-weight: $fw-book;

							&:hover {
								text-decoration-color: $white;
							}
						}
					}
				}
			}
		}

		/*button {
			@include transition();

			&:hover {
				opacity: 0.6;
			}
		}*/

		&__logo {
			margin: auto auto;
			display: block;
			width: 52px;
			height: 52px;
			fill: $primary-500;

			@include up($md) {
				width: 57px;
				height: 57px;
			}
			@include up($lg) {
				width: 83px;
				height: 83px;
			}
		}

		&__basket {
			width: 30px;
			position: relative;

			svg {
				fill: $black;
				width: 25px;
				height: 30px;
			}


			&::after {
				position: absolute;
				top: -10px;
				right: -17px;
				z-index: 20;
				content: "5";
				width: 22px;
				height: 16px;
				background: #FF5733;
				border-radius: 1000px;
				font-size: 12px;
				line-height: 16px;
				color: $white;
			}
		}

		&__hamburger {
			justify-content: space-between;
			height: 50px;
			padding: 15px 0 15.5px 0;

			span {
				display: block;
				width: 30px;
				height: 1.5px;
				background: $black;
				@include transition();
			}

			&-active {
				position: relative;
				padding: 0;
				height: 50px;
				width: 30px;

				span {
					display: block;
					@include transition();

					&:nth-child(1) {
						position: absolute;
						top: 50%;
						transform: rotate(45deg) translateY(-50%);
					}

					&:nth-child(2) {
						display: none;
					}

					&:nth-child(3) {
						position: absolute;
						top: 50%;
						transform: rotate(-45deg) translateY(-50%);
					}
				}
			}
		}

		&__mobile {
			position: relative; // важно, чтобы было над бургером
		}

		&__desktop {

			a {
				display: inline-block;
				padding: 0 10px;
				font-family: $header-font-family;
				font-size: $fs-h6;
				letter-spacing: $ls-h6;
				//color: $black !important;
				white-space: nowrap;

				&:not(.router-link-active) {
					color: $black !important;
				}

				&:hover:not(:focus):not(:active) {
					//opacity: 0.6;
					text-decoration-color: $primary-500;
					//border-bottom: 1px solid $primary-500 !important;
				}


				@include up($lg) {
					font-size: $fs-h5;
					letter-spacing: $ls-h5;
				}
			}
		}
	}
</style>