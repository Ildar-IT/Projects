<template>
  <section v-if="isPopupBasket" class="pop-up-basket ">
    <div class="pop-up-basket__wrapper py-11">
      <v-container >
        <Carts/>
        <h3 class="text-center mt-16 mb-8">TOTAL: <span class="ml-1">150.2 €</span></h3>
        <router-link  to="/basket" >
          <BtnPrimary class="d-block large mx-auto " label="Checkout"/>
        </router-link>
      </v-container>
      <button @click="popupClose" class="pop-up-basket__close"></button>
    </div>
  </section>
</template>

<script>
import Carts from "./carts";
import BtnPrimary from '../../components/btn-primary';
export default {
  name: "pop-up-basket",
  components: {
    Carts,
    BtnPrimary
  },
  computed: {
    isPopupBasket() {
      return this.$store.state.isPopupBasket;
    },

  },
  methods: {
    popupClose() {
      this.$store.state.isPopupBasket = false;
    }
  }
}

</script>

<style lang="scss">
.pop-up-basket {
  z-index: 99;
  position: fixed;
  top:0;
  background: rgba(192,192,192, 0.5);
  width: 100%;
  height: 100%;
  overflow: auto;
  &__wrapper {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: auto;
    background: white;
  }
  &__close {
    position: absolute;
    background: url("../../assets/close.svg") no-repeat center;
    background-size: cover;
    top: 55px;
    right: 55px;
    width: 18px;
    height: 18px;
    &:hover {
      opacity: 0.7;
    }
  }
}
</style>