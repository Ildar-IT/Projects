<template>
    <header v-scroll="handleScroll">
        <transition name="fade" appear>
            <header-sticky v-if="isSticky" @click="scrollTo"/>
        </transition>
        <transition name="fade" appear>
            <div v-if="!isSticky" class="d-none d-md-block header">
                <div class="header__contacts">
                    <div class="header__container">
                        <div class="header__contacts-left">
                            <a class="header__contacts__search-shop" href="https://zarina.ru/shops/"
                               target="_blank">
                                <img src="~@/assets/the-header/geo.svg" alt="geo">
                                <span>Найти магазины</span>
                            </a>

                            <!--<div class="header__contacts__city">
                                <div class="header__contacts__text header__contacts__arrow">
                                    Санкт-Петербург
                                </div>
                            </div>-->
                        </div>

                        <div class="header__contacts-right">
                            <div class="header__contacts__tel-text">
                                Звонок бесплатный
                            </div>

                            <a class="header__contacts__tel-number" href="tel: 88002500557">8 800 250 05 57</a>
                        </div>
                    </div>
                </div>

                <div class="header__menu">
                    <div class="header__container">

                        <a class="header__menu__logo" href="https://zarina.ru/" target="_blank">
                            <img src="~@/assets/the-header/logo.svg" alt="Zarina">
                        </a>

                        <a href="https://zarina.ru/catalog/new/" target="_blank">Новинки</a>
                        <a href="https://zarina.ru/catalog/clothes/" target="_blank"
                           class="header__menu__item-link">Одежда</a>
                        <a href="https://zarina.ru/catalog/accessories/" target="_blank"
                           class="header__menu__item-link">Аксессуары</a>
                        <a href="https://zarina.ru/catalog/sale/" target="_blank"
                           class="header__menu__item-link">Sale</a>

                        <div class="header__socials">
                            <a href="https://zarina.ru/catalog/new/" target="_blank"><img
                                    class="header__menu__social-img1"
                                    src="~@/assets/the-header/search.svg" alt="Поиск" title="Поиск"></a>
                            <a href="https://zarina.ru/favorites/" target="_blank"><img
                                    class="header__menu__social-img2"
                                    src="~@/assets/the-header/heart.svg" alt="Избранное" title="Избранное"></a>
                            <a href="https://zarina.ru/personal/" target="_blank"><img
                                    class="header__menu__social-img3"
                                    src="~@/assets/the-header/user.svg" alt="Личный кабинет" title="Личный кабинет"></a>
                            <a href="https://zarina.ru/personal/" target="_blank"><img
                                    class="header__menu__social-img4"
                                    src="~@/assets/icons/shopping-bag.svg" alt="Корзина" title="Корзина"></a>
                        </div>

                    </div>
                </div>

                <nav class="header__nav">
                    <div class="header__container">
                        <button @click="scrollTo('about')">О проекте</button>
                        <button @click="scrollTo('heroes')">Наши героини</button>
                        <button @click="scrollTo('videos')">Прокачай свою силу</button>
                        <button @click="scrollTo('podcasts')">Подкаст</button>
                        <button @click="scrollTo('stickers')">Стикеры в подарок</button>
                    </div>
                </nav>
            </div>
        </transition>

        <div class="d-md-none header__mobile">
            <v-container>
                <div class="d-flex justify-space-between align-center header__mobile__wrapper">
                    <div class="d-flex justify-start align-center">
                        <div class="header__mobile__hamburger" @click="toggleBurgerMenu">
                            <div class="header__mobile__hamburger-icons"
                                 :class="{'header__mobile__hamburger-icons--closed':isBurgerMenuShown}">
                                <span></span>
                                <span></span>
                            </div>
                        </div>

                        <a class="header__mobile__logo" href="https://zarina.ru/" target="_blank">
                            <img src="~@/assets/the-header/logo.svg" alt="Zarina">
                        </a>
                        <!--<a class="header__mobile__logo" href="https://zarina.ru/" target="_blank">
                            <img src="~@/assets/the-header/logo.svg" alt="Zarina">
                        </a>-->
                    </div>

                    <div class="header__socials">
                        <a href="https://zarina.ru/catalog/new/" target="_blank"><img
                                class="header__menu__social-img1"
                                src="~@/assets/the-header/search.svg" alt="Поиск" title="Поиск"></a>
                        <!--<a href="https://zarina.ru/favorites/" target="_blank"><img
                                class="header__menu__social-img2"
                                src="~@/assets/the-header/heart.svg" alt="Избранное" title="Избранное"></a>-->
                        <a href="https://zarina.ru/personal/" target="_blank"><img
                                class="header__menu__social-img3"
                                src="~@/assets/the-header/user.svg" alt="Личный кабинет" title="Личный кабинет"></a>
                        <!--<a href="https://zarina.ru/personal/" target="_blank"><img
                                class="header__menu__social-img4"
                                src="~@/assets/icons/shopping-bag.svg" alt="Корзина" title="Корзина"></a>-->
                    </div>
                </div>
            </v-container>
        </div>

        <transition name="fade">
            <burger-menu v-if="isBurgerMenuShown" class="d-md-none" @click="scrollTo"/>
        </transition>
    </header>
</template>

<script>
    import BtnLink from '../../components/btn-link.vue';
    import BurgerMenu from '../../components/burger-menu.vue';
    import HeaderSticky from '../../components/header-sticky.vue';

    export default {
        name: 'the-header',
        components: {
            BtnLink,
            BurgerMenu,
            HeaderSticky
        },
        data() {
            return {
                isSticky: false,
                isBurgerMenuShown: false
            }
        },
        computed: {
            isWindowMD() {
                return this.$store.getters.isWindowMD;
            },
        },
        /*mounted() {
            window.addEventListener("resize", this.onWindowResize);
            this.onWindowResize();
        },
        beforeDestroy() {
            window.removeEventListener("resize", this.onWindowResize);
        },*/
        methods: {
            scrollTo(el) {
                //this.$scrollTo(document.getElementById(el));
                this.isBurgerMenuShown = false;
                this.$router.push({name: 'Home', hash: `#${el}`});
                el = document.getElementById(el);
                window.scrollTo({
                    top: el.offsetTop - (this.isWindowMD ? 70 : 60),
                    behavior: "smooth"
                });
            },
            handleScroll(e, el) {
                //this.appearPageSections();
                //console.log("scroll!!", e);
                //this.isSticky = e.target.scrollTop > 0 && this.isWindowMD;
                this.isSticky = window.scrollY > 300 && this.isWindowMD;
            },
            toggleBurgerMenu() {
                this.isBurgerMenuShown = !this.isBurgerMenuShown;
            }
        },
        created() {
            this.isSticky = window.scrollY > 300 && this.isWindowMD;
        }
    }
</script>

<style lang="scss">

    header {
        position: fixed;
        z-index: 10;
        width: 100%;
        left: 0;
        top: 0;
        min-width: 320px;

        .header {
            position: absolute;
            width: 100%;
            height: 193px;
            left: 0;
            top: 0;

            &__container {
                max-width: 1230px;
                padding: 0 16px;
                box-sizing: border-box;
                margin: 0 auto;

                display: flex;
                justify-content: space-between;
            }

            &__contacts {
                background: #fafafa;
                border-bottom: 1px solid $grey-color;
                font-size: 12px;
                line-height: 22px;
                height: 34px;
                font-weight: normal; // = Book

                &__search-shop {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    width: 200px;
                    color: #000 !important;
                    text-decoration: none;

                    @include transition();

                    &:hover {
                        opacity: 0.7;
                    }

                    img {
                        width: 16px;
                        height: 16px;
                        display: block;
                        margin-right: 8px;
                        border: 0;
                    }

                    span {
                        font-weight: normal; // = Book
                        font-size: 12px;
                        line-height: 34px;
                    }
                }

                &__tel {

                    &-text {
                        color: $zarina-grey-color;
                        line-height: 34px;
                    }

                    &-number {
                        margin-right: 15px;
                        font-size: 18px;
                        line-height: 34px;
                        color: #000 !important;
                    }
                }

                &-right {
                    display: flex;
                    justify-content: space-between;
                    width: 300px;
                }
            }

            &__menu {
                background: #fff;
                height: 79px;
                border-bottom: 1px solid #e6e6e6;

                &__logo {
                    img {
                        width: 140px;
                    }
                }

                .header__container {
                    height: 79px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                a {
                    font-size: 14px;
                    line-height: 16px;
                    text-decoration: none;
                    text-transform: uppercase;
                    color: #000 !important;
                }

                .header__socials {
                    width: 140px;
                    height: 79px;
                }
            }

            &__nav {
                height: 80px;
                background: $grey-color;

                .header__container {
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                button {
                    width: auto;
                    background: $grey-color;
                    border: 1px solid rgba(0, 0, 0, 0.2); //$taupe-color;
                    font-weight: 500;
                    font-size: 12px;
                    padding: 12px 24px;
                    margin: 0 10px;

                    @include up($lg) {
                        margin: 0 16px;
                        font-size: 15px;
                        padding: 12px 32px;
                    }

                    &:active, &:hover {
                        color: $white-color;
                        background: $taupe-color;
                    }
                }
            }

            &__mobile {
                position: relative;
                z-index: 11; //should be higher than burger menu
                height: 64px;
                //background: $white-color;
                /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#ffffff+0,ffffff+87,efefef+100 */
                background: #ffffff; /* Old browsers */
                background: -moz-linear-gradient(top, #ffffff 0%, #ffffff 87%, #fafafa 100%); /* FF3.6-15 */
                background: -webkit-linear-gradient(top, #ffffff 0%, #ffffff 87%, #fafafa 100%); /* Chrome10-25,Safari5.1-6 */
                background: linear-gradient(to bottom, #ffffff 0%, #ffffff 87%, #fafafa 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#fafafa', GradientType=0); /* IE6-9 */

                .container {
                    padding-top: 0;
                    padding-bottom: 0;
                }

                &__wrapper {
                    height: 64px;
                }

                &__hamburger {
                    cursor: pointer;
                    width: 48px;
                    height: 64px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &-icons {
                        display: flex;
                        width: 20px;
                        height: 20px;
                        flex-direction: column;
                        justify-content: center;

                        span {
                            width: 100%;
                            height: 1px;
                            background-color: $black-color;
                            margin: 4px 0;

                            @include transition();
                        }

                        &--closed {
                            span {
                                &:first-child {
                                    transform: translateY(4.5px) rotate(45deg);
                                }

                                &:nth-child(2) {
                                    transform: translateY(-4.5px) rotate(-45deg);
                                }
                            }
                        }
                    }
                }

                &__logo {
                    margin-left: 20px;
                    display: block;
                    img {
                        display: block;
                        width: 140px;
                    }
                }

                .header__socials {
                    width: 60px;
                    margin-right: 8px;
                }

                img {
                    display: block;
                }
            }

            &__socials {
                display: flex;
                justify-content: space-between;
                align-items: center;

                img {
                    &.header__menu__social-img1 {
                        //width: 16px;
                        height: 16px;
                    }

                    &.header__menu__social-img2 {
                        //width: 16px;
                        height: 16px;
                    }

                    &.header__menu__social-img3 {
                        //width: 16px;
                        height: 18px;
                    }

                    &.header__menu__social-img4 {
                        //width: 16px;
                        height: 18px;
                    }

                    @include transition();

                    &:hover {
                        opacity: 0.7;
                    }
                }
            }
        }
    }


</style>
