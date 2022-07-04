<template>
	<div class="product" :class="{custom:isCustomizing}">
		<section class="section--page pb-5 mt-md-6">
			<v-container>
				<v-row class="align-md-center justify-space-between">
					<v-col cols="12" :md="colsImage" class="transition">
						<div class="mx-auto product__image">
							<router-link v-if="photo1(item)" :to="{}" class="hover"/>
							<v-img :src="photo0(item)" class="" :class="{closed:photo1(item)}" :alt="item.NAME"/>
							<v-img v-if="photo1(item)" :src="photo1(item)" class="mx-auto open"
								   :alt="item.NAME"/>
						</div>
					</v-col>
					<v-col cols="12" :md="colsText" class="text-center text-md-left pl-md-8 transition">
						<h1 class="h3">{{item.NAME}}</h1>
						<div v-if="item.PREVIEW_TEXT" class="size1 color-golden mt-1">{{item.PREVIEW_TEXT}}</div>
						<div class="h3 color-black mt-4 d-md-none">{{item.PRICE | price(2)}} €</div>

						<div v-if="withContent"
							 class="mt-12 d-flex d-flex justify-space-around justify-md-start product__sets">
							<!--:to="{name:'product-flavours', params:{code:item.CODE, sectionCode:sectionCode, type:'laurent'}}"-->
							<router-link :to="{}"
										 @click.native.prevent="onCustomize(false)"
									:class="{selected:!isCustomizing}">
								<div class="product__set-image">
									<v-img src="@/assets/box/laurent.svg" alt="Laurent Moreno"/>
								</div>
								<div class="size2 mt-4 mt-md-0 ml-md-4">Set by Laurent<br/> Moreno</div>
							</router-link>

							<!--:to="{name:'product-flavours', params:{code:item.CODE, sectionCode:sectionCode, type:'custom'}}"-->
							<router-link :to="{}"
										 @click.native.prevent="onCustomize(true)"
										 class="ml-md-10" :class="{selected:isCustomizing}">
								<div class="product__set-image">
									<v-img src="@/assets/box/your.svg" alt="Your choice"/>
								</div>
								<div class="size2 mt-4 mt-md-0 ml-md-4">Your<br class="d-none d-md-inline"/> choice
								</div>
							</router-link>
						</div>

						<transition name="fade">
							<div class="product__price">
								<divider class="d-none d-md-block mt-8"/>

								<div class="d-none d-md-flex mt-12 mt-md-8 align-center">
									<btn-primary class="large d-md-none" :label="'Add to cart '+priceText+' €'"/>
									<btn-primary class="large d-none d-md-inline" label="Add box to cart"/>

									<div class="h3 color-black d-md-inline ml-md-16">{{item.PRICE | price(2)}} €
									</div>
								</div>
							</div>
						</transition>
					</v-col>
				</v-row>
			</v-container>
		</section>


		<section v-if="withContent" id="product-content">
			<v-container>
				<transition name="fade" mode="out-in">
					<flavours-custom v-if="isCustomizing" :item="item" :flavours="allFlavours" :collections="collections"/>
					<v-row v-else>
						<v-col cols="12">
							<!--<flavours-laurent :item="item" :flavours="allFlavours" />-->
							<p class="limited text-center mx-auto size2 mb-10">This set contains the following sweets</p>
							<flavour-list-mini :items="flavours" class="mt-3"/>
						</v-col>
					</v-row>
				</transition>
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

		<section class="section--image product__footer"/>
	</div>
</template>

<script>
    import CategoryHeader from "@/views/Category/category-header";
    import Divider from "@/components/divider";
    import BtnPrimary from "@/components/btn-primary";
    //import FlavoursLaurent from "@/views/Product/flavours-laurent";
    import FlavoursCustom from "@/views/Product/flavours-custom";
    import FlavourListMini from "@/components/flavour-list-mini";
    import {nf} from '@/utils/string';
    import {scrollTo} from '@/utils/utils';

    export default {
        name: "product-list",
        components: {
            CategoryHeader,
            Divider,
            BtnPrimary,
            //FlavoursLaurent,
            FlavoursCustom,
            FlavourListMini
        },
        props: ["code", "sectionCode"],
        data() {
            return {
                colsImage: 6,
                colsText: 6,
                isCustomizing: false,
            }
        },
        computed: {
            categories() {
                return this.$store.state.common.sections;
            },
            item() {
                return this.$store.state.page.ProductController.item;
            },
            priceText() {
                return nf(this.item.PRICE, 2);
            },
            withContent() {
                return this.item.BOX_SIZE && this.item.FLAVOUR_IDS;
            },
            collections() {
                return this.$store.state.page.ProductController.collections;
            },
			allFlavours() {
                return this.$store.state.page.ProductController.flavours;
            },
            flavours() {
                return this.allFlavours?.filter(el => this.item.FLAVOUR_IDS?.some(flavourId => flavourId === el.ID));
            }
        },
        methods: {
            onCustomize(isCustomizing) {
                /*if (this.isCustomizing) {
                    this.colsImage = 6;
                    this.colsText = 6;
                } else {
                    this.colsImage = 4;
                    this.colsText = 4;
                }*/
                this.isCustomizing = isCustomizing;

                if (this.isCustomizing) scrollTo("product-content", -180);
            },
            photo0() {
				if ( this.item.PHOTOS && this.item.PHOTOS[0] ) return this.item.PHOTOS[0];
                return this.item.DETAIL_PICTURE;
            },
            photo1() {
                //if ( this.item.DETAIL_PICTURE ) return null;
                return this.item.PHOTOS && this.item.PHOTOS[1];
            },
        }
    }
</script>

<style lang="scss">
	.product {
		&__main {
			height: 500px;
		}

		&__image {
			position: relative;
			width: 125px;
			height: 125px;
			@include transition();
			@include up($md) {
				width: 380px;
				height: 380px;
			}

			.hover {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 2;
				width: 100%;
				height: 100%;
				//background: rgba(0,0,0,0.2);
				cursor: pointer;

				&:hover ~ .open {
					opacity: 1;
				}

				&:hover ~ .closed {
					opacity: 0;
				}
			}

			.v-image {

				//mix-blend-mode: multiply;
				//background-blend-mode: exclusion;
				filter: brightness(1.01); // contrast(1.02);	// для исчезновения в jpg серого фона
				@include transition();

				&.open {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 1;
					opacity: 0;
				}
			}
		}

		/*&.custom {
			.product__image {
				@include up($md) {
					width: 125px;
					height: 125px;
				}
			}
		}*/

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

		/*.flavours-laurent {
			padding: 0 0 60px;
		}
*/
		&__footer {
			margin-top: 75px;
			@include up($md) {
				margin-top: 140px;
			}
			//background-image: url("~@/assets/box/nuts.jpg");
			background-image: url("~@/assets/box/bg-lg.jpg");

			// пауза для появления после загрузки продукта
			// todo добавить @loaded на картинку продукта
			animation: animFooterImage 300ms forwards;
			animation-delay: 750ms;
			opacity: 0;
			//transform-origin: right 40px;
		}

		@keyframes animFooterImage {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
			}
		}
	}
</style>