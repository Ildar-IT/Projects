<template>
    <div class="collection-slider">
        <v-container>
            <h1 class="text-center mb-4">
                new
            </h1>
            <h3 class="text-center mb-4">
                women collection
            </h3>
            <p class="text-center mx-auto">
                Покажите свою внутреннюю силу и вдохновляйте ей других, с новой коллекцией от ZARINA. Безукоризненные костюмы-тройки, комплекты из твида и экокожи, и модели в энергичном красном цвете «маджента» уже доступны в продаже.
            </p>

            <div class="d-flex flex-column mt-10 mt-md-0 collection-slider__gallery">

                <swiper ref="swiper" :options="swiperOption" class="order-md-1">
                    <swiper-slide class="collection-slider__slide" v-for="(item, index) in slides" :key="index">
                        <a :href="item.link" target="_blank" class="d-block overflow-hidden">
                            <div class="product">
                                <img class="product-photo" :src="item.img" :alt="item.name">
                                <span class="product-name">{{item.name}}</span>
                                <div v-if="item.price" class="product-price">
                                    <img class="product-price__icon" src="~@/assets/icons/shopping-bag.svg"
                                         alt="shopping-bag">
                                    <span class="product-price__value">{{item.price}} руб.</span>
                                </div>
                            </div>
                        </a>
                    </swiper-slide>
                </swiper>

                <slider-btns class="mt-8 mt-md-10 collection-slider__btns"
                             mirror
                             :total="slides.length" :currentSlide="currentSlide"
                             @slideNext="slideNext" @slidePrev="slidePrev">
                    <template slot="pagination">
                        <btn-link class="d-none d-sm-inline-block d-md-none" href="https://zarina.ru/catalog/new/" target="_blank"/>
                        <h3 class="d-none d-md-block collection-slider__collection">collection</h3>
                    </template>
                </slider-btns>

                <btn-link class="d-sm-none d-md-block mt-8 order-2 mx-auto" href="https://zarina.ru/catalog/new/" target="_blank"/>
            </div>
        </v-container>
    </div>
</template>

<script>
    import SliderBtns from '../../components/slider-btns.vue';
    import BtnLink from '../../components/btn-link.vue'

    export default {
        name: "collection-slider",
        components: {
            BtnLink,
            SliderBtns
        },
        data() {
            return {
                swiperOption: {
                    slidesPerView: 1,
                    spaceBetween: 16,
                    loop: false,
                    //freeMode: true,
                    //initialSlide: 1,
                    //centeredSlides: true,
                    breakpoints: {
                        600: {
                            slidesPerView: 2,
                            spaceBetween: 16
                        },
                        960: {
                            slidesPerView: 3,
                            spaceBetween: 32
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 48
                        },
                    }
                },
                currentSlide: 1,
                slides: null
            }
        },
        computed: {
            total() {
                return this.slides.length;
            },
            isWindowXL() {
                return this.$store.getters.isWindowXL;
            },
            sliderMargin() {
                if (this.isWindowXL) {
                    return "margin-left:" + (this.$store.state.windowWidth - 1390) / 2 + "px"
                }
                return "margin-left:" + (this.$store.state.windowWidth - 1180) / 2 + "px"
            }
        },
        methods: {
            onSlideChange() {
                this.currentSlide = (this.$refs.swiper?.$swiper?.activeIndex || 0) + 1;
            },
            slideNext() {
                //console.log("herer!!");
                //this.$refs.swiper?.$swiper?.translateTo(500, 500);
                //this.$refs.swiper?.$swiper?.setProgress(.5, 500);
                this.$refs.swiper?.$swiper?.slideNext(500);
            },
            slidePrev() {
                this.$refs.swiper?.$swiper?.slidePrev(500);
            },
        },
        created() {
            this.slides = this.$store.state.collection;
        },
        mounted() {
            setTimeout(()=>{
                this.$store.state.swipers['collection-slider'] = this.$refs.swiper?.$swiper;
            },300);
        }
    }
</script>

<style lang="scss">
    .collection-slider {
        padding: 30px 0 30px 0;

        p {
            margin: 0 auto 0 auto;

            @include up($md) {
                width: 80%;
                max-width: 720px;
            }
        }

        &__btns {
            @include up($md) {
                margin-bottom: 50px;
            }
            @include up($lg) {
                margin-bottom: 70px;
            }
        }

        &__collection {
            color: $taupe-color;
        }

        &__gallery {
            //overflow: hidden;
        }

        /*&__slide {
            //display: flex;
            .product {
                //width: 356px;
                //height: 522px;
            }
        }*/

        .swiper-container {
            width: 100%;    // todo remove this when ready to make contanerless slider

            @include up($md) {
                margin-bottom: 60px;
            }
            @include up($xl) {
                margin-bottom: 90px;
            }
        }
    }

</style>