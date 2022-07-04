<template>
	<div class="base-container">
		<svgicon v-if="isWindowSM" name="dandelion-cut" original color="#ECE3CF" class="base-container__bg"/>
		<svgicon v-else name="dandelion-cut-left" original color="#ECE3CF" class="base-container__bg"
				 width="192"/>
		<div class="base-container__content px-4">
			<h2 class="beige-text text-center mb-md-16 mb-8">{{ title }}</h2>
			<v-row class="mb-13">
				<v-col cols="12" class="base-container__col mx-auto">
					<slot></slot>
				</v-col>
			</v-row>
		</div>
	</div>
</template>

<script>
    export default {
        name: "base-container",
        props: ["title"],
        computed: {
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
            isWindowSM() {
                return this.$store.getters.isWindowSM;
            },
            isWindowXS() {
                return this.$store.getters.isWindowXS;
            },
        }
    }
</script>

<style lang="scss">
	.base-container {
		padding-top: 104px;
		@include up($lg) {
			padding-top: 164px;
		}

		&__bg {
			position: fixed;
			width: 100vw;
			z-index: 0;
			left: 0;
			bottom: 0;
		}

		&__content {
			position: relative;
			z-index: 1;
		}

		&__col {
			max-width: 845px;
		}
	}

</style>
