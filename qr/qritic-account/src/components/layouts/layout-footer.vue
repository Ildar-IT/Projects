<template>
	<transition name="route" mode="out-in">
		<footer class="layout-footer">
			<!--            <div class="layout-footer__image"/>-->
			<div class="body-2 align-center mt-2 mb-6 text-center layout-footer__wrapper">
				<div class="d-flex flex-wrap justify-center align-center">
					<router-link :to="{ name: 'user-agreement' }" class=" " target="_blank">
						<div class="layout-footer__text">Соглашение</div>
					</router-link>
					<router-link :to="{ name: 'privacy' }" class=" " target="_blank">
						<span class="layout-footer__text"> Политика </span>
					</router-link>
					<router-link :to="{ name: 'pricing' }" class=" " target="_blank">
						<div class="layout-footer__text">Тарифы</div>
					</router-link>
					<router-link :to="{ name: 'subscription-rules' }" class=" " target="_blank">
						<div class="layout-footer__text">Оплата</div>
					</router-link>
					<router-link :to="{ name: 'bank-info' }" class=" " target="_blank">
						<div class="layout-footer__text">Реквизиты</div>
					</router-link>
				</div>
			</div>

			<div class="d-flex justify-space-between align-center layout-footer__text layout-footer__text-width">
				<div class="  text-start">
					Работает на <a href="https://qritic.ru/" class="layout-footer__text-primary">Qritic</a>

				</div>
				<div class="">
					<a href="https://atlgroup.ru/" class="" target="_blank">
                  <span class="layout-footer__text">
                    @{{ year }} {{ footerLink }}.
                  </span>
					</a>
				</div>
			</div>
		</footer>
	</transition>
</template>

<script>
    export default {
        name: "layout-footer",
        components: {},
        data: () => ({}),
        computed: {
            isWindowXS() {
                return this.$store.getters.isWindowXS;
            },
            year() {
                return new Date().getFullYear();
            },

            footerLink() {
                return this.$store.state.common?.texts?.FOOTER_COPYRIGHT;
            },
        },
    };
</script>

<style lang="scss">

	.layout-footer {
		position: relative;
		letter-spacing: 0 !important;
		margin: 20px auto 20px auto;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-direction: column;
		width: 100%;
		//height: calc((100vw - 64px) * 0.42);

		&__image {
			opacity: 0.4;
			max-width: 640px;
			background-color: #f1f2ff;
			background-image: url("../../assets/footer2.jpg");
			background-position: center bottom;
			background-blend-mode: multiply;
			background-size: contain;
			background-repeat: no-repeat;
			width: 100%;
			position: relative;
			height: 130px;
			top: 20px;
			@include up($sm) {
				height: 200px;
			}
		}

		// TODO wtf? исправить на up/down
		/*@media screen and (min-width: $lg) {
			//position: absolute;

			left: 50%;
			margin-left: -207px;
		}*/

		/*@include up($sm) {
			height: 174px;
		}*/

		&__wrapper {
			max-width: 400px;
			width: 100%;
		}

		&__text {
			font-size: 13px;
			line-height: 15px;
			color: $gray;
			padding: 0 8px;

			@include transition();
			z-index: 1;
			cursor: pointer;

			&:hover {
				color: $primary;
			}

			&-primary {
				color: $primary !important;
			}
		}

		&__text-width {
			max-width: 250px;
			width: 100%;
		}
	}
</style>