<template>
	<div class="add-field">
		<router-link to="/account/add-place">
			<div class="pa-8 pa-md-16">
				<div class="add-field__icon mx-auto d-flex justify-center align-center margin-bottom-main">
					<svgicon original name="plus" color="#fff" :fill="false" width="67" height="67"></svgicon>
				</div>
				<h5 class="beige-text text-center add-field__title"> {{pageContent.addPlace || 'Добавить место
					захоронения'}}</h5>
			</div>
		</router-link>
	</div>
</template>

<script>
    export default {
        computed: {
            pageContent() {
                return this.$store.state.page.PlaceListController.texts.content || {}
            },
        }
    }
</script>

<style lang="scss">
	.add-field {
		max-width: 360px;
		width: 100%;
		border-radius: $border-radius-primary;
		border: 2px dashed $beige5;
		background-color: $background;
		@include transition();
		@include up($md) {
			max-width: 460px;
		}

		&__title {
			font-size: 24px;
			line-height: 29px;
			@include transition();
		}

		&__icon {
			border-radius: 100%;
			background-color: $beige5;
			width: 100px;
			height: 100px;
			@include transition();
		}

		&:hover {
			border-color: $beige1;
			background-color: $beige8;
			opacity: .9;

			.add-field__icon {
				background-color: $beige2;
			}

			h5 {
				@include transition();
				color: $beige2;
			}
		}

	}
</style>
