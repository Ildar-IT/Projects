<template>
	<v-app>
		<v-main>
			<router-view/>
		</v-main>
	</v-app>
</template>

<script>
export default {
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
}
</script>

<style lang="scss">

/**
Глобальные стили приложения.
 */

#app {
	overflow: hidden;
	min-width: 320px;
}

body {
	background: $white-color;
	font-family: Gotham, sans-serif; // см. также переопределение в _variables
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

h1 {
	font-size: 48px;
	font-weight: 500;
	line-height: 43.2px;
	text-transform: lowercase;
	color: $black-color;

	@include up($md) {
		font-size: 64px;
		line-height: 70.4px;
	}
}

h2 {
	font-size: 20px;
	font-weight: normal; // = Book
	line-height: 30px;
	color: $black-color;
}

// подзаголовок
h3 {
	font-weight: 500; // = Medium
	font-size: 15px;
	line-height: 15px;
	text-transform: uppercase;
	color: $black-color;
}

p {
	font-weight: normal; // = Book
	font-size: 15px;
	line-height: 24px;
	color: $taupe-color;

	&.header2 {
		font-weight: 500; // = Medium
	}
}

a {
	font-weight: normal;
	font-size: 15px;
	line-height: 160%;
	text-decoration: none;

	color: $black-color;
}

.product {
	color: $black-color !important;
	display: flex;
	flex-direction: column;
	font-size: 12px;
	line-height: 19.2px;
	font-weight: 400;

	@include up($md) {
		font-size: 15px;
		font-weight: 400;
	}

	/*&-name {
		display: inline-block;
	}*/

	&-photo {
		margin-bottom: 8px;
		width: 100%;
		display: block;

		@include transition();

		&:hover {
			//filter: brightness(1.05);
			//filter: brightness(1.05);
			filter: contrast(1.1);
		}
	}

	&-price {
		display: flex;
		align-items: center;

		&__icon {
			display: inline-block;
			margin-right: 6px;
		}
	}

}

button {
	display: inline-block;
	width: 229px;
	background: $accent-color;
	color: $taupe-color;
	border-radius: 30px;
	padding: 12px 32px;
	@include transition();

	&:active, &:hover {
		color: $white-color;
		background: $taupe-color;
	}

	&.pressed {
		color: $white-color;
		background: $taupe-color;

		&:active, &:hover {
			opacity: 0.7;
		}
	}
}

input {
	outline: 0;
}

.button-arrow {
	width: 52px;
	height: 52px;
	background-color: $accent-color;
	border-radius: 1000px;
	position: relative;

	@include transition();

	svg {
		stroke: $taupe-color;
		width: 16px;
		height: 14px;
		position: relative;
		top: -1px;
	}

	&:hover {
		background-color: $taupe-color;

		svg {
			stroke-width: 2px;
			stroke: $accent-color;
		}
	}
}

.input-btn {
	@include up($xs) {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 4px;
		top: 50%;
		transform: translateY(-50%);
		min-width: 40px;
		height: 40px;
		background-color: $black-color;
		border-radius: 48px;

		&:hover {
			background-color: $taupe-color;
		}

		p {
			display: none;
		}
	}

	@include up($sm) {
		padding: 12px 32px;

		img {
			display: none;
		}
		p {
			display: block;
		}
	}
}

.btn-wrapper {
	z-index: 2;
	background-color: white;
	width: 150px;
}


/*.hash {
	font-size: 15px;
	line-height: 15px;
	color: $accent-color;
	text-transform: uppercase;
}*/

.svg-icon {
	display: inline-block;
	width: 16px;
	height: 16px;
	color: inherit;
	vertical-align: middle;
	fill: none;
	stroke: currentColor;
}

.svg-fill {
	fill: currentColor;
	stroke: none;
}

.svg-up {
	/* default */
	transform: rotate(0deg);
}

.svg-right {
	transform: rotate(90deg);
}

.svg-down {
	transform: rotate(180deg);
}

.svg-left {
	transform: rotate(-90deg);
}

.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
	bottom: unset;
	left: unset;
	width: unset;
}

.fade-quick-enter-active, .fade-quick-leave-active {
	transition: opacity 0.2s;
}

.fade-quick-enter, .fade-quick-leave-to /* .fade-leave-active до версии 2.1.8 */
{
	opacity: 0;
}

.fade-enter-active, .fade-leave-active {
	transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
{
	opacity: 0;
}

</style>
