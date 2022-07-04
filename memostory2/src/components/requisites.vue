<template>
  <div class="requisites">
    <base-container :title="requisitesTitle">
<!--    Table for desktop -->
      <v-card class="requisites__table mx-auto card-light padding-left-main pt-7 pt-md-12 padding-right-main padding-bottom-main"
              elevation="0">
        <div v-html="requisites"></div>
      </v-card>

<!--     Table for mobile-->
      <v-card class="requisites__mobile-table mobile-table card-light mx-auto pa-8" :elevation="0">
        <div v-html="requisitesMobile"></div>
      </v-card>

    </base-container>

  </div>
</template>

<script>
import baseContainer from '@/components/base/base-container';
export default {
  name: "requisites",
  components:{baseContainer},
  computed: {
    isWindowLG() {
      return this.$store.getters.isWindowLG;
    },
    isWindowSM() {
      return this.$store.getters.isWindowSM;
    },
    isWindowXS() {
      return this.$store.getters.isWindowXS;
    },
    page() {
      return this.$store.state.page.ContentController;
    },
    requisites() {
      return this.page.texts.find(el => el.CODE === "REQUISITES").PREVIEW_TEXT;
    },
    requisitesMobile() {
      return this.page.texts.find(el => el.CODE === "REQUISITES_MOBILE").PREVIEW_TEXT;
    },
    requisitesTitle() {
      return this.page.texts.find(el => el.CODE === "REQUISITES")?.DETAIL_TEXT || 'Реквизиты'
    }
  }

}
</script>

<style lang="scss">
.requisites {
  &__table {
    width: 100%;
    display: none !important;
    @include up($md) {
      display: block !important;
    }
    td {
      padding: 4px 0;
    }

    tr{
      td:first-child{
        padding-right: 64px;
      }
    }

    tr:nth-child(4n):not(:last-child) {
      td {
        padding-bottom: 32px;
      }
    }
  }

  &__mobile-table {
    display: block;
    @include up($md) {
      display: none !important;
    }
  }
}
</style>
