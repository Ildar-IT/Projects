<template>
  <section class="originaux">
    <v-container>
      <h3 class="text-center originaux__title">Pralines originaux</h3>
      <v-row>
        <v-col :cols="item.cols" :sm="item.colSM" v-for="(item, index) in pralines" :key="index" class="text-center">
            <div class="originaux__height">
          <router-link :to="item.link"><img :src="item.img" alt="Image"></router-link>
            </div>
          <h5 class="mt-12">{{item.title}}</h5>
          <div class="my-text-2 mb-2">{{item.descr}}</div>
          <h5 class="originaux__price">{{item.price}}</h5>

        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "originaux",
  data() {
    return {
      pralines: [
        {cols:12, colSM:4, link: {name: 'box-type'}, img:require('@/assets/Shop/original-pralines/item1.jpg'), title:"ANGEL BOX", descr:"4 pcs", price:"15.6 €"},
        {cols:12, colSM:4, link: {name: 'box-type'}, img:require('@/assets/Shop/original-pralines/item2.jpg'), title:"LIMITED EDITION", descr:"autumn-winter 2021/22\n" +
              "4 pcs", price:"15.6 €"},
        {cols:12, colSM:4, link: {name: 'box-type'}, img:require('@/assets/Shop/original-pralines/item3.jpg'), title:"ANGEL BOX", descr:"6 pcs", price:"23 €"},
        {cols:12, colSM:4, link: {name: 'box-type'}, img:require('@/assets/Shop/original-pralines/item4.jpg'), title:"ANGEL BOX", descr:"9 pcs", price:"34 €"},
        {cols:12, colSM:4, link: {name: 'box-type'}, img:require('@/assets/Shop/original-pralines/item5.jpg'), title:"PARIS, TU ME MANQUES", descr:"9 pcs", price:"34 €"},
        {cols:12, colSM:4, link: {name: 'box-type'}, img:require('@/assets/Shop/original-pralines/item6.jpg'), title:"OH, MON AMOUR", descr:"9 pcs", price:"34 €"},
        {cols:12, colSM:4, link: {name: 'box-type'}, img:require('@/assets/Shop/original-pralines/item7.jpg'), title:"ANGEL BOX", descr:"2 pcs", price:"8 €"},
        {cols:12, colSM:8, link: {name: 'box-type'}, img:require('@/assets/Shop/original-pralines/item8.jpg'), title:"MUSIC BOX", descr:"3 pcs", price:"19 €"},
      ]
    }
  }
}
</script>

<style lang="scss">
.originaux {
  padding-bottom: 32px;
  @include up($sm) {
    padding-bottom: 109px;
  }
  @include up($lg) {
    padding-bottom: 132px;
  }
  &__title {
    color: $primary-500;
    margin: 64px 0;
    @include up($sm) {
      margin: 96px 0;
    }
  }
    &__height {
        height: 240px;
    }

  img {
      max-width: 100%;
      height: 240px;
  }

  h5, .my-text-2 {
    color: $primary-500;
  }

  &__price {
    color: $black !important;
  }

}
</style>