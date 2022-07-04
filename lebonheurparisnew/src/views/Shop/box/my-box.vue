<template>
  <section class="my-box">
    <v-container>
      <CollectionPopup :candy-items="candyItems"
                       :box-items="boxItems"
                       :is-visible="isPopupFlavours"
                       @done="onAddCandies"
                       @closePopup="onClosePopup"
      />
      <v-row>
        <v-col cols="12" sm="2">
          <img class="my-box__img d-block mx-auto mx-sm-0" src="../../../assets/box/angel-box.jpg" alt="Angel Box">
        </v-col>
        <v-col cols="12" sm="2" class="text-center text-sm-start px-0">
          <h3 class="my-primary">ANGEL BOX</h3>
          <div class="size1 my-primary ">9 pcs</div>
          <h3 class="my-black mt-4">15.6 €</h3>
        </v-col>
        <v-col cols="5" class="d-none d-sm-flex align-end">
          <div class="my-text-2 text-center ">
            Choose your flavors. Click on praline image, and it will appear in your box. Create your set.
          </div>
        </v-col>
        <v-col cols="12" sm="3" class=" text-center">
          <div class="my-box__choice d-flex  justify-center justify-sm-start">
            <div class="my-box__choice-item mt-12 mt-sm-0  d-sm-flex flex-column justify-space-between">
              <div class="my-box__choice-item-img d-flex align-center justify-center mx-auto">
                <router-link to="/shop/box/Laurent">
                  <img src="../../../assets/box/laurent.svg" alt="Laurent">
                </router-link>
              </div>
              <div class="my-text-2 mt-4">Set by Laurent Moreno</div>
            </div>
            <div class="my-box__choice-item mt-12 mt-sm-0 d-sm-flex flex-column justify-space-between mb-sm-4">
              <div class="my-box__choice-item-img active d-flex align-center justify-center mx-auto">
                <img class="d-block" src="../../../assets/box/your.svg" alt="Your choice">
              </div>
              <div class="my-text-2 active-text mt-4  mt-sm-0">Your choice</div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="5">
          <CandySelect :candy-items="candyItems" :box-items="boxItems" :ui="candySelectUI" @select="onSelectPlace"/>
        </v-col>

        <v-col class="d-none d-sm-block" cols="7">
          <CandyItems :items="candyItems"/>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import CandySelect from './elements/candy-select'
import CandyItems from './elements/candy-items'
import CollectionPopup from './collection-popup.vue'

export default {
  name: "my-box",
  components: {
    CandySelect,
    CandyItems,
    CollectionPopup
  },
  data() {
    return {
      isPopupFlavours: false,
      //selectedIndex: null,
      candySelectUI: {
        withDescr: true,
        counter: 0,
        withSetting: true,
        withPayment: true,
        withFlavoursBox: true,
        //images: [...this.$store.state.myBoxImages],
      },
      boxItems: [], // selected candies (in box)
      // all available porducts
      candyItems: [
        {
          img: require('@/assets/box/candy-items/walnuts.svg'),
          NAME: 'Walnuts + caramel milk chocolate',
          SECTION_ID: 1,
        },
        {
          img: require('@/assets/box/candy-items/covered.svg'),
          NAME: 'Christmas tea covered',
          SECTION_ID: 1,
        },
        {
          img: require('@/assets/box/candy-items/pistachios.svg'),
          NAME: 'Pistachios + basil milk chocolate',
          SECTION_ID: 1,
        },
        {
          img: require('@/assets/box/candy-items/madagascar.svg'),
          NAME: 'Madagascar vanilla + hazelnuts',
          SECTION_ID: 1,
        },
        {
          img: require('@/assets/box/candy-items/blueberries.svg'),
          NAME: 'Praline with blueberries',
          SECTION_ID: 1,
        },
        {
          img: require('@/assets/box/candy-items/puffed.svg'),
          NAME: 'Puffed rice + ginger milk chocolate',
          SECTION_ID: 1,
        },
        {
          img: require('@/assets/box/candy-items/croquant.svg'),
          NAME: 'Croquant milk chocolate',
          SECTION_ID: 1,
        },
        {
          img: require('@/assets/box/candy-items/tonka.svg'),
          NAME: 'Tonka beans Milk chocolate',
          SECTION_ID: 1,
        },
        {
          img: require('@/assets/box/candy-items/cashew.svg'),
          NAME: 'Cashew + hibiscus tea milk chocolate',
          SECTION_ID: 1,
          // todo for all the reset candies - put SECTION_ID
        },
        {
          img: require('@/assets/box/candy-items/goji.svg'),
          NAME: 'Goji berries dark chocolate',
          SECTION_ID: 2,
        },
        {
          img: require('@/assets/box/candy-items/macarons.svg'),
          NAME: 'Macarons Dark chocolate',
          SECTION_ID: 2,
        },
        {
          img: require('@/assets/box/candy-items/lavender.svg'),
          NAME: 'Praline with lavender',
          SECTION_ID: 2,
        },
        {
          img: require('@/assets/box/candy-items/cherries.svg'),
          NAME: 'Cherries + almond cookies',
          SECTION_ID: 2,
        },
        {
          img: require('@/assets/box/candy-items/sesame.svg'),
          NAME: 'Sesame + sea salt dark chocolate',
          SECTION_ID: 2,
        },
        {
          img: require('@/assets/box/candy-items/cranberries.svg'),
          NAME: 'Praline with cranberries + mint',
          SECTION_ID: 2,
        },
        {
          img: require('@/assets/box/candy-items/coconut.svg'),
          NAME: 'Coconut milk chocolate',
          SECTION_ID: 2,
        },
        {
          img: require('@/assets/box/candy-items/croquant.svg'),
          NAME: 'Croquant milk chocolate',
          SECTION_ID: 2,
        },

      ],
    }
  },
  methods: {
    onSelectPlace(item, index) {
      console.log("Showing popup dialog to choose candy for index: " + index);
      //console.log(this.myBoxImages)
      //console.log(this.$store.state.myBoxImages)
      //this.selectedIndex = index;
      this.isPopupFlavours = true;
    },
    onClosePopup() {
      this.isPopupFlavours = false;
    },
    onAddCandies() {


      this.isPopupFlavours = false;
      //console.log("Candies are being added. Place it to box! Index to use: "+this.selectedIndex);
      //this.boxItems[this.selectedIndex] = item;
      // todo
    }
  },
  mounted() {
    // todo replace boxSize with "size of selected box"
    const boxSize = 9;
    // fill box with "nothing" items
    for (let i = 0; i < boxSize; i++) {
      this.boxItems.push(null);
    }
  }
}
</script>

<style lang="scss">
.my-box {
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