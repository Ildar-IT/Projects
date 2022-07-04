<template>
    <!-- data-aos="fade-up" :data-aos-delay="aosDelay" -->
    <section class="power-slider">
        <scrolling-text type="power-text"/>
        <v-container>
            <v-row justify="space-between">
                <v-col cols="12" md="6"
                       class="order-md-1 d-md-flex flex-column justify-space-between power-slider__text">
                    <h3 class="power-slider__text-hash mb-8">
                        #силавтебе
                    </h3>
                    <div class="ml-auto power-slider__text-inner">
                        <h2 class="mb-4">
                            Дай себе возможность показать, на что ты способна!
                        </h2>
                        <p>
                            Сила – это не только про разрушительную энергию и грубость. Она может заключаться в созидании, терпении, эмоциях и творчестве.
                            Для проекта #силавтебе снялись как раз такие, по-своему сильные и вдохновляющие героини: юристка и правозащитница Алена Попова,
                            врач-онколог Ольга Смирнова, заслуженная артистка России, прима-балерина Мария Абашова и журналистка Саша Сулим.
                        </p>
                    </div>
                    <!-- На больших экранах -->
                    <slider-btns class="d-none d-md-block mt-10 power-slider__btns"
                                 :total="slides.length" :currentSlide="currentSlide"
                                 @slideNext="slideNext" @slidePrev="slidePrev"/>
                </v-col>
                <v-col cols="12" md="6">
                    <div class="power-slider__slider">
                        <div class="power-slider__slider-bg"></div>
                        <!--  @touchStart="touchStart" @progress="progress"
                                @setTransition="setTransition"  -->
                        <swiper ref="swiper" :options="swiperOption" @slideChange="onSlideChange">
                            <swiper-slide v-for="(item, index) in slides" :key="index">
                                <a :href="item.link" target="_blank" class="power-slider__slider-slide">
                                    <!--<v-img :src="item.img"/>-->
                                    <img class="product-photo" :src="item.img" :alt="item.label">
                                    <div class="product power-slider__slider-product">
                                        <span class="product-name">{{ item.label }}</span>
                                        <div class="product-price">
                                            <!--<img class="product-price__icon" src="~@/assets/icons/shopping-bag.svg" alt="shopping-bag">-->
                                            <svgicon class="product-price__icon" name="shopping-bag"/>
                                            <span class="product-price__value">{{item.price}} руб.</span>
                                        </div>
                                    </div>
                                </a>
                            </swiper-slide>
                        </swiper>
                        <slider-btns class="d-md-none mt-4 power-slider__btns"
                                     :total="slides.length" :currentSlide="currentSlide"
                                     @slideNext="slideNext" @slidePrev="slidePrev"/>
                    </div>

                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
    import ScrollingText from '../../components/scrolling-text.vue';
    import SliderBtns from '../../components/slider-btns.vue';

    export default {
        name: 'PowerSlider',
        components: {
            ScrollingText,
            SliderBtns
        },
        data() {
            return {
                slides: [
                    {img: require('@/assets/power-slider/product1.jpg'), label: "Платье", price: "4 599", link: "https://zarina.ru/catalog/clothes/113015-92/"},
                    {img: require('@/assets/power-slider/product2.jpg'), label: "Жакет", price: "4 599", link: "https://zarina.ru/catalog/clothes/106974-50/"},
                    {img: require('@/assets/power-slider/product3.jpg'), label: "Жакет", price: "4 999", link: "https://zarina.ru/catalog/clothes/106986-231/"},
                    {img: require('@/assets/power-slider/product4.jpg'), label: "Брюки", price: "2 599", link: "https://zarina.ru/catalog/clothes/106982-70/"},
                ],
                currentSlide: 1,
                swiperOption: {
                    watchSlidesProgress: true,
                    slidesPerView: 1,
                    speed: 1000,
                    grabCursor: true,
                    loop: false,
                    //observer: true,
                    //observeParents: true,
                    /*navigation: {
                        nextEl: "#power-slider-btn-next",
                        prevEl: "#power-slider-btn-prev",
                    },
                    pagination: {
                        el: '.power-slider_pagination',
                        type: 'fraction'
                    },*/
                },
            }
        },
        computed: {
            total() {
                return this.slides.length;
            },
            aosDelay() {
                return this.$store.state.aosDelay;
            },
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
            /*            touchStart() {
                            for (var i = 0; i < this.mySwiper.slides.length; i++) {
                                this.mySwiper.slides[i].style.transition = "";
                            }
                        },
                        progress() {
                            for (var i = 0; i < this.mySwiper.slides.length; i++) {
                                var slideProgress = this.mySwiper.slides[i].progress;
                                var innerOffset = this.mySwiper.width * 2;
                                var innerTranslate = slideProgress * innerOffset;
                                //this.mySwiper.slides[i].querySelector(".slide-inner").style.transform = "translate3d(" + innerTranslate + "px, 0, 0)";
                            }
                        },

                        setTransition(speed) {
                            for (var i = 0; i < this.mySwiper.slides.length; i++) {
                                this.mySwiper.slides[i].style.transition = speed + "ms";
                                //this.mySwiper.slides[i].querySelector(".slide-inner").style.transition = speed + "ms";
                            }
                        }*/
        },
        mounted() {
            setTimeout(()=>{
                this.$store.state.swipers['power-slider'] = this.$refs.swiper?.$swiper;
            },300);
        }
    }
</script>
<style lang="scss">
    .power-slider {
        padding: 30px 0 40px 0;

        &__text {
            position: relative;
            z-index: 1;

            &-inner {
                @include up($md) {
                    max-width: 360px;
                }
                @include up($lg) {
                    max-width: 445px;
                    padding-top: 150px;
                }

                h2 {
                    @include up($md) {
                        max-width: 361px;
                    }
                }
            }

            &-hash {
                color: $accent-color;
                @include up($md) {
                    align-self: flex-end;
                }
            }
        }

        &__btns {
            @include up($md) {
                margin-bottom: 40px;
            }
            @include up($lg) {
                margin-bottom: 90px;
            }
        }

        &__slider {
            position: relative;

            .swiper-container {
                margin: 0; // важно, чтобы не центрировался
                @include up($md) {
                    max-width: 374px;
                }
                @include up($lg) {
                    max-width: 492px;
                }
                @include up($xl) {
                    max-width: 565px; // эта максмальный размер фотки в слайдере
                }
            }

            &-product {
                position: absolute;
                z-index: 5;
                height: 35px;
                line-height: 35px;
                padding: 0 16px 0 16px;
                left: 12px;
                bottom: 12px;
                background-color: $black-color;
                border-radius: 17px;
                flex-direction: row;

                .product-name {
                    display: inline-block;
                    margin-right: 6px;
                    color: $white-color;
                }
                .product-price {
                    display: inline-block;
                    margin-right: 6px;
                    color: $white-color;
                }
            }

            &-slide {
                display: block;
                position: relative;
                width: 100%;
                height: 100%;

                img {
                    display: block;
                    width: 100%;
                    margin:0;
                }
            }

            &-bg {
                position: absolute;
                z-index: 0;
                width: 207px;
                height: 255px;
                top: -97px;
                right: -16px;
                background-image: url('~@/assets/power-slider/bg.svg');
                background-position: center;
                background-size: contain;
                background-repeat: no-repeat;

                @include up($md) {
                    background-image: url('~@/assets/power-slider/bg--md.svg');
                    background-position: right center;
                    bottom: 0;
                    right: -3%;
                    top: unset;
                    width: 200px;
                    height: 455px;
                }
                @include up($lg) {
                    bottom: 48px;
                    width: 250px;
                }
                @include up($xl) {
                    width: 359px;
                }
            }
        }
    }
</style>