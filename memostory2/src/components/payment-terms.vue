<template>
  <div class="payment-terms text-center">
    <base-container :title="paymentTermsTitle">
      <v-card class="mx-auto card-light padding-left-main pt-7 pt-md-12 padding-right-main padding-bottom-main"
              elevation="0">
        <div v-html="paymentTerms"></div>
        <v-row class="payment-terms__systems mb-5">
          <v-col v-for="(system, index) in paymentSystems" :key="index" class="d-flex justify-center">
            <div>
              <v-img :src="system" width="128" height="64"/>
            </div>
          </v-col>
        </v-row>
        <div v-html="paymentTerms2"></div>
      </v-card>
    </base-container>
  </div>
</template>

<script>
import baseContainer from '@/components/base/base-container';

export default {
  name: "payment-terms",
  components: {baseContainer},
  computed: {
    paymentSystems() {
      return {
        mir: require('@/assets/images/payment-systems/mir.png'),
        mastercard: require('@/assets/images/payment-systems/mastercard.png'),
        visa: require('@/assets/images/payment-systems/visa.png'),
        jcb: require('@/assets/images/payment-systems/jcb.png'),
      }
    },
    page() {
      return this.$store.state.page.ContentController;
    },
    paymentTerms() {
      return this.page.texts.find(el => el.CODE === "PAYMENT_TERMS").PREVIEW_TEXT;
    },
    paymentTerms2() {
      return this.page.texts.find(el => el.CODE === "PAYMENT_TERMS_2").PREVIEW_TEXT;
    },

    paymentTermsTitle() {
      return this.page.texts.find(el => el.CODE === "PAYMENT_TERMS")?.DETAIL_TEXT || 'Оплата'
    }
  }

}
</script>

<style lang="scss">
#memostory {
  .payment-terms {
    p.body-1{
      letter-spacing: 0.5px !important;
    }
    p.body-2 {
      letter-spacing: 0.25px !important;
    }

    &__systems {
      max-width: 610px;
      margin: 0 auto;
    }
  }
}
</style>
