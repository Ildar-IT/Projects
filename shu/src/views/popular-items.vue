<template>
    <section v-if="products && products.length"
             class="popular-items text-center pt-8 pb-16">
        <v-container>
            <h2 v-html="texts.popular" class="pt-8 mb-8 mb-md-16"></h2>

            <swiper ref="swiper" :options="swiperOption" @slideChange="onSlideChange"
                    class="popular-items__slider mb-8 d-xl-none">
                <swiper-slide v-for="(item, index) of products" :key="index" class="popular-items__slide">
                    <product :item="item"/>
                </swiper-slide>
            </swiper>
            <v-row class="d-none d-xl-flex mb-8">
                <v-col v-for="(item,index) of displayedProducts" :key="index" cols="12" md="4" lg="3">
                    <product :item="item"/>
                </v-col>
            </v-row>

            <div class="popular-items__dots d-flex justify-center align-center d-xl-none">
                <span></span>
            </div>
            <btn-blue v-if="products.length > maxItems && !withAllItems" @click="withAllItems = true"
                      class="d-none d-xl-inline-block">{{ buttons.more }}
            </btn-blue>
        </v-container>
    </section>
</template>

<style lang="scss">
.popular-items {
    @include up($lg) {
        position: relative;
        overflow: hidden;
        &::before {
            position: absolute;
            content: "";
            background-image: url("~@/assets/tattoo/3.png");
            width: 1061px;
            height: 788px;
            left: -380px;
            top: -130px;
            z-index: -1;
        }
        &::after {
            position: absolute;
            content: "";
            background-image: url("~@/assets/tattoo/6.png");
            width: 544px;
            height: 351px;
            right: -120px;
            top: 15px;
            z-index: -1;
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
import BtnBlue from "../components/btn-blue";
import BtnLink from "../components/btn-link";
import Product from "../components/product";
import '../plugins/vue-awesome-swiper'

const MAX_ITEMS = 4;

export default {
    name: 'PopularItems',
    components: {Product, BtnLink, BtnBlue},
    props: ["btn"],
    data() {
        return {
            swiperOption: {
                pagination: {
                    el: '.popular-items__dots',
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
          return this.$store.state.page?.HomeController?.popularProducts;
      },
      displayedProducts() {
          return this.withAllItems ? this.products : this.products?.slice(0, this.maxItems);
      },
      maxItems() {
          return MAX_ITEMS;
      },
      texts() {
          return {
              popular: this.$store.state.page?.HomeController?.texts?.MAIN_POPULAR,
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
            this.$store.state.swipers.PopularItems = this.$refs.swiper?.$swiper;
        }, 300);
    }
}
</script>