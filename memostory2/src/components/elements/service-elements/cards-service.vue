<template>
  <div class="cards-service">
    <div v-if="isWindowXS">
      <swiper ref="cardsServiceSwiper" :options="swiperOptions" class=" px-0 ">
        <swiper-slide v-for="item of items" :key="item.ID">
          <card-service :item="item"/>
        </swiper-slide>
          <div class="cards-service__pagination custom-pagination "
               id="services-swiper-pagination"
               slot="pagination">
          </div>
      </swiper>
    </div>

<!--    <div >-->
    <div v-else class="d-flex justify-center flex-wrap mx-auto mx-lg-0 ">

          <card-service  v-for="item of items" :key="item.name"  :item="item"/>

      </div>
<!--    </div>-->
  </div>
</template>

<script>
import '@/plugins/swiper';
import CardService from "./card-service";

export default {
  name: "cards-service",
  components: {CardService},
  //props: ['items'],
  data() {
    return {
      isMoving: false,
      swiperOptions: {
        keyboard: {
          enabled: true,
        },
        slidesPerView: 'auto',
        autoHeight: true,
        navigation: {
          nextEl: "#swiper-controller-next",
          prevEl: "#swiper-controller-prev",
        },
        spaceBetween: 32,
        pagination: {
          el: '#services-swiper-pagination',
          type: 'bullets',
          // dynamicBullets: true,
          clickable: true
        },
      },
    };
  },
  computed: {
    isWindowXS() {
      return this.$store.getters.isWindowXS;
    },
    swiper() {
      return this.$refs.cardsServiceSwiper.$swiper;
    },
    items() {
      return this.$store.state.common.services;
    }
  }
}
</script>

<style lang="scss">
.cards-service {
  &__pagination {
    padding-top: 42px;
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;

    

    .swiper-pagination-bullet {
      width: 12px;
      height: 12px;
      margin: 0 8px;
      background-color: $beige6;
      opacity: 1;

      &-active {
        background-color: $beige1;
      }
    }

  }

  // &__items {
  //   .col-12  {
  //     .card {
  //       margin: 0 64px 0 0  !important;
  //     }

  //     &:first-child {
  //       .card {
  //         @include up($lg) {
  //           margin-right: 64px !important;
  //           margin-left: 0px !important;
  //         }
  //       }
  //     }
  //     &:last-child {
  //       .card {
  //         @include up($lg) {
  //           // margin-left: 32px !important;
  //           margin-right: 0px !important;

  //         }
  //       }
  //     }

  //   }
  //}
}




</style>
