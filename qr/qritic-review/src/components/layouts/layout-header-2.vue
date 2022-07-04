<template>
    <div class="d-flex flex-center">
        <v-container fluid :class="isWindowLG && !noBlur ? LGclasses : SMclasses ">
            <v-row class="layout-header__wrap margin-top-main d-flex"
                   :class="isWindowLG ? '' : 'mt-n3'">
                <v-col class="py-0 layout-header__wrap--center" >
                    <div>
                        <router-link :to="{name: 'hello'}"  tag="button"  >
                            <svgicon name="logo3" height="50" original/>
                        </router-link>
                    </div>
                </v-col>              
            </v-row>
        </v-container>
    </div>
</template>

<script>


    export default {
        name: "layout-header",
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
        },
        methods: { }
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
                    justify-content: start;
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
        border: 1px solid $light-gray;
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
