<template>
  <div class="mobile-manager">
    <div class="mobile-manager__wrapper">
      <div class="layout  pb-lg-13 pb-xs-8 beige-text"
           :class="isWindowSM? 'padding-bottom-main' : 'pb-3'">
        <h2 class="text-center px-lg-0 px-8">
          {{ pageTitle }}
        </h2>
      </div>

      <div class="">
        <v-row class="justify-md-space-between flex-column flex-md-row  mobile-manager__functions mb-3 mb-sm-0">
          <v-col cols="12" lg="2" md="2" sm="6" xl="2" v-for="item of functions" :key="item.name"
                 :class="isWindowMD? 'd-flex flex-column ' : 'd-flex align-center flex-row mx-auto px-0'"
                 :order-md="item.order">
            <svgicon :class="isWindowMD ? 'mb-4' : 'mr-4'" original name="done" width="32" heigth="32"/>
            <h5 :class="isWindowMD ? 'mb-4 beige-text' : ''" class="">
              {{ item.NAME }}
            </h5>
            <span v-if="isWindowMD" class="body-1">
                {{ item.PREVIEW_TEXT }}
                  </span>
          </v-col>
          <!--        Mobile IMG -->
          <v-col
              :class="isWindowMD? 'order-3 pb-0 mt-0 mobile-manager__functions__img mx-n16' : 'd-none'">
            <v-img v-if="isWindowMD" :src="imageSmall"/>
          </v-col>
        </v-row>
      </div>
      <v-img v-if="!isWindowMD" class="px-0 mx-auto mobile-manager__functions__img" :src="image"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mobile-manager',
  computed: {
    common() {
      // return this.$store.state.common;
    },
    page() {
      return this.$store.state.page.HomeController;
    },
    pageTitle() {
      return this.page.texts.find(el => el.CODE === "HOME_SERVICE_H_2").PREVIEW_TEXT
    },
    image() {
      return this.page.texts.find(el => el.CODE === "HOME_SERVICE_H_2").DETAIL_PICTURE
    },
    imageSmall() {
      return this.page.texts.find(el => el.CODE === "HOME_SERVICE_H_2").PREVIEW_PICTURE
    },
    isWindowXS() {
      return this.$store.getters.isWindowXS;
    },
    isWindowSM() {
      return this.$store.getters.isWindowSM;
    },
    isWindowMD() {
      return this.$store.getters.isWindowMD;
    },
    isWindowLG() {
      return this.$store.getters.isWindowLG;
    },
    functions() {
      const functionsOrder = this.page.homeFeatures.map((el, index) => {
        if (index >= 2) el.order = index + 2;
        else el.order = index + 1;
        return el
      })
      return functionsOrder
      // return  [
      //   {
      //     NAME: 'Добавляйте места захоронений',
      //     TEXT: 'Взвесь, если рассматривать процессы в рамках специальной теории относительности.',
      //     order: 1,
      //   },
      //   {
      //     NAME: 'Подключайте услуги Заботы',
      //     TEXT: 'Взвесь, если рассматривать процессы в рамках специальной теории относительности.',
      //     order: 2,
      //   },
      //   {
      //     NAME: 'Смотрите фотоотчёты о заботе',
      //     TEXT: 'Взвесь, если рассматривать процессы в рамках специальной теории относительности.',
      //     order: 4,
      //   },
      //   {
      //     NAME: 'Общайтесь с поддержкой',
      //     TEXT: 'Взвесь, если рассматривать процессы в рамках специальной теории относительности.',
      //     order: 5,
      //   },
      // ]
    },

  },
  methods: {}
}
</script>

<style lang="scss">
.mobile-manager {
  min-width: 360px;
  &__wrapper {


    @include up($sm) {
      margin: 0 64px !important;
    }
  }

  &__functions {
    max-width: 1720px;
    padding: 0 64px;
    @include up($sm) {
      padding: 0;
      margin: 0 auto !important;
    }
  }

  &__functions {
    display: flex;

    &__img {
      height: 700px;
      width: 360px !important;
      @include up($sm) {
        width: 100% !important;
        height: auto;
      }
      @include up($md) {

        max-width: 318px !important;
      }
      @include up($lg) {
        max-width: 388px !important;
      }
      @include up($xl) {
        max-width: 518px !important;
      }
    }

    .col-12 {
      z-index: 1;
    }

    div:not(:last-child):not(.v-image__image) {
      width: 282px !important;
      width: 100%;
      @include up($lg) {
        width: auto;
      }
    }

    svg {
      min-width: 32px;
    }

    h5 {
      color: $font-color-primary;
    }
  }
}
</style>
