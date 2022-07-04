<template>
	<div class="layout-main">
		<layout-header/>
		<main>
			<transition name="route" mode="out-in">
				<router-view />
			</transition>
		</main>
		<layout-footer/>
	</div>
</template>

<script>
    import LayoutHeader from "./layout-header";
    import LayoutFooter from "./layout-footer";

    export default {
        name: "layout-main",
        components: {
            LayoutHeader,
            LayoutFooter
        },
    }
</script>


<style lang="scss">
	.layout-main {
		width: 100%;
		max-width: $layout-width;
		padding-top: $layout-margin-xs;
		padding-bottom: 16px;
		padding-right: $layout-margin-xs;
		padding-left: $layout-margin-xs;
		margin-right: auto;
		margin-left: auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/*min-height: calc(100vh - 48px);*/
		min-height: calc(var(--vh, 1vh) * 100);
		@include up($lg) {
			padding-top: $layout-margin-lg;
			margin-right: auto;
			margin-left: auto;
		}
	}

</style>