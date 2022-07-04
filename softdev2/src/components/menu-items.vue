<template>
  <nav class="menu-items interaction">
    <div class="menu-items__list d-flex justify-space-between">
      <ul :class="isHeader ? 'd-flex': ''">
        <li v-for="(item, index) of items" class="menu-items__item" :key="index">
          <router-link :to="item.route"
                       @click.native="onMenuItemClick(item)"
                       class="menu-items__link">{{ item.name }}
          </router-link>
        </li>
      </ul>

      <div  v-if="notSelectList.length >= 1"
           class="menu-items__select d-none d-md-flex flex-column justify-space-between pl-10 pr-8"
           :class="activeSelect ? 'bg':''">

        <span id="menuLangSelect" class=" menu-items__select-item list"
            :class="activeSelect ? 'menu-items__select-item-active ' : 'animate__animated animate__fadeIn'"
            @click="rotateArrow"> {{ selectLang[0].name }}
        </span>
        <ul :class="activeSelect ? 'd-block animate__animated animate__fadeIn mt-10 pb-4' : 'd-none'">
          <li
              v-for="item in notSelectList"
              :key="item.code">
            <a :href="item.url" >{{ item.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
.menu-items {
  display: block;
  width: 100%;

  font-size: 15px !important;
  line-height: 140% !important;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: $primary-2 !important;

  @include up($sm) {
    column-count: unset;
  }

  a {
    color: $primary-2 !important;
  }

  &__list {
    padding-top: 30px;
    @include up($md) {
      display: flex;
      padding-top: 0;
    }
  }


  &__item {
    display: block;
    color: $primary-2 !important;
    font-size: 15px;
    font-weight: 700;

    &:not(:last-child) {
      margin-bottom: 32px;
      @include up($sm) {
        margin-right: 68px;
      }
      @include up($md) {
        margin-bottom: 0;
      }
    }

    &:hover,
    &:hover a {
      color: $primary-1 !important;
    }
  }
  .bg {

    &::after {
      content: "";
      position: absolute;
      top: -12px;
      left: 0;
      height: 100px;
      backdrop-filter: blur(10px);
      background-color: $header-bg;
      width: 180px;
    }
  }
  &__select {
    width: 180px;

    height: 22.5px;
    position: relative;


    &-item.list {
      cursor: pointer;
      position: relative;
      z-index: 3;
      font-weight: 700;

      &::after {
        z-index: 1;
        position: absolute;
        content: "";
        background-image: url("~@/assets/arr-down.svg");

        width: 15px;
        height: 9px;
        top: 5px;
        right: -4px;
        @include transition-long();
      }

      &-active {
        &::after {
          transform: rotate(180deg);
        }
      }
    }

    ul {
      z-index: 10;
      position: absolute;
      left: 40px;
      bottom: -30px;
      transform: translateY(100%) !important;

    }

    li {
      font-weight: 700;
      font-size: 14px;
      @include up($md) {
        font-size: 15px;
      }

      &:hover {
        color: $primary-1 !important;
      }
    }
  }
}
</style>

<script>
import Config from "@/config";

export default {
  name: "menu-items",
  props: {
    isHeader: {
      default: false
    }
  },

  data: () => ({

  }),
  computed: {
    items() {
      return this.$store.state.common?.menus?.map(el => ({
        name: el.shorttitle,
        route: (el.url?.match(/^\/.+/) ? el.url : "/" + el.url)
      }));

    },
    domains() {
      return this.$store.state.common?.domains?.map(el => (
          {
            name: el.title,
            url: el.domain,
            shortName: el.shorttitle,
            code: el.locale,
            isCurrent: el.isCurrent
          }
      ));
    },
    notSelectList() {
     return this.domains?.filter(item => item.isCurrent === undefined)
    },
    selectLang() {
      return this.domains?.filter(item => item.isCurrent)
    },
    activeSelect() {
      return this.$store.state.menuLangActive
    }
  },
  methods: {
    onMenuItemClick(item) {
      this.$emit("select", item);
      // alternatively -> this.$store.state.isBurgerMenuShown = false;
    },
    rotateArrow(e) {
      console.log(e)
      this.$store.state.menuLangActive = !this.activeSelect;
    },

  },
}
</script>
