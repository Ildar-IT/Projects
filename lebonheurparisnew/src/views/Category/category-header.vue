<template>
	<div class="d-none d-md-flex justify-center category-header">
		<div class="d-flex align-center category-header__items">
			<template v-for="(item,index) of items">
				<router-link :to="{name:'category',params:{code:item.CODE}}" class="size2">{{item.NAME}}</router-link>
				<span v-if="index+1<items.length" class="category-header__dot"></span>
			</template>
		</div>
	</div>
</template>

<script>
    export default {
        name: "category-header",
		props: ["items"],
    }
</script>

<style lang="scss">
	.category-header {
		//width: 512px;

		position: fixed;
		z-index: 5;	// должен быть выше анимации
		left: 0;
		right: 0;
		margin: 0 auto;
		background: $header-white;

		&__items {
			padding-bottom: 14px;
			border-bottom: 1px solid $primary-100;

			a:not(.router-link-active) {
				color: $black !important;

				//font-weight: 300;
			}
		}

		&__dot {
			display: inline-block;
			width: 3px;
			height: 3px;
			border-radius: 100%;
			background: $black-50;
			margin: 0 12px;
		}
	}
</style>