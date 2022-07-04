<template>
  <section class="error500">
    <v-container>
      <h3>Error 500</h3>
      <h2 class="mb-8 mb-md-4 mb-lg-16">Internal server error</h2>
      <div class="">
        <a class="error500__link mx-auto" href="/">Go to homepage</a>
      </div>
      <img src="@/assets/Error500.png" alt="Error">
    </v-container>
  </section>
</template>

<script>
export default {
  name: "error500"
}
</script>

<style lang="scss">
.error500 {
  padding-top: 56px;
  width: 100vw;
  height: 100vh;
  min-height: 555px;
  background: $bg-error-gradient;
  @include up($md) {
    padding-top: 101px;
  }
  .container {
    position: relative;
    z-index: 11;
  }



  h2 {
    max-width: 700px;
    -webkit-text-fill-color: $white;
    position: relative;
    z-index: 11;
  }

  h3 {
    color: white !important;

    padding: 20px 0;
    @include up($sm) {
      padding: 60px 0 25px 0;
    }
    @include up($md) {
      padding: 76px 0 15px 0;
    }
    @include up($lg) {
      padding: 202px 0 15px 0;
    }
  }

  p {
    margin-bottom: 32px;
    @include up($sm) {
      margin-bottom: 80px;
    }

  }

  &__link {

    text-transform: uppercase;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.05em;
    color: $blue-color2;
    @include up($sm) {
      font-size: 16px;
      line-height: 22px;
    }
    @include up($md) {
      font-size: 20px;
      line-height: 27px;
    }

    &::before {
      content: "";
      display: inline-block;
      background: url("../assets/arrow.svg") center no-repeat;
      background-size: 100%;
      transform: rotate(180deg);
      width: 20px;
      height: 11.25px;
      margin-right: 12px;
      @include up($sm) {
        width: 25px;
        height: 14px;
      }
      @include up($md) {
        font-size: 32.7px;
        line-height: 18.5px;
      }
    }
  }

  img {

    width: 100%;
    height: auto;
    margin-top: 100px;
    @include up($sm) {
      width: 384px;
      height: 240px;
      margin-top: 0;
      position: absolute;
      z-index: 1;
      top: 50%;
      transform: translateY(-40%);
      right: 50px;
    }
    @include up($md) {
      width: 700px;
      height: 452px;
      transform: translateY(-20%);
    }
    @include up($lg) {
      width: 1200px;
      height: 777px;
    }
  }
}
</style>
