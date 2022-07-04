<template>
    <header class="layout-header pb-11">
        <div v-if="page.poll && page.poll.DETAIL_PICTURE" >
            <img :src="page.poll.DETAIL_PICTURE" class="layout-header__logo">

        </div>
<!--        <svgicon v-else
                 name="logo3"
                 original
                 :fill="false"
                 :height="isWindowLG ? '76' : '48'"
                 :width="isWindowLG ? '224' : '140'"></svgicon>-->
<!--      <div v-else class="layout-header__logo-empty d-flex justify-center align-center">-->
<!--        <span>Логотип</span>-->
<!--      </div>-->
    </header>
</template>

<script>
    export default {
        name: "layout-header",
        components: {},
        data: () => ({}),
        computed: {
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
            page() {
                return this.$store.state.currentPage;
            },
        }
    }
</script>

<style lang="scss">
.layout-header {
  position: relative; // нужно для красоты с конфети
  z-index: 10; // нужно для красоты с конфети
  display: flex;
  justify-content: center;
  padding-top: 0;

  &__logo {
    max-width: 120px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;

    @include up($sm) {
      max-width: 200px;
    }

    &-empty {
      width: 206px;
      height: 100px;
      border: 1px dashed $gray3;
      box-sizing: border-box;
      border-radius: 20px;
      color: $gray3;
      span {
        font-size: 19px;
      }
    }
  }
}

</style>
