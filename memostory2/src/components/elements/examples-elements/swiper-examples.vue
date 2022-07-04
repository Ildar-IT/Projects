<template>

    <div class="swiper-examples">

        <swiper ref="cardsCareExamplesSwiper" id="cardsCareExamplesSwiper" :options="swiperOptions"
                class="mt-16 swiper-examples__swiper"
                @slideChange="changeArrowClasses">

            <swiper-slide v-for="slide of slides" :key="slide.ID">

                <div :item="slide" v-for="(service, index) in  slide.DETAIL_TEXT" :key="index" class="body-1 d-flex align-center mb-4">
                  <svgicon :name="service.icon"
                        color="#D8C69E"
                        class="mr-4"
                        width="24" height="24"
                    />
                    {{ service.text }}
                </div>

            </swiper-slide>

        </swiper>

        <div class="swiper-examples__nav" slot="navigation">
            <v-row class="mt-8">
                <div id="swiper-controller-careExs-prev" class="swiper-btn swiper-btn_not-active mr-6">
                    <v-btn fab large icon @click="slidePrev">
                        <svgicon name="arrow-head-left" width="32" height="32" original :fill="false" />

                    </v-btn>
                </div>
                <div id="swiper-controller-careExs-next" class="swiper-btn swiper-btn_active">
                    <v-btn fab large icon @click="slideNext">
                        <svgicon name="arrow-head-right" width="32" height="32" original :fill="false" />
                    </v-btn>
                </div>
            </v-row>
        </div>

    </div>
</template>

<script>
// import { Swiper, SwiperSlide } from 'swiper/vue';
// import 'swiper/swiper.scss';
    export default {
        name: 'swiper-examples',
        props: ['slides'],
      components:{ },
        data() {
            return {
                examples: [
                    {name: "Красненькое кладбище. Тариф «Памятный». Ежемесячная уборка территории с фотоотчётом."},
                    {name: "Новодевичье кладбище. Тариф «Ответственный». Ежемесячная уборка территории с фотоотчётом."},
                    {name: "Южное кладбище. Тариф «Любящий». Ежемесячная уборка территории с фотоотчётом."},
                ],

                //Swiper
                isMoving: false,
                swiperOptions: {
                    keyboard: {
                        enabled: true,
                    },
                    slidesPerView: 'auto',
                    autoHeight: true,
                    watchOverflow: true,
                    // navigation: {
                    //     nextEl: "#swiper-controller-careExs-next",
                    //     prevEl: "#swiper-controller-careExs-prev",
                    // },
                    spaceBetween: 32,

                },
            };
        },
        computed: {
            isWindowXS() {
                return this.$store.getters.isWindowXS;
            },
            isWindowMD() {
                return this.$store.getters.isWindowMD;
            },
            swiper() {
                return this.$refs.cardsCareExamplesSwiper.$swiper;
            },

        },
        methods: {
            changeArrowClasses() {
                let mySwiper = this.$refs.cardsCareExamplesSwiper.$swiper;
                let leftBtn = document.querySelector('#swiper-controller-careExs-prev');
                let rightBtn = document.querySelector('#swiper-controller-careExs-next');
                console.log(mySwiper);
                if (mySwiper.activeIndex === 0) {
                    leftBtn.classList.add('swiper-btn_not-active');
                    rightBtn.classList.add('swiper-btn_active');
                } else if (mySwiper.activeIndex == mySwiper.slides.length - 1) {
                    rightBtn.classList.add('swiper-btn_not-active');
                    leftBtn.classList.add('swiper-btn_active');
                } else {
                    rightBtn.classList.remove('swiper-btn_not-active');
                    leftBtn.classList.remove('swiper-btn_not-active');
                    rightBtn.classList.add('swiper-btn_active');
                    leftBtn.classList.add('swiper-btn_active');
                }
            },
            slideNext() {
                this.$refs.cardsCareExamplesSwiper?.$swiper?.slideNext(500);
                 this.$emit('slideNext')
            },
            slidePrev() {
                this.$refs.cardsCareExamplesSwiper?.$swiper?.slidePrev(500);
                this.$emit('slidePrev')
            }
        },
        mounted() {
          /*  this.swiper.on('slideChange', () => {
                this.changeArrowClasses(this)
            });*/
        }
    }
</script>

<style lang="scss">
    .swiper-examples {      
        svg {
            fill: none !important;
        }

        &__nav {
            .swiper-btn {
                width: 64px;
                border-radius: 100%;

                &_active {
                    @include transition();
                    background: linear-gradient(252deg, $beige2 0%, $beige1 100.43%);

                    svg {
                        path {
                            stroke: $white;
                        }
                    }
                }

                &_not-active {
                    @include transition();
                    background: transparent;

                    svg {
                        path {
                            stroke: $beige2;
                        }
                    }
                }
            }
        }
    }
</style>
