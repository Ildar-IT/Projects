<template>
  <div class="flavours-category">
    <v-container >
      <h3 class="flavours-category__title text-center margin-bottom-main">Make your choice</h3>
      <!--      <v-row class="text-center">-->
      <!--        <v-col class="flavours-category__wrapper">-->
      <!--          <img class=" mb-8"  src="../../assets/Flavours/category/item1.jpg" alt="Item">-->
      <!--          <h5>ORIGINAL PRALINES</h5>-->
      <!--          <div class="flavours-category__wrapper-descr my-text-2">We pick and toast the nuts,-->
      <!--            extract basil oil and choose seasonal berries</div>-->
      <!--        </v-col>-->
      <!--        <v-col class="flavours-category__wrapper ">-->
      <!--          <img class=" mb-8" src="../../assets/Flavours/category/item1.jpg" alt="Item">-->
      <!--          <h5>MINI PRALINES</h5>-->
      <!--          <div class="flavours-category__wrapper-descr my-text-2">We pick and toast the nuts,-->
      <!--            extract basil oil and choose seasonal berries</div>-->
      <!--        </v-col>-->
      <!--        <v-col class="flavours-category__wrapper">-->
      <!--          <img class="mb-8" src="../../assets/Flavours/category/item1.jpg" alt="Item">-->
      <!--          <h5>CREAMY CARAMELS</h5>-->
      <!--          <div class="flavours-category__wrapper-descr my-text-2">We pick and toast the nuts,-->
      <!--            extract basil oil and choose seasonal berries</div>-->
      <!--        </v-col>-->
      <!--      </v-row>-->
    </v-container>
    <swiper class="flavours-category-swiper" :options="swiperOption">
      <swiper-slide v-for="(item, index) in slider" :key="index">
        <router-link :to="item.routerLink">
          <div class="flavours-category__wrapper d-flex flex-column justify-start align-center">
            <div class="flavours-category__wrapper-img mb-8 d-flex justify-center align-center"><img :src="item.img" alt="Item"></div>
            <h5 class="my-primary">{{ item.title }}</h5>
            <div class="flavours-category__wrapper-descr my-text-2 text-center">{{ item.descr }}</div>
          </div>
        </router-link>
      </swiper-slide>
    </swiper>

    <div class="flavours-category__bg"></div>
  </div>
</template>

<script>
export default {
  name: "flavours-category",
  data() {
    return {
      swiperOption: {
        slidesPerView: 1.5,
        spaceBetween: 16,
        navigation: {
          nextEl: "#collection-slider-btn-next",
          prevEl: "#collection-slider-btn-prev",
        },

        loop: false,
        breakpoints: {
          600: {
            slidesPerView: 2.2,
            spaceBetween: 16
          },
          960: {
            slidesPerView: 2.7,
            spaceBetween: 32
          },
          1280: {
            slidesPerView: 3.3,
            spaceBetween: 48
          },
        }
        //initialSlide: 1,
        //centeredSlides: true,
      },
      slider: [
        {
          img: require('@/assets/Flavours/category/item2.png'),
          title: "ORIGINAL PRALINES",
          descr: "We are crafting a classic French praline made of cane sugar roasted nuts with unique flavor combinations.",
          routerLink: "/flavours/original",
        },
        {
          img: require('@/assets/Flavours/category/item3.png'),
          title: "MINI PRALINES",
          descr: "We create mini-versions of our original pralines for you to taste more flavors and choose your favorite ones.",
          routerLink: "/flavours/original",
        },
        {
          img: require('@/assets/Flavours/category/item4.png'),
          title: "CREAMY CARAMELS TOFFEES",
          descr: " For our caramel we use only natural 33% cream and add taste accents: tropical fruit, spices and specialty coffee",
          routerLink: "/flavoursOriginal",
        },
        {
          img: require('@/assets/Flavours/category/item5.png'),
          title: "CHOCOLATE",
          descr: "We have something new in our collection — it’s chocolate made of exclusive Trinitario cocoa beans, which grew in Vietnam, Benche province, and chocolate with a praline filling with your favorite cubes flavor.",
          routerLink: "/flavours/original",
        },

      ]
    }
  },
}
</script>

<style lang="scss">
.flavours-category {
  padding: 64px 0;
  @include up($lg) {
    padding: 164px 0 0 0;
  }
  width: 100%;

  &__title {
    color: $primary-500;
  }

  &__wrapper {
    &-img {
      width: 220px;
      height: 220px;
      @include up($sm) {
        width: 340px;
        height: 340px;
      }

      img {
        width: 95%;
        height: 95%;
        @include transition();
        &:hover {
          width: 100%;
          height: 100%;
        }
      }


    }

    h5 {
      color: $primary-500;
    }

    &-descr {
      width: 228px;
      margin: 0 auto;
      color: $black-200;
    }
  }

  &__bg {
    margin-bottom: 0;
    background-image: url("~@/assets/Shop/bg.jpg");
    background-position: center;
    width: 100%;
    height: 360px;
    margin-top: 64px;
    background-size: cover;
    @include up($sm) {
      margin: 96px 0;
      background-image: url("~@/assets/laurent/bg.jpg");
      height: 418px;
    }
    @include up($lg) {
      margin: 129px 0;
      background-image: url("~@/assets/Shop/bg.jpg");
      height: 552px;
    }

  }
}
</style>