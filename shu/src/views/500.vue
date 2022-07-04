<template>
  <section class="server-error text-center">
    <v-container>
    <div v-html="texts.error500"/>
        <btn-blue :to="{name: 'Home'}"> {{ buttons.back }} </btn-blue>
    </v-container>
  </section>
</template>

<style lang="scss">
.server-error {
  height: calc(100vh - 119px);
  display: flex;
  justify-content: center;
  align-items: center;
  &__suptitle {
    font-size: 150px;
    line-height: 236px;
    color: $primary500;
    letter-spacing: -1.5px;
    @include up($sm) {
      font-size: 300px;
      line-height: 236px;
    }
  }
  &__title {
    font-size: 38px;
    line-height: 53px;
    @include up($sm) {
      font-size: 48px;
    }
  }
  p {
    font-size: 18px;
    line-height: 23px;
    margin-bottom: 64px;
  }
}
</style>
<script>
import BtnBlue from "../components/btn-blue";
export default {
  components: {BtnBlue},
    computed: {
        texts() {
            return {
                error500: this.$store.state.page?.Error500Controller?.texts?.ERROR500,
            }
        },
        buttons() {
            return {
                back: this.$store.state.common?.buttons?.BACK,
            }
        }
    }
}
</script>