<template>

	<div class="header_opened-menu header">
		<div class="header__wrap "
			 :class="noMenu? '':'header__wrap--between'">

			<div class="header__logo ml-lg-3">
				<router-link :to="{name: 'home'}" class="d-flex align-center hover-link mt-1">
					<svgicon v-if="isWindowLG" name="dandelion" original color="$beige1" width="106" height="106"
							 class="mt-5 ml-n3"/>
					<svgicon v-if="!isWindowLG" name="dandelion" original color="$beige1" height="72" width="72"
							 class="mt-4 ml-n1"/>
					<span>{{$store.state.common.NAME}}</span>
				</router-link>
			</div>

			<div class="header__contacts">
				<span class="flex align-center px-3 header__block" :class="isMobileApp ? 'pr-6' : ''">
					<a :href="'tel:' + $store.state.common.phoneLink" class="d-flex hover-link hover-link_primary align-center">
						<svgicon name="smartphone" color="#D8C69E" :fill="false" width="24" height="24" class="header__smartphone"/>
						<h5 v-if="isWindowMD" class="ml-md-4 ml-0">{{$store.state.common.phone}}</h5>
					</a>
				</span>
				<span v-if="isWindowMD" class="d-flex align-center pl-3 pr-6 header__block hover">
					<svgicon name="globe" color="#D8C69E" :fill="false" width="24" height="24" class="globe-icon"/>
					<h5 class="ml-4">ENG</h5>
				</span>
				<span v-if="!isMobileApp" class="d-flex align-center px-md-8 pl-5 pr-8 header__block"
					  :class="isWindowMD? 'header__login':''" @click="goHome">
					<svgicon name="cross" :color="isWindowMD? '#fff' : '#D8C69E' " :fill="false" width="24" height="24"
							 class="mb-1"/>
				</span>

			</div>
		</div>
	</div>

</template>

<script>

    export default {
        name: "header-login",
        data() {
            return {}
        },
        components: {},
        computed: {
            isWindowXS() {
                return this.$store.getters.isWindowXS;
            },
            isMobileApp() {
                return this.$store.state.common.isMobileApp;
            },
            isWindowMD() {
                return this.$store.getters.isWindowMD;
            },
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
            noMenu() {
                return this.$route.meta.noMenu || null
            },
        },
        methods: {
            goHome() {
                this.$router.push({name: 'home'})
            }
        }
    }
</script>

<style lang="scss">
	.v-application {

		// todo rename to header-login
		.header {
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

			&_menu-opened {
				background: transparent;
				box-shadow: none;
			}

			&_menu-closed {
				background: $gradient-dark;
				box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.15);
			}

			&__logo {
				font-family: $heading-font-family;
				font-style: normal;
				font-weight: 700;
				font-size: 15px;
				line-height: 19px;
				text-transform: uppercase;
				@include up($lg) {
					font-size: 36px;
					line-height: 46px;
				}
			}

			&__block {
				display: flex;
				align-content: center;
				align-items: center;
				cursor: pointer;

				svg {
					circle {
						fill: $beige5;
					}
				}

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

					svg {
						circle {
							fill: $beige2;
						}
					}
				}
			}

			&__btn-menu {
				filter: drop-shadow(0px 15px 15px rgba(77, 82, 101, 0.12));
			}

			&__contacts {
				display: flex;
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
					stroke: $grey3;
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
	}
</style>
