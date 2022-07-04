<template>
  <section class="box-loran">
    <v-container >
        <v-row>
          <v-col cols="12" sm="2">
            <img class="box-loran__img d-block mx-auto mx-sm-0" src="../../../assets/box/angel-box.jpg" alt="Angel Box">
          </v-col>
          <v-col cols="12" sm="7" class="text-center text-sm-start px-0">
            <h3 class="my-primary">ANGEL BOX</h3>
            <div class="size1 my-primary ">9 pcs</div>
            <h3 class="my-black mt-4">15.6 €</h3>
          </v-col>

          <v-col cols="12" sm="3" class=" text-center">
            <div class="box-loran__choice d-flex  justify-center justify-sm-start">
              <div class="box-loran__choice-item mt-12 mt-sm-0  d-sm-flex flex-column justify-end">
                <div class="box-loran__choice-item-img active d-flex align-center justify-center mx-auto">
                  <img src="../../../assets/box/laurent.svg" alt="Laurent">
                </div>
                <div class="my-text-2 active-text mt-4">Set by Laurent Moreno</div>
              </div>
              <div class="box-loran__choice-item mt-12 mt-sm-0 d-sm-flex flex-column justify-end mb-sm-4">
                <div class="box-loran__choice-item-img  d-flex align-center justify-center mx-auto">
                  <router-link to="/shop/box/my">
                    <img class="d-block" src="../../../assets/box/your.svg" alt="My choice">
                  </router-link>
                </div>
                <div class="my-text-2 mt-4 ">Your choice</div>
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="5">
            <CandySelect :itemObj="item"/>
          </v-col>


          <v-col class="d-none d-sm-block " cols="7">
            <CandyItems :items="CandyItems"/>
          </v-col>
        </v-row>
    </v-container>
  </section>
</template>

<script>
import CandySelect from './elements/candy-select'
import CandyItems from './elements/candy-items'

export default {
  name: "box-loran",
  components: {
    CandySelect,
    CandyItems
  },
  data() {
    return {
      item: {
        images: [
          require('@/assets/box/candy-items/coconut.svg'),
          require('@/assets/box/candy-items/puffed.svg'),
          require('@/assets/box/candy-items/croquant.svg'),
          require('@/assets/box/candy-items/goji.svg'),
          require('@/assets/box/candy-items/macarons.svg'),
          require('@/assets/box/candy-items/lavender.svg'),
          require('@/assets/box/candy-items/cherries.svg'),
          require('@/assets/box/candy-items/walnuts.svg'),
          require('@/assets/box/candy-items/cashew.svg'),
        ],

        isDescr: false,
        isSetting: false,
        isPayment: true,
        counter: 1,
        isFlavoursBox: true,
      },
      CandyItems: [
        {
          id: 1,
          cols: 3,
          img: require('@/assets/box/candy-items/walnuts.svg'),
          descr: 'Walnuts + caramel milk chocolate'
        },
        {
          id: 2,
          cols: 3,
          img: require('@/assets/box/candy-items/puffed.svg'),
          descr: 'Puffed rice + ginger milk chocolate'
        },
        {
          id: 3,
          cols: 3,
          img: require('@/assets/box/candy-items/croquant.svg'),
          descr: 'Croquant milk chocolate'
        },
        {
          id: 4,
          cols: 3,
          img: require('@/assets/box/candy-items/lavender.svg'),
          descr: 'Praline with lavender'
        },
        {
          id: 5,
          cols: 3,
          img: require('@/assets/box/candy-items/cashew.svg'),
          descr: 'Cashew + hibiscus tea milk chocolate'
        },
        {
          id: 6,
          cols: 3,
          img: require('@/assets/box/candy-items/goji.svg'),
          descr: 'Goji berries dark chocolate'
        },
        {
          id: 7,
          cols: 3,
          img: require('@/assets/box/candy-items/macarons.svg'),
          descr: 'Macarons Dark chocolate'
        },
        {
          id: 8,
          cols: 3,
          img: require('@/assets/box/candy-items/coconut.svg'),
          descr: 'Coconut milk chocolate'
        },
        {
          id: 9,
          cols: 3,
          img: require('@/assets/box/candy-items/cherries.svg'),
          descr: 'Cherries + almond cookies'
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.box-loran {
  padding-top: 32px;
  //padding-bottom: 64px;
  @include up($sm) {
    padding-top: 96px;
    padding-bottom: 192px;
  }


  &__img {
    max-width: 120px;
  }

  &__choice {
    @include up($sm) {
      height: 100%;

    }

    &-item {
      width: 132px;
      @include up($sm) {
        width: 100%;
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
}

</style>