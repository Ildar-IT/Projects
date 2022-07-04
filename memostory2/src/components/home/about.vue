<template>
  <div class="about light-text padding-bottom-main ">
    <!--    <svgicon v-if="isWindowLG" class="about__bg about__bg_sm" name="dandelion" original width="484"
                 height="645" color="#F5F1E7"></svgicon>-->
    <svgicon class="about__bg" name="dandelion-cut" width="1060" height="" original color="#F5F1E7"></svgicon>

    <div class="layout padding-top-main px-4 px-lg-0">
      <div class="padding-bottom-main beige-text">
        <h2 class="text-center">
          {{aboutTitle}}
        </h2>
      </div>
      <div class="about__content body-1 grey-text" v-html="aboutText">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  computed: {
    isWindowXS() {
      return this.$store.getters.isWindowXS;
    },
    isWindowLG() {
      return this.$store.getters.isWindowLG;
    },
    aboutText() {
      return this.$store.state.page.HomeController.texts.find(el => el.CODE == 'HOME_ABOUT_TEXT').PREVIEW_TEXT
    },
    aboutTitle() {
      return this.$store.state.page.HomeController.texts.find(el => el.CODE == 'HOME_ABOUT_TITLE').PREVIEW_TEXT
    }
  }
}
</script>

<style lang="scss">
.about {
  min-width: 360px;
  border-radius: 30px;
  background-color: $beige7;
  position: relative;
  overflow: hidden;
  z-index: 1;

  h2 {
    position: relative;
    z-index: 1;
  }

  p {
    z-index: 1;
    position: relative;
  }

  &__bg {
    position: absolute;
    bottom: -20px;
    left: 50%;
    margin-left: -530px;
    z-index: -1;
  }

  &__content {
    column-count: 0;
    max-width: 1675px;
    margin: 0 auto;
    @include up($md) {
      column-count: 2;
      column-gap: 64px;
    }
  }
}
</style>
