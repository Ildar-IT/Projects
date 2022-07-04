<template>
  <div class="collection-slider">
    <v-container>
      <h1 class="text-center d-none d-sm-block mb-6">
        new collection &nbsp&nbsp&nbsp&nbsp&nbsp ss22
      </h1>
      <div class="collection-slider__descr mt-7 d-sm-none">
        <span class="d-inline-block"> В новом сезоне амбассадорами Zarina стали модные блогеры  Мария Червоткина, Дарья Костромитина, Марианна Елисеева, Мария Лист</span>
        <br>
        <span class="d-inline-block mt-3">Они не боятся экспериментировать и рисковать, идти к своим мечтам и целям, транслировать свой стиль жизни и влиять на моду!</span>
        <br>
        <span class="d-inline-block mt-3"><strong>#силавнас</strong> — когда мы делаем то, что любим!</span>
      </div>

      <div v-if="!isWindowSM" class="d-flex flex-column mt-10 mt-sm-0 collection-slider__gallery">

        <swiper ref="swiper" :options="swiperOption" class="order-md-1 d-sm-none">
          <swiper-slide class="collection-slider__slide" v-for="(item, index) in slides" :key="index">
            <img class="collection-slider__photo" :src="item.img" :alt="item.name">
            <div class="collection-slider__title">
              <span class="collection-slider__name d-block">{{ item.name }}</span>
              <div>@<a class="collection-slider__name--link ">{{ item.linkName }}</a></div>
            </div>
            <span class="collection-slider__descr mt-2">{{ item.descr }}</span>
          </swiper-slide>
        </swiper>

        <slider-btns class="mt-8 mt-md-10 collection-slider__btns"
                     mirror
                     :total="slides.length" :currentSlide="currentSlide"
                     @slideNext="slideNext" @slidePrev="slidePrev">
        </slider-btns>
      </div>
    </v-container>

    <div v-if="isWindowSM" class="d-flex flex-column mt-10 mt-sm-0 collection-slider__gallery">

      <swiper ref="swiper" :options="swiperOption" class="order-md-1 d-none d-sm-block">
        <swiper-slide class="collection-slider__slide pa-md-0" v-for="(item, index) in slides" :key="index">
          <a :href="item.link" target="_blank" class="d-block overflow-hidden">
            <div class="collection-slider__wrap">
              <img class="collection-slider__photo" :src="item.img" :alt="item.name">
              <div class="collection-slider__title">
                <span class="collection-slider__name">{{ item.name }}</span>
                <div v-if="item.price" class="product-price d-flex align-center">
                  <svgicon class="collection-slider-price__icon" name="shopping-bag"/>
                  <span class="collection-slider__price ml-2">{{ item.price }} руб.</span>
                </div>
              </div>
            </div>
          </a>
        </swiper-slide>
      </swiper>


      <slider-btns class="mt-8 mt-md-10 collection-slider__btns"
                   mirror
                   :total="slides.length" :currentSlide="currentSlide"
                   @slideNext="slideNext" @slidePrev="slidePrev">
      </slider-btns>
    </div>
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
            slidesPerView: 6,
            spaceBetween: 0
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
    isWindowSM() {
      return this.$store.getters.isWindowSM;
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
    if (this.$store.getters.isWindowXS) {
      this.slides = this.$store.state.collection[0];
    } else {
      this.slides = this.$store.state.collection[1];
    }

  },
  mounted() {
    setTimeout(() => {
      this.$store.state.swipers['collection-slider'] = this.$refs.swiper?.$swiper;
    }, 300);
  }
}
</script>

<style lang="scss">
.collection-slider {
  width: 100%;

  max-height: 920px;
  background: url("../../assets/collection-slider/img/slider-bg.jpg") center no-repeat;
  background-size: cover;
  @include up($sm) {
    padding: 98px 0;
    max-height: none;
    background: url("../../assets/collection-slider/img/slider-bg-lg.jpg") center no-repeat;
    background-size: cover;
  }

  &__descr {
    font-weight: normal;
    font-size: 14px;
    line-height: 23.4px;
    color: $white-color;


    strong {
      font-weight: bold;
      font-size: 16px;
    }
  }

  &__gallery {
    position: relative;
  }

  &__slide {
    position: relative;
    box-sizing: border-box;
    padding: 10px;
    color: $white-color;

    a {
      color: $white-color !important;
    }
  }

  &__name {
    font-weight: bold;
    font-size: 24px;
    line-height: 26.4px;
    text-decoration-line: underline;
    @include up($sm) {
      font-weight: normal;
      font-size: 15px;
      line-height: 24px;
      text-decoration-line: none;
    }

    &--link {
      font-size: 13px;
      line-height: 14.4px;
      text-decoration-line: underline;
      color: $white-color !important;
    }
  }

  &__photo {
    width: 100%;
    height: 250px;
    object-fit: cover;
    @include up($sm) {
      height: 448px;
    }
  }

  &__title {
    position: absolute;
    top: 205px;
    left: 23px;
    @include up($sm) {
      top: 400px;
      left: 50px;
    }
  }

  &__descr {
    font-weight: normal;
    font-size: 14px;
    line-height: 18.2px;
    color: $white-color;
  }

  &__price {
    font-weight: normal;
    font-size: 15px;
    line-height: 24px;

    &-icon {

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

  .swiper-container {
    width: 100%; // todo remove this when ready to make contanerless slider

    @include up($md) {
      margin-bottom: 60px;
    }
    @include up($xl) {
      margin-bottom: 90px;
    }
  }
}

</style>