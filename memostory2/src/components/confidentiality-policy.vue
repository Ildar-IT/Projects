<template>
  <div class="confidentiality-policy">
    <base-container :title="policyTitle">
      <v-card class="mx-auto card-light padding-left-main pt-7 pt-md-12 padding-right-main padding-bottom-main"
              elevation="0" v-html="policy">
      </v-card>
    </base-container>
  </div>
</template>

<script>
import baseContainer from '@/components/base/base-container';

export default {
  name: "privacy-policy",
  components: {baseContainer},
  data() {
    return {
    }
  },
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
    policy() {
      return this.page.texts.find(el => el.CODE === "PRIVACY_POLICY").PREVIEW_TEXT
    },
    policyTitle() {
      return this.page.texts.find(el => el.CODE === "PRIVACY_POLICY")?.DETAIL_TEXT || 'Политика конфиденциальности'
    }
  }

}
</script>

<style lang="scss">
.confidentiality-policy {

}
</style>
