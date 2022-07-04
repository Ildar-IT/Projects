<template>
    <transition name="route" mode="out-in">
        <footer class="layout-footer">
            <div class="layout-footer__image"/>

            <div class="body-2 align-center mt-2 text-center layout-footer__text">
                <div class="d-flex justify-space-between pb-2">
                    <router-link :to="{ name: 'pricing' }" class=" " target="_blank">
                        <div class="layout-footer__text">Тарифы</div>
                    </router-link>

                    <router-link :to="{ name: 'subscription-rules' }" class=" " target="_blank">
                        <div class="layout-footer__text">Оплата</div>
                    </router-link>

                    <router-link :to="{ name: 'bank-info' }" class=" " target="_blank">
                        <div class="layout-footer__text">Реквизиты</div>
                    </router-link>
                </div>

                <div class="d-flex justify-space-around pb-2">
                    <router-link :to="{ name: 'user-agreement' }" class=" " target="_blank">
                        <div class="layout-footer__text pr-2">Соглашение</div>
                    </router-link>
                    <div class="text-center gray-text">
                        <router-link :to="{ name: 'privacy' }" class=" " target="_blank">
                            <span class="layout-footer__text"> Политика </span>
                        </router-link>
                    </div>
                </div>

                <a href="https://atlgroup.ru/" class="mr-1" target="_blank">
          <span class="layout-footer__text">
            © {{ year }} {{ footerLink }}.
          </span>
                </a>
            </div>
        </footer>
    </transition>
</template>

<script>
    export default {
        name: "layout-footer",
        components: {},
        data: () => ({}),
        computed: {
            isWindowXS() {
                return this.$store.getters.isWindowXS;
            },
            year() {
                return new Date().getFullYear();
            },

            footerLink() {
                return this.$store.state.common?.texts?.FOOTER_COPYRIGHT;
            },
        },
    };
</script>

<style lang="scss">

    .layout-footer {
        position: relative;
        letter-spacing: 0 !important;
        margin: 20px auto 20px auto;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-direction: column;
        width: 100%;
        //height: calc((100vw - 64px) * 0.42);

        &__image {
            opacity: 0.4;
            max-width: 640px;
            background-color: #f1f2ff;
            background-image: url("../../assets/footer2.jpg");
            background-position: center bottom;
            background-blend-mode: multiply;
            background-size: contain;
            background-repeat: no-repeat;
            width: 100%;
            position: relative;
            height: 130px;
            top: 20px;
            @include up($sm) {
                height: 200px;
            }
        }

        // TODO wtf? исправить на up/down
        /*@media screen and (min-width: $lg) {
            //position: absolute;

            left: 50%;
            margin-left: -207px;
        }*/

        /*@include up($sm) {
            height: 174px;
        }*/

        &__text {
            width: 100%;
            max-width: 240px;
            color: $gray;

            @include transition();
            z-index: 1;
            cursor: pointer;

            &:hover {
                color: $primary;
            }
        }
    }
</style>