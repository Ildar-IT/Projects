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
	font-family: sans-serif; // см. также переопределение в _variables
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.container {
  height: 100%;
}

h1 {
  font-size: 28px;
  font-weight: bold;
	line-height: 30.8px;

	color: $white-color;
  text-decoration-line: underline;

	@include up($sm) {
		font-size: 66px;
		line-height: 72.6px;
	}
}

h2 {
  font-weight: normal;
  font-size: 37px;
	line-height: 33.3px;
	color: $black-color;
  @include up($sm) {
    font-size: 64px;
    line-height: 70.6px;
  }
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
  background-color: transparent;

	position: relative;

  @include up($sm) {

    background-color: $grey-color;
    border-radius: 1000px;
  }
	@include transition();

	svg {
		stroke: $white-color;
		width: 26px;
		height: 20px;
		position: relative;
		top: -1px;
    @include up($sm) {
      stroke: $black-color;
    }
	}

	&:hover {
    background-color: transparent;
    opacity: 0.7;
    @include up($sm) {
      background-color: $taupe-color;
    }
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
