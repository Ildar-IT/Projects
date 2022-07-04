<template>
  <div :class="{'collection-popup--active':isVisible}"
       class="collection-popup d-flex flex-column justify-space-between pt-16">
    <button @click="$emit('closePopup')" class="collection-popup__close"></button>
    <v-container>
      <div class="collection-popup__header d-flex justify-space-between text-center">
        <h4 v-for="(section, sectionIndex) of sections" @click="setActiveSection(section)" :key="sectionIndex"
            :class="{'my-primary' :(currentSectionId === section.ID)}">{{ section.NAME }}
          <!-- Original Collection, Seasonal Collection-->
          <span v-if="section.amount">{{ section.amount }}</span>
        </h4>
      </div>
      <v-row v-if="itemsOfSection && itemsOfSection.length" class="mt-6">
        <v-col cols="4" v-for="(item, index) of itemsOfSection" :key="index" class="d-flex justify-center">
          <div class="collection-popup__wrapper text-center">
            <span v-if="item.amount" class="collection-popup__wrapper-before">{{ item.amount }}</span>
            <img @click="addCandyItem(item)" :class="{'collection-popup__wrapper-img-active' :item.amount}"
                 :src=item.img alt="Candy">
            <div class="my-text-2">{{ item.NAME }}</div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div class="collection-popup__footer px-7 text-center d-flex justify-space-between align-center">
      <h4 class="my-primary"> {{ selectItemsLength }} / 9</h4>
      <BtnPrimary :click="addToBox" class="large " label="Add to box"/>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BtnPrimary from '@/components/btn-primary';

export default {
  name: "collection-popup",
  components: {
    BtnPrimary
  },
  props: ["isVisible", "candy-items"],
  data() {
    return {
      isActiveSection: false,
      currentSectionId: null,

      // todo review code
      numberOfSelected: 0,
      numberOfSelected2: 0,
      selectItemsLength: 0,
      selectItems: [],

      off_candyItems: [
        {
          id: 1,
          cols: 4,
          img: require('@/assets/box/candy-items/walnuts.svg'),
          descr: 'Walnuts + caramel milk chocolate',
          counter: 0,
          click: 0,
          isBeforeActive: false,
        },
        {
          id: 2,
          cols: 4,
          img: require('@/assets/box/candy-items/puffed.svg'),
          descr: 'Puffed rice + ginger milk chocolate',
          counter: 0,
          click: 0,
          isBeforeActive: false,
        },
        {
          id: 3,
          cols: 4,
          img: require('@/assets/box/candy-items/croquant.svg'),
          descr: 'Croquant milk chocolate',
          counter: 0,
          click: 0,
          isBeforeActive: false,
        },
        {
          id: 4,
          cols: 4,
          img: require('@/assets/box/candy-items/lavender.svg'),
          descr: 'Praline with lavender',
          counter: 0,
          click: 0,
          isBeforeActive: false,
        },
        {
          id: 5,
          cols: 4,
          img: require('@/assets/box/candy-items/cashew.svg'),
          descr: 'Cashew + hibiscus tea milk chocolate',
          counter: 0,
          click: 0,
          isBeforeActive: false,
        },
        {
          id: 6,
          cols: 4,
          img: require('@/assets/box/candy-items/goji.svg'),
          descr: 'Goji berries dark chocolate',
          counter: 0,
          click: 0,
          isBeforeActive: false,
        },
        {
          id: 7,
          cols: 4,
          img: require('@/assets/box/candy-items/macarons.svg'),
          descr: 'Macarons Dark chocolate',
          counter: 0,
          click: 0,
          isBeforeActive: false,
        },
        {
          id: 8,
          cols: 4,
          img: require('@/assets/box/candy-items/coconut.svg'),
          descr: 'Coconut milk chocolate',
          counter: 0,
          click: 0,
          isBeforeActive: false,
        },
        {
          id: 9,
          cols: 4,
          img: require('@/assets/box/candy-items/cherries.svg'),
          descr: 'Cherries + almond cookies',
          counter: 0,
          click: 0,
          isBeforeActive: false,
        },
        {
          id: 10,
          cols: 4,
          img: require('@/assets/box/candy-items/blueberries.svg'),
          descr: 'Walnuts + caramel milk chocolate',
          counter: 0,
          click: 0,
          isBeforeActive: false,
        },
        {
          id: 11,
          cols: 4,
          img: require('@/assets/box/candy-items/covered.svg'),
          descr: 'Puffed rice + ginger milk chocolate',
          counter: 0,
          click: 0,
          isBeforeActive: false,
        },
        {
          id: 12,
          cols: 4,
          img: require('@/assets/box/candy-items/cranberries.svg'),
          descr: 'Croquant milk chocolate',
          counter: 0,
          click: 0,
          isBeforeActive: false,
        },
        {
          id: 13,
          cols: 4,
          img: require('@/assets/box/candy-items/tonka.svg'),
          descr: 'Praline with lavender',
          counter: 0,
          click: 0,
          isBeforeActive: false,
        },
      ]
    }
  },
  computed: {
    isPopupFlavours() {
      return this.$store.state.isPopupFlavours;
    },

    sections() {
      return [
        {
          ID: 1,
          NAME: "Original Collection",
          amount: 0,
        },
        {
          ID: 2,
          NAME: "Seasonal Collection",
          amount: 0,
        }
      ]
    },
    itemsOfSection() {
      return this.candyItems?.filter(el => el.SECTION_ID === this.currentSectionId);
    }
  },
  methods: {
    popupClose() {
      this.$store.state.isPopupFlavours = false;
    },

    setActiveSection(section) {
      this.currentSectionId = section.ID;
    },

    addCandyItem(item) {
      Vue.set(item, "amount", (item.amount ? ++item.amount : 1));
      console.log(item);
      /*if (this.selectItems.length >= 9) return;

      obj.counter++;
      obj.isBeforeActive = true;

      this.selectItems[this.selectItemsLength] = obj.img;
      this.selectItemsLength++;

      console.log(this.selectItems);*/

      //this.$emit("add", item);

    },
    addToBox() {
      /*if (this.selectItems.length < 9) return;
      this.$store.state.myBoxImages = [...this.selectItems];
      this.$store.state.isPopupFlavours = false;*/

      this.$emit("done");
    },
  },
  mounted() {

    this.currentSectionId = this.sections[0].ID;
  }
}
</script>

<style lang="scss">
.collection-popup {
  background: white;

  z-index: 20;
  top: 100%;
  display: none;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;

  @include transition-long();

  &--active {
    top: 0;
    display: block;
    overflow: auto;
  }

  &__header {
    h4 {
      position: relative;

      span {
        position: absolute;
        top: -8px;
        right: 10px;
        z-index: 20;
        width: 24px;
        height: 24px;
        background: #FF5733;
        border-radius: 100%;
        padding: 0 0 0 2px;
        font-size: 16px;
        line-height: 23px;
        color: white;
      }
    }
  }


  &__close {
    position: absolute;
    background: url("../../../assets/close.svg") no-repeat center;
    background-size: cover;
    top: 23px;
    right: 23px;
    width: 18px;
    height: 18px;

    &:hover {
      opacity: 0.7;
    }
  }

  &__wrapper {
    width: 95px;
    position: relative;

    &-before {
      position: absolute;
      top: -8px;
      right: -0px;
      z-index: 20;
      width: 24px;
      height: 24px;
      background: #FF5733;
      border: 3px solid white;
      border-radius: 100%;
      font-size: 12px;
      line-height: 16px;
      color: white;

    }


    img {
      width: 74px;
      height: 74px;
    }

    &-img-active {
      opacity: 0.5;
    }

  }

  &__footer {
    background: $primary-50;
    width: 100%;
    height: 82px;

    h4 {
      width: 92px;
    }

    .btn-primary {
      width: 196px;
    }
  }
}
</style>