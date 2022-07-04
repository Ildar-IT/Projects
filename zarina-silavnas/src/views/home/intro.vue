<template>
  <div class="intro">
    <div class="intro__nav mx-auto d-none d-sm-flex justify-space-between align-center">
      <a href="#">узнай свою стихию</a>
      <a href="#">стать амбассадором</a>
      <a href="#">о проекте #силавнас</a>
    </div>
    <v-container class="d-flex flex-column justify-space-between justify-sm-end">
      <h1 class="text-center">Стань амбассадором бренда Zarina</h1>
      <div>
        <span class="d-block text-center my-8 mb-6 mx-auto">Присоединяйся к большому женскому сообществу и прими участие в съемках рекламной кампании!</span>
        <BtnLink class="mx-auto mb-sm-7" label="присоединиться"/>
      </div>
    </v-container>
  </div>
</template>

<script>
import BtnLink from '../../components/btn-link.vue'
export default {
  name: "intro",
  components: {
    BtnLink
  }
}
</script>

<style lang="scss">
.intro {
  width: 100%;
  height: 480px;
  background: url('../../assets/intro/bg.jpg') center no-repeat;
  background-size: cover;

  @include up($sm) {
    height: 700px;
    background: url('../../assets/intro/bg-lg.jpg') center no-repeat;
    background-size: cover;
  }
  .container {
    @include up($sm) {
      height: calc(100% - 48px);
    }
  }

  &__nav {
    max-width: 812px;
    height: 48px;
    a {
      display: block;
      font-weight: bold;
      line-height: 24px;
      font-size: 15px;
      text-decoration-line: underline;
      color: $white-color !important;
    }
  }

  span {
    width: 100%;
    max-width: 700px;
    font-weight: bold;
    font-size: 14px;
    line-height: 19.74px;
    color: $white-color;
    @include up($sm) {
      font-weight: normal;
      font-size: 20px;
      line-height: 28.2px;
      letter-spacing: 0.09em;
    }
  }
  .btn-link {
    width: 170px;
    @include up($sm) {
      width: 219px;
    }
  }

}
</style>