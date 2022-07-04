<template>
  <section class="talents">
    <v-container>
      <div class="talents__wrapper text-center text-sm-start ">
        <h2>
          We’re always looking for Talents
        </h2>
        <span class="d-none d-sm-inline-block">
          <arrow-link-white   to="/">{{ 'Join us' }}</arrow-link-white>
        </span>
        <primary-link-blue class="d-flex d-sm-none mt-8"  to="/">{{ 'Join us' }}</primary-link-blue>
      </div>


    </v-container>
  </section>
</template>

<script>
import PrimaryLinkBlue from '../../components/primary-link-blue';
import ArrowLinkWhite from "@/components/arrow-link-white"

export default {
  name: "talents",
  components: {
    PrimaryLinkBlue,
    ArrowLinkWhite
  }

}
</script>

<style lang="scss">
.talents {
  padding-top: 40px;
  @include up($sm) {
    padding-top: 80px;
  }
  @include up($md) {
    padding: 140px 0;
  }
  @include up($lg) {
    padding-top: 200px;
    padding-bottom: 0;
  }

  &__wrapper {
    position: relative;

    h2 {
      margin: auto;
      @include up($sm) {
        margin: 0;
      }
      max-width: 550px;
      @include up($md) {
        max-width: 1100px;
      }
    }
    span {
      position: absolute;
      right: 0;
      bottom: 50%;
      transform: translateY(50%);
      @include up($md) {
        bottom: 15%;
      }
    }
  }

  .primary-link-blue {
    width: 100%;
  }
}
</style>