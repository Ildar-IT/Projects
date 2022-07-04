<template>
	<footer class="the-footer text-center">
		<v-container>
			<divider/>
			<div class="d-flex flex-column align-center py-8">
				<div class="the-footer__payments">
					<img class="d-block" src="@/assets/the-footer/payments.png" alt="Payment">
				</div>
				<div class="d-flex justify-center align-center mt-8">
					<a href="#" class="mx-2"><img class="d-block" src="@/assets/the-footer/instagram.svg"
												  alt="Instagram"></a>
					<a href="#" class="mx-2"><img class="d-block" src="@/assets/the-footer/facebook.svg" alt="Facebook"></a>
				</div>

				<div class="size2 mt-8">
					© LE BONHEUR Paris, {{year}}.<br class="d-sm-none" /> All rights reserved.
				</div>

				<div class="d-flex justify-center mt-8">
					<a href="https://playnext.ru/" target="_blank"><img class="d-block" src="@/assets/the-footer/PlayNext.svg"
																		alt="PlayNext"></a>
				</div>
			</div>
		</v-container>
	</footer>
</template>

<script>
    import Divider from "../components/divider";

    export default {
        name: "the-footer",
        components: {Divider},
		computed: {
            year() {
                return new Date().getFullYear();
			}
		}
    }
</script>

<style lang="scss">
	.the-footer {
		&__payments {
			img {
				width: 150px;
				height: 24px;
			}
		}

		/*
				.container {
					height: 100%;
				}

				a, button {
					@include transition();

					&:hover {
						opacity: 0.5;
					}
				}

				&__wrapper {
					max-width: 236px;
					@include up($sm) {
						max-width: 245px;
						min-height: 32px;
					}
				}

				&__social {
					width: 64px;
				}*/
	}

</style>