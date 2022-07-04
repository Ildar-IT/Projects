<template>
    <div class="layout-statistics">
      	<layout-header/>
        <div></div>
        <main>
            <transition name="route" mode="out-in">
                <router-view></router-view>
            </transition>
        </main>
      <footer class="layout-footer">
<!--        <div class="layout-footer__image"/>-->
        <div class="body-2 mt-8 text-center gray-text">
          Работает на

          <a class="layout-footer__link__primary"
            href="https://qritic.ru"
            target="_blank">
              Qritic.
          </a>

          <a class="layout-footer__link"
            href="https://hi.qritic.ru/policy"
            target="_blank">
            Политика.
          </a>
        </div>
      </footer>
    </div>
</template>

<script>
    import LayoutHeader from "./layout-header-2";

    export default {
        name: "layout-statistics",
        components: {
            LayoutHeader,
        },

        data() {
            return {};
        },
        computed: {
            route() {
                return this.$route.name
            },
        },
    }
</script>


<style lang="scss">
    #review-app {
      background: url('../../assets/bg.jpg'), linear-gradient(0deg, #F3F4FC, #F3F4FC);
    }
    .layout-statistics {
        align-self: center;
        /*min-height: 100vh;*/

        max-width: $layout-width;
        padding-bottom: 16px;
        padding-right: $layout-margin-xs;
        padding-left: $layout-margin-xs;

        display: flex;
        flex-direction: column;
        /*min-height: calc(100vh - 48px);*/
        min-height: calc(var(--vh, 1vh) * 100);
        /*-webkit-animation: expand 0.5s;*/
        @include up($lg) {
            margin-right: auto;
            margin-left: auto;

        }
    }

    	#review-app {

    .layout-footer {
        position: relative;
        letter-spacing: 0 !important;
        margin: 20px auto 20px auto;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-direction: column;
        width: 100%;
        //height: calc((100vw - 64px) * 0.42);
        //
        //&__image {
        //    opacity: 0.4;
        //    max-width: 640px;
        //    background-color: #f1f2ff;
        //    background-image: url("../../assets/footer.jpg");
        //    background-position: center bottom;
        //    background-blend-mode: multiply;
        //    background-size: contain;
        //    background-repeat: no-repeat;
        //    width: 100%;
        //    position: relative;
        //    height: 130px;
        //    top: 20px;
        //    @include up($sm) {
        //        height: 200px;
        //    }
        //}
          &__link {
            color: $gray;
            &__primary {
                color: $primary;
              }
          }


        &__text {
            width: 100%;
            max-width: 240px;
            color: $gray;

            @include transition();
            z-index: 1;
            cursor: pointer;

            &:hover {
                color: $primary;
            }
        }
    }
      }
    /*@-webkit-keyframes expand{
        0%{height:0px}
        100%{height:100vh}
    }*/
</style>