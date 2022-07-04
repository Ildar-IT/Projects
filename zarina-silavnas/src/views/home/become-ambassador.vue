<template>
  <div class="become-ambassador">
    <v-container>
      <div class="become-ambassador__title text-center mx-auto">
        Мы верим в безграничные возможности каждойиз нас и считаем, ты тоже можешь стать амбассадором Zarina!
      </div>
      <BtnLink class="mx-auto mt-8" label="стать амбассадором"/>

    </v-container>
    <div class="become-ambassador__text text-center">
      #силавнас
    </div>
  </div>
</template>

<script>
import BtnLink from '../../components/btn-link.vue'
export default {
  name: "become-ambassador",
  components: {
    BtnLink
  }
}
</script>

<style lang="scss">
.become-ambassador {
  position: relative;
  padding: 54px 0 140px 0;
  &__title {
    max-width: 1167px;
    font-weight: bold;
    font-size: 21px;
    line-height: 29.4px;
    color: $black-color;
    @include up($sm) {
      font-size: 30px;
      line-height: 42px;
    }
  }
  &__text {
    position: absolute;
    width: 100%;
    font-weight: bold;
    font-size: 65px;
    line-height: 104px;

    color: #F2F2F2;
    @include up($sm) {
      font-size: 116px;
      line-height: 185px;
    }
  }
  .btn-link {
    width: 216px;
    @include up($sm) {
      width: 269px;
    }
  }
}
</style>