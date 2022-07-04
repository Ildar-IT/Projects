<template>
	<section class="section--padding text-center contacts">
		<v-container>
			<h3>CONTACTS</h3>
			<div class="mt-4"><a href="tel:+33142605875">+33 1 42 60 58 75</a></div>
			<div class="mt-4"><a href="mailto:lamaison@lebonheurparis.com">lamaison@lebonheurparis.com</a></div>
			<div class="mt-4"><a href="mailto:oxana@lebonheurparis.com">oxana@lebonheurparis.com</a></div>

			<p class="limited mt-8 mx-auto">Let us know. <br>
				For collaboration, your special thoughts and orders…
			</p>
		</v-container>
	</section>
</template>

<script>
    export default {
        name: "contacts"
    }
</script>

<style lang="scss">
	.contacts {
		@include up($md) {
			padding: 130px 0;
		}

		h3 {
			margin-bottom:60px;
			@include up($md) {
				margin-bottom:90px;
			}
		}
		a {
			color: $black !important;
			font-family: $header-font-family;
			font-size: $fs-h5;
			line-height: $lh-h5;
			letter-spacing: $ls-h5;

			@include up($md) {
				font-size: $fs-h4;
				line-height: $lh-h4;
				letter-spacing: $ls-h4;
			}

			&:hover {
				color: $golden !important;
			}
		}
	}
</style>