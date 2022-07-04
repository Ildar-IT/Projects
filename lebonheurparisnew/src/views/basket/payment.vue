<template>
  <div class="payment margin-top-main ">
    <v-container>
      <h4 class="text-center my-primary mb-16">SELECT PAYMENT</h4>
      <div class="payment__wrapper mb-8 d-flex justify-space-around mx-auto">
        <BtnPrimary label="CARD ONLINE"/>
        <BtnPrimary disabled="true" label="CASH"/>
      </div>
      <div class="d-none d-sm-block payment__checkbox d-flex justify-center align-center mx-auto mb-8">
        <v-checkbox></v-checkbox>
        <div class="payment__label my-text-2">I have read and accept the <a href="#">General terms and
          conditions of sale</a></div>
      </div>
      <Divider class="d-block d-sm-none my-8"/>
      <div class="my-text-2 text-center">Delivery cost: <span class="ml-1">7 €</span></div>
      <h3 class="text-center mt-4 mb-8">TOTAL: <span class="ml-1">150.2 €</span></h3>
      <BtnPrimary class="d-block large mx-auto " label="PLACE ORDER"/>
      <button  class="d-block d-sm-none payment__delete mx-auto d-block mt-8">
        <span class="size1 ">Clear cart</span>
      </button>
    </v-container>
  </div>
</template>

<script>
import Divider from "../../components/divider";
import BtnPrimary from '../../components/btn-primary';
export default {
  name: "payment",
  components: {
    BtnPrimary,
    Divider
  },
}
</script>

<style lang="scss">
.payment {

  @include up($sm) {
    margin-bottom: 97px;
  }
  &__wrapper {
    width: 202px;
  }

  .my-text-2, h3 {
    color: $black !important;
  }

  &__checkbox {
    width: 470px;

    .v-input {
      .v-icon {
        color: $primary-500;
      }
    }
  }

  &__delete {
    .size1 {
      color: $black-100;
    }
  }
}
</style>