<template>
  <section class="praline-info">
    <v-container>
      <v-row>
        <v-col class="d-sm-none">
          <h3 class="my-primary text-center">Pistachios + basil</h3>
          <div class="size1 text-center mb-16 my-primary  ">milk chocolate</div>
        </v-col>
        <v-col cols="12" sm="6">
          <img class="d-block mx-sm-0 mx-auto praline-info__img" src="@/assets/Flavours/praline/praline2.jpg" alt="Praline">
        </v-col>
        <v-col cols="12" sm="6" class="d-sm-flex align-center">
          <div>
            <h3 class="my-primary d-none d-sm-block">Pistachios + basil</h3>
            <div class="size1 mb-16 my-primary d-none d-sm-block">milk chocolate</div>
            <div class="my-text-2 praline-info__descr mx-auto text-center text-sm-start">LE BONHEUR pralines combine a classic French pralines recipe with the original taste of
              natural ingredients. Every piece is made with love, because we know that our emotions influence the quality
              of the product just as much as the ingredients do.
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "praline-info"
}
</script>

<style lang="scss">
.praline-info {

  &__descr {
    width: 296px;
  }
  &__img {
    width: 360px;
    object-fit: cover;
    @include up($sm) {
      width: auto;
      object-fit: none;
    }
  }
}

</style>