<template>
  <section class="policy text-center d-flex align-center justify-center">
    <v-container>
          <div class="policy__wrapper text-start">
            <h3 class="my-primary text-center mb-16">Personal data processing policy</h3>
            <h5 >1. General Provisions</h5>
              <div class="my-text-2 policy__text mt-4 mb-8">Every piece of LE BONHEUR pralines is made with love, because we know that our emotions influence the quality of the product just as much as the ingredients do. We pick and toast the nuts, extract basil oil, choose seasonal berries and make creamy caramel of fresh cream, for we believe that sweets, just like life, need everything whole-hearted. </div>
              <h5>2. Basic concepts</h5>
            <ul class="mt-4">
              <li class="my-text-2  policy__text">Every piece of LE BONHEUR pralines is made with love, because we know that our emotions.</li>
              <li class="my-text-2  policy__text">Influence the quality of the product just as much as the ingredients do.</li>
              <li class="my-text-2  policy__text">We pick and toast the nuts, extract basil oil, choose seasonal berries and make creamy caramel of fresh cream.</li>
            </ul>
          </div>
    </v-container>
  </section>
</template>

<script>

export default {
  name: "policy",

}
</script>

<style lang="scss">
.policy {
  margin-top: 128px;
  width: 100%;
  height: calc(100% - 128px);
  &__wrapper {
    width: 100%;
  }
  &__list {
    list-style-type: decimal;
  }

  &__text {
    font-size: 15px;
    line-height: 28px;
    letter-spacing: 2px;
  }

  h5, .policy__text {
    color: $black-200;
  }
}
</style>