<template>
	<v-app>
		<transition name="route" mode="out-in">
			<router-view/>
		</transition>
	</v-app>
</template>

<script>
    export default {
        name: 'App',
        data: () => ({
            swiperReinitCount: 0,
        }),
        methods: {
            onResize() {
                //console.log("App onResize");

                this.$store.commit('updateWindowWidth');
                this.$store.commit('updateWindowHeight');

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
	/*
	Глобальные стили приложения, доступные во всех компонентах
	См. также styles/index.scss и styles/variables.scss
	*/

	:root {
		--vh: 1vh;
		--gray: #B3B8CB;
	}


	html {
		overflow-y: inherit;
		overflow-x: hidden;
	}

	body {
		box-sizing: border-box;
		cursor: default;
		font-family: $body-font-family;
		font-weight: normal;
		font-style: normal;
		font-size: $default-font-size;
		line-height: $default-line-height;
		background-color: $white;
		padding: 0;
		margin: 0;
		color: $black-200;
	}

	#app {
		overflow: hidden;
		min-width: 320px;

		p {
			margin-bottom: 0;
		}

		a {
			color: $primary-500;
		}
	}

	p {
		letter-spacing: 2px;
		line-height: $default-line-height;

		& + p {
			margin-top: 16px;
		}

		&.limited {
			max-width: 640px;
			//margin-left: auto;
			//margin-right: auto;

			@include up($md) {
				max-width: unset;
				//margin-left: unset;
				//margin-right: unset;
			}
		}
	}

	a {
		text-decoration-color: transparent;
		//text-decoration: none;
		color: $primary-500; // !important;

		@include transition();

		&:hover {
			opacity: 0.7;
			//text-decoration-color: $golden;
		}

		&:active, &:focus {
			opacity: 1;
		}
	}

	h1, .h1 {
		font-family: $header-font-family;
		font-weight: $default-font-weight;
		font-size: $fs-h1;
		line-height: $lh-h1;
		letter-spacing: $ls-h1;
	}

	h2, .h2 {
		font-family: $header-font-family;
		font-weight: $default-font-weight;
		font-size: $fs-h2;
		line-height: $lh-h2;
		letter-spacing: $ls-h2;
	}

	h3, .h3 {
		font-family: $header-font-family;
		font-weight: $default-font-weight;
		font-size: $fs-h3;
		line-height: $lh-h3;
		letter-spacing: $ls-h3;
		color: $default-header-color;
	}

	h4, .h4 {
		font-family: $header-font-family;
		font-weight: $default-font-weight;
		font-size: $fs-h4;
		line-height: $lh-h4;
		letter-spacing: $ls-h4;
	}

	h5, .h5 {
		font-family: $header-font-family;
		font-weight: $default-font-weight;
		font-size: $fs-h5;
		line-height: $lh-h5;
		letter-spacing: $ls-h5;
	}

	h6, .h6 {
		font-family: $header-font-family;
		font-weight: $default-font-weight;
		font-size: $fs-h6;
		line-height: $lh-h6;
		letter-spacing: $ls-h6;
	}

	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	li {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	.size {
		&1 {
			font-family: $body-font-family;
			/*font-family: $body-font-family;
			font-weight: normal;*/
			font-size: $fs-1;
			line-height: $lh-1;
			letter-spacing: $ls-1;
		}

		&2 {
			font-family: $body-font-family;
			font-size: $fs-2;
			line-height: $lh-2;
			letter-spacing: $ls-2;
			//color: $black;

		}
	}

	.color {
		&-golden {
			color: $golden !important;
		}

		&-black {
			color: $black !important;
		}
	}

	.container.container {
		&--narrow {
			padding-right: 30px;
			padding-left: 30px;

			@include up($md) {
				padding-right: 52px;
				padding-left: 52px;
			}

			@include up($lg) {
				padding-right: 124px;
				padding-left: 124px;
			}
		}
	}

	.section {
		&--padding {
			padding: 64px 0;
			@include up($md) {
				padding: 128px 0;
			}
		}

		&--page {
			padding: 60px 0;
			@include up($md) {
				padding: 48px 0;
			}
		}

		&--image {
			width: 100%;
			height: 360px;
			max-width: 1400px;
			margin: 0 auto;
			background-position: center;
			background-size: cover;

			@include up($md) {
				height: 420px;
			}

			@include up($lg) {
				height: 550px;
			}
		}
	}

	// default padding for page level components
	.page {
		&--padding {
			// padding-top should match header height
			padding: 76px 0 48px;
			@include up($md) {
				// padding-top should match header height
				padding: 113px 0 48px;
			}
			@include up($lg) {
				// padding-top should match header height
				padding: 123px 0 48px;
			}
		}
	}

	.svg {
		&-icon {
			display: inline-block;
			/*width: 16px;
			height: 16px;*/
			color: inherit;
			vertical-align: middle;
			fill: none;
			stroke: currentColor;
		}

		&-fill {
			fill: currentColor;
			stroke: none;
		}

		&-up {
			/* default */
			transform: rotate(0deg);
		}

		&-right {
			transform: rotate(90deg);
		}

		&-down {
			transform: rotate(180deg);
		}

		&-left {
			transform: rotate(-90deg);
		}
	}

	.transition {
		@include transition();
	}


	// todo review all below

	.my-text-3 {
		font-family: $body-font-family;
		font-weight: normal;
		font-size: 15px;
		line-height: 28px;
		letter-spacing: 2px;
		color: $black-200;


	}

	.my-primary {
		color: $primary-500;
	}

	.my-black {
		color: $black;
	}

	.width-100 {
		width: 100%;
	}


	/*
* стандартный отсуп сверху, используется для любого элемента
*/
	.margin-top-main {
		margin-top: $margin-main-xs;

		@include up($sm) {
			margin-top: $margin-main-sm;
		}
		@include up($md) {
			margin-top: $margin-main-md;
		}
		@include up($lg) {
			margin-top: $margin-main-lg;
		}
		@include up($xl) {
			margin-top: $margin-main-xl;
		}
	}

	/*
* стандартный отсуп снизу, используется для любого элемента
*/
	.margin-bottom-main {
		margin-bottom: $margin-main-xs;

		@include up($sm) {
			margin-bottom: $margin-main-sm;
		}
		@include up($md) {
			margin-bottom: $margin-main-md;
		}
		@include up($lg) {
			margin-bottom: $margin-main-lg;
		}
		@include up($xl) {
			margin-bottom: $margin-main-xl;
		}
	}

	/*
* стандартный отсуп свеху, если не подходит margin
*/
	.padding-top-main {
		padding-top: $padding-main-xs;

		@include up($sm) {
			padding-top: $padding-main-sm;
		}
		@include up($md) {
			padding-top: $padding-main-md;
		}
		@include up($lg) {
			padding-top: $padding-main-lg;
		}
		@include up($xl) {
			padding-top: $padding-main-xl;
		}
	}

	/*
* стандартный отсуп снизу, если не подходит margin
*/
	.padding-bottom-main {
		padding-bottom: $padding-main-xs;

		@include up($sm) {
			padding-bottom: $padding-main-sm;
		}
		@include up($md) {
			padding-bottom: $padding-main-md;
		}
		@include up($lg) {
			padding-bottom: $padding-main-lg;
		}
		@include up($xl) {
			padding-bottom: $padding-main-xl;
		}
	}

	/*
* маленький отсуп свеху
*/
	.padding-top-small {
		padding-top: $padding-small-xs;

		@include up($sm) {
			padding-top: $padding-small-sm;
		}
		@include up($md) {
			padding-top: $padding-small-md;
		}
		@include up($lg) {
			padding-top: $padding-small-lg;
		}
		@include up($xl) {
			padding-top: $padding-small-xl;
		}
	}

	/*
* маленький отсуп снизу
*/
	.padding-bottom-small {
		padding-bottom: $padding-small-xs;

		@include up($sm) {
			padding-bottom: $padding-small-sm;
		}
		@include up($md) {
			padding-bottom: $padding-small-md;
		}
		@include up($lg) {
			padding-bottom: $padding-small-lg;
		}
		@include up($xl) {
			padding-bottom: $padding-small-xl;
		}
	}

	/* transitions */

	.fade-quick-enter-active, .fade-quick-leave-active {
		transition: opacity 0.2s;
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity 0.3s;
	}

	.fade-long-active, .fade-long-leave-active {
		transition: opacity 1s;
	}

	.fade-enter, .fade-leave-to, .fade-quick-enter, .fade-quick-leave-to, .fade-long-enter, .fade-long-leave-to {
		opacity: 0;
	}

	// Быстрое плавное появление, быстрое плавное скрытие - хорошо для роутинга страниц
	.route-enter-active, .route-leave-active {
		transition: opacity .3s
	}

	.route-enter, .route-leave-to {
		opacity: 0;
	}

</style>
