<template>

    <div class="header_opened-menu header-account">
        <div class="header-account__wrap px-lg-0 px-8"
             :class="noMenu? '':'header-account__wrap--between'">

            <div class="d-flex align-center">

                <div v-if="(!managerHeader) || managerHeader" class="header-account__logo">
          <span class="d-flex align-center hover-link_fill">
<!--            <svgicon name="dandelion" original color="$beige1" :width="isWindowLG? '106' : '72'"-->
              <!--                     :height="isWindowLG? '106':'72'" :class="isWindowLG? 'mt-5 ml-n3' : 'mt-2 ml-n2'"-->
              <!--                     class="mt-5 ml-n3"/>-->
              <!--            <span>{{ $store.state.common.NAME }}</span>-->
            <svgicon v-if="isWindowLG || !isWindowMD" name="dandelion" original color="$beige1"
                     :width="isWindowLG? '106' : '72'"
                     :height="isWindowLG? '106':'72'" :class="isWindowLG? 'mt-5 ml-n1' : 'mt-2 ml-n9'"
            />
            <svgicon v-if="isWindowLG || !isWindowMD" name="logo-text" original color="$beige1"
                     :width="isWindowLG? '220' : '120'"
                     :height="isWindowLG? '114':'123'"
            />


            <svgicon v-if="isWindowMD && !isWindowLG" name="dandelion" original color="$beige1" width="72"
                     height="72" class="mt-3 ml-n9"
            />
            <svgicon v-if="isWindowMD && !isWindowLG" name="logo-text" original color="$beige1" width="180"
                     height="83" class="ml-2"
            />
          </span>
                </div>
            </div>

            <div class="header-account__contacts justify-end">
				<span class="d-flex align-center header-account__block hover">
                   <a :href="'tel:'+$store.state.common.phoneLink"
                      class="d-flex hover-link hover-link_primary align-center">
                            <svgicon name="smartphone" color="#D8C69E" :fill="false" width="24" height="24"/>
                            <h5 class="d-none d-sm-block ml-4 mr-6">{{ $store.state.common.phone }}</h5>
                   </a>
				</span>

            </div>
        </div>
    </div>

</template>

<script>

    export default {
        name: "header-manager",
        data() {
            return {
                // dialog: false,
            }
        },
        components: {},
        computed: {
            user() {
                return this.$store.state.session.user
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
            managerHeader() {
                return this.$route.meta.managerHeader || null
            },
            isLogIn() {
                return this.$route.meta.isLogIn || null
            },

            routes() {
                return [
                    {title: 'Места памяти', icon: 'map-pin', name: 'memory-places', notification: false},
                    {title: 'Отчеты', icon: 'camera', name: 'reports', notification: false},
                    {title: 'Оплата', icon: 'money', name: 'balance', notification: false},
                    {title: 'Профиль', icon: 'user', name: 'my-account', notification: false},
                ]
            },
            route() {
                return this.$route
            }
        },
        methods: {
            navClass(link) {
                return {
                    'header-account__menu--default': !this.$route.meta || !this.$route.meta.menuGroup || this.$route.name !== link.name,
                    'header-account__menu--active': this.$route.name === link.name,
                };
            },

            toggleOpenMenu() {
                this.isMenuOpen = !this.isMenuOpen
            },

            toLogOut() {
                this.$router.replace({name: 'logout'});

            }
        }
    }
</script>

<style lang="scss">
    .v-application {
        .header-account {
            overflow: hidden;
            position: fixed;
            top: 0;
            line-height: 1;
            width: 100%;
            border-radius: 0px 0px $border-radius-primary $border-radius-primary;
            display: flex;
            align-content: center;
            color: $beige5;
            height: $header-height-mobile;
            background: $gradient-dark;
            box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.15);
            z-index: 11;
            @include up($lg) {
                height: $header-height;
            }

            &__logo {
                font-family: $heading-font-family;
                font-style: normal;
                font-weight: bold;
                font-size: 16px;
                line-height: 19px;
                text-transform: uppercase;
                @include up($md) {
                    font-size: 24px;
                    line-height: 29px;
                }
                @include up($xl) {
                    font-size: 36px;
                    line-height: 46px;
                }

            }

            &__wrap {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;

                &--center {
                    justify-content: center;
                }

                &--between {
                    justify-content: space-between;
                }
            }

            &__menus {
                display: flex;
                @include transition();
            }

            &__nav {
                display: flex;
                align-items: center;
            }
        }

        .hover {
            @include transition();

            &:hover {
                @include transition();
                color: $beige2;

                svg {
                    @include transition();

                    path {
                        @include transition();
                        stroke: $beige2;
                    }
                }
            }
        }
    }
</style>
