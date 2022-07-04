<template id="new-items">
    <section v-if="products && products.length"
             class="new-items text-center pt-8 pb-16">
        <v-container>
            <h2 v-html="texts.new" class="pt-8 mb-8 mb-md-16"></h2>

            <swiper ref="swiper" :options="swiperOption" @slideChange="onSlideChange"
                    class="new-items__slider mb-8 d-xl-none">
                <swiper-slide v-for="(item, index) of products" :key="index" class="new-items__slide">
                    <product :item="item"/>
                </swiper-slide>
            </swiper>
            <v-row class="d-none d-xl-flex mb-8">
                <v-col v-for="(item,index) of displayedProducts" :key="index" cols="12" md="4" xl="3">
                    <product :item="item"/>
                </v-col>
            </v-row>

            <div class="new-items__dots d-flex justify-center align-center d-xl-none">
                <span></span>
            </div>


            <btn-blue v-if="products.length > maxItems && !withAllItems" @click="withAllItems = true"
                      class="d-none d-xl-inline-block">{{ buttons.more }}
            </btn-blue>
        </v-container>
    </section>
</template>

<style lang="scss">
.new-items {
    @include up($lg) {
        position: relative;
        overflow: auto;
        &::before {
            position: absolute;
            content: "";
            background-image: url("~@/assets/tattoo/4-lg.png");
            width: 623px;
            height: 654px;
            left: -45px;
            top: -80px;
            z-index: -20;
        }
        &::after {
            position: absolute;
            content: "";
            background-image: url("~@/assets/tattoo/5.png");
            width: 438px;
            height: 299px;
            right: 0;
            top: -60px;
            z-index: -20;
        }
    }

    h2 {
        font-size: 30px;
        line-height: 35px;
        @include up($md) {
            font-size: 60px;
            line-height: 70px;
        }
    }

    &__dots {
        span {
            width: 12px;
            height: 12px;
            background-color: $black500;
            opacity: 0.2;
            transform: rotateZ(45deg);
            border-radius: unset;

            &:not(:last-child) {
                margin-right: 16px;
            }

            &:active,
            &:hover {
                opacity: 1;
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
            opacity: 0.2;
            transform: rotateZ(45deg);

            &:not(:last-child) {
                margin-right: 16px;
            }
        }

        &-bullet-active {
            width: 16px;
            height: 16px;
            background: $black500;
            opacity: 1;
        }
    }
}
</style>

<script>
import BtnLink from "../components/btn-link";
import Product from "../components/product";
import '../plugins/vue-awesome-swiper'
import BtnBlue from "../components/btn-blue";

const MAX_ITEMS = 4;

export default {
    name: 'NewItems',
    components: {BtnBlue, Product, BtnLink},
    props: ["btn"],
    data() {
        return {
            swiperOption: {
                pagination: {
                    el: '.new-items__dots',
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
            withAllItems: false,
        }

    },
    computed: {
        products() {
            return this.$store.state.page?.HomeController?.newProducts;
        },

        displayedProducts() {
            return this.withAllItems ? this.products : this.products?.slice(0, this.maxItems);
        },
        maxItems() {
            return MAX_ITEMS;
        },
        texts() {
            return {
                new: this.$store.state.page?.HomeController?.texts?.MAIN_NEW,
            }
        },
        buttons() {
            return {
                more: this.$store.state.common?.buttons?.MORE,
            }
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

    },
    mounted() {
        setTimeout(() => {
            this.$store.state.swipers.NewItems = this.$refs.swiper?.$swiper;
        }, 300);
    }
}
</script>