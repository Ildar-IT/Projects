<template>
  <div class="layout-error">
    <the-header/>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
  .layout-error {
    @include up($lg) {
      position: relative;
      &::before {
        position: absolute;
        content: "";
        background-image: url("~@/assets/tattoo/1.png");
        background-blend-mode: multiply;
        width: 571px;
        height: 854px;
        right: -139px;
        z-index: 0;
        top: -264px;
      }
      &::after {
        position: absolute;
        content: "";
        background-image: url("~@/assets/tattoo/2.png");
        background-blend-mode: multiply;
        z-index: 0;
        width: 507.79px;
        height: 478.77px;
        transform: rotate(-30deg);
        top: 40%;
        left: -110px;
      }
    }
  }
</style>


<script>
import TheHeader from "./main/the-header";
export default {
  components: {TheHeader}
}
</script>