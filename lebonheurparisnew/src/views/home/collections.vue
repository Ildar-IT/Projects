<template>
	<section class="section--padding text-center collections">
		<div v-for="(collection, index) of collectionsNonEmpty"
			 class="collections__item">
			<v-container>
				<h3>{{ collection.NAME }}</h3>
			</v-container>
			<v-container class="pt-0 px-0 px-md-5 mt-4 mt-md-12">
				<flavour-list :items="flavoursOfCollection(collection)" />
			</v-container>
		</div>
	</section>
</template>

<script>

    import FlavourList from "@/components/flavour-list";

    export default {
        name: "collections",
        props: ["collections", "flavours"],
        data() {
            return {}
        },
        components: {
            FlavourList
        },
        computed: {
            collectionsNonEmpty() {
                return this.collections?.filter(el => this.flavours?.some(fl => fl.IBLOCK_SECTION_ID === el.ID));
            }
        },
        methods: {
            flavoursOfCollection(collection) {
                return this.flavours?.filter(fl => fl.IBLOCK_SECTION_ID === collection.ID);
            }
        }
    }
</script>

<style lang="scss">
	.collections {

		&__item + .collections__item {
				margin-top: 12px;
			@include up($md) {
				margin-top: 48px;
			}
		}
	}
</style>