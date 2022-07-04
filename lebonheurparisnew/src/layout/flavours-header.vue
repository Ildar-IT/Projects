<template>
  <div class="flavours-header mx-auto mb-16">
    <div class="flavours-header__wrapper d-flex justify-space-between align-center">
      <router-link to="/flavours/original"><div class="my-text-2">Original pralines</div></router-link>
      <span class="flavours-header__dot"></span>
      <div class="my-text-2">Creamy caramels</div>
      <span class="flavours-header__dot"></span>
      <div class="my-text-2">Chocolate</div>
    </div>
    <Divider class="mt-4"/>
  </div>
</template>

<script>
import Divider from "../components/divider";
export default {
  name: "flavours-header",
  components: {
    Divider
  }
}
</script>

<style lang="scss">
.flavours-header {
  width: 365px;
  &__dot {
    width: 3px;
    height: 3px;
    border-radius: 100%;
    background: $black-50;
  }
}
</style>