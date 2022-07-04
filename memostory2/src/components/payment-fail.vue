<template>
 <div class="payment-fail layout-top d-flex align-center justify-center flex-column">
  <h2 class="text-center margin-bottom-main"> {{ dialogs.failPay ? dialogs.failPay : "Платеж не выполнен..." }}
	</h2>
  <div class="flex-center flex-column">
      <div class="mb-8">
          <v-btn large class="primary" @click="$router.push({name:'balance'})">
              <span> {{ pageButtons.again ? pageButtons.again : "Повторить" }} </span>
          </v-btn>
      </div>

  </div>
</div>
</template>

<script>
export default {
  name: 'payment-fail',
  computed: {
    dialogs() {
      return this.$store.state.common.dialogs || {};
    },
    pageButtons() {
      return this.$store.state.common.buttons || {};
    }
  }
}
</script>

<style>
.payment-fail {
  height: 80vh;
}

</style>