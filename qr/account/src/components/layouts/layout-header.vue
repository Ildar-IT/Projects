<template>
    <div class="d-flex flex-center">
        <v-container fluid :class="isWindowLG && !noBlur ? LGclasses : SMclasses ">
            <v-row class="layout-header__wrap margin-top-main d-flex"
                   :class="isWindowLG ? '' : 'mt-n3'">
                <v-col class="py-0" :class="noMenu ? 'layout-header__wrap--center':'layout-header__wrap--between'">
                    <div>
                        <router-link :to="{name: 'dashboard'}"  tag="button" >
                            <svgicon name="logo" height="50" original/>
                        </router-link>
                    </div>
                </v-col>
                <v-col v-if="isWindowLG && !noMenu">
                    <div class="layout-header__menus justify-center">
                        <h6 v-for="(link, idx) in routes" :key="idx">
                            <!--					 :color="link.name === route.name ? 'black' : '$gray'"-->
                            <router-link :to="{name: link.name}" class="layout-header__nav" :class="navClass(link)">
                                <svgicon width="24" height="24" :fill="false"
                                         :name="link.icon"/>
                                <span class="ml-4">{{ link.title }}</span>
                            </router-link>
                        </h6>
                    </div>
                </v-col>
                <v-col v-if="isWindowLG && !noMenu" class="d-flex flex-row-reverse">
                    <div class="layout-header__menus">
                        <v-menu bottom left :offset-y="offset" transition="fade-transition">

                            <template v-if="isPremium" v-slot:activator="{on}">
                               <div v-on="on">
                                <div class="layout-header__premium-user">
                                    <v-btn color="#F7CE22" fab dark class="no-box-shadow no-filter "
                                           :title="textUserPhone" >
                                        <svgicon width="18" height="19" color="white" name="user"/>
                                    </v-btn>
                                    <svgicon width="34" height="34" :fill="false" name="crown"/>
                                </div>
                               </div>
                            </template>
                            <template v-else v-slot:activator="{on}">
                              <div v-on="on">
                                <v-btn color="info" fab dark class="no-box-shadow no-filter"
                                       :title="textUserPhone" >
                                    <svgicon width="18" height="19" color="white" name="user" />
                                </v-btn>
                              </div>
                            </template>

                            <v-list dense class="layout-header__user-menu px-0 py-3">
                                <v-list-item-group color="primary ">
                                    <v-list-item v-for="(menu_item, i) in menu_items" :key="i" class="px-8 py-2 ">
                                        <v-list-item-content>
                                            <router-link :to="{name:menu_item.href}" class="d-flex">
                                                <svgicon width="32"
                                                         height="32"
                                                         :fill="menu_item.icon === 'money-stroke' ? true : false"
                                                         color="#CDD0DC"
                                                         :name="menu_item.icon"
                                                         class="mr-4"/>
                                                <v-list-item-title class="body-1">
                                                    {{ menu_item.title }}
                                                </v-list-item-title>
                                            </router-link>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-menu>
                    </div>
                    <div class="align-self-center pr-4 body-1 gray-text"
                         v-if="textUserPhone && isWindowXL">
                        <a :href="'tel:'+textUserPhone">{{ textUserPhone }}</a>
                    </div>
                </v-col>
                <div v-if="!isWindowLG && !noMenu" class="layout-header__menu">
                    <div @click="toggleOpenMenu"
                         class="layout-header_fixed layout-header_fixed-mobile">
                        <svgicon width="50" height="50" class="layout-header__btn-menu" original
                                 :name="isMenuOpen? 'close' : 'burger'"/>
                    </div>
                    <!--					<burger/>-->
                </div>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import {phone} from "@/utils/string";
    import Burger from "../elements/burger";
    import animation from '../../animations/burger-to-x.json';
    import {figmotionToAnimeTimeline} from 'figmotion-animejs';
    import anime from 'animejs';

    export default {
        name: "layout-header",
        components: {Burger},
        data() {
            return {
                menu_items: [
                    {title: 'Подписка', icon: 'money-stroke', href: 'subscription'},
                    {title: 'Настройка', icon: 'settings', href: 'settings'},
                    {title: 'Поддержка', icon: 'mail', href: 'support'},
                    {title: 'Выход', icon: 'log-out', href: 'logout'},
                ],
                offset: true,
                alignments: [
                    'start',
                    'center',
                    'end',
                ],
                LGclasses: 'layout-header layout-header_fixed layout-header_fixed-desktop padding-bottom-main',
                SMclasses: 'layout-header padding-bottom-main layout-header_fixed-mobile'
            }
        },
        computed: {
            user() {
                return this.$store.state.session.user;
            },
            isPremium() {
                return this.$store.getters.isPremium;
            },
            textUserPhone() {
                return phone(this.$store.state.session?.user?.PHONE_NUMBER);
            },
            isWindowXS() {
                return this.$store.getters.isWindowXS;
            },
            isWindowMD() {
                return this.$store.getters.isWindowMD;
            },
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
            isWindowXL() {
                return this.$store.getters.isWindowXL;
            },
            noMenu() {
                return this.$route.meta.noMenu || null
            },
            noBlur() {
                return this.$route.meta.noBlur || null
            },
            isMenuOpen: {
                set(v) {
                    this.$store.state.isMenuOpen = v;
                },
                get() {
                    return this.$store.state.isMenuOpen;
                }
            },
            routes() {
                return [
                    {title: 'Статистика', icon: 'home', name: 'dashboard',},
                    {title: 'Опросы', icon: 'message-square', name: 'polls',},
                    {title: 'Журнал', icon: 'list', name: 'journal',},
                    {title: 'Шаблоны', icon: 'box', name: 'templates',},
                ]
            },
            route() {
                return this.$route
            }
        },
        methods: {
            navClass(link) {
                return {
                    'layout-header__menu--default': !this.$route.meta || !this.$route.meta.group || this.$route.meta.group !== link.name,
                    'layout-header__menu--active': this.$route.meta.group === link.name,
                };
            },
            toggleOpenMenu() {
                this.isMenuOpen = !this.isMenuOpen;
            },
            toDashboard() {
              if (this.user) this.$router.push({name: 'dashboard'});
            }
        }
    }
</script>

<style lang="scss">

    .layout-header {
        &__premium-user {
            position: relative;

            svg:nth-child(2) {
                position: absolute;
                top: -19px;
                right: -8px;
            }
        }
    }

    .v-application {
        position: relative;

        .layout-header {

            position: absolute;
            top: 0;
            line-height: 1;
            background: transparent;
            //width: calc(100% - 64px);
            width: 100%;
            padding-left: $margin-main-xs;
            /*padding: 0 $margin-main-xs $margin-main-xs $margin-main-xs;*/
            left: 0;
            @include up($lg) {
                padding: 0 64px 64px 64px;
            }

            &_fixed {
                position: fixed;
                z-index: 10;

                &-desktop {
                    background: rgba(243, 244, 252, 0.85);
                    backdrop-filter: blur(24px);
                }

                &-mobile {
                    right: 32px;
                    top: 44px;
                    /*cursor: pointer;*/
                }
            }

            &__btn-menu {
                filter: drop-shadow(0px 15px 15px rgba(77, 82, 101, 0.12));
            }

            &__wrap {
                display: flex;
                align-items: center;

                &--center {
                    justify-content: center;
                    display: flex;
                }

                &--left {
                    justify-content: flex-start;
                    display: flex;
                }

                &--between {
                    justify-content: space-between;
                    display: flex;
                }
            }

            &__menus {
                display: flex;
                @include transition();

                button.v-btn--round {
                    position: relative;
                }
            }

            &__menu {
                cursor: pointer;
                @include transition();

                &--active {
                    color: $font-color;
                    stroke: $font-color;

                    svg {
                        stroke: $font-color;
                        fill: transparent;

                        &.svg-money {
                            path:nth-child(2) {
                                fill: $gray !important;
                                stroke: none !important;
                            }
                        }

                    }
                }

                &--default {
                    @include transition();
                    color: $gray;
                    stroke: $gray;
                    fill: transparent;

                    svg {
                        @include transition();
                        stroke: $gray;
                        fill: transparent;
                    }

                    &:hover {
                        color: $font-color;
                        stroke: $font-color;

                        svg {
                            stroke: $font-color;
                        }
                    }
                }

                @include transition();

            }

            &__nav {
                padding-right: $margin-small-lg;
                padding-left: $margin-small-lg;
                display: flex;
                align-items: center;
            }
        }
    }

    div.v-menu__content {
        margin-top: 15px;
        border-radius: 32px;
        border: 1px solid $gray-light;
        box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.06);
    }

    div.v-list {
        border-radius: 32px;
    }

    div.v-list-item {
        /*cursor: pointer;*/

        &::before {
            @include transition();
        }

        &__title {
            font-size: 1.1rem;
        }
    }

</style>
