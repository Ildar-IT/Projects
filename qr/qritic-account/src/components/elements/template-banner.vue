<template>
  <div class="template-banner margin-bottom-main">
      <v-row class="ma-0 ">
        <v-col cols="12" class="ma-0 pa-0">
          <!--                            <card>
                                          <div class="template-cards__image__wrap mb-8">
                                              <a target="_blank" href="https://qr-feedback.ru/kit">
                                                  <v-img class="template-cards__image"
                                                         :aspect-ratio="isWindowXS? 1: 16/9"
                                                         src="@/assets/template-banner.jpg"/>
                                              </a>
                                          </div>
                                          <div class="text-sm-center h5 mb-4">
                                              Или купите готовые наклейки у нас!
                                          </div>
                                          <div class="text-sm-center body-1 mb-4">
                                              В наборе 3 готовые наклейки и инструкция
                                          </div>

                                          <div class="text-sm-center">
                                              <a target="_blank" href="https://qr-feedback.ru/kit">
                                                  <v-btn :block="isWindowXS" large class="primary">
                                                      Подробнее
                                                  </v-btn>
                                              </a>
                                          </div>
                                      </card>-->
          <div class="template-banner__wrapper  pb-sm-6 py-sm-9 pl-sm-9 py-md-15 pl-md-15
           d-flex flex-column justify-space-between">
            <div class="template-banner__wrapper-text text-center text-sm-start mb-4 white--text">
              Или купите готовые наклейки у нас!
            </div>
            <img src="@/assets/banner-star.png" alt="Star" class="d-sm-none d-block template-banner__star mx-auto">
            <div class="text-sm-start text-center">
              <a target="_blank" href="https://hi.qritic.ru/choose_form">
                <v-btn class="primary template-banner__wrapper-btn">
                  Подробнее
                </v-btn>
              </a>
            </div>
          </div>
        </v-col>
      </v-row>
  </div>
</template>

<script>
    import config from "../../config";

    export default {
        name: "template-banner",
        data() {
            return {}
        },
        computed: {
            isWindowXS() {
                return this.$store.getters.isWindowXS;
            },
          isWindowMD() {
            return this.$store.getters.isWindowMD;
          },
        },
        methods: {}
    }
</script>

<style lang="scss">
.template-banner {
  margin-left: -16px;
  margin-right: -16px;
  padding: 40px 16px;
  background-image: url("../../assets/banner-bg-mb.jpg");
  background-position: center;
  background-size: cover;
  border-radius: 0;
  background-repeat: no-repeat;

  object-fit: cover;
  min-height: 380px;

  &__star {
    width: 205px;
    height: 200px;
  }

  @include up($sm) {
    padding: 0 32px;
    margin-left: 0;
    margin-right: 0;
    background-image: url("../../assets/template-banner.jpg");
    background-size: cover;
    background-position: 70% ;
    border-radius: 20px;
  }

  &__wrapper {
    height: 380px;
    @include up($sm) {
      width: 60%;
    }

    &-text {
      font-family: $heading-font-family;
      font-weight: bold;
      font-size: 24px;
      line-height: 29px;
      @include up($sm) {
        font-size: 30px;
        line-height: 40px;
      }
     @include up($md) {
       font-size: 41px;
       line-height: 50px;
     }
    }
    &-btn {
      height: 32px !important;
      font-size: 16px !important;
      margin-top: 25px !important;
      @include up($sm) {
        margin-top: 0 !important;
        height: 50px !important;
        font-size: 23px !important;
      }
    }
  }


  &__image {
    cursor: pointer;
    /*border-radius: 32px;*/
    @include transition-long();

    &:hover {
      overflow: hidden;
      transform: scale(1.1);
    }

    &__wrap {
      overflow: hidden;
      border-radius: 32px;
    }
  }

  .card {
    background: transparent;
  }
}
</style>