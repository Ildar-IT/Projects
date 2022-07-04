<template>
  <div class="carts">
    <v-container >
      <h3 class="text-center margin-bottom-main ">YOUR CART</h3>
      <button  class="carts-clear d-none d-sm-block"><span class="size1">Clear</span></button>
      <Cart :itemObj="item"/>
      <Cart :itemObj="item2"/>

    </v-container>
  </div>
</template>

<script>
import Cart from "./cart"
export default {
  name: "carts",
  components: {
    Cart
  },
  data() {
    return {
      item: {
        img: require('@/assets/Basket/angel-box.jpg'),
        imgMobile: require('@/assets/Shop/original-pralines/item1.jpg'),
        name: "ANGEL BOX",
        descr: "4 pcs",
        counter: 0,
        price: "109.2 €",
        isDivider: true
      },
      item2: {
        img: require('../../assets/Basket/paris.jpg'),
        imgMobile: require('@/assets/Shop/original-pralines/item3.jpg'),
        name: "PARIS, TU ME MANQUES",
        descr: "9 pcs",
        counter: 0,
        price: "34 €",
        isDivider: false
      }
    }
  },

}
</script>

<style lang="scss">
.carts {
  .container {
    position: relative !important;
  }

  &-clear {
    position: absolute;
    top: -10px;
    right: 0;

    span {
      @include transition();
      color: $black-100;

      &:hover {
        color: $black-200;
      }
    }
  }


  h3, h4, .my-text-2 {
    color: $primary-500;
  }
}
</style>