<template>
  <div class="dandelion-bg">
    <svgicon v-if="isWindowXS && isAccount" name="dandelion-cut-xs" width="194" height="144" original color="#ECE3CF"/>
    <svgicon v-if="!isWindowXS && !isAccount" name="dandelion-cut" original color="#ECE3CF"/>
    <svgicon v-if="isWindowXS && !isAccount" name="dandelion-cut-left" original color="#ECE3CF"
             class="error-page__bg" width="192"></svgicon>
  </div>
</template>

<script>
export default {
  name: 'dandelion-bg',
  computed: {
    isWindowLG() {
      return this.$store.getters.isWindowLG;
    },
    isWindowXS() {
      return this.$store.getters.isWindowXS;
    },
    isAccount () {
      this.$route.meta.menuGroup == 'account' ? true : false
    }
  }
}
</script>

<style lang="scss">
.dandelion-bg {
  z-index: -1;
  svg{
  z-index: -1;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  }
}
</style>