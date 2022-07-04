<template>
  <div class="subscription-tariff layout-top">
    <h1 class="text-center margin-bottom-main">Оплата и отмена подписки</h1>
    <div>
      <ol>
        <li> <div class="h6 pt-4 pb-4"> Пополнение баланса </div> 
        <div> Укажите необходимую сумму и пополите Ваш баланс. </div>
        </li>        
        <li> <div class="h6 pt-4 pb-4">  Переход на платный тариф </div>
        <div>После пополнения баланса, подтвердите переход на тарифный план «Премиум».</div>
        </li>
        <li> <div class="h6 pt-4 pb-4"> Используйте все преимущества тарифа «Премиум» </div>
        <div>Тариф «Премиум» действует до тех пор, пока на Вашем балансе достаточно средств.</div>
        </li>
        <li> <div class="h6 pt-4 pb-4"> Отмена подписки </div>
        <div class="pb-8">Платная подписка автоматически отменяется при отсутствии необходимого количества средств на Вашем балансе Qritic. Вы также можете отменить её принудительно в разделе «Подписка».</div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: "subcription-rules",

  computed: {
    page() {
      return this.$store.state.page;
    },
  },
};
</script>


<style lang="scss" scoped>
  li::marker {
    font-family: Montserrat, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 23px;
}
  
</style>