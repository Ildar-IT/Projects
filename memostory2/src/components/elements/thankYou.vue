<template>
  <v-dialog ref="thankYou"
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="fade-transition">

    <div class="thank-you d-flex justify-center align-center px-4">
      <svgicon original name="dandelion-full" width="484" height="645" color="#ECE3CF"
               class="thank-you__bg ml-2 mt-lg-n5"></svgicon>

      <div class="thank-you__wrapper">
        <div class="thank-you__check mx-auto d-flex justify-center align-center margin-bottom-main">
          <svgicon original name="check" color="#BA9568" :fill="false" width="67" height="67"></svgicon>
        </div>
        <h2 class="beige-text mb-lg-8 mb-4 text-center">{{ title }}</h2>
        <p class="body-1 text-center">{{ message }}</p>

          <v-btn maxWidth="100" large class="primary margin-top-small mx-auto" @click="close">
            <span> OK </span>
          </v-btn>

      </div>

    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'thankYou',
  props: {message: String, title: String},
  data: () => ({
    dialog: false,
  }),
  computed: {},
  methods: {
    showThankyou() {
      this.dialog = true;
      setTimeout(() => {
        this.dialog = false
      }, 5000)
    },
    close() {
      this.dialog = false
    }
  },

}
</script>

<style lang="scss">
.thank-you {
  height: 100%;
  background: $background;

  &__bg {
    position: fixed;
    z-index: 0;
  }

  &__wrapper {
    height: fit-content;
    z-index: 1;
    position: fixed;
    top: 50%;
    margin-top: -130px;
   // margin-left: -16px;
    display: flex;
    flex-direction: column;
    width: 90%;
    @include up($md) {
      width: 100%;
    }
  }

  &__check {
    border-radius: 100%;
    background-color: $beige7;
    width: 100px;
    height: 100px;
  }

  p {
    color: $grey1;
  }
}
</style>
