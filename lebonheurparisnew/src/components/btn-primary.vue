<template>
	<button class="btn-primary" @click="$emit('click')">
		{{label}}
	</button>
</template>

<script>
    export default {
        name: "btn-primary",
        props: ["label"],
    }

</script>

<style lang="scss">
	.btn-primary {
		display: inline-block;
		height: 32px;
		border: 2px solid $primary-500;
		color: $primary-500;
		font-family: $header-font-family;
		font-size: $fs-h6;
		line-height: $lh-h6;
		letter-spacing: $ls-h6;
		text-transform: uppercase;
		box-sizing: border-box;
		padding: 0 24px;

		@include transition();

		&:hover,&:active {
			border-color: transparent;
			background: $primary-500;
			color: $white;
		}

		&:disabled {
			border: 2px solid $black-50;
			background: transparent;
			color: $black-50;
		}

		&.large {
			height: 50px;
			font-size: $fs-h5;
			line-height: $lh-h5;
			letter-spacing: $ls-h5;
		}
		&.block {
			display: block;
		}
	}


</style>