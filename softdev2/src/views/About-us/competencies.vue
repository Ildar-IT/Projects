<template>
  <section v-if="items && items.length" class="competencies">
    <v-container>
      <h2 class="text-center pb-8">{{title[0].title}}</h2>
      <v-row>
        <v-col cols="12" sm="6" md="4"
               v-for="(item, index) of items" :key="item.title"
               class="competencies__item d-flex align-center py-0">

            <img class="d-block mr-6 mr-sm-8 mr-lg-10" :src="item.img" :alt="item.alt">
          <router-link :to="{path: item.url}" :class="item.url ? '': 'cursor-not'" >
            <span  class="d-block">{{ item.title }}</span>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "competencies",
  data() {
    return {

   /*   items: [
        {
          img: require(`@/assets/About-us/items/item1.svg`),
          descr: "Image",
          text: "Computer Design (CAD) systems"
        },
        {
          img: require(`@/assets/About-us/items/item2.svg`),
          descr: "Image",
          text: ".NET Enterprise solutions"
        },
        {img: require(`@/assets/About-us/items/item3.svg`), descr: "Image", text: "Business applications"},
        {
          img: require(`@/assets/About-us/items/item4.svg`),
          descr: "Image",
          text: "File import/export converters"
        },
        {
          img: require(`@/assets/About-us/items/item5.svg`),
          descr: "Image",
          text: "Network client-server systems"
        },
        {img: require(`@/assets/About-us/items/item6.png`), descr: "Image", text: "Multimedia applications"}
      ]*/
    }
  },
  computed: {
    items() {
      return this.$store.state.page?.competencies?.map(el => ({
        img: el.media.url,
        title: el.title,
        alt: "Image",
        url: el.url,
      }))
    },
    title() {
      return this.$store.state.common?.buttonsText.filter(el => el.uid === "competence");
    }

  }

}
</script>

<style lang="scss">
.competencies {
  position: relative;
  z-index: 2;
  padding: 40px 0;
  @include up($sm) {
    padding: 60px 0;
  }
  @include up($md) {
    padding: 80px 0;
  }
  @include up($lg) {
    padding: 100px 0;
  }

  &__item {
    margin-bottom: 24px;
    @include up($lg) {
      margin-bottom: 40px;
    }
    @include up($md) {
      margin-bottom: 50px;
    }
    @include up($lg) {
      margin-bottom: 100px;
    }

  }

  h2 {
    padding-bottom: 40px;
    @include up($md) {
      padding-bottom: 70px;
    }
    @include up($lg) {
      padding-bottom: 90px;
    }

  }

  img {
    max-width: 80px;
    width: auto;
    @include up($sm) {
      max-width: 100px;
    }
    @include up($md) {
      max-width: 160px;
    }

  }

  .cursor-not {
    cursor: default;
    span {
      &:hover {
        color: $black !important;
      }
    }
  }

  span {
    font-family: $secondary-font-family;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    color: $black;

    @include up($sm) {
      font-size: 20px;
      line-height: 30px;
      max-width: 300px;
    }
    @include transition();
    &:hover {
      color: $primary-1;
    }
  }
}
</style>