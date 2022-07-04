<template>
  <div class="ambassadors pt-4 pt-sm-7">
    <v-container class="d-sm-none">
      <h1 class="text-center ">
        ambassadors &nbsp&nbsp&nbsp&nbsp&nbsp ss22
      </h1>

    </v-container>
    <v-container class="d-none d-sm-block">
      <div class="ambassadors__descr text-center ">В новом сезоне амбассадорами Zarina стали модные блогеры Мария
        Червоткина, Дарья Костромитина, Марианна Елисеева, Мария Лист

        <span class="d-block mt-3">Они не боятся экспериментировать и рисковать, идти к своим мечтам и целям, транслировать свой стиль жизни и влиять на моду!</span>
        <div class="mt-3">#силавнас <span>—  когда  мы делаем то, что любим!</span></div>
      </div>
      <div class="ambassadors__items">
        <a href="#">Мария Червоткина
          <br>
          подробнее >>> </a>
        <a href="#">Дарья Костромитина
          <br>
          подробнее >>> </a>
        <a href="#">Марианна Елисеева
          <br>
          подробнее >>> </a>
        <a href="#">Мария Лист
          <br>
          подробнее >>> </a>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ambassadors"
}
</script>

<style lang="scss">
.ambassadors {
  position: relative;
  width: 100%;
  height: 210px;
  background: url("../../assets/ambassadors/ambassadors-bg.jpg") no-repeat center;
  background-size: cover;
  @include up($sm) {
    background: url("../../assets/ambassadors/ambassadors-bg-lg.jpg") no-repeat center;
    background-size: cover;
    height: 775px;
  }

  &__descr {
    color: $white-color;
    font-weight: bold;
    font-size: 33px;
    line-height: 38.44px;

    span {
      color: $grey-color;
      font-weight: bold;
      font-size: 24px;
      line-height: 28px;
    }
  }

  a {
    position: absolute;
    font-weight: bold;
    font-size: 14px;
    line-height: 15.4px;
    text-decoration-line: underline;
    color: $white-color !important;
    &:nth-child(1) {
      top: 61%;
      left: 20%;
    }
    &:nth-child(2) {
      top: 81%;
      left: 45%;
    }
    &:nth-child(3) {
      top: 61%;
      left: 52%;
    }
    &:nth-child(4) {
      top: 81%;
      left: 75%;
    }
  }

}

</style>