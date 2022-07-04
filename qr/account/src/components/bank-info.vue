<template>
  <div class="subscription-tariff layout-top ">
    <h1 class="text-center margin-bottom-main">
      Реквизиты
    </h1>
     <div>
      <div class="pb-4">Индивидуальный предприниматель Мурыгин Артем Михайлович</div>
      <div class="h6">Юридический адрес</div>
      <div  class="pt-4 pb-4">г. Санкт-Петербург, Морская наб., дом 35, корп. 3, кв. 64.</div>
      <div class="h6 pb-4">Почтовый адрес</div>
      <div class="pb-4" >
        199397, Санкт-Петербург, ул. Кораблестроителей, д. 32, корп. 1, пом. 40Н
      </div>
      <div><span class="h6 pt-4 pb-4">ИНН</span>781133769020</div>
      <div  class="pt-4 pb-4" >
        <span class="h6">р/c </span> 40802810455000057584 в СЕВЕРО-ЗАПАДНЫЙ БАНК
        ПАО СБЕРБАНК г. Санкт- Петербург
      </div>
      <div class="pb-4">
      <span class="h6">БИК </span> 044030653, к/c 30101810500000000653
      </div>
      <div class="pb-4">info@qrfb.ru</div>
      <div class="pb-4">+7 812 303 77 00</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'bank-info',

  computed: {
    page() {
      return this.$store.state.page;
    },
  }
}
</script>