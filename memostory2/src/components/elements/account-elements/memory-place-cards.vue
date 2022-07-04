<template>
	<div class="memory-place-cards">
		<v-row class="justify-center justify-md-space-around align-center align-sm-stretch">
			<v-col v-for="(card, index) in cards" :key="card.index" xs="12" sm="6" md="12"
				   class="memory-place-cards__item pb-8 pb-md-0 d-flex flex-wrap">
				<memory-place-card :place="card" class="mx-auto"/>

			</v-col>
		</v-row>
		<!--Начало карточки-->
	</div>
</template>

<script>
    import memoryPlaceCard from './memory-place-card'

    export default {
        name: 'memory-place-cards',
        components: {memoryPlaceCard},
        data() {
            return {}
        },
        computed: {
            common() {
                // return this.$store.state.common;
            },
            page() {
                return this.$store.state.page.PlaceListController;
            },
            cards() {
                return this.$store.state.page.PlaceListController.items;
            },
        },
    }
</script>

<style lang="scss">
	.memory-place-cards {
		position: relative;
		/*@include up($lg) {
			.memory-place-card:nth-child(odd) {
				margin-right: 16px;
			}
		}*/
	}
</style>