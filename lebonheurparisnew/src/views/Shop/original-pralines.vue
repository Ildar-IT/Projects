<template>
	<div class="original-pralines">
		<category-header :item="categories" class="d-none d-sm-block"/>
		<!--<PralinesHeader  v-if="isPralineHeader" class="d-none d-sm-block" />-->
		<div class="original-pralines__wrapper mx-auto">
			<Edition/>
			<Originaux/>
		</div>
	</div>
</template>

<script>
    import Edition from "./original-pralines/edition";
    import Originaux from "./original-pralines/originaux";
    import CategoryHeader from "@/views/Category/category-header";
    //import PralinesHeader from "../../layout/pralines-header";
    export default {
        name: "original-pralines",
        components: {
            CategoryHeader,
            Edition,
            Originaux,
        },
        props: {
            code: {
                default: null,
                type: String
            }
        },
        computed: {
            isPralineHeader() {
                return !this.$route.meta?.isPralineHeader;
            }
        }
    }
</script>

<style lang="scss">
	.original-pralines {
		margin-top: 128px;

		&__wrapper {

			@include up($lg) {
				max-width: 950px;
			}
		}
	}
</style>