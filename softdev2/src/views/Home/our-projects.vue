<template>
  <section class="our-projects">
    <v-container>
      <h2>{{ projectsTitle }}</h2>

      <swiper class="swiper mt-6 mb-12 mt-md-15 mb-md-15" ref="swiper" :options="swiperOptions">
        <swiper-slide v-for="(item, index) of items" :key="index">
          <router-link :to="item.to">

            <div class="mb-5 our-projects__name d-flex  interaction">{{ item.name }}</div>


            <img :src="item.image" alt="">
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination swiper-no-swiping mt-5 mt-md-8" slot="pagination">
          <span></span>
        </div>
      </swiper>

      <v-row>
        <v-col cols="12" sm="6" md="8" class="d-flex align-center pl-0">
          <h3 class="mb-8 mb-sm-0"></h3>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="pr-0 pl-md-6 pl-lg-9">
          <primary-link-blue class="d-flex" :to="{name:'Projects'}">{{ text[0].title }}</primary-link-blue>
        </v-col>
      </v-row>
    </v-container>

  </section>
</template>

<script>
import '../../plugins/vue-awesome-swiper';
import PrimaryLinkBlue from "../../components/primary-link-blue";
import SwiperSection from "../../components/swiper-section";

export default {
  name: 'our-projects',
  components: {
    PrimaryLinkBlue,
    SwiperSection
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 1.2,
        loop: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,

        },
        breakpoints: {
          580: {
            slidesPerView: 1.3,
            spaceBetween: 16
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24
          },
          1184: {
            slidesPerView: 3.3,
            spaceBetween: 30
          },
          1704: {
            slidesPerView: 3,
            spaceBetween: 50
          },
        }

      },
      currentSlide: 1,
    }
  },
  computed: {
    items() {
      return this.$store.state.page?.projects?.map(el => ({
        name: el.shorttitle,
        image: el.media_hot?.url,
        to: {name: "ProjectItem", params: {code: el.parentCode, projectcode: el.url}}

      }));
    },
    text() {
      return this.$store.state.common?.buttonsText.filter(el => el.uid === "learn");
    },
    projectsTitle() {
      const project = this.$store.state.common?.menus?.filter(el => el.url === "projects");
      return project[0].shorttitle;
    }

  },
}
</script>

<style lang="scss">
.our-projects {

  padding: 60px 0;
  @include up($sm) {
    padding: 100px 0;
  }
  @include up($md) {
    padding: 120px 0 70px;
  }
  @include up($lg) {
    padding: 160px 0 120px;
  }

  h2 {
    margin-bottom: 32px;
    @include up($md) {
      margin-bottom: 70px;
    }
  }

  h4 {
    @include up($md) {
      margin-bottom: 18px;
    }
  }

  &__dot {
    display: block;
    width: 12px;
    height: 12px;
    background: $secondary-2;

    &:not(:last-child) {
      margin-right: 12px;
    }

    @include up($md) {
      width: 15px;
      height: 15px;
    }
  }

  &__img {
    width: 230px;

    @include up($sm) {
      width: 342px;
    }
    @include up($lg) {
      width: 100%;
    }
  }

  .primary-link-blue {
    width: 100%;
  }

  .swiper {
    height: auto;
    width: 100% !important;
    margin-right: -24px !important;
    @include up($sm) {
      min-height: 350px;
      margin-right: -30px !important;
    }

    &-slide {
      display: flex;
    }

    .primary-link-blue {
      width: 100%;
    }

    img {
      display: block;
      object-fit: cover;
      width: 230px;
      height: 230px;
      //height: 100%;
      //width: 100%;

      @include up($sm) {
        width: 342px;
        height: 342px;
      }
      @include up($md) {
        width: 332px;
        height: 332px;
      }
      @include up($lg) {
        width: 460px;
        height: 460px;
      }


    }

    .our-projects__name {

      text-transform: uppercase;

      display: flex;
      align-items: flex-end;
      width: 230px;
      height: 60px;
      margin-bottom: auto;
      @include up($sm) {
        width: 342px;
        height: 78px;
/*        font-size: 20px;*/
      }
      @include up($md) {
        width: 332px;
      }
      @include up($lg) {
        width: 460px;
        height: 60px;
      }

    }

    .swiper-pagination {
      display: block;
      position: relative;
      z-index: 10;
      bottom: 0;
      text-align: start;

      &-bullet {
        width: 12px;
        height: 12px;
        margin-right: 15px !important;
        opacity: unset;

        background: $secondary-2;
        outline-color: $secondary-1;
        border-radius: 0;
        @include transition();
        @include up($md) {
          width: 15px;
          height: 15px;
        }

        &:hover {
          background: $secondary-1;
        }
      }

      &-bullet-active {
        background: $secondary-1;
      }
    }

  }
}
</style>