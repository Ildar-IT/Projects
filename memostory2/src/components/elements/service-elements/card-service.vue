<template>
  <card class="card-service btn-font  d-flex flex-column justify-space-between margin-left-small margin-right-small  margin-bottom-main ">
    <div class="mb-6">
      <v-img class="image-hoverable"  @click="gotoLogin" width="100" height="100" :src="item.DETAIL_PICTURE"/>
    </div>
    <h5 class="margin-bottom-main">
      {{ item.NAME }}
    </h5>
    <v-btn block class="btn--primary card-service__btn" dark @click="gotoLogin">
      {{ price | nf }}  {{ this.item.PRICE ?  ' ₽' : item.PRICE_PER_SQ_M  ?  '₽ / ' + units : 'Заказать'}}
    </v-btn>
  </card>
</template>

<script>
import {nf} from "../../../utils/string";
export default {
  name: "card-service",
  props: ['item'],
  computed: {
    user() {
      return this.$store.state.session.user
    },
    price() {
      return this.item.PRICE ? this.item.PRICE : this.item.PRICE_PER_SQ_M ? this.item.PRICE_PER_SQ_M : ""
    },
    units() {
      return this.$store.state.common.buttons.squareMeters || "кв.м"
    }
  },
  methods: {
    gotoLogin() {
      this.$router.push({name:  'memory-places'})
      return
    }
  }
}
</script>

<style lang="scss">
.card-service {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: auto;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.15) !important;
  @include up($sm) {
    width: 100%;
   max-width: 380px;
  }
  @include up($md) {
    
    //max-width: 440px;
  }
  //@include up($lg) {
  //  max-width: 382px;
  //}

  button.card-service__btn.v-btn:not(.v-btn--round).v-size--default {
    padding: 0;
    @include up($md) {
      padding: 0 66px;
    }
  }

  .v-btn__content {
    display: flex;
    align-items: flex-end;
    font-size: 16px;
    line-height: 19px;
    @include up($lg) {
      font-size: 17px;
      line-height: 20px;
    }
  }

}
</style>
