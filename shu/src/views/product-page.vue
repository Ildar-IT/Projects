<template>
    <section class="product-page text-center">
        <v-container>
            <div class="product-page__card pt-8 mb-16">
                <h2 class="mb-8 d-md-none">{{ item.NAME }}</h2>
                <v-row class="flex-column flex-md-row">
                    <v-col>
                        <div class="product-page__main mr-md-16">
                            <div :class="item.IS_NEW ? 'product__main-image--before' : ''"
                                 class="product-page__image mb-8">
                                <div v-if="item.IS_NEW" class="product-page__badge">
                                    <span>{{texts.PRODUCT_NEBIE}}</span>
                                </div>

                                <div>
                                    <img v-if="imageUrl" :src="imageUrl" :alt="item.NAME"
                                         key="i1" width="100%" class="mb-4">
                                </div>

                                <ul v-if="offer && offer.PHOTOS && offer.PHOTOS.length > 1" class="product-page__items d-flex justify-center">
                                    <li v-for="(photoUrl, index) of offer.PHOTOS" :key="index" class="product-page__item">
                                        <button @click="onOfferPhotoClick(index)">
                                            <img :src="photoUrl"
                                                 :alt="offer.NAME" width="100%">
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="product-page__inner text-md-left">
                            <h2 class="mb-8 d-none d-md-block">{{ item.NAME }}</h2>
                            <div v-if="offer.WEIGHT" class="product-page__weight mb-8">
                                <div class="d-inline-block product-page__weight-btn">{{ offer.WEIGHT }}</div>
                            </div>

                            <div v-if="item.offers && item.offers.length">
                                <p class="product-page__color-name mb-4">{{ offer.COLOR }}</p>


                                <div class="product__colors ma-auto mb-8 d-inline-block">
                                    <div class="d-flex align-center justify-center flex-wrap">
                                        <button v-for="(offer, index) of item.offers" :key="index" :title="offer.NAME"
                                                @click="onOfferClick(offer, index)"
                                                class="product__color"
                                        >
                                            <div :style="hexStyle(offer)"/>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="product-page__about text-left">
                                <details open>
                                    <summary>{{ texts.PRODUCT_ABOUT }}</summary>
                                    <p>
                                        {{ detailText }}
                                    </p>
                                </details>
                                <details>
                                    <summary>{{ texts.PRODUCT_INGREDIENTS }}</summary>
                                    <p>
                                        {{ composition.text }}
                                    </p>
                                </details>
                                <details>
                                    <summary>{{ texts.PRODUCT_USAGE }}</summary>
                                    <p>
                                        {{ usage.text }}
                                    </p>
                                </details>
                                <details>
                                    <summary>
                                        <router-link :to="{name: 'Shops'}">
                                        {{ texts.PRODUCT_BUY }}
                                        </router-link>
                                    </summary>

                                </details>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </div>

            <section v-if="relatedProducts && relatedProducts.length"
                     class="product-page__recomendations text-center mb-16 pt-8">
                <h2 class="mb-8">{{ texts.PRODUCT_RECOMMEND }}</h2>
                <swiper ref="swiper" :options="swiperOption" @slideChange="onSlideChange"
                        class="product-page__slider mb-8 d-xl-none">
                    <swiper-slide v-for="(item, index) of relatedProducts" :key="index" class="product-page__slide">
                        <product :item="item"/>
                    </swiper-slide>
                </swiper>

                <v-row class="d-none d-xl-flex mb-8">
                    <v-col v-for="(item, index) of displayedProducts" :key="index" cols="12" md="4" xl="3">
                        <product :item="item"/>
                    </v-col>
                </v-row>

                <div class="product-page__dots d-flex justify-center align-center d-xl-none">
                    <slot name="pagination">
                        <span></span>
                    </slot>
                </div>

                <btn-blue v-if="relatedProducts.length > maxItems && !withAllItems" @click="withAllItems = true" class="d-none d-xl-inline-block">Еще</btn-blue>
            </section>
        </v-container>
        <main-banner :item="thirdBanner"
                     class="btnLinkBlue"/>
    </section>
</template>


<script>
import Product from "../components/product";
import MainBanner from "./main-banner";
import '../plugins/vue-awesome-swiper'
import BtnBlue from "../components/btn-blue";

const MAX_ITEMS = 4;

export default {
    name: 'ProductPage',
    components: {BtnBlue, MainBanner, Product},
    data() {
        return {
            swiperOption: {
                pagination: {
                    el: '.product-page__dots',
                    clickable: true,
                },
                slidesPerView: 1,
                spaceBetween: 10,
                loop: false,
                breakpoints: {
                    960: {
                        slidesPerView: 2,
                    },
                    1280: {
                        slidesPerView: 3,
                    },
                }
            },
            currentSlide: 1,
            selectedOfferIndex: 0,
            selectedPhotoIndex: 0,
            withAllItems: true
        }
    },
    computed: {
        thirdBanner() {
            if (!this.$store.state.page?.ProductItemController?.banners) return null;
            if (this.$store.state.page?.ProductItemController?.banners.length < 3) return null;
            return this.$store.state.page?.ProductItemController?.banners[2];
        },
        page() {
            return this.$store.state.page.ProductItemController;
        },
        item() {
            return this.page?.item;
        },
        detailText() {
            return this.page?.item?.DETAIL_TEXT;
        },
        formula() {
            let obj = this.item?.FORMULA;
            return {
                text: obj.TEXT,
                type: obj.TYPE,
            };
        },
        usage() {
            let obj = this.item?.USAGE;
            return {
                text: obj.TEXT,
                type: obj.TYPE,
            };
        },
        weight() {
            //if (!this.item?.offers?.length) return;
            //const weight = this.item.offers.WEIGHT;
            //return weight;

            if (!this.item?.offers?.length) return;
            const offer = this.item.offers[this.selectedOfferIndex];
            if (!offer.WEIGHT?.length) return;
            const weight = offer.WEIGHT;
            return weight;
        },
        composition() {
            let obj = this.item?.COMPOSITION;
            return {
                text: obj.TEXT,
                type: obj.TYPE,
            };
        },
        maxItems() {
            return MAX_ITEMS;
        },
        displayedProducts() {
            return this.withAllItems ? this.relatedProducts : this.relatedProducts?.slice(0, this.maxItems);
        },
        relatedProducts() {
            if (!this.item?.linkedProducts?.length) return;
            return this.item?.linkedProducts;
        },
        imageUrl() {
            const offer = this.offer;
            if (!offer?.PHOTOS?.length) return;
            //const i = offer.PHOTOS.length >= 2 ? 1 : 0;
            const i = this.selectedPhotoIndex < offer.PHOTOS.length ? this.selectedPhotoIndex : 0;
            return offer.PHOTOS[i];
        },

        offer() {
            if (!this.item?.offers?.length) return;
            return this.item.offers[this.selectedOfferIndex];
        },

        texts() {
            return this.$store.state.page?.ProductItemController?.texts;
        }

    },
    methods: {
        onSlideChange() {
            this.currentSlide = (this.$refs.swiper?.$swiper?.activeIndex || 0) + 1;
        },
        slideNext() {
            this.$refs.swiper?.$swiper?.slideNext(500);
        },
        slidePrev() {
            this.$refs.swiper?.$swiper?.slidePrev(500);
        },
        hexStyle(offer) {
            return {
                "background-color": "#" + offer.COLOR_HEX
            };
        },
        onOfferClick(offer, index) {
            this.selectedOfferIndex = index;
            this.selectedPhotoIndex = 0;
        },

        onOfferPhotoClick(index) {
            this.selectedPhotoIndex = index;
        },
    },

    mounted() {

        setTimeout(() => {
            this.$store.state.swipers.ProductPage = this.$refs.swiper?.$swiper;
        }, 300);
    }
}
</script>


<style lang="scss">
.product-page {
    h2 {
        font-size: 30px;
        line-height: 35px;
        @include up($lg) {
            font-size: 60px;
            line-height: 65px;
            letter-spacing: -0.5px;
        }
    }

    &__image {
        max-width: 296px;
        position: relative;
        margin: auto;
        @include up($md) {
            max-width: 380px;
        }
        @include up($lg) {
            max-width: 606px;
        }

        & img {
            border-radius: 16px;
            @include up($lg) {
                border-radius: 32px;
            }
        }

        &--before {
            &:before {
                position: absolute;
                content: "";
                background-image: url("~@/assets/badge.svg");
                width: 93.34px;
                height: 93.34px;
                left: 0;
                top: 0;
            }
        }
    }

    &__badge {
        position: absolute;
        transform: rotate(315deg);
        top: 25px;
        left: 5px;
        text-transform: uppercase;
    }

    &__item {
        max-width: 62px;
        //margin: auto;
        @include up($lg) {
            max-width: 127px;
        }

        &:not(:last-child) {
            margin-right: 32px;
        }
    }

    &__weight-btn {
        background-color: $additional1500;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.06);
        border-radius: 999px;
        padding: 16px;
    }


    &__colors {
        width: 208px;
        height: 64px;
        background-color: $additional150;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.06);
        border-radius: 1000px;
        margin: auto;
        @include up($md) {
            margin: 0;
        }
    }

    & details {
        position: relative;

        &:not(:last-child) {
            margin-bottom: 32px;

            &::after {
                position: absolute;
                content: "";
                width: 100%;
                opacity: 0.5;
                border: 1px solid rgba(0, 0, 0, 0.16);
                bottom: -16px;
                left: 0;
            }
        }

        p {
            margin-top: 16px;
            @include up($md) {
                font-size: 18px;
                line-height: 23px;
            }
        }
    }

    & summary {
        font-size: 18px;
        line-height: 23px;
        font-weight: 400;
        list-style: none;
        position: relative;
        @include up($md) {
            font-size: 24px;
            line-height: 34px;
        }
         a {
             color: $black500 !important;
             margin-left: -6px;
         }

        &::after {
            content: "";
            position: absolute;
            width: 12px;
            height: 2px;
            background-color: #B09D8A;
            border-radius: 999px;
            top: 13px;
            right: 0;
        }

        &::before {
            content: "";
            position: absolute;
            width: 2px;
            height: 12px;
            background-color: #B09D8A;
            border-radius: 999px;
            top: 8px;
            right: 5px;
        }
    }

    & details[open] summary {
        &::before {
            display: none;
        }
    }

    &__dots {
        span {
            width: 12px;
            height: 12px;
            background-color: $black500;
            opacity: 16%;
            transform: rotateZ(45deg);
            border-radius: unset;

            &:not(:last-child) {
                margin-right: 16px;
            }

            &:active,
            &:hover {
                opacity: 100%;
                width: 16px;
                height: 16px;
            }
        }
    }

    .swiper-pagination {
        &-bullet {
            width: 12px;
            height: 12px;
            background-color: $black500;
            opacity: 16%;
            transform: rotateZ(45deg);

            &:not(:last-child) {
                margin-right: 16px;
            }
        }

        &-bullet-active {
            width: 16px;
            height: 16px;
            background: $black500;
            opacity: 100%;
        }
    }
}
</style>