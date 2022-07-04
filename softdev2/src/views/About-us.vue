<template>
  <div class="about-us">
    <about/>
    <competencies/>

  </div>
</template>

<script>


import About from "./About-us/about"
import Competencies from "./About-us/competencies"



export default {
  name: "About-us",
  components: {
    About,
    Competencies,
  },
  data() {
    return {

    }
  },


}
</script>

<style lang="scss">
.about-us {
  position: relative;

  p {
    color: $black !important;
  }

  &__swiper {
    height: 660px;
    @include up($sm) {
      height: 355px;
    }
    @include up($md) {
      height: 560px;
    }
    @include up($lg) {
      height: 740px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__swiper2 {
    position: relative;
    width: auto;
    height: 128px;
    bottom: -10px;

    img {

      width: 100%;
      height: 128px;

    }
  }

}
</style>
