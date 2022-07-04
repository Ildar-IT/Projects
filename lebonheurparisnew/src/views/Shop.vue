<template>
	<div class="page--padding shop">
		<section class="section--page"><category-list :items="categories"/></section>
		<section class="section--image shop__bg" />
	</div>
</template>

<script>
    import CategoryList from "../components/category-list";

    export default {
        name: "Shop",
        components: {
            CategoryList,
        },
        data() {
            return {
            }
        },
		computed: {
            categories() {
                return this.$store.state.common.sections;
			}
		}
    }
</script>

<style lang="scss">
	.shop {
		&__bg {
			background-image: url("~@/assets/Shop/shop-img.jpeg");
		}
	}
</style>