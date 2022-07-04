<template>
    <header class="header">
        <v-container class="d-flex justify-space-between align-center">
            <router-link to="/Shops" class="d-md-none">
                <svg class="icon-map" width="31" height="28" viewBox="0 0 31 28" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.4545 22.2727L1 24.6364V3.36364L10.4545 1" stroke="black" stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"/>
                    <path d="M19.9091 27L10.4546 22.2727V1L19.9091 5.72727V27Z" stroke="black" stroke-width="2"
                          stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19.9087 5.72692L29.3632 3.36328V24.636L19.9087 26.9996" stroke="black" stroke-width="2"
                          stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </router-link>

            <div class="header__items header__items--logo d-flex align-center">
                <router-link to="/" class=" mr-4 mr-lg-8">
                    <svg class="logo" width="50" height="26" viewBox="0 0 50 26" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.53884 1.36777L0 2.72939V12.6735L1.53884 14.0351L3.07148 15.3967L6.34773 15.4028H9.61777V21.1943H4.77786V19.0995H0V23.2829L1.53884 24.6384L3.07148 25.9938H11.3862L12.8878 24.6569L14.3956 23.3199L14.3894 18.2986V13.2773L11.3862 10.6033L8.08513 10.5972H4.77786V4.80569H9.61157L9.6488 6.74645L12.0253 6.76493L14.3956 6.77725V2.6801L12.8878 1.34313L11.3862 0.00616317H3.07148L1.53884 1.36777Z"
                            fill="#C10016"/>
                        <path
                            d="M16.7535 12.0635L16.2447 12.5379L15.7297 13.0062L16.7597 13.955L16.7535 19.9744V26H21.5314V15.4028H26.9918V26H31.7697L31.7821 13.8934L32.7501 13.0062L32.2599 12.5379L31.7697 12.0758V0H26.9918V10.5972H21.5314V0H16.7535V12.0635Z"
                            fill="#C10016"/>
                        <path
                            d="M34.0655 12.045L33.0789 13.0246L33.5691 13.4806L34.0655 13.9365V23.2829L35.6044 24.6384L37.137 26H45.8861L47.4559 24.6322L49.0196 23.2645V13.9427L49.5098 13.4744L50 13.0123L49.5098 12.5318L49.0196 12.045V0H44.2417V12.0635L43.2241 13.0123L44.2417 13.9365V21.1943H38.8434V17.5716L38.8372 13.955L39.8672 13.0062L38.8434 12.0635V0H34.0655V12.045Z"
                            fill="#C10016"/>
                    </svg>
                </router-link>
                <menu-items class="d-none d-md-flex"/>
            </div>

            <div class="header__items d-flex align-center">
                <div class="header__search-wrap">
                    <input class="header__search d-none d-md-flex mr-4 mr-lg-8" :placeholder="texts.search">
                    <button class="header__search-btn d-none d-md-flex" type="button">
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M11.6523 19C16.0706 19 19.6523 15.4183 19.6523 11C19.6523 6.58172 16.0706 3 11.6523 3C7.23407 3 3.65234 6.58172 3.65234 11C3.65234 15.4183 7.23407 19 11.6523 19Z"
                                  stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21.6527 21.0004L17.3027 16.6504" stroke="black" stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>

                <select-custom :options="lang"
                               v-model="langID"
                               @change="onLangChange"
                />


            </div>

            <div class="header__burger d-md-none" @click="toggleBurgerMenu">
                <div class="header__burger-icon"
                     :class="{'header__burger-icon--closed':isBurgerMenuShown}">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </v-container>
        <burger-menu v-if="isBurgerMenuShown" @select="onMenuItemSelected" class="d-md-none"/>
    </header>
</template>

<style lang="scss">
.header {
    padding: 32px 0;

    // корректирует цвета menu elements для верхней шапки
    .menu-items a {
        color: $black500 !important;

        &:hover,
        &:focus,
        &:active {
            color: $primary500 !important;
        }
    }

    &__items--logo {
        margin: auto;
        @include up($md) {
            margin: 0;
        }
    }


    &__burger {
        cursor: pointer;
        width: 32px;
        height: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 4;
    }

    &__burger-icon {
        display: flex;
        width: 32px;
        height: 2px;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        span {
            width: 100%;
            height: 2px;
            background-color: $black500;
            margin: -7px;

            @include transition();
        }

        &--closed {
            span {
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

    &__search-wrap {
        position: relative;
        z-index: 5;
    }

    &__search-btn {
        position: absolute;
        top: 13px;
        right: 32px;
        @include up($lg) {
            right: 47px;
        }
    }

    &__search {
        height: 50px;
        width: 200px;
        background-color: $additional100 !important;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.06);
        border-radius: 999px;
        padding-left: 17px;
        font-size: 18px;
        z-index: 10;
        @include up($lg) {
            width: 296px;
        }
    }
    .select-custom {
        display: none;
        margin: 0 !important;
        width: 85px;
        height: 50px;
        z-index: 2;
        ul {
            width: 100%;
        }
        @include up($md) {
            display: block;
        }
    }
}

.logo {
    @include up($lg) {
        width: 96px;
        height: 50px;
    }
}

</style>

<script>
import MenuItems from "../../components/menu-items.vue";
import BurgerMenu from "../../components/burger-menu";
import SelectCustom from "../../components/select-custom";

export default {
    name: 'the-header',
    components: {SelectCustom, BurgerMenu, MenuItems},
    data() {
        return {
            isBurgerMenuShown: false,
            activeSelect: false,
            langID: null,
        }
    },
    computed: {
        texts() {
            return {
                search: this.$store.state.common?.commontext?.SEARCH_PLACEHOLDER,
                ru: this.$store.state.common?.commontext?.LANG_RU,
                en: this.$store.state.common?.commontext?.LANG_EN,
            }
        },
        lang() {
            return {
                ru: this.$store.state.common?.commontext?.LANG_RU,
                en: this.$store.state.common?.commontext?.LANG_EN,

            }
        },


    },
    methods: {
        toggleBurgerMenu() {
            this.isBurgerMenuShown = !this.isBurgerMenuShown;
        },
        onMenuItemSelected(item) {
            console.log("Clicked detected in the header: ", item);
            this.isBurgerMenuShown = false;
        },
        onLangChange() {
            this.langID = null;
        }

    },
}

</script>