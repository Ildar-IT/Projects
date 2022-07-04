<template>
<div class="agreement-style-list">
  <ol class="ordered-list_first-layer">
    <li>
<!--      <h5 class="d-inline">{{ paragraph1.name }}</h5>
      <p class="body-1 mt-2">
        {{ paragraph1.description }}
      </p>-->
      <slot name="paragraph-1"></slot>

      <ol class="ordered-list_second-layer pl-0">
        <slot name="p1-ordered"></slot>
        <li class="body-1 d-flex">
          <p class="ml-2">
            Оператор ставит своей важнейшей целью и условием осуществления
            своей деятельности соблюдение прав и свобод
            человека и гражданина при обработке его персональных данных.
          </p>
        </li>
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
</template>

<script>
export default {
  name: "agreement-style-list"
}
</script>

<style lang="scss">
.agreement-style-list{
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
