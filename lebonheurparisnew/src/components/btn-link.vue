<template>
	<router-link class="h5 px-7 text-center btn-link"
	   :to="to" :target="target">
		<slot name="default">
			{{label}}
		</slot>
	</router-link>
</template>

<script>
    export default {
        name: "btn-link",
        props: ["to", "label", "target", "color"]
    }
</script>

<style lang="scss">
	.btn-link {
		display: inline-block;
		box-sizing: border-box;
		height: 50px;
		line-height: 46px;
		border: 2px solid $primary-500;
		@include transition();

		&:hover, &:active {
			opacity: 1;
			background: $primary-500;
			color: $white !important;
		}

		&:disabled {
			border: 2px solid rgba(255, 255, 255, 0.16);
			color: rgba(255, 255, 255, 0.16);
		}
	}
</style>