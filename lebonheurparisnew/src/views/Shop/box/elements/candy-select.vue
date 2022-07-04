<template>
  <section class="candy-select mt-12">

    <div class="candy-select__wrapper mx-auto mx-sm-0">
      <div v-for="(item, key) in boxItems" :key="key" @click="$emit('select', item, key)"
           class="block d-flex justify-center align-center">
        <img v-if="item && item.PREVIEW_PICTURE" :src="item.PREVIEW_PICTURE" :alt="item.NAME">
        <img v-else src="@/assets/box/plus.svg" alt="Empty">
      </div>
    </div>
    <div v-if="ui.withSetting" class="candy-select__settings d-flex justify-space-between mt-8 mx-auto mx-sm-0">
      <div class="candy-select__settings-item d-flex flex-column align-center">
        <button><img src="@/assets/box/random.svg" alt="Random"></button>
        <h6>Random</h6>
      </div>
      <div class="candy-select__settings-item d-flex flex-column align-center">
        <button><img src="@/assets/box/reset.svg" alt="Random"></button>
        <h6>Reset</h6>
      </div>
      <div class="candy-select__settings-item d-flex flex-column align-center">
        <button><img src="@/assets/box/pulse.svg" alt="Random"></button>
        <h6>Collect another set</h6>
      </div>
    </div>
    <div v-if="ui.withDescr" class="d-sm-none candy-select__settings-descr  my-text-2 text-center my-12">
      Choose your flavors. Click on praline image, and it will appear in your box. Create your set.
    </div>
    <FlavoursSwiper v-if="ui.withFlavoursBox" class="d-block d-sm-none mt-12"/>
    <div v-if="ui.withPayment"
         class="candy-select__payment d-flex align-center justify-space-between mx-auto mt-12 mx-sm-0">
      <BtnPrimary :click="false" class="d-none large   d-sm-block" label="Add to cart 15.6 €"/>
      <Counter :counter="ui.counter"/>
      <BtnPrimary :click="false" class="large ml-4 d-sm-none" label="Add to cart 15.6 €"/>
    </div>
  </section>
</template>

<script>
import BtnPrimary from '@/components/btn-primary';
import Counter from '@/components/counter';
import FlavoursSwiper from "@/components/flavours-swiper";

export default {
  name: "candy-select",
  components: {
    BtnPrimary,
    Counter,
    FlavoursSwiper
  },
  props: ["ui", "boxItems", "candyItems"],

}
</script>

<style lang="scss">
.candy-select {
  width: 100%;

  &__wrapper {
    max-width: 300px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 99px);
    border: 4px solid $primary-100;
    @include up($sm) {
      max-width: 325px;
      grid-template-rows: repeat(3, 107px);
    }

    .block {
      border: 1px solid $primary-100;

      img {
        border: 1px solid $primary-100;
        border-radius: 8px;
        width: 74px;
        height: 74px;
        @include up($sm) {
          width: 80px;
          height: 80px;
        }
      }
    }


  }

  &__settings, &__payment {
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


}
</style>