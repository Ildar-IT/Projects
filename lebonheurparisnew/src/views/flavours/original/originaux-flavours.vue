<template>
  <section class="originaux-flavours text-center mx-auto" :isSwiper="isSwiper">
    <v-container >
        <h3 class="text-uppercase my-primary">{{ label }}</h3>
        <v-row v-if="!isSwiper">
          <v-col cols="12" sm="3" v-for="(item, index) in pralines" :key="index" class="text-center">
            <router-link :to="item.link"><img class="originaux-flavours__img" @mouseover="imgHover(index)" @mouseleave="imgDefault(index)" :src="item.imgHovered ? item.imgHover : item.img" alt="Image"></router-link>
            <h5 class="t-8">{{item.title}}</h5>
            <div class="originaux-flavours__choco-type my-text-2">{{item.descr}}</div>
          </v-col>
        </v-row>
      <v-row v-else class="d-none d-sm-flex">
        <v-col cols="12" sm="3" v-for="(item, index) in pralines" :key="index" class="text-center">
          <router-link :to="item.link"><img class="originaux-flavours__img" @mouseover="imgHover(index)" @mouseleave="imgDefault(index)" :src="item.imgHovered ? item.imgHover : item.img" alt="Image"></router-link>
          <h5 class="t-8">{{item.title}}</h5>
          <div class="originaux-flavours__choco-type my-text-2">{{item.descr}}</div>
        </v-col>
      </v-row>
    </v-container>
    <FlavoursSwiper v-if="isSwiper" class="d-block d-sm-none"/>
  </section>
</template>
<script>

import FlavoursSwiper from "@/components/flavours-swiper";

export default {
  name: "originaux-flavours",
  props: ["label", "isSwiper"],
  data() {
    return {

      pralines: [
        {link: {name: 'praline'}, img:require('@/assets/Flavours/item1.jpg'), imgHover:require('@/assets/Flavours/item1-hover.jpg'), imgHovered: false, title:"Pistachios and basil", descr:"milk chocolate"},
        {link: {name: 'praline'}, img:require('@/assets/Flavours/item2.jpg'), imgHover:require('@/assets/Flavours/item2-hover.jpg'), imgHovered: false, title:"Cherries and almond cookies", descr:"dark chocolate"},
        {link: {name: 'praline'}, img:require('@/assets/Flavours/item3.jpg'), imgHover:require('@/assets/Flavours/item3-hover.jpg'), imgHovered: false, title:"Coconut milk chocolate", descr:"milk chocolate"},
        {link: {name: 'praline'}, img:require('@/assets/Flavours/item4.jpg'), imgHover:require('@/assets/Flavours/item4-hover.jpg'), imgHovered: false, title:"Puffed rice and ginger", descr:"milk chocolate"},
        {link: {name: 'praline'}, img:require('@/assets/Flavours/item3.jpg'), imgHover:require('@/assets/Flavours/item3-hover.jpg'), imgHovered: false, title:"Pistachios and basil", descr:"milk chocolate"},
        {link: {name: 'praline'}, img:require('@/assets/Flavours/item2.jpg'), imgHover:require('@/assets/Flavours/item2-hover.jpg'), imgHovered: false, title:"Cherries and almond cookies", descr:"dark chocolate"},
        {link: {name: 'praline'}, img:require('@/assets/Flavours/item1.jpg'), imgHover:require('@/assets/Flavours/item1-hover.jpg'), imgHovered: false, title:"Coconut milk chocolate", descr:"milk chocolate"},
        {link: {name: 'praline'}, img:require('@/assets/Flavours/item2.jpg'), imgHover:require('@/assets/Flavours/item2-hover.jpg'), imgHovered: false, title:"Puffed rice and ginger", descr:"milk chocolate"},
        {link: {name: 'praline'}, img:require('@/assets/Flavours/item3.jpg'), imgHover:require('@/assets/Flavours/item3-hover.jpg'), imgHovered: false, title:"Coconut milk chocolate", descr:"milk chocolate"},
        {link: {name: 'praline'}, img:require('@/assets/Flavours/item4.jpg'), imgHover:require('@/assets/Flavours/item4-hover.jpg'), imgHovered: false, title:"Pistachios and basil", descr:"milk chocolate"},
        {link: {name: 'praline'}, img:require('@/assets/Flavours/item3.jpg'), imgHover:require('@/assets/Flavours/item3-hover.jpg'), imgHovered: false, title:"Cherries and almond cookies", descr:"dark chocolate"},
      ]
    }
  },
  components: {
    FlavoursSwiper
  },

  methods: {
    imgHover(index) {
      this.pralines[index].imgHovered = true;
    },
    imgDefault(index) {
      this.pralines[index].imgHovered = false;
    },
  }
}
</script>

<style lang="scss">
.originaux-flavours {

  h3 {
    margin-bottom: 64px;
    @include up($sm) {
      margin-bottom: 96px;
    }
  }


  &__img {
    width: 132px;
    height: 132px;
  }



  &__choco-type, h5 {
    color: $primary-500;
  }
}
</style>