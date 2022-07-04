<template>
  <div id="tariffs" :class="isTariffPage ? 'layout-top' : 'layout  mt-n8 mt-lg-0' " class="tariffs ">
    <div class="tariffs__wrapper px-4 px-md-0">
      <div class="  beige-text"
           :class="isWindowXS? 'pt-3 pb-12 ' : 'padding-top-main padding-bottom-main'">
        <h2 class="text-center">
          {{tariffsTitle}}
        </h2>
      </div>

     <div class="pb-lg-12 pb-8  ">
        <cards-tariff class="" :items="tariffs"/>
      </div>
    </div>
  </div>
</template>

<script>
import CardsTariff from "../elements/tariff-elements/cards-tariff";

export default {
  name: "tariffs",
  components: {CardsTariff},
  data() {
    return {
      isTariffPage: false
    }
  },
  computed: {
      commonText() {
          return this.$store.state.common.textsCommon;
      },
      tariffsTitle() {
          return this.commonText.find(el => el.CODE == "TARIFFS_TITLE").PREVIEW_TEXT
      },
    tariffs(){
        return this.$store.state.page.HomeController.tariffs || []
    },
    isWindowXS() {
      return this.$store.getters.isWindowXS;
    },
    // tariffs() {
    //   return [
    //     {
    //       name: 'Памятный',
    //       price: '800 ₽ / мес.',
    //       text: 'Уборка территории с фотоотчётом.',
    //       functions: [1]
    //     },
    //     {
    //       name: 'Ответственный',
    //       price: '1 500 ₽ / мес.',
    //       text: 'Уборка территории с фотоотчётом.',
    //       functions: [1, 2]
    //     },
    //     {
    //       name: 'Любящий',
    //       price: '2 500 ₽ / мес.',
    //       text: 'Уборка территории с фотоотчётом.',
    //       functions: [1, 2, 3]
    //     },
    //     {
    //       name: 'Почётный',
    //       price: '4 800 ₽ / мес.',
    //       text: 'Уборка территории с фотоотчётом.',
    //       functions: [1, 2, 3, 4]
    //     }
    //   ]
    // }
  },
  watch: {
    $route: {
        immediate: true,
        handler(to, from) {
            if(this.$route.path == '/tariffs') {
              this.isTariffPage = true;
            } else {
                this.isTariffPage = false;
            }
        }
      }
  }
}
</script>

<style lang="scss">
 #tariffs.layout {
    margin: 0 4px !important;
    @include up($md) {
      margin: 0 64px !important;
    }
  }
.tariffs{
  &__wrapper {
    max-width: 1720px;
    margin: 0 auto;
  }
}
</style>
