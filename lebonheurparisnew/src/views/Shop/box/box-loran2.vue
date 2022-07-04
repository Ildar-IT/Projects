<template>
  <section class="box-loran2">
    <v-container >
        <v-row>
          <v-col cols="12" sm="2">
            <img class="box-loran2__img d-block mx-auto mx-sm-0" src="../../../assets/box/angel-box.jpg" alt="Angel Box">
          </v-col>
          <v-col cols="12" sm="8" class="text-center text-sm-start px-0">
            <h3 class="my-primary">GIFT BOX 3-DRAWER </h3>
            <div class="size1 my-primary ">27 pcs</div>
            <h3 class="my-black mt-4">15.6 €</h3>
          </v-col>

          <v-col cols="12" sm="2" class="pa-0 text-center ">
            <div class="box-loran2__choice d-flex  justify-center ">
              <div class="box-loran2__choice-item mt-12 mt-sm-0 d-sm-flex flex-column justify-center">
                <div class="box-loran2__choice-item-img active d-flex align-center justify-center mx-auto">
                  <img src="../../../assets/box/laurent.svg" alt="Laurent">
                </div>
                <div class="my-text-2 active-text mt-4">Set by Laurent Moreno</div>
              </div>
            </div>
          </v-col>
          <v-col   cols="12" sm="4" class="d-none d-sm-flex justify-center">
            <CandySelect :itemObj="item"/>
          </v-col>
          <v-col  class="d-none d-sm-block " cols="12" sm="4" >
            <CandySelect :itemObj="item"/>
          </v-col>
          <v-col  class="d-none d-sm-block " cols="12" sm="4" >
            <CandySelect :itemObj="item"/>
          </v-col>
          <swiper  class="d-block d-sm-none" :options="swiperOption">
            <swiper-slide>
              <CandySelect :itemObj="item"/>
            </swiper-slide>
            <swiper-slide>
              <CandySelect :itemObj="item"/>
            </swiper-slide>
            <swiper-slide>
              <CandySelect :itemObj="item"/>
            </swiper-slide>
          </swiper>

          <FlavoursSwiper  class=" d-block d-sm-none mt-12"/>
          <v-col class="py-0">
            <div class="box-loran2__payment d-flex align-center justify-space-between mx-auto mt-12 mt-sm-0 mx-sm-0">
              <BtnPrimary class="d-none large   d-sm-block" label="Add to cart 15.6 €"/>
              <Counter :counter="counter"/>
              <BtnPrimary class="large ml-4 d-sm-none" label="Add to cart 15.6 €"/>
            </div>
          </v-col>

          <v-col class="d-none d-sm-block " cols="12">
            <CandyItems :items="CandyItems"/>
          </v-col>
        </v-row>
    </v-container>
  </section>
</template>

<script>
import CandySelect from './elements/candy-select'
import CandyItems from './elements/candy-items'
import BtnPrimary from '@/components/btn-primary';
import Counter from '@/components/counter';
import FlavoursSwiper from "@/components/flavours-swiper";

export default {
  name: "box-loran2",
  components: {
    CandySelect,
    CandyItems,
    BtnPrimary,
    Counter,
    FlavoursSwiper
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1.1,
        navigation: {
          nextEl: "#collection-slider-btn-next",
          prevEl: "#collection-slider-btn-prev",
        },
        spaceBetween: 20,
        loop: false,
        //initialSlide: 1,
        //centeredSlides: true,
      },
      counter: 1,
      item: {
        image1: require('@/assets/box/candy-items/coconut.svg'),
        image2: require('@/assets/box/candy-items/puffed.svg'),
        image3: require('@/assets/box/candy-items/croquant.svg'),
        image4: require('@/assets/box/candy-items/goji.svg'),
        image5: require('@/assets/box/candy-items/macarons.svg'),
        image6: require('@/assets/box/candy-items/lavender.svg'),
        image7: require('@/assets/box/candy-items/cherries.svg'),
        image8: require('@/assets/box/candy-items/walnuts.svg'),
        image9: require('@/assets/box/candy-items/cashew.svg'),
        isDescr: false,
        isSetting: false,
        isPayment: false,
        counter: 1,
      },
      CandyItems: [
        {
          id: 1,
          cols: 2,
          img: require('@/assets/box/candy-items/walnuts.svg'),
          descr: 'Walnuts + caramel milk chocolate'
        },
        {
          id: 2,
          cols: 2,
          img: require('@/assets/box/candy-items/covered.svg'),
          descr: 'Christmas tea covered'
        },
        {
          id: 3,
          cols: 2,
          img: require('@/assets/box/candy-items/pistachios.svg'),
          descr: 'Pistachios + basil milk chocolate'
        },
        {
          id: 4,
          cols: 2,
          img: require('@/assets/box/candy-items/madagascar.svg'),
          descr: 'Madagascar vanilla + hazelnuts'
        },
        {
          id: 5,
          cols: 2,
          img: require('@/assets/box/candy-items/blueberries.svg'),
          descr: 'Praline with blueberries'
        },
        {
          id: 6,
          cols: 2,
          img: require('@/assets/box/candy-items/puffed.svg'),
          descr: 'Puffed rice + ginger milk chocolate'
        },
        {
          id: 7,
          cols: 2,
          img: require('@/assets/box/candy-items/croquant.svg'),
          descr: 'Croquant milk chocolate'
        },
        {
          id: 8,
          cols: 2,
          img: require('@/assets/box/candy-items/tonka.svg'),
          descr: 'Tonka beans Milk chocolate'
        },
        {
          id: 9,
          cols: 2,
          img: require('@/assets/box/candy-items/cashew.svg'),
          descr: 'Cashew + hibiscus tea milk chocolate'
        },
        {
          id: 10,
          cols: 2,
          img: require('@/assets/box/candy-items/goji.svg'),
          descr: 'Goji berries dark chocolate'
        },
        {
          id: 11,
          cols: 2,
          img: require('@/assets/box/candy-items/macarons.svg'),
          descr: 'Macarons Dark chocolate'
        },
        {
          id: 12,
          cols: 2,
          img: require('@/assets/box/candy-items/lavender.svg'),
          descr: 'Praline with lavender'
        },
        {
          id: 13,
          cols: 2,
          img: require('@/assets/box/candy-items/cherries.svg'),
          descr: 'Cherries + almond cookies'
        },
        {
          id: 14,
          cols: 2,
          img: require('@/assets/box/candy-items/sesame.svg'),
          descr: 'Sesame + sea salt dark chocolate'
        },
        {
          id: 15,
          cols: 2,
          img: require('@/assets/box/candy-items/cranberries.svg'),
          descr: 'Praline with cranberries + mint'
        },
        {
          id: 16,
          cols: 2,
          img: require('@/assets/box/candy-items/coconut.svg'),
          descr: 'Coconut milk chocolate'
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.box-loran2 {
  padding-top: 32px;
  //padding-bottom: 64px;
  @include up($sm) {
    padding-top: 96px;
    padding-bottom: 128px;
  }

  &__img {
    max-width: 120px;
  }

  &__payment {
    width: 100%;
    max-width: 300px;
    @include up($sm) {
      max-width: 325px;
    }

    .btn-primary {
      width: 196px;
    }

    .counter {
      height: 50px;
    }
  }

  &__choice {
    @include up($sm) {
      height: 100%;

    }

    &-item {
      width: 132px;
      @include up($sm) {
        width: 100%;
        height: auto;
      }

      &-img {
        width: 78px;
        height: 78px;
      }

      .active {
        border: 2px solid $primary-500;
        border-radius: 100%;
      }

      .active-text {
        color: $primary-500;
      }

      img {

        width: 64px;
        height: 64px;
      }
    }
  }

  .candy-select {
    .block {
      img {
        width: 74px;
        height: 74px;
        @include up($lg) {
          width: 80px;
          height: 80px;
        }
      }
    }
  }
}

</style>