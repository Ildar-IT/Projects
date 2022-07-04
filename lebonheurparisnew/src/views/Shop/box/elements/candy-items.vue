<template>
  <div class="candy-items mt-12">
    <v-row>
      <v-col cols="3"  v-for="item in items" :key="item.id" class="d-flex justify-center">
        <div class="candy-items__wrapper text-center">
          <img :src=item.img alt="Candy">
          <div class="my-text-2">{{ item.descr}}</div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "candy-items",
  props: ["items"],
}
</script>

<style lang="scss">
.candy-items {

  &__wrapper {
    width: 98px;
    img {
      width: 58px;
      height: 58px;
    }
  }
}
</style>