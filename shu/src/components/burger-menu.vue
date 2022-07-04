<template>
  <div v-if="isBurgerMenuShown" class="burger-menu text-center">
    <v-container class="burger-menu__container">
      <div class="burger-menu__buttons pb-8">
        <router-link to="/" class=" mr-4 mr-lg-8">
          <svg class="logo" width="50" height="26" viewBox="0 0 50 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.53884 1.36777L0 2.72939V12.6735L1.53884 14.0351L3.07148 15.3967L6.34773 15.4028H9.61777V21.1943H4.77786V19.0995H0V23.2829L1.53884 24.6384L3.07148 25.9938H11.3862L12.8878 24.6569L14.3956 23.3199L14.3894 18.2986V13.2773L11.3862 10.6033L8.08513 10.5972H4.77786V4.80569H9.61157L9.6488 6.74645L12.0253 6.76493L14.3956 6.77725V2.6801L12.8878 1.34313L11.3862 0.00616317H3.07148L1.53884 1.36777Z" fill="#C10016"/>
              <path d="M16.7535 12.0635L16.2447 12.5379L15.7297 13.0062L16.7597 13.955L16.7535 19.9744V26H21.5314V15.4028H26.9918V26H31.7697L31.7821 13.8934L32.7501 13.0062L32.2599 12.5379L31.7697 12.0758V0H26.9918V10.5972H21.5314V0H16.7535V12.0635Z" fill="#C10016"/>
              <path d="M34.0655 12.045L33.0789 13.0246L33.5691 13.4806L34.0655 13.9365V23.2829L35.6044 24.6384L37.137 26H45.8861L47.4559 24.6322L49.0196 23.2645V13.9427L49.5098 13.4744L50 13.0123L49.5098 12.5318L49.0196 12.045V0H44.2417V12.0635L43.2241 13.0123L44.2417 13.9365V21.1943H38.8434V17.5716L38.8372 13.955L39.8672 13.0062L38.8434 12.0635V0H34.0655V12.045Z" fill="#C10016"/>
            </svg>
        </router-link>
        <!--<div class="burger-menu__burger d-md-none" @click="toggleBurgerMenu">
          <div class="burger-menu__burger-icon"
             :class="{'burger-menu__burger-icon--opened':isBurgerMenuShown}">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>-->
      </div>

        <div class="header__items d-flex align-center">
          <div class="header__search-wrap">
            <input class="header__search d-none d-md-flex mr-4 mr-lg-8" :placeholder="texts.search">
            <button class="header__search-btn d-none d-md-flex" type="button">
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6523 19C16.0706 19 19.6523 15.4183 19.6523 11C19.6523 6.58172 16.0706 3 11.6523 3C7.23407 3 3.65234 6.58172 3.65234 11C3.65234 15.4183 7.23407 19 11.6523 19Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21.6527 21.0004L17.3027 16.6504" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <select class="header__select d-none d-md-flex">
            <option class="header__option">{{ texts.ru }}</option>
            <option class="header__option">{{ texts.en }}</option>
          </select>
        </div>

      <site-search></site-search>
      <menu-items @select="onMenuItemSelected"/>
      <language-select
          class="mt-8 mb-8"
      />
    </v-container>
  </div>
</template>

<style lang="scss">
  .burger-menu {
    background-image: url("~@/assets/bg/bg-lg.jpg");
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    width: 100vw;
    //height: calc(100vh - 97px);
    height: 100vh;
    padding-top: 32px;
    padding-bottom: 32px;

    box-sizing: border-box;
    display: flex;

    &__container {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }

    &__buttons {
      display: flex;
      justify-content: space-between;
    }

    &__burger {
      cursor: pointer;
      width: 32px;
      height: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__burger-icon {
      display: flex;
      width: 32px;
      height: 2px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: -5px;

      @include transition();


      span {
        width: 100%;
        height: 2px;
        background-color: $black500;
        margin: -7px;
        &:first-child {
          transform: none;
        }
        &:nth-child(2) {
          transform: none;
        }
        &:nth-child(3) {
          display: block;
        }
      }

      &--opened {
        margin-bottom: -5px;
        span {
          width: 100%;
          height: 2px;
          background-color: $black500;
          margin: -7px;
          &:first-child {
            transform: translateY(-8.5px) rotate(45deg);
          }
          &:nth-child(2) {
            transform: translateY(3.5px) rotate(-45deg);
          }
          &:nth-child(3) {
            display: none;
          }

        }
      }
    }


    & .menu-items__link {
    color: $black500 !important;
    }
    & .menu-items__item {
      position: relative;
      &:not(:last-child) {
        margin-bottom: 32px;
        &::after {
          position: absolute;
          content: "";
          width: 100%;
          height: 1px;
          opacity: 0.5;
          border: 1px solid rgba(0, 0, 0, 0.16);
          left: 0;
          bottom: -18px;
        }
      }
    }

  }
</style>

<script>
import Home from "../views/Home";
import MenuItems from "./menu-items";
import SiteSearch from "./site-search";
import LanguageSelect from "./language-select";
export default {
  name: "burger-menu",
  components: {LanguageSelect, SiteSearch, MenuItems, Home},
  props: {
    isBurgerMenuShown: {
      default: true
    }
  },
    computed: {
        texts() {
            return {
                search: this.$store.state.common?.commontext?.SEARCH_PLACEHOLDER,
                ru: this.$store.state.common?.commontext?.LANG_RU,
                en: this.$store.state.common?.commontext?.LANG_EN,
                ruMob: this.$store.state.common?.commontext?.LANG_RU_MOBILE,
                enMob: this.$store.state.common?.commontext?.LANG_EN_MOBILE,
            }
        },
    },
  methods: {
    onMenuItemSelected(item) {
      this.$emit("select", item);
    },
    toggleBurgerMenu() {
      this.isBurgerMenuShown = false;
    },
  },
}
</script>