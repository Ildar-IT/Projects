<template>
	<v-app>
		<transition name="route" mode="out-in">
			<router-view/>
		</transition>
	</v-app>
</template>

<script>
    import TheHeader from "./layout/main/the-header";
    import TheFooter from "./layout/main/the-footer";

    export default {
        components: {TheHeader, TheFooter},
        data: () => ({
            swiperReinitCount: 0,
        }),
        methods: {
            onResize() {
                //console.log("App onResize");

                this.$store.commit('updateWindowWidth');
                //this.$store.commit('updateWindowHeight');

                // на iOS чтобы попадало во весь экран на телефоне 100vh:
                //нужно добавить css переменную vh в main.scss:
                //:root {
                //--vh: 1vh;
                //}
                //после вместо vh использовать var(--vh, 1vh)
                //например всето 100vh = calc(var(--vh, 1vh)*100)
                let vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);

                this.reinitSwipers();
            },
            reinitSwipers() {

                /*
					TODO важно! уродский свафпер не пересоздается при ресайзе/уничтожении в v-if
					TODO приходится его полностью пересоздавать (точнее обновлять его ref)
					https://github.com/surmon-china/vue-awesome-swiper/issues/774
					https://github.com/surmon-china/vue-awesome-swiper/issues/687
				*/
                this.swiperReinitCount++;   // это важно!

                setTimeout(() => {
                    // обновим референс на свайпер для доступа снаружи
                    // TODO пройти по всем свайперам на странице и реинитить их
                    //this.$store.state.appSwiper = this.swiper;
                    //console.log("APP SWIPER reinited", this.swiper);
                    let keys = Object.keys(this.$store.state.swipers);
                    keys.forEach(key => {
                        if (this.$store.state.swipers[key]) this.$store.state.swipers[key].update();
                    });
                }, 300);
            }
        },
        mounted() {
            window.addEventListener("resize", this.onResize);
            this.onResize();
        },
        destroyed() {
            window.removeEventListener("resize", this.onResize);
        }
    };
</script>

<style lang="scss">

	/** Глобальные стили **/

	.theme--light.v-application {
		background-image: url("~@/assets/bg/bg-lg.jpg");
		background-size: cover;
		background-repeat: repeat;
		background-position: top center;
	}

	.v-application {
		line-height: inherit;

		& ul {
			padding: 0;
		}

		& a {
			color: unset;
		}

		& p {
			margin-bottom: 0;
		}
	}

    .v-input input {
        max-height: unset;
    }

    .v-text-field input {
        padding: inherit;
    }


	body {
		font-family: $primary-font-family, sans-serif;
		font-weight: 300;
		font-size: 14px;
		line-height: 136% !important;
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	.container {
		padding: 0 32px;
		width: 100%;
		max-width: 1344px;
	}

	h1,
	h2,
	h3 {
		font-weight: inherit;
	}

	a {
		text-decoration: none;
	}

	li {
		list-style: none;
	}

	section {
		z-index: 1;
	}

	.row {
		margin: 0;
	}

	.col-xl, .col-xl-auto, .col-xl-12, .col-xl-11, .col-xl-10, .col-xl-9, .col-xl-8, .col-xl-7, .col-xl-6, .col-xl-5, .col-xl-4, .col-xl-3, .col-xl-2, .col-xl-1, .col-lg, .col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8, .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-md, .col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7, .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-sm, .col-sm-auto, .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5, .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col, .col-auto, .col-12, .col-11, .col-10, .col-9, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-2, .col-1 {
		padding: 0;
	}

	details,
	select,
    .custom-checkbox {
		cursor: pointer;
	}

    .custom-checkbox {
        position: relative;
        z-index: 2;
    }


	.custom-checkbox > input {
		position: absolute;
		z-index: -1;
		opacity: 0;
	}

	/* для элемента label, связанного с .custom-checkbox */
	.custom-checkbox > span {
		display: inline-flex;
		align-items: center;
		user-select: none;
	}

	/* создание в label псевдоэлемента before со следующими стилями */
	.custom-checkbox > span::before {
		content: '';
		display: inline-block;
		width: 1em;
		height: 1em;
		flex-shrink: 0;
		flex-grow: 0;
		border: 1px solid $black500;
		border-radius: 0.25em;
		margin-right: 0.5em;
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 50% 50%;
	}

	/* стили при наведении курсора на checkbox */
	.custom-checkbox > input:not(:disabled):not(:checked) + span:hover::before {
		border-color: $black500;
	}

	/* стили для активного чекбокса (при нажатии на него) */
	.custom-checkbox > input:not(:disabled):active + span::before {
		background-color: $primary500;
		border-color: $primary500;
	}

	/* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
	.custom-checkbox > input:focus:not(:checked) + span::before {
		border-color: $black500;
	}

	/* стили для чекбокса, находящегося в состоянии checked */
	.custom-checkbox > input:checked + span::before {
		border-color: $primary500;
		background-color: $primary500;
		background-image: url("~@/assets/check.svg");
	}

	/* стили для чекбокса, находящегося в состоянии disabled */
	.custom-checkbox > input:disabled + span::before {
		background-color: #e9ecef;
	}

	.btnLinkBlue {
		.btn-link {
			background-color: $secondary500;
			color: $white;

			&:hover {
				background-color: $white;
				color: $secondary500;
			}
		}
	}

	// плавное появление, плавное скрытие - хорошо для роутинга страниц
	.route-enter-active, .route-leave-active {
		transition: opacity .3s
	}

	.route-enter, .route-leave-to {
		opacity: 0;
	}

	//быстрое плавное появление, быстрое плавное скрытие
	.fade-enter-active, .fade-leave-active {
		transition: opacity 30s
	}

	.fade-enter, .fade-leave-to {
		opacity: 0;
	}

	.select-caret {
		position: relative;
		z-index: 2;
		display: inline-block;
        cursor: pointer;

		&::after {
			position: absolute;
			content: url("~@/assets/caret.svg");
			width: 10px;
			height: 5px;
			top: 12px;
			right: 15px;
		}

        &:active {
            &::after {
                top: 27px;
                transform: rotate(180deg);
            }
        }
	}

    .select {
        cursor: pointer;
    }


</style>