<template>
	<div class="page--padding layout-category">
		<category-header :items="categories"/>

		<!--<transition name="route" mode="out-in">-->
		<div class="layout-category__transition" :class="routeClass">
			<router-view :key="$route.path"/>
		</div>
		<!--</transition>-->
	</div>
</template>

<script>

    import CategoryHeader from "@/views/Category/category-header";

    export default {
        name: "layout-category",
        components: {
            CategoryHeader,
        },
        computed: {
            categories() {
                return this.$store.state.common.sections;
            },
            routeClass() {
                return this.$store.state.isLoading ? "loading" : null;
			}
        }
    }
</script>

<style lang="scss">
	.layout-category {

		&__transition {

			@include transition();
			opacity: 1;

			&.loading {
				opacity: 0;
			}
		}

	}
</style>