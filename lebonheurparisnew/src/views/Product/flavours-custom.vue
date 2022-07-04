<template>
	<div class="flavours-custom">
		<v-row>
			<v-col cols="12">
				<p class="limited text-center mx-auto size2 mb-10">Choose your flavours. Click over or drag a praline to
					the box on the left to create your set.</p>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" md="6" class="text-center">
				<div class="mx-auto flavours-custom__box" :class="boxClass">
					<div v-for="(index) in amount">
						<transition name="fade-quick" mode="out-in">
							<v-img v-if="cells[index-1]"
								   :src="cells[index-1].PREVIEW_PICTURE" @click="onBoxItemClick(index)"/>
							<svgicon v-else name="plus" :original="true"/>
						</transition>
					</div>
				</div>
			</v-col>
			<v-col cols="12" md="6">
				<ul class="h5 flavours-custom__collections" :class="{h6:!isWindowLG}">
					<li v-for="(collection,index) of collections" :key="'col'+index"
						@click="collectionIndex=index"
						:class="{active:collectionIndex===index}">{{collection.NAME}}
					</li>
				</ul>
				<flavour-list-mini :items="items" compact class="mt-8 mt-lg-10" @loaded="onListLoaded"
								   @click="onItemClick"/>
			</v-col>
		</v-row>
	</div>
</template>

<script>
    import FlavourListMini from "@/components/flavour-list-mini";

    export default {
        name: "flavours-custom",
        components: {
            FlavourListMini
        },
        props: ["item", "flavours", "collections"],
        data() {
            return {
                cells: null,
                amount: 0,
                collectionIndex: 0
            }
        },
        computed: {
            boxClass() {
                return "box" + this.item.BOX_SIZE;
            },
            items() {
                // только вкусы из соотв. секции
                //const category = this.category;
                //return this.flavours?.filter(el => category.UF_FLAVOUR_SECTION_IDS?.some(id => Number(id) === Number(el.IBLOCK_SECTION_ID)));
                //console.log("Collection index: "+this.collections[this.collectionIndex].NAME);
                return this.flavours?.filter(el => el.IBLOCK_SECTION_ID === this.collections[this.collectionIndex].ID);
            },
            category() {
                return this.$store.state.common.sections.find(el => el.ID === this.item?.IBLOCK_SECTION_ID);
            },
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            }
        },
        methods: {
            onListLoaded() {
                console.log("All loaded");
            },
            onItemClick(item) {
                const emptyCellIndex = this.cells.findIndex(el => !el);
                if (emptyCellIndex === -1) return;
                this.cells.splice(emptyCellIndex, 1, item);
            },
            onBoxItemClick(index) {
                //index is 1-based
                let i = index - 1;
                this.cells.splice(i, 1, null);
            }
        },
        mounted() {
            const xy = this.item.BOX_SIZE.split("x");
            this.amount = Number(xy[0]) * Number(xy[1]);
            this.cells = new Array(this.amount).fill(null);

            /*console.log("Flavour IDs in this product: ", this.item.FLAVOUR_IDS);
            console.log("Flavours in this product: ", this.items);
            console.log("Available flavours: ", this.flavours);*/
        }
    }
</script>

<style lang="scss">
	.flavours-custom {
		&__box {
			border: 7px solid $golden-light;
			max-width: 380px;
			max-height: 380px;
			min-width: 140px;
			min-height: 140px;
			display: flex;
			box-sizing: border-box;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;

			svg {
				opacity: 0.6;
				/*stroke: $golden-light;
				rect {
					fill: $golden-light;
				}*/
			}

			& > div {
				padding: 12px;
				box-sizing: border-box;
				border-right: 1px solid $golden-light;
				border-bottom: 1px solid $golden-light;
				cursor: pointer;
				@include transition();

				&:hover {
					opacity: 0.8;
				}
			}

			&.box2x1 {
				width: 380px;
				height: 190px;

				& > div {
					width: 50%;
					height: 100%;

					&:nth-child(2n) {
						border-right: none;
					}

					&:nth-last-child(-n+2) {
						border-bottom: none;
					}
				}
			}

			&.box2x2 {
				width: 380px;
				height: 380px;

				& > div {
					width: 50%;
					height: 50%;

					&:nth-child(2n) {
						border-right: none;
					}

					&:nth-last-child(-n+2) {
						border-bottom: none;
					}
				}
			}


			&.box2x3 {
				width: 280px;
				height: 420px;

				& > div {
					width: 50.0%;
					height: 33.333%;

					&:nth-child(2n) {
						border-right: none;
					}

					&:nth-last-child(-n+2) {
						border-bottom: none;
					}
				}
			}

			&.box3x3 {
				width: 420px;
				height: 420px;
				& > div {
					width: 33.333%;
					height: 33.333%;

					&:nth-child(3n) {
						border-right: none;
					}

					&:nth-last-child(-n+3) {
						border-bottom: none;
					}
				}
			}

			svg {
				fill: none;
				//stroke: $golden;
				width: 100%;
				height: 100%;
			}
		}

		&__collections {
			margin: 30px 0 0 0 !important;;
			padding: 0 !important;
			list-style: none;
			display: flex;
			justify-content: center;
			border-bottom: 1px solid $golden-light;

			@include up($md) {
				margin-top: 0 !important;
				justify-content: flex-start;
			}

			li {
				margin: 0;
				padding: 12px 20px 12px 20px;
				cursor: pointer;
				color: $black;
				border: 1px solid transparent;
				border-radius: 3px;
				position: relative;
				top: 2px;
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				@include transition();

				@include up($sm) {
					flex: unset;
				}

				&:not(.active):hover {
					opacity: 0.6;
					color: $golden;
				}

				&.active {
					color: $golden;
					border: 1px solid $golden-light;
					border-bottom-color: transparent;
					background: $white;
				}

				& + li {
					margin-left: 4px;
				}
			}
		}
	}

</style>