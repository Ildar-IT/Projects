<template>
	<div class="margin-top-main padding-bottom-main d-flex flex-column text-center memory-places">
		<v-container>
			<h2 class="beige-text margin-bottom-main"> {{ cards && cards.length > 0 ? (pageContent.title ?
				pageContent.title : "Места захоронений" ): pageContent.welcomeTitile }}</h2>
			<p v-if="!cards || cards.length == 0" class="body-1 mb-12 mx-auto"> {{ pageContent.welcomeSubTitile || `Добавьте место
				захоронения и Вы всегда сможете быть в курсе того, как мы ухаживаем за могилой дорогого Вам
				человека.`}}</p>
			<div v-if="cards && cards.length" class="memory-places__cards">

				<v-row class="justify-center justify-md-space-around align-stretch">
					<v-col v-for="(card, index) in cards" :key="card.index" cols="12" sm="8" md="12"
						   class="memory-place-cards__item pb-8 pb-md-0 d-flex flex-wrap">
						<memory-place-card :place="card" class="mx-auto"/>

					</v-col>
					<v-col cols="12" sm="8" md="12">
						<add-field  class="mx-auto"/>
					</v-col>
				</v-row>
			</div>
			<add-field v-else class="mx-auto"/>
		</v-container>
	</div>
</template>

<script>
    import addField from '@/components/elements/account-elements/add-field'
    //import memoryPlaceCards from '@/components/elements/account-elements/memory-place-cards'
    import memoryPlaceCard from '@/components/elements/account-elements/memory-place-card'

    export default {
        name: 'memory-places',
        components: {addField, memoryPlaceCard},
        methods: {},
        computed: {
            page() {
                return this.$store.state.page.PlaceListController;
            },
            pageContent() {
                return this.$store.state.page.PlaceListController.texts.content || {}
            },
            cards() {
                return this.$store.state.page.PlaceListController.items;
            },

        }
    }
</script>

<style lang="scss">
	.memory-places {
		position: relative;
		z-index: 1;
		//padding-bottom: 0;
		@include up($sm) {
			padding-bottom: 30px;
		}
		@include up($md) {
			padding-bottom: 60px;
		}

		p {
			max-width: 640px;
		}

		/*h4 {
			margin-bottom: 32px;
			@include up($lg) {
				margin-bottom: 127px;
			}
		}*/

/*
		.memory-place-card:last-child {
			margin-top: -8px;
			@include up($md) {
				margin-top: 0;
			}
		}
*/

	}


</style>
