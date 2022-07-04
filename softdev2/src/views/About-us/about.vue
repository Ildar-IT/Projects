<template>
  <section class="about">
    <v-container>
      <v-row class="about__wrapper d--flex">
        <v-col cols="12">
          <h1> {{items.title}} </h1>
        </v-col>
        <v-col v-for="(item, index) in items.content" :key="items.content[index]" class="mb-8"
        :class="colClass">
          <div v-html="item" class="content"></div>
        </v-col>
      </v-row>
      <img class="about__tower d-none d-sm-flex" :class="towerClass" src="@/assets/About-us/tower.png" alt="Tower">
    </v-container>
  </section>
</template>

<script>
import ShowDown from "showdown";

const showdown = new ShowDown.Converter();
export default {
  name: "about",
  data () {
    return {
      colClass: "col-12 col-md-4",
      towerClass: ""
    }
  },
  computed: {
    items() {
      const text = this.$store.state.page?.aboutUsText;
      if (!text) return null;

      if (text.content) text.content = text.content.split('<hr />');

      const content = text.content.map(el => showdown.makeHtml(el))
      if (content.length <= 2) {
        this.colClass = "col-12 col-sm-6";
        this.towerClass = "top";
      }

      return {
        content: content,
        title: text.title,
        url: text.url
      };
    }
  }
}
</script>

<style lang="scss">
.about {
  position: relative;

  padding-top: 90px;
  @include up($sm) {
    padding-top: 140px;
  }
  .container {
    position: relative !important;
  }

  h1 {
    margin-bottom: 32px;
    @include up($sm) {
      margin-bottom: 40px;
    }
    @include up($md) {
      margin-bottom: 72px;
    }
  }

  &__wrapper {
    position: relative;
    z-index: 10;
  }

  &__tower {
    position: absolute;
    max-width: 1300px;
    max-height: 770px;
    right: -250px;
    top: 49%;
    z-index: 0;
    width: 1000px;
    @include up($md) {
      right: -14%;
      top: 44%;
    }
    @include up($lg) {
      width: 1300px;
      right: -14%;
      top: 43%;
    }
    &.top {
      top: 0;
    }
  }
  &__bg {
    position: relative;
    z-index: 1;
    margin-top: 60px;
    @include up($sm) {
      padding-top: 270px;
    }
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}

</style>