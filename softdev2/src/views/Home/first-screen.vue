<template>
  <section class="first-screen">
    <img class="d-sm-none cloud cloud--1" src="@/assets/Main/clouds/1.svg">
    <img class="d-sm-none cloud cloud--2" src="@/assets/Main/clouds/2.svg">
    <img class="d-none d-sm-block cloud cloud--5" src="@/assets/Main/clouds/5.svg">
    <img class="d-none d-md-block cloud cloud--9" src="@/assets/Main/clouds/9.svg">
    <v-container v-if="animationStep >= 1" class="d-flex">
      <transition name="route-slow" mode="out-in">
        <first-screen-slide v-if="currentSlideIndex == index"
                            v-for="(slide, index) of animation" :key="index" :slide="slide"/>
      </transition>
    </v-container>
  </section>
</template>

<style lang="scss">
.first-screen {
  position: relative;
  height: calc(100vh - 155px);
  min-height: 480px;
  display: flex;
  overflow-x: clip;

  @include up($sm) {
    height: 100vh;
  }



  .cloud {
    &--1 {
      top: 11%;
      right: -4%;
    }

    &--2 {
      right: -19%;
      top: 65%;
    }

    &--5 {
      right: 20%;
      bottom: 15%;
      @include up($md) {
        bottom: 0;
      }
      @include up($lg) {
        bottom: 20%;
      }
    }

    &--9 {
      right: -10%;
      bottom: 30%;
      @include up($lg) {
        right: -1%;
        top: 45%;
      }
    }
  }

}
</style>

<script>
import 'animate.css';
import FirstScreenSlide from "./first-screen-slide";
import ShowDown from "showdown";

const showdown = new ShowDown.Converter();
export default {
  components: {FirstScreenSlide,},
  data: () => {
    return {
      currentSlideIndex: 0,
      animationInterval: null,
      animationStep: 0,
    }
  },
  computed: {
    animation() {
      return this.$store.state.page?.animations?.map(el => ({
        texts: el.content.split('\n'),
        route: {name: 'ServiceItem' , params: {code: el.url.split('/')[1]}},
        img:  el.media[0]?.url,
      }))
    }
  },
  mounted() {
    setTimeout(() => {
      this.animationStep++;
      this.animationInterval = setInterval(() => {
        if (this.currentSlideIndex < this.animation.length - 1) {
          this.currentSlideIndex++;
        } else {
          this.currentSlideIndex = 0;
          //todo circle or stop animation
          //clearInterval(this.animationInterval);
        }
      }, 6000); //slides interval
    }, 500);
  }
}
</script>
