<template>
	<div class="block-care light-text pb-8 pb-lg-0 ">

		<svgicon class="d-none d-lg-block block-care__bg block-care__bg_sm" name="dandelion" original width="484"
				 height="645" color="#CBB08E"></svgicon>
		<svgicon class="d-none d-lg-block block-care__bg block-care__bg_lg" name="dandelion" original width="1080"
				 height="1438" color="#CBB08E"></svgicon>

		<div class="layout padding-top-main px-4 px-lg-0 block-care__content">
			<div class="block-max-width">
				<h2 class="text-center padding-bottom-main">
					{{ texts.name }}
				</h2>

				<v-row :class="isWindowLG? 'block-care__content-wrapper mr-auto ml-12' : ''">
					<v-col class="mr-14 pa-0 pb-7 d-none d-lg-flex align-end">
						<div class="block-care__image" :style="{'background-image': 'url(' + texts.image + ')'}"/>
					</v-col>
					<v-col class="block-care__info pt-0">
						<p class="body-1 text-center text-lg-left">
							{{ texts.text }}
						</p>

						<div class="margin-top-main">
							<div class="d-flex justify-center my-lg-8 mx-auto block-care__login-btn">
								<v-btn @click="goToLogin"
									   block dark
									   class="btn--secondary margin-bottom-main shadow">
									<svgicon class="mr-6" name="user" color="white" :fill="false" width="24"
											 height="24"/>
									<span>{{buttonContent}}</span>
								</v-btn>
							</div>

							<div class="mx-auto pb-lg-8 text-center d-lg-flex justify-lg-space-between mx-lg-0 block-care__btns">
								<v-btn height="60"
									   class="black shadow mb-4 my-xl-9" dark>
									<svgicon :name="isEng ? 'google-en': 'google'" original width="190" height="60"
											 :fill="false"/>
								</v-btn>

								<v-btn height="60"
									   class="black shadow mb-8 my-xl-9" dark>
									<svgicon :name="isEng? 'apple-en' : 'apple'" original width="190" height="60"
											 :fill="false"/>
								</v-btn>
							</div>


						</div>
					</v-col>
				</v-row>
			</div>
		</div>

	</div>
</template>

<script>
    export default {
        name: "block-care",
        computed: {
            user() {
                return this.$store.state.session.user
            },
            page() {
                return this.$store.state.page.HomeController;
            },
            pageButtons() {
                return this.$store.state.common.buttons;
            },
            buttonContent() {
                return this.pageButtons?.auth ? this.pageButtons?.auth : 'Авторизоваться'
            },
            isEng() {
                if (this.$store.state.common.header?.langSwitch == "RU") {
                    return true
                } else {
                    return false
                }
            },
            isWindowXS() {
                return this.$store.getters.isWindowXS;
            },
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
            texts() {
                return {
                    name: this.page.texts.find(el => el.CODE === "HOME_CARE_H1").PREVIEW_TEXT,
                    text: this.page.texts.find(el => el.CODE === "HOME_CARE_TEXT").PREVIEW_TEXT,
                    image: this.page.texts.find(el => el.CODE === "HOME_CARE_H1").PREVIEW_PICTURE,
                }
                // return {
                //   name: 'С нами проявлять заботу проще',
                //   text: 'Взвесь, если рассматривать процессы в рамках специальной теории относительности, изотропно облучает расширяющийся. Призма, как того требуют законы термодинамики.',
                // }
            }
        },
        methods: {
            goToLogin() {
                if (this.user) this.$router.push({name: "memory-places"});
                else this.$router.push({name: "login"});
            }
        }
    }
</script>

<style lang="scss">
	.block-care {
		min-width: 360px;
		position: relative;
		background: linear-gradient(263.56deg, #CBB08E 0%, #BA9568 100%);
		border-radius: $border-radius-primary $border-radius-primary 0px 0px;
		overflow: hidden;

		&__content {
			z-index: 1;
		}

		&__content-wrapper {
			max-width: 866px;

			.col:first-child {
				z-index: 1;
			}
		}

		&__info {
			position: relative;	// important for fighting the flowers
			@include up($lg) {
				max-width: 413px;
			}

			p {
				max-width: 780px;
				margin: 0 auto;
			}
		}

		&__login-btn {
			width: 264px;

			@include up($lg) {
				width: auto;
			}

			button {
				span.v-btn__content {
					display: flex;
					align-items: flex-end;
					@include up($lg) {
						align-items: flex-start;
					}
				}
			}
		}

		&__btns {
			width: 264px;
			@include up($lg) {
				width: auto;
			}

			.v-btn {
				height: 69px;
				overflow: hidden;
				width: 264px;

				@include up($lg) {
					width: 185px;
				}
			}
		}

		/*
		  button.shadow {
			span.v-btn__content {
			  display: flex;
			  //align-items: flex-end;
			}
		  }*/

		&__image {
			height: 450px;
			width: 120%;
			//background-image: url("../../assets/images/mobile-short.png");
			//background-position: top;
			//background-size: contain;
			//background-repeat: no-repeat;
			//background-blend-mode: multiply;
		}

		&__bg {
			position: absolute;
			z-index: 0;

			&_sm {
				top: 141px;
				left: 0;
			}

			&_lg {
				top: 277px;
				right: 71px;
			}
		}

		span.v-btn__content {
			span {
				font-size: 16px;
				line-height: 19px;
				@include up($lg) {
					font-size: 24px !important;
					line-height: 29px !important;
				}
			}
		}
	}
</style>
