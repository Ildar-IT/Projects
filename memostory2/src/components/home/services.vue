<template>
  <!--Services-->
  <div id="services" class="services layout">
    <div class="services__wrapper">
      <div class="padding-bottom-main padding-top-main  beige-text ">
        <h2 class="text-center">
          {{ title }}
        </h2>
      </div>
      <div class="layout padding-bottom-main ">
        <cards-service :items="services"/>
      </div>
    </div>
  </div>
</template>

<script>
import CardService from "../elements/service-elements/card-service";
import CardsService from "../elements/service-elements/cards-service";

export default {
  name: "services",
  components: {
    CardsService,
    CardService
  },
  computed: {
    common() {
      // return this.$store.state.common;
    },
    page() {
      return this.$store.state.page.HomeController;
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
    title() {
        return this.page.texts.find(el => el.CODE === "HOME_SERVICE_H_1").PREVIEW_TEXT
    },
    services() {
      return [
        {
          icon: 'clean',
          name: 'Уборка',
        },
        {
          icon: 'flower',
          name: 'Озеленение',
        },
        {
          icon: 'repairs',
          name: 'Ремонт',
        },
        {
          icon: 'video-report',
          name: 'Видеоотчёт',
        }

      ]
    },
  }
}
</script>

<style lang="scss">
.services {
  min-width: 360px;
  .layout {
    margin: 0 16px !important;
    @include up($md) {
      margin: 0 64px !important;
    }
    @include up($lg) {
      margin: 0 !important;
    }
  }
  &__wrapper {
    max-width: 1720px !important;
    margin: 0 auto;
  }
}

#services.layout {
  margin: 0 auto !important;
  @include up($md) {
    margin: 0 64px !important;
  }
}
</style>
