<template>
	<span class="border"></span>
</template>

<script>
    export default {
        name: "border",

    }
</script>

<style lang="scss">
	.border {
		position: absolute !important;
		z-index: 2;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border: 2px solid $primary-500;
		box-sizing: border-box;

		/*@keyframes borderLeft {
			from {
				left: -16px;
				top: -16px;
			}
			50% {
				left: 16px;
				top: 16px;
			}
			to {
				left: -16px;
				top: -16px;
			}
		}*/


		/*&.right {
			animation: borderLeft 2s reverse;

			right: -16px;
			bottom: -16px;
			@include up($sm) {
				animation: none;
				transition: all 1.2s;
				right: -24px;
				bottom: -24px;
			}
			@include up($lg) {
				right: -16px;
				bottom: -16px;
			}

			&__no-animation {
				right: -16px;
				bottom: -16px;
				@include up($sm) {
					right: -24px;
					bottom: -24px;
				}
				@include up($lg) {
					right: -16px;
					bottom: -16px;
				}
			}
		}*/
	}
</style>