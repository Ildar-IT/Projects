<template>
  <div class="cart mb-16 mb-sm-0" >
    <v-row class="cart-item  mx-auto">
      <v-col cols="12" sm="6" class="d-sm-flex align-sm-center pa-0">
        <img class="cart-item__box-img d-none d-sm-block" :src=itemObj.img alt="Box">
        <img class="cart-item__box-img mx-auto d-block d-sm-none" :src=itemObj.imgMobile alt="Box">
        <div class="my-8 my-sm-0 ml-sm-8 text-center text-sm-start"><h4>{{itemObj.name}}</h4>
          <span  class="my-text-2">{{itemObj.descr}}</span>
        </div>
      </v-col>
      <v-col cols="12" sm="6" class="pa-0 d-sm-flex justify-sm-end align-sm-center">
        <div class="cart__wrapper text-center text-sm-start d-sm-flex justify-sm-space-between align-sm-center">
          <h4 class="cart-price d-block d-sm-none">{{ itemObj.price }}</h4>
          <Counter class="my-8 my-sm-0 mx-auto mx-sm-0" :counter="itemObj.counter"/>
          <h4  class="cart-price d-none d-sm-block">{{ itemObj.price }}</h4>
          <button class="cart-delete">
            <img class="d-none d-sm-block" src="../../assets/Basket/delete.svg" alt="Delete">
            <div class="d-block d-sm-none size1">Delete</div>
          </button>
        </div>
      </v-col>
    </v-row>
    <Divider v-if="itemObj.isDivider" class="d-none d-sm-block my-8"/>
  </div>
</template>

<script>
import Divider from "../../components/divider";
import Counter from "../../components/counter";
export default {
  name: "cart",
  components: {
    Divider,
    Counter
  },
  props: ["itemObj"],

  methods: {
    add: function () {
      this.itemObj.counter++;
    },
    sub: function () {
      if (this.itemObj.counter != 0) {
        this.itemObj.counter--;
       }
    }
  },
}
</script>

<style lang="scss">
.cart {
  width: 100%;

  &-item {
    min-height: 132px;
    &__box-img {
      width: 296px;
      height: 296px;
      @include up($sm) {
        width: auto;
        height: auto;
      }
    }
  }

  &__counter {
    width: 100%;
    max-width: 90px;
    height: 41px;
    border: 2px solid $black-50;
  }

  &__wrapper {
    width: 100%;
    @include up($sm) {
      max-width: 320px;
    }

  }



  &-price {
    color: $black !important;
  }

  &-delete {

    @include up($sm) {
      width: 32px;
      height: 32px;
    }
    .size1 {
      color: $black-100;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  h3, h4, .my-text-2 {
    color: $primary-500;
  }
}
</style>