<template>
  <swiper class="swiper-section ml-6 " ref="swiper" :options="swiperOptions">
    <swiper-slide v-for="(item, index) of items" :key="index">
      <span class=" mt-md-2 mb-1 mb-sm-4 mb-md-5 d-none d-sm-block">{{ item.name }}</span>
      <img :src="item.img" alt="">
      <span class="mt-1  d-block d-sm-none">{{ item.name }}</span>
    </swiper-slide>
    <div v-for="(item, index) of items" class="swiper-pagination" slot="pagination">
      <span></span>
    </div>
  </swiper>
</template>

<script>
import '../plugins/vue-awesome-swiper'

export default {
  name: "swiper-section",
  props: ["swiperOptions", "items"],
  data() {
    return {

    }
  },
}
</script>

<style lang="scss">
.swiper-section {
  height: 100%;
  width: 100% !important;


  @include up($sm) {
    min-height: 350px;
    margin-left: 0;

  }

  @include up(1270px) {
    height: auto;
  }



  img {
    object-fit: cover;
    width: 100%;

    height: 230px;
    @include up($sm) {
      height: 320px;
    }
    @include up(1270px) {
      height: 392px;
    }
    @include up($lg) {
     height: 460px;
    }
  }

  span {
    font-weight: 400;
    font-size: 18px;
    line-height: 130%;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: $dark-grey2;
    @include up($sm) {
      font-size: 20px;
    }
    @include up($md) {
      font-size: 30px;
    }
  }
  .swiper-pagination {

    z-index: 11;
    bottom: 0;
    text-align: start;
    &-bullet {
      width: 15px;
      height: 15px;;
      background: $secondary-2;
      border-radius: 0;

      margin-right: 15px !important;
    }

    &-bullet-active {
      background: $secondary-1;
    }
  }

}

</style>