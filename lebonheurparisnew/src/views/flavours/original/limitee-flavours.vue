<template>
  <section class="limitee-flavours text-center">
    <h3 class=" text-uppercase my-primary">Edition Limitee</h3>
    <v-row class="">
      <v-col cols="12" sm="3" class="d-flex flex-column justify-start align-center">
        <img class="limitee-flavours__img" src="../../../assets/Flavours/item5.jpg" alt="Item">
        <h5 class="mt-8">Christmas tea covered</h5>
        <div class="limitee-flavours__choco-type my-text-2 ">milk chocolate</div>
      </v-col>

      <v-col cols="12" sm="3" class="d-flex flex-column justify-start align-center">
        <img class="limitee-flavours__img" src="../../../assets/Flavours/item5.jpg" alt="Item">
        <h5 class="mt-8">Christmas tea covered</h5>
        <div class="limitee-flavours__choco-type my-text-2 ">milk chocolate</div>
      </v-col>

      <v-col cols="12" sm="3" class="d-flex flex-column justify-start align-center">
        <img class="limitee-flavours__img" src="../../../assets/Flavours/item5.jpg" alt="Item">
        <h5 class="mt-8">Christmas tea covered</h5>
        <div class="limitee-flavours__choco-type my-text-2 ">milk chocolate</div>
      </v-col>

      <v-col cols="12" sm="3" class="d-flex flex-column justify-start align-center mb-8 mb-sm-0">
        <img class="limitee-flavours__img" src="../../../assets/Flavours/item5.jpg" alt="Item">
        <h5 class="mt-8">Christmas tea covered</h5>
        <div class="limitee-flavours__choco-type my-text-2 ">milk chocolate</div>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: "our-flavors"
}
</script>

<style lang="scss">
.limitee-flavours {
  @include up($sm) {
    margin-top: 96px;
  }
  @include up($lg) {
    margin-top: 128px;
  }
  h3 {
    margin: 64px 0 ;
    @include up($lg) {
      margin: 96px 0
    }
  }

  &__img {
    width: 132px;
    height: 132px;
  }

  &__wrapper {
    margin-bottom: 120px;
  }

  &__choco-type, h5 {
    color: $primary-500;
  }
}
</style>