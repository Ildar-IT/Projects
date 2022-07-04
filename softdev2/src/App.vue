<template>
	<v-app >
		<transition name="route" mode="out-in">
			<router-view/>
		</transition>
	</v-app>
</template>

<script>

    export default {
        name: 'App',

        data: () => ({
            //
        }),

    };
</script>

<style lang="scss">

	/** Глобальные стили **/
	/**
	Кнопки:
	arrow-link-white.vue – белая со стрелкой
	btn-link.vue – прозрачная со стрелкой
	secondary-link.vue – прозрачная с белым ховером
	primary-link-blue.vue – cиняя со стрелкой

	Класс .no-arrow – чтобы убрать стрелку

	// **/

	#app {
		min-width: 320px;
	}

	.v-application {
		font-family: $primary-font-family !important;
		line-height: inherit;

		& ul {
			padding: 0;
		}

		& a {
			color: unset;
		}

		& p {
			margin-bottom: 20px;
		}
	}

	.container {
		max-width: 1720px !important;
		padding: 0 24px !important;
		width: 100% !important;
		@include up($sm) {
			padding: 0 30px !important;
		}


	}

	body {
		overflow: hidden;
		font-family: $secondary-font-family;
		font-style: normal;
		font-weight: 400;
		font-size: 13px;
		line-height: 150%;
		@include up($sm) {
			font-size: 15px;
		}
		@include up($lg) {
			font-size: 20px;
		}
	}


	figure {
		box-sizing: border-box !important;
	}

	h1,
	h2,
	h3 {
		font-weight: inherit;
	}


	h1 {
		font-family: $primary-font-family;
		font-weight: 700;
		font-size: 32px;
		line-height: 120%;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: $primary-1;

		@include up($sm) {
			font-size: 40px;
			line-height: 110%;
		}
		@include up($md) {
			font-size: 60px;
			line-height: 110%;
		}
		@include up($lg) {
			font-size: 80px;
		}
	}

	h2 {
		font-family: $primary-font-family;
		font-weight: 700;
		font-size: 32px;
		line-height: 110%;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		background: $h2-bg-gradient;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-fill-color: transparent;
		margin-bottom: 32px;
		@include up($sm) {
			font-size: 40px;
			line-height: 110%;
			margin-bottom: 40px;
		}
		@include up($md) {
			font-size: 60px;
			line-height: 130%;
		}

	}

	h3 {
		font-family: $primary-font-family;
		font-weight: 700;
		font-size: 20px;
		line-height: 130%;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		color: $primary-1;
		@include up($sm) {
			font-size: 24px;
		}
		@include up($md) {
			font-size: 35px;
		}
	}

	h4 {
		font-family: $primary-font-family;
		font-weight: 400;
		font-size: 18px;
		line-height: 130%;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		color: $dark-grey;
		@include up($md) {
			font-size: 30px;
		}
	}

	.h2 {
		font-family: $primary-font-family;
		font-weight: 700;
		font-size: 32px;
		line-height: 110%;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		background: $h2-bg-gradient;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-fill-color: transparent;
		margin-bottom: 32px;
		@include up($sm) {
			font-size: 40px;
			line-height: 110%;
			margin-bottom: 40px;
		}
		@include up($md) {
			font-size: 60px;
			line-height: 82px;
		}
	}

	.head-s2 {
		font-family: $primary-font-family;
		font-style: normal;
		font-weight: 700;
		font-size: 24px;
		line-height: 33px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		margin-bottom: 32px;
		@include up($sm) {
			font-size: 35px;
			line-height: 48px;
			margin-bottom: 40px;
		}

	}

	p {
		font-family: $secondary-font-family;
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 150%;
		//color: $primary-2;
		@include up($md) {
			font-size: 20px;
		}
	}

	.p {
		font-family: $secondary-font-family;
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 150%;
		//color: $primary-2;
		@include up($md) {
			font-size: 20px;
		}
	}

  .content {
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 15px;

      &::before {
        content: "";
        display: block;
        top: 13px;
        transform: translateY(-50%);
        left: 0;
        position: absolute;
        width: 10px;
        height: 10px;
        background: $secondary-1;
      }
    }
  }


	.interaction {
		font-size: 14px;
		line-height: 140%;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		color: $dark-grey !important;

		a {
			color: $dark-grey !important;
		}

		@include up($sm) {
			font-size: 16px;
		}
	}

	.hint {
		font-family: $secondary-font-family;
		font-weight: 400;
		font-size: 13px;
		line-height: 150%;
		text-align: center;
		color: $dark-grey;
	}

	.body-lg-desk {
		font-family: $secondary-font-family;
		font-weight: 400;
		font-size: 20px;
		line-height: 150%;
		color: $primary-1 !important;
	}

	button {
		@include transition();
	}

	a {
		text-decoration: none;
		@include transition();
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	li {
		//@include transition();
		font-family: $secondary-font-family;
		font-style: normal;
		font-size: 16px;
		font-weight: 400;
		line-height: 150%;

		@include up($md) {
			font-size: 20px;
		}

	}

	section {
		z-index: 1;
	}

	select {
		text-transform: unset;
		color: inherit;
	}

	// todo плохое решение, надо писать кастомные классы
	.row {
		margin: 0 !important;
		box-sizing: border-box !important;
	}

	// todo плохое решение, надо писать кастомные классы
	.col-xl, .col-xl-auto, .col-xl-12, .col-xl-11, .col-xl-10, .col-xl-9, .col-xl-8, .col-xl-7, .col-xl-6, .col-xl-5, .col-xl-4, .col-xl-3, .col-xl-2, .col-xl-1, .col-lg, .col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8, .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-md, .col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7, .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-sm, .col-sm-auto, .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5, .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col, .col-auto, .col-12, .col-11, .col-10, .col-9, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-2, .col-1 {
		padding: 0 0 !important;
		box-sizing: border-box !important;
		@include up($sm) {
			padding: 0 12px !important;
		}
		@include up($sm) {
			padding: 0 16px !important;
		}
		@include up($lg) {
			padding: 0 24px !important;
		}
	}

	details,
	select {
		cursor: pointer;
	}


	input, textarea {
		width: 100%;
		height: 50px;
		border: 1px solid $dark-grey2;

		padding: 5px 5px 5px 8px;
		margin-bottom: 32px;
		@include up($sm) {
			padding: 5px 5px 5px 15px;
		}
		@include up($md) {
			height: 70px;
			margin-bottom: 40px;
		}
		@include up($lg) {
			margin-bottom: 50px;
		}

		&::placeholder {
			font-size: 14px;
			line-height: 140%;
			letter-spacing: 0.03em;
			text-transform: uppercase;
			color: $mid-grey;
			@include up($sm) {
				font-size: 16px;
			}
			@include up($md) {
				font-size: 15px;
			}
		}

		&:hover {
			border: 1px solid $mid-grey;
		}

		&:active {
			border: 1px solid $primary-2;
		}

		&:focus {
			border: 1px solid $primary-2 !important;
			outline: none;
		}

		&.error {
			border: 1px solid $mid-grey;
		}
	}

	label {
		@include up($sm) {
			width: 50%;

		}

		&:not(:last-child) {
			@include up($sm) {
				margin-right: 24px;
			}
			@include up($md) {
				margin-right: 30px;
			}
		}
	}

	textarea {
		height: 80px;
		margin-bottom: 16px;
		resize: none;
		@include up($sm) {
			margin-bottom: 20px;
			height: 100px;
			padding: 15px 5px 5px 15px;
		}
		@include up($md) {
			height: 135px;
			margin-bottom: 32px;
		}
		@include up($lg) {

			margin-bottom: 50px;
		}
	}

	.button-on-white {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 5px 20px !important;
		width: 184px;
		height: 50px;
		border: 1px solid $primary-1 !important;
		box-sizing: border-box;
	}

	.logo {
		width: 95px;
		height: 34px;
		@include up($md) {
			width: 118px;
			height: 41px;
		}

		& svg {
			@include up($md) {
				width: 118px;
				height: 41px;
			}
		}

	}

	/*transition*/
	.route-enter-active, .route-leave-active {
		transition: opacity .3s
	}
	.route-enter, .route-leave-to {
		opacity: 0;
	}

	.route-slow-enter-active, .route-slow-leave-active {
		transition: opacity .5s
	}
	.route-slow-enter, .route-slow-leave-to {
		opacity: 0;
	}

	.cloud {
		position: absolute;
		//filter: contrast(1.5);
		@include up($sm) {
			width: 160px;
			height: 85px;
		}
		@include up($md) {
			width: 225px;
			height: 120px;
		}
	}

	.no-arrow {
		svg {
			display: none;
		}
	}

</style>
