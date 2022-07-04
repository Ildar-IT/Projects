<template>
  <section class="stats">
    <img class="cloud cloud--3" src="@/assets/Main/clouds/3.svg">
    <img class="d-sm-none cloud cloud--4" src="@/assets/Main/clouds/4.svg">
    <img class="d-none d-sm-block cloud cloud--6" src="@/assets/Main/clouds/6.svg">
    <img class="d-none d-sm-block cloud cloud--7" src="@/assets/Main/clouds/7.svg">

    <v-container class="d-flex justify-center">
      <ul class="stats__list">
        <li class="stats__item" v-for="item in stats" :key="item.content">
          <span>{{item.title}}</span>
          <span class="stats__item-content">{{item.content}}</span>
        </li>
      </ul>
    </v-container>
  </section>
</template>

<script>
export default {
  computed: {
    stats() {
      return this.$store.state.page?.stats;
    },
  }
}
</script>

<style lang="scss">
.stats {

  position: relative;
  color: $white;
  padding-bottom: 60px;
  @include up($sm) {
    overflow-x: clip;
    padding-bottom: 80px;
  }
  @include up($md) {
    overflow-x: clip;
    padding-bottom: 100px;
  }

  .cloud {
    &--3 {
      left: -16%;
      top: -40%;
      @include up($sm) {
        left: 0;
        top: 0;
      }
      @include up($md) {
        left: -3%;
        top: -15%;
      }
    }

    &--4 {
      right: 5%;
      bottom: 0;
    }

    &--6 {
      right: -5%;
      bottom: 15%;
    }

    &--7 {
      bottom: -20%;
      left: 26%;
    }
  }

  &__list {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 400px;
    @include up($sm) {
      justify-content: space-between;
      max-width: 600px;
    }
    @include up($md) {
      justify-content: space-between;
      max-width: 1000px;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    text-align: center;
    &-content {
      display: block;
      margin: 0 auto;
      max-width: 170px;
    }
    span:first-child {
      font-weight: 700;
      font-size: 24px;
      line-height: 33px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 30px;
      position: relative;

      &::after {
        position: absolute;
        content: "";
        width: 100%;
        height: 1px;
        top: 50px;
        left: 0;
        background: $secondary-2;
      }

      @include up($sm) {
        font-size: 40px;
        line-height: 110%;
        margin-bottom: 45px;
        &::after {
          top: 64px;
        }
      }
      @include up($md) {
        font-size: 80px;
        line-height: 130%;
        &::after {
          top: 109px;
        }
      }
    }

    span:last-child {
      font-weight: 700;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      @include up($sm) {
        font-size: 16px;
        line-height: 22px;
      }
      @include up($md) {
        font-size: 20px;
        line-height: 27px;
      }
    }

    /*    &:not(:last-child) {
            margin-bottom: 40px;
        } */


  }
}
</style>
