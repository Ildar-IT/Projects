<template>
  <section v-if="items && items.length" class="our-services-main" :class="{reverse:index%2}">
    <v-container>

      <v-row v-if="!isSubProjects">
        <v-col cols="12" sm="9" :order-md="index%2?'last':'first'"  class="our-services-main__head ">
          <h2 class="mb-sm-0">{{ title }}</h2>
        </v-col>
        <v-col cols="12" sm="6" md="6" class="d-none d-md-flex justify-end">

        </v-col>
      </v-row>

      <v-row v-if="isSubProjects">
        <v-col cols="12" sm="9" :order-md="index%2?'last':'first'"  class="our-services-main__head ">
          <h2 class="mb-sm-0">{{ title }}</h2>
        </v-col>
        <v-col cols="12" sm="6" md="6"></v-col>
      </v-row>

      <ul class="our-services-main__list d-md-none">
        <li v-for="(item, index) of items" class="d-sm-flex align-start our-services-main__item">
          <v-row>
            <v-col cols="12" sm="6" :order-sm="index%2?'last':'first'">
              <img :src="item.image" :alt="item.name" class="d-block our-services-main__img mx-auto mb-8 mb-sm-0">
            </v-col>
            <v-col cols="12" sm="6">
              <div class="our-services-main__content">
                <h3 class="mb-10">
                  {{ item.name }}
                </h3>
                <div class="mb-10" v-html="item.text"></div>
                <div class="d-flex d-md-none justify-end">
                  <btn-link class="border mb-13 " :to="item.to"/>
                </div>
                <div class="d-none d-md-flex justify-end ">
                  <btn-link class="pl-0 d-inline-flex" :to="item.to"/>
                </div>
              </div>
            </v-col>
          </v-row>
        </li>
      </ul>
      <v-row v-if="isTabsNewRow">
        <v-col cols="12" class="mb-10">
          <div class="our-services-main__tabs  ">
            <ul class="d-md-flex justify-start">
              <li v-for="(item, index) in items" :key="index" :class="{'is-inactive': activeIndex != index}"
                  class="body-lg-desk"
                  @click="activeIndex = index">
                {{ item.name }}
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>

      <div class="our-services-main__wrap d-none d-md-flex justify-space-between justify-lg-center">
        <v-row justify-md="center">
          <v-col cols="12" sm="6" md="6" :order-md="index%2?'first':'last'">
            <transition name="route" mode="out-in">
              <img v-if="activeIndex === index"
                   v-for="(item, index) in items"
                   :key="index"
                   class="d-block ma-auto our-services-main__img"
                   :src="item.image">
            </transition>
          </v-col>
          <v-col cols="12" sm="6" md="6" >
            <div class="our-services-main__tabs">
              <ul v-if="!isTabsNewRow" class="d-md-flex mb-10 justify-start">
                <li v-for="(item, index) in items" :key="index" :class="{'is-inactive': activeIndex != index}"
                    class="body-lg-desk"
                    @click="activeIndex = index">
                  {{ item.name }}
                </li>
              </ul>

              <transition name="route" mode="out-in">
                <div v-if="activeIndex === index" v-for="(item, index) in items" :key="index"
                     class="our-services-main__text" v-html="item.text">
                </div>
              </transition>

              <div class="d-flex justify-start justify-sm-end">
                <btn-link class="width-auto pl-0 d-inline-flex" :to="items[activeIndex].to"/>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </section>
</template>

<script>

import PrimaryLinkBlue from "../../components/primary-link-blue";
import SecondaryLink from "../../components/secondary-link";
import BtnLink from "../../components/btn-link";


export default {
  name: 'our-services-main',
  components: {BtnLink, SecondaryLink, PrimaryLinkBlue},
  props: {
    items: {},
    title: String,
    index: Number,
    isSubProjects: {
      default: false
    }
  },
  data() {
    return {
      activeIndex: 0,
    }
  },
  computed: {

    isWindowLG() {
      return this.$store.getters.isWindowLG;
    },
    isTabsNewRow() {
      return (this.items.length >= 5 && !this.isWindowLG) || (this.items.length >= 6 && this.isWindowLG) ? true : false;
    }
  },
}
</script>

<style lang="scss">
.our-services-main {
  padding: 60px 0;
  margin-top: -30px;
  background: $bg-gradient-white-blue;
  position: relative;
  z-index: 1;

  @include up($sm) {
    margin-top: 0;
    padding: 80px 0;
  }
  @include up($md) {
    padding: 140px 0 120px;
  }
  @include up($lg) {
    padding: 140px 0;
  }

  &__head {
    margin-bottom: 50px;
    @include up($sm) {
      margin-bottom: 70px;
    }
  }

  .width-auto {
    width: auto !important;
  }

  .p {
    @include transition();
  }

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    background: url("~@/assets/noize.png");
    height: 100%;
    opacity: 0.1;
    z-index: -1;
  }

  .no-border {
    border: 1px solid #367ADF;
    //justify-content: space-between;
    padding: 15px 40px;
    @include up($sm) {
      border: none;
    }
  }

  .btn-link {
    width: 100%;
    @include up($md) {
      width: 300px;
    }
  }

  .primary-link-blue__arrow {
    display: none;
  }


  &__tabs {


    li {
      max-width: 240px;

      cursor: pointer;
      display: inline-block;
      padding: 20px 25px;
      position: relative;
      @include transition();

      &:last-child {
        padding-right: 0;
      }

      &::before {
        position: absolute;
        content: "";
        width: 1px;
        height: 100%;
        left: 0;
        top: 0;
        background: $primary-1;
        opacity: 0.35;
        @include transition();
      }

      &.is-inactive {
        color: $black !important;
        &::before {
          background: $black;
          opacity: 0.5;
        }
      }

      &:hover {
        color: $primary-1 !important;
        &::before {
          background: $primary-1;
        }
      }
    }
  }

  &__content {
    @include up($sm) {
      flex-basis: 50%;
    }
  }

  &__list {
    @include up($md) {
      margin-bottom: 70px;

    }
  }

  &__item {
    margin-bottom: 60px;
    @include transition();
  }

  &__img {

    width: 219px;
    height: 219px;
    @include up($sm) {
      width: 320px;
      height: 320px;
    }
    @include up($md) {
      width: 420px;
      height: 420px;
    }


    @include up($lg) {
      width: 503px;
      height: 501.5px;
    }
  }

  &__text {
    min-height: 300px;
  }

  &.reverse {
    background: $white;

  }
}
</style>
