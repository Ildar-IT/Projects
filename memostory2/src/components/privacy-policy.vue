<template>
  <div class="privacy-policy mx-auto px-4">

    <svgicon v-if="isWindowSM" name="dandelion-cut" original color="#ECE3CF" class="privacy-policy__bg"></svgicon>
    <svgicon v-if="!isWindowSM" name="dandelion-cut-left" original color="#ECE3CF" class="privacy-policy__bg"
             width="192"></svgicon>

    <div class="privacy-policy__content">
      <h2 class="beige-text text-center mt-md-16 mb-md-16 mb-8">{{ title }}</h2>
      <ol class="ordered-list_first-layer">
        <li>
          <h5 class="d-inline">{{ paragraph1.name }}</h5>
          <p class="body-1 mt-2">
            {{ paragraph1.description }}
          </p>

          <ol class="ordered-list_second-layer pl-0">
            <li class="body-1 d-flex"><p class="ml-2">
              Оператор ставит своей важнейшей целью и условием осуществления
              своей деятельности соблюдение прав и свобод
              человека и гражданина при обработке его персональных данных.
            </p></li>
            <li class="body-1 d-flex">
              <p class="ml-2">
                Настоящая политика Оператора в отношении обработки персональных данных (далее – Политика)
                применяется ко
                всей информации.</p>
            </li>
          </ol>

        </li>

        <li>
          <h5 class="d-inline">Основные понятия, используемые в Политике</h5>
          <p class="body-1 mt-2">
            Автоматизированная обработка персональных данных – обработка персональных данных с помощью средств
            вычислительной техники.
          </p>

          <ul class="dashed pl-11">
            <li class="body-1">Информационная система;</li>
            <li class="body-1">Обезличивание;</li>
            <li class="body-1">Обработка;</li>
            <li class="body-1">Изменение;</li>
            <li class="body-1">Извлечение;</li>
            <li class="body-1">Использование.</li>
          </ul>

        </li>
      </ol>
    </div>
  </div>
</template>

<script>


//todo проверить использование
export default {
  name: 'privacy-policy',
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
  }
}
</script>

<style lang="scss">
.privacy-policy {
  height: 100%;
  max-width: 845px;
  padding-top: 100px;
  padding-bottom: 32px;
  color: $black;
  @include up($lg) {
    padding-bottom: 141px;
  }

  &__content {
    position: relative;
    z-index: 1;
  }

  &__bg {
    position: fixed;
    width: 100vw;
    z-index: 0;
    left: 0;
    bottom: 0;

  }

  ol.ordered-list {

    &_first-layer {
      padding-left: 0;
      li:before {
        font-family: $heading-font-family;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 23px;
        display: inline;
        letter-spacing: 0.15px;
        @include up($lg) {
          font-size: 24px;
          line-height: 29px;
        }
      }
    }

    &_second-layer {
      li:before {
        font-family: $body-font-family;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 23px;
        display: inline;
      }
    }
  }

  ol {
    /* убираем стандартную нумерацию */
    list-style: none;
    /* Идентифицируем счетчик и даем ему имя li. Значение счетчика не указано - по умолчанию оно равно 0 */
    counter-reset: li;
  }

  li:before {
    /* Определяем элемент, который будет нумероваться — li.
    Before указывает, что содержимое, вставляемое при помощи свойства content,
    будет располагаться перед пунктами списка.
    Здесь же устанавливается значение приращения счетчика (по умолчанию равно 1). */
    counter-increment: li;
    /* С помощью свойства content выводится номер пункта списка.
    Первая точка в кавычках добавляет разделяющую точку между цифрами,
     второая точка в кавычках с пробелом добавляется перед содержимым каждого пункта списка */
    content: counters(li, ".") ". ";

  }

  /*Список с маркерами типа "тире".
   Сначала отменяем заданный по умолчанию стиль маркера */
  ul {
    margin: 0;
    list-style-type: none;
  }

  ul.dashed {
    list-style-type: none;
  }

  ul.dashed > li {
    text-indent: -5px;
    position: relative;
    margin-bottom: 8px;
    &:last-child{
      margin-bottom: 0;
    }
  }

  /* Задаем свой стиль маркера элемента списка с помощью псевдо элемента before */
  ul.dashed > li:before {
    content: '\2014';
    width: 18px;
    position: absolute;
    margin-left: -34px;
    font-weight: normal;
    line-height: 23px;
    letter-spacing: normal;
    font-family: $body-font-family;
  }


}
</style>
