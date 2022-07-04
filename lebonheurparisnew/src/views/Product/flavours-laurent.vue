<template>
	<section class="flavours-laurent">
		<v-container>
			<v-row>
				<v-col cols="12" class="text-center">
					<p class="limited mx-auto size2">This set contains the following sweets</p>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" md="6" class="text-center pt-9">

					<div class="mx-auto flavours-laurent__box" :class="boxClass">

						<div v-for="(cell,index) of cells">
							<v-img v-if="items && items[index] && items[index].PREVIEW_PICTURE"
								   :src="items[index].PREVIEW_PICTURE"/>
							<svgicon v-else name="plus" :original="true"/>
						</div>
					</div>
				</v-col>
				<v-col cols="12" md="6">
					<flavour-list-mini :items="items" :with-swiper="false" class="mt-3"/>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script>
    import FlavourListMini from "@/components/flavour-list-mini";

    export default {
        name: "flavours-laurent",
        components: {
            FlavourListMini
        },
        props: ["item", "flavours"],
        data() {
            return {
                cells: null,
                amount: 0
            }
        },
        computed: {
            boxClass() {
                return "box" + this.item.BOX_SIZE;
            },
            items() {
                return this.flavours?.filter(el => this.item.FLAVOUR_IDS?.some(flavourId => flavourId === el.ID));
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
	.flavours-laurent {
		&__box {
			border: 7px solid $golden-light;
			max-width: 560px;
			max-height: 560px;
			min-width: 140px;
			min-height: 140px;
			display: flex;
			box-sizing: content-box;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;

			& > div {
				padding: 12px;
				box-sizing: border-box;
				border-right: 1px solid $golden-light;
				border-bottom: 1px solid $golden-light;
			}

			&.box2x1 {
				max-width: 280px;
				max-height: 140px;

				& > div {
					width: 50.0%;
					height: 100%;

					&:nth-child(2n) {
						border-right: none;
					}

					&:nth-last-child(-n+2) {
						border-bottom: none;
					}
				}
			}

			&.box2x3 {
				max-width: 280px;
				max-height: 420px;

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

			&.box3x3 > div {
				width: 33.333%;
				height: 33.333%;

				&:nth-child(3n) {
					border-right: none;
				}

				&:nth-last-child(-n+3) {
					border-bottom: none;
				}
			}

			svg {
				fill: none;
				//stroke: $golden;
				width: 100%;
				height: 100%;
			}
		}

	}

</style>