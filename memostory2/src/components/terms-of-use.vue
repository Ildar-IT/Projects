<template>
<div class="terms-of-use">
  <base-container :title="termsOfUseTitle">

        <v-card class="mx-auto card-light padding-left-main pt-7 pt-md-12 padding-right-main padding-bottom-main"
        elevation="0" v-html="termsOfUse">
        </v-card>

  </base-container>
</div>
</template>

<script>
import baseContainer from '@/components/base/base-container';
export default {
  name: "terms-of-use",
  components:{baseContainer},
  data() {
    return {
      title: 'Политика в отношении обработки персональных данных',
      paragraph1: {
        name: 'Общие положения',
        description: 'Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального\n' +
            '            закона\n' +
            '            от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по\n' +
            '            обеспечению безопасности персональных данных, предпринимаемые ФИО (далее – Оператор).'
      }
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
    termsOfUse() {
      return this.page.texts.find(el => el.CODE === "TERMS_OF_USE").PREVIEW_TEXT
    },
    termsOfUseTitle() {
      return this.page.texts.find(el => el.CODE === "TERMS_OF_USE")?.DETAIL_TEXT || 'Условия использования'
    }
  }
}
</script>

<style lang="scss">
.terms-of-use{
h5~p{
  margin-top: 8px;
}
}
</style>
