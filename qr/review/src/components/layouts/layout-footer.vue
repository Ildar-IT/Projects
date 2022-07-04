<template>
	<footer class="layout-footer">
		<div class="layout-footer__image"/>
		<div class="body-2 mt-4 text-center gray-text">
			Работает на

			<a class="layout-footer__link__primary"
			   href="https://qr-feedback.ru"
			   target="_blank">
				QR-Feedback.
			</a>

			<a class="layout-footer__link"
			   href="https://qr-feedback.ru/policy"
			   target="_blank">
				Политика.
			</a>
		</div>
	</footer>
</template>

<script>
	export default {
		name: "layout-footer",
		components: {},
		data: () => ({}),
		computed: {},
		methods: {},
	}
</script>

<style lang="scss">
	#review-app {
		.layout-footer {
			padding-top: 32px;
			max-width: 415px;
			width: 100%;
			margin-left: auto;
			margin-right: auto;
			display: flex;
			justify-content: center;
			flex-direction: column;

			&__image {
				background-image: url("../../assets/footer.jpg");
				height: 0;
				padding-top: 42%;
				background-size: contain;
				width: 100%;
			}

			&__link {
        color: $gray;
        &__primary {
            color: $primary;
          }
			}
		}
	}
</style>