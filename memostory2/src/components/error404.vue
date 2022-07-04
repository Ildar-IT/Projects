<template>
  <div class="error-page-400 error-page text-center px-4 d-flex align-center justify-center">
    <div class="error-page__wrapper mx-auto text-center">
      <h1 class="error-page__title beige-text">{{ code }}</h1>
      <h2 class="beige-text mb-lg-8 mb-4">{{ dialogs.notFound || title }}</h2>
      <p class="body-1 mb-lg-16">{{ dialogs.notFound2 || text }}</p>
      <div class="error-page__btn-wrapper mx-auto mt-lg-8 mt-8 mb-8">
        <router-link to="/">
          <v-btn class="btn-with-svg btn--secondary large d-flex align-center shadow" block dark>
            <svgicon name="home" width="24" height="24" original :fill="false" color="white"
                     class="mr-4"></svgicon>
            <span> {{ pageButtons.back ? pageButtons.back : "Вернуться" }} </span>
          </v-btn>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "error404",
  data: () => ({
    code: 404,
    title: 'Страница не найдена',
    text: 'Bозможно, она была удалена, или вы набрали неверный адрес'
  }),
  computed: {
    isWindowLG() {
      return this.$store.getters.isWindowLG;
    },
    isWindowMD() {
      return this.$store.getters.isWindowMD;
    },
    isWindowSM() {
      return this.$store.getters.isWindowSM;
    },
    dialogs() {
      return this.$store.state.common.dialogs || {};
    },
    pageButtons() {
      return this.$store.state.common.buttons || {};
    }
  }
}
</script>

<style lang="scss">
.error-page {
  //height: 100vh;
  padding-top: 30%;
  @include up($md){
    padding-top: 12%;
  }
  &__wrapper {
    z-index: 1;
  }

  &__title {
    font-size: 96px;
    line-height: 101px;
    font-weight: bold;
    font-family: $heading-font-family;

    @include up($md) {
      font-size: 300px;
      line-height: 236px;
      letter-spacing: -1.5px;
    }
  }

  h2 {
    font-size: 24px;
    line-height: 29px;
    @include up($md) {
      font-size: 60px;
      line-height: 65px;
    }
  }

  p {
    color: $grey1;
  }

  &__btn-wrapper {
    width: 253px;
  }


}
</style>