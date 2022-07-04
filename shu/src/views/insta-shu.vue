<template>
    <section class="insta-shu text-center pt-16 pb-16">
        <v-container>
            <h2 v-html="texts.models" class="mb-8"></h2>
            <swiper ref="swiper" :options="swiperOption" @slideChange="onSlideChange"
                    class="insta-shu__items mb-8 d-xl-none">
                <swiper-slide v-for="(item, index) of items" :key="index" class="insta-shu__item">
                    <a :href="item.link" target="_blank" class="d-block">
                        <img :src="item.img" width="296px" alt="">
                    </a>
                </swiper-slide>
            </swiper>
            <v-row class="d-none d-xl-flex mb-8">
                <v-col v-for="(item, index) of items" :key="index" class="insta-shu__item" cols="12" md="4" lg="3">
                    <a :href="item.link" target="_blank" class="d-block">
                        <img :src="item.img" width="296px" alt="">
                    </a>
                </v-col>
            </v-row>

            <div class="insta-shu__dots d-flex justify-center align-center d-xl-none d-xs-flex mb-8">
                <span></span>
                <span></span>
                <span></span>
            </div>


            <btn-blue :to="{name: 'About'}" v-if="buttons.mainShow">{{buttons.mainShow}}</btn-blue>
        </v-container>
    </section>
</template>

<script>
import '../plugins/vue-awesome-swiper'
import BtnLink from "../components/btn-link";
import BtnBlue from "../components/btn-blue";

export default {
    name: 'insta-shu',
    data() {
        return {
            swiperOption: {
                pagination: {
                    el: '.insta-shu__dots',
                    clickable: true,
                },
                slidesPerView: 1,
                spaceBetween: 10,
                loop: false,
                //freeMode: true,
                //initialSlide: 1,
                //centeredSlides: true,
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
        }
    },
    computed: {
        items() {
            return this.$store.state.currentPage?.cases?.map(el=>{
                return {
                    img: el.DETAIL_PICTURE,
                    link: el.LINK
                };
            });
        },
        texts() {
            return {
                models: this.$store.state.page?.HomeController?.texts?.MAIN_MODELS,
            }
        },
        buttons() {
            return {
                mainShow: this.$store.state.common?.buttons?.MAIN_SHOW,
            }
        }
    },
    components: {BtnBlue, BtnLink},
    props:
        ["btn"],

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
            this.$store.state.swipers['insta-shu'] = this.$refs.swiper?.$swiper;
        }, 300);
    }
}
</script>

<style lang="scss">
.insta-shu {
    background-image: url("~@/assets/bg/shu-bg.jpg");
    background-size: cover;
    background-position: top center;
    @include up($md) {
        background-image: url("~@/assets/bg/shu-bg-lg.jpg");
    }

    &__item {
        & img {
            border-radius: 16px;
        }
    }

    h2 {
        font-size: 30px;
        line-height: 35px;
        color: $white;
        @include up($md) {
            font-size: 60px;
            line-height: 65px;
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