<template>
	<div class="product-flavours">
		<section class="section--page pb-5 mt-md-6">
			<v-container class="px-lg-16">
				<v-row>
					<v-col cols="12" md="2">
						<router-link :to="{name:'product',params:{code:item.CODE, sectionCode:sectionCode}}"><v-img :src="photo1(item)" class="mx-auto mx-md-0" :alt="item.NAME"/></router-link>
					</v-col>
					<v-col cols="12" md="6" class="text-center text-md-left pl-md-8">
						<router-link :to="{name:'product',params:{code:item.CODE, sectionCode:sectionCode}}"><h1 class="h3">{{item.NAME}}</h1></router-link>
						<div v-if="item.PREVIEW_TEXT" class="size1 color-golden mt-1">{{item.PREVIEW_TEXT}}</div>
						<div class="h3 color-black mt-4 d-md-none">{{item.PRICE | price(2)}} €</div>

						<div class="h3 color-black">{{item.PRICE | price(2)}} €</div>
					</v-col>
					<v-col cols="12" md="4">
						<div class="mt-12 d-flex d-flex justify-space-around justify-md-end product-flavours__sets">
							<span class="selected">
								<div class="product-flavours__set-image">
									<v-img src="@/assets/box/laurent.svg" alt="Laurent Moreno"/>
								</div>
								<div class="size2 mt-4 mt-md-0 ml-md-4">Set by Laurent<br/> Moreno</div>
							</span>

							<span class="ml-md-10">
								<div class="product-flavours__set-image">
									<v-img src="@/assets/box/your.svg" alt="Your choice"/>
								</div>
								<div class="size2 mt-4 mt-md-0 ml-md-4">Your<br class="d-none d-md-inline"/> choice
								</div>
							</span>
						</div>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" md="5" class="pt-9">

						<div class="mx-auto product-flavours__box" :class="boxClass">

							<div v-for="(cell,index) of cells">
								<v-img v-if="items && items[index] && items[index].PREVIEW_PICTURE"
									   :src="items[index].PREVIEW_PICTURE"/>
								<svgicon v-else name="plus" :original="true"/>
							</div>
						</div>
					</v-col>
					<v-col cols="12" md="7">
						<flavour-list-mini :items="flavours" compact class="mt-3"/>
					</v-col>
				</v-row>
			</v-container>
		</section>

		<section class="d-block d-md-none">
			<v-container>
				<v-row>
					<v-col cols="12" class="d-flex justify-center">
						<btn-primary class="large mx-auto" label="Add to cart"
									 click="false"/>
					</v-col>
				</v-row>
			</v-container>
		</section>

		<section class="section--image product-flavours__footer"/>
	</div>
</template>

<script>
    import BtnPrimary from "@/components/btn-primary";
    import FlavourListMini from "@/components/flavour-list-mini";
    import Divider from "@/components/divider";
    import {nf} from '@/utils/string';

    export default {
        name: "product-flavours",
        components: {
            BtnPrimary,
            FlavourListMini,
            Divider
        },
        props: ["code", "sectionCode", "type"],
        data() {
            return {
                cells: null,
                amount: 0
            }
        },
        computed: {
            item() {
                return this.$store.state.page.ProductController.item;
            },
            boxClass() {
                return "box" + this.item.BOX_SIZE;
            },
            items() {
                return this.flavours?.filter(el => this.item.FLAVOUR_IDS?.some(flavourId => flavourId === el.ID));
            },
            priceText() {
                return nf(this.item.PRICE, 2);
            },
            allFlavours() {
                return this.$store.state.page.ProductController.flavours;
            },
            flavours() {
                return this.allFlavours?.filter(el => this.item.FLAVOUR_IDS?.some(flavourId => flavourId === el.ID));
            }
        },
        methods: {
            photo1() {
                return this.item.PHOTOS[0];
            },
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
	.product-flavours {

		&__sets {
			max-width: 320px;
			margin-left: auto;
			margin-right: auto;

			@include up($md) {
				max-width: unset;
				margin-left: -7px;
				margin-right: unset;
			}

			a {
				display: flex;
				flex-direction: column;
				align-items: center;

				@include up($md) {
					flex-direction: row;
				}

				&:hover {
					.product__set-image {
						border-color: $golden;
					}
				}

				&.selected {
					.product__set-image {
						border-color: $golden;
					}
				}

				&:not(:hover):not(.selected) {
					color: $gray !important;
				}
			}
		}

		&__set {
			&-image {
				border: 2px solid transparent;
				border-radius: 50%;
				padding: 5px;
				width: 78px;
				height: 78px;
				@include transition();

				.v-image {
					width: 64px;
					height: 64px;
				}
			}

		}

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

		&__footer {
			margin-top: 75px;
			@include up($md) {
				margin-top: 140px;
			}
			//background-image: url("~@/assets/box/nuts.jpg");
			background-image: url("~@/assets/box/bg-lg.jpg");
		}
	}

</style>