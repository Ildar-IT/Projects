<template>
  <!--  Care examples-elements  -->
  <div id="works" class="examples px-4 px-sm-8 px-md-16" v-if="slides && slides.length > 0">
    <div  class="examples__wrapper ">
      <div  class="text-center ">
        <h2 class="beige-text  beige-text"
           :class="isWindowXS? 'pt-3 pb-8' : 'padding-top-main padding-bottom-main  '">{{caringTitle}}</h2>
        <cards-examples :slides="slides" class=" mx-lg-auto"/>

      </div>
    </div>
  </div>
</template>

<script>

import swiperExamples from "../elements/examples-elements/swiper-examples"
import cardsExamples from "../elements/examples-elements/cards-examples"
export default {
  name: "examples",
  components: {
    swiperExamples,
    cardsExamples
  },
  data() {
    return {
       swiperOptions: {
              keyboard: {
                  enabled: true,
              },
              slidesPerView: 'auto',
              autoHeight: false,
              watchOverflow: true,
              
              spaceBetween: 32,
          },
          showAfter: true
    }
  },
  computed: {
    common() {
      // return this.$store.state.common;
    },
    page() {
      return this.$store.state.page.HomeController;
    },
  commonText() {
      return this.$store.state.common.textsCommon;
  },
    caringTitle() {
        return this.commonText.find(el => el.CODE == "EXAMPLES_OF_СARE_TITLE").PREVIEW_TEXT
    },
    isWindowXS() {
      return this.$store.getters.isWindowXS;
    },
    isWindowSM() {
      return this.$store.getters.isWindowSM;
    },
    isWindowMD() {
      return this.$store.getters.isWindowMD;
    },
    isWindowLG() {
      return this.$store.getters.isWindowLG;
    },
    slides() {
      return this.$store.state.page.HomeController.homeSamples || [];
    },
  },
  methods: {
    slideNext() {
      console.log("slideNext")
      console.log("cardsCareExamplesSwiperBg", this.$refs.cardsCareExamplesSwiperBg?.$swiper)
      this.$refs.cardsCareExamplesSwiperBg?.$swiper?.slideNext(500);
    },
    slidePrev() {
      console.log("slidePrev")
      this.$refs.cardsCareExamplesSwiperBg?.$swiper?.slidePrev(500);      
    },
    beforeAfter(img) {
        if (this.showAfter == true) return img.DETAIL_PICTURE
        return img.PREVIEW_PICTURE
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss">

.examples {
  position: relative;
  height: auto;
  width: 100%;
  min-width: 360px;

  @include up($sm) {
    background-color: $beige7;
    //height: 800px;
    //width: 100%;
  }

  &__wrapper {
    max-width: 1720px;
    margin: 0 auto;
  }
  .beforeAfterNav {
    position: absolute;
    background: #FBFAF8;
    padding: 10px;
    border-radius: 30px 30px 0px 0px;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    //width: 310px;
    z-index: 3;
  }


  &__bg {
    .swiper-slide {
      z-index: 0;
      background-position: center;     
      background-size: cover;
      height: inherit;
      @include transition();
    }
  
    //width: 100%;
    height: 800px;
    //background: url("../../assets/images/landscape.jpg") no-repeat;
    background-size: contain;
    @include up($lg) {
      background-size: cover;
      min-height: 800px;
      height: 800px;
      width: 100%;
    }
  }

  .card {
    width: 568px;
    //height: 555px;
    position: relative;
    right: 103px;
    top: 50%;
    z-index: 2;
    margin-top: -270px;
    @include up($md) {
      position: absolute;
    }
    h2{
      color: $beige5;
    }
  }
}
</style>
