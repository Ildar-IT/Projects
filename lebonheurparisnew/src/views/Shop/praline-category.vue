<template>
  <section class="praline-category">
    <v-container>
      <h3 class="praline-category__title text-center margin-bottom-main">Choose your category</h3>
    </v-container>
    <swiper class="praline-category-swiper" :options="swiperOption">
      <swiper-slide v-for="(item, index) in slider" :key="index">
        <router-link :to="item.routerLink">
          <div class="praline-category__wrapper d-flex flex-column justify-start align-center">
            <div class="praline-category__wrapper-img mb-8 d-flex justify-center align-center"><img :src="item.img" alt="Item"></div>
            <h5 class="my-primary">{{ item.title }}</h5>
            <div class="praline-category__wrapper-descr my-text-2 text-center">{{ item.descr }}</div>
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
    <div v-if="isBgShow" class="praline-category__bg"></div>
  </section>
</template>

<script>
export default {
  name: "praline-category",
  props: ["isBgShow"],
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
            slidesPerView: 2,
            spaceBetween: 16
          },
          960: {
            slidesPerView: 3,
            spaceBetween: 32
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 48
          },
        }
        //initialSlide: 1,
        //centeredSlides: true,
      },
      slider: [
        {
          img: require('@/assets/category/item1.jpg'),
          title: "ORIGINAL PRALINES",
          descr: "We pick and toast the nuts,\n" +
              "            extract basil oil and choose seasonal berries",
          routerLink: "/shop/original"
        },
        {
          img: require('@/assets/category/item2.jpg'), title: "MINI PRALINES", descr: "We pick and toast the nuts,\n" +
              "            extract basil oil and choose seasonal berries",
          routerLink: "/shop/original"
        },
        {
          img: require('@/assets/category/item3.jpg'),
          title: "CREAMY CARAMELS",
          descr: "We pick and toast the nuts,\n" +
              "            extract basil oil and choose seasonal berries",
          routerLink: "/shop/original"
        },
        {
          img: require('@/assets/category/item1.jpg'),
          title: "ORIGINAL PRALINES",
          descr: "We pick and toast the nuts,\n" +
              "            extract basil oil and choose seasonal berries",
          routerLink: "/shop/original"
        },
      ]
    }
  },
}
</script>

<style lang="scss">
.praline-category {
  padding: 64px 0;
  @include up($lg) {
    padding: 164px 0;
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