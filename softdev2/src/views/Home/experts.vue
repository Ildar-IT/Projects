<template>
  <section class="experts">
    <v-container>
<!--      <h2>Approved by experts</h2>-->
      <swiper ref="swiper">
        <swiper-slide v-for="(item, index) of items" :key="index">
          <v-row>
            <v-col cols="12" md="8" class="px-0 pr-md-4 pr-lg-6 ">
              <img class="d-lg-none" :src="item.img" alt="">
              <img class="d-none d-lg-block" :src="item.imgLG" alt="">
            </v-col>
            <v-col cols="12" md="4" class="px-sm-0 pl-md-4 pl-lg-6">
              <v-row>
                <v-col cols="12" class="mt-8 mt-md-0 px-0">
                  <p class="experts__quote ">{{ item.quote }}</p>
                  <p class="experts__author mb-1">{{ item.expert }}</p>
                  <span class="d-block mb-8 mb-lg-13">{{ item.occupation }} <br> {{ item.company }} </span>
                </v-col>
                <v-col cols="12" sm="6" md="12" class="experts__wrap pl-0  pt-4">
                  <slot name="pagination">
                    <span class="experts__dot" v-for="(item, index) of items" :key="index"></span>
                  </slot>
                </v-col>
                <v-col cols="12" sm="6" md="12" class="pr-0 px-md-0 d-flex align-end">
                  <primary-link-blue class="d-flex" :to="{name:'testimonials'}"/>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </swiper-slide>
      </swiper>

      <!--      <v-row>-->
      <!--        <v-col>-->
      <!--          <div class="d-sm-flex d-md-none justify-space-between align-center">-->
      <!--            <div class="experts__dots d-flex">-->
      <!--              <slot name="pagination">-->
      <!--                <span class="experts__dot" v-for="(item, index) of items" :key="index"></span>-->
      <!--              </slot>-->
      <!--            </div>-->

      <!--            <primary-link-blue class="d-flex d-md-none" :to="{name:'testimonials'}"/>-->
      <!--          </div>-->
      <!--        </v-col>-->
      <!--      </v-row>-->
    </v-container>
  </section>
</template>

<style lang="scss">
.experts {

  padding: 60px 0;
  @include up($sm) {
    padding: 100px 0 60px;
  }
  @include up($md) {
    padding: 120px 0 60px;
  }
  @include up($lg) {
    padding: 170px 0 230px;
  }



  h2 {
    margin-bottom: 32px;
    @include up($md) {
      margin-bottom: 40px;
    }
    @include up($lg) {
      margin-bottom: 50px;
    }
  }

  p {
    color: $black;
  }

  img {
    width: 100%;
    height: 100%;

  }
  .row {
    height: 100%;
  }

  &__wrap {
    @include up($md) {
      margin-bottom: 73px;
    }
    @include up($lg) {
      margin-bottom: 62px;
    }
  }

  &__quote {
    margin-bottom: 32px !important;
    @include up($md) {
      margin-bottom: 40px !important;
      font-size: 15px;
      line-height: 150%;
    }
    @include up($lg) {
      margin-bottom: 65px !important;
    }
  }

  &__author {
    color: $dark-grey !important;
  }

  span {
    font-size: 13px;
    line-height: 150%;
    color: $dark-grey;
  }

  &__dot {
    display: block;
    width: 12px;
    height: 12px;
    background: $secondary-2;
    margin-bottom: 32px;

    &:not(:last-child) {
      margin-right: 12px;
    }

    @include up($md) {
      width: 15px;
      height: 15px;
      margin-bottom: 0;
    }
  }

  .primary-link-blue {
    width: 100%;
  }

}
</style>
<script>
import PrimaryLinkBlue from "../../components/primary-link-blue";

export default {
  components: {PrimaryLinkBlue},
  name: 'experts',
  data() {
    return {
      items: [
        {
          img: require('@/assets/Main/expert-md.jpg'),
          imgLG: require('@/assets/Main/expert-lg.jpg'),
          quote: '“SoftDev delivers highly technical solutions with consistent quality. The level of technical depth – specifically in the areas of mathematics and Computer aided design — is top notch.”',
          expert: 'John Oberon,',
          occupation: 'VP Engineering at Mashery',
          company: 'Intel Company'

        },
      ],
    }
  }

}
</script>