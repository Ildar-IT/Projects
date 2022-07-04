<template>
  <div class="basket">
      <div class="basket__wrapper mx-auto padding-top-main">
        <Carts/>
        <Details/>
        <Address/>
        <Payment/>
      </div>
  </div>
</template>

<script>

import Carts from './basket/carts';
import Details from './basket/details';
import Address from './basket/address';
import Payment from './basket/payment';

export default {
  name: "basket",
  components: {
    Carts,
    Payment,
    Details,
    Address,

  },

}
</script>

<style lang="scss">
.basket {
  margin-top: 128px;

  &__wrapper {
    position: relative;
    @include up($sm) {
      max-width: 952px;
    }
    @include up($lg) {
      max-width: 1048px;
    }

  }


}
</style>