<template>
    <footer>
        <div class="footer">
            <div class="footer__container">

                <div class="d-lg-none footer__col footer__col--email">
                    <div class="footer__col-header">
                        Узнайте первыми <br> о новинках и скидках
                    </div>
                    <footer-input/>
                </div>

                <div class="d-md-flex justify-md-space-between align-start footer__cols">
                    <div class="footer__col" v-for="(col, index) of cols" :key="'col'+index" :class="{open:col.open, items:col.items}">
                        <div class="footer__col-header" @click="toggleCol(col)">
                            <a v-if="col.url && (isWindowMD||!col.items)" :href="col.url" target="_blank">{{col.name}}</a>
                            <span v-else>{{col.name}}</span>
                        </div>
                        <ul v-if="col.items && (col.open || isWindowMD )" class="footer__col-list">
                            <li v-for="(item, i) of col.items"><a :href="item.url" target="_blank">{{item.name}}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="d-none d-lg-block footer__col">
                        <div class="footer__col-header">
                            Узнайте первыми <br> о новинках и скидках
                        </div>
                        <footer-input/>
                    </div>
                </div>
            </div>
            <div class="footer__container">
                <div class="footer__wallets">
                    <div class="footer__wallets__item"><img src="~@/assets/the-footer/master-card.png"
                                                                        alt="master-card"></div>
                    <div class="footer__wallets__item">
                        <img src="~@/assets/the-footer/visa.png" alt="Visa">
                    </div>
                    <div class="footer__wallets__item">
                        <img src="~@/assets/the-footer/mir.png" alt="Mir">
                    </div>
                    <div class="footer__wallets__item">
                        <img src="~@/assets/the-footer/halva.png" alt="Halva">
                    </div>
                    <div class="footer__wallets__item">
                        <img src="~@/assets/the-footer/apple-pay.png" alt="Apple-pay">
                    </div>
                    <div class="footer__wallets__item">
                        <img src="~@/assets/the-footer/google-pay.png" alt="Google-pay">
                    </div>
                </div>
                <div class="footer__copyrights">
                    © 2021-2022 Zarina Все права защищены
                </div>
            </div>
        </div>
    </footer>
</template>

<script>

    import FooterInput from '../../components/footer-input.vue';

    export default {
        name: 'the-footer',
        components: {
            FooterInput
        },
        data() {
            return {
                cols: [
                    {
                        open: false,
                        name: "Каталог",
                        url: "https://zarina.ru/catalog/",
                        items: [
                            {name: "Новинки", url: "https://zarina.ru/catalog/new/"},
                            {name: "Одежда", url: "https://zarina.ru/catalog/clothes/"},
                            {name: "Аксессуары", url: "https://zarina.ru/catalog/accessories/"},
                            {name: "Sale", url: "https://zarina.ru/catalog/sale/"},
                        ]
                    },
                    {
                        open: false,
                        name: "Помощь покупателю",
                        url: "https://zarina.ru/help/",
                        items: [
                            {name: "Отследить заказ", url: "https://zarina.ru/tracking/"},
                            {name: "Доставка и оплата", url: "https://zarina.ru/help/delivery-and-payment/"},
                            {name: "Бесконтактная доставка", url: "https://zarina.ru/help/contactless-delivery/"},
                            {name: "Обмен и возврат", url: "https://zarina.ru/help/refund/"},
                            {name: "FAQ / Часто задаваемые вопросы", url: "https://zarina.ru/help/"},
                            {name: "Программа лояльности", url: "https://zarina.ru/help/loyalty/"},
                            {name: "Подарочные сертификаты", url: "https://zarina.ru/help/gift-certificates/"},
                            {name: "Правила работы сайта", url: "https://zarina.ru/help/conditions/"},
                            {name: "Политика конфиденциальности", url: "https://zarina.ru/help/privacy-policy/"},
                            {name: "Карта сайта", url: "https://zarina.ru/site-map/"},
                        ]
                    },
                    {
                        open: false,
                        name: "О компании",
                        url: "https://zarina.ru/about/",
                        items: [
                            {name: "О бренде", url: "https://zarina.ru/about/"},
                            {name: "О Melon Fashion Group", url: "https://zarina.ru/about/melon-fashion-group/"},
                            {name: "Работа в бренде ZARINA", url: "https://zarina.ru/about/career/"},
                            {name: "Сотрудничество", url: "https://zarina.ru/about/franchising-and-wholesale/"},
                            {name: "Контакты", url: "https://zarina.ru/about/contacts/"},
                            {name: "Обратная связь", url: "https://zarina.ru/about/feedback/"},
                        ]
                    },
                    {
                        open: false,
                        name: "Новости и акции",
                        url: "https://zarina.ru/posts/",
                    }
                ]
            }
        },
        computed: {
            isWindowMD() {
                return this.$store.getters.isWindowMD;
            },
        },
        methods: {
            toggleCol(col) {
                if (this.isWindowMD) return;
                else if ( col.items ) col.open=!col.open;
            }
        }
    }
</script>

<style lang="scss">

    footer {
        border-top: 1px solid $grey-color;
        padding-top: 24px;

        .footer {

            &__container {
                max-width: 1230px;
                box-sizing: border-box;
                margin: 0 auto;

                @include up($md) {
                    padding: 0 16px;
                }

                &:last-child {
                    padding: 0 16px;
                }
            }

            &__cols {
                border-bottom: 1px solid $grey-color;
                @include up($md) {
                    border-bottom: none;
                }
            }

            &__col {
                position: relative;
                border-top: 1px solid $grey-color;

                @include up($md) {
                    border-top: none;
                    padding: 0 16px 0 0;

                    &:last-child {
                        padding: 0;
                    }

                    &:after {
                        display: none;
                    }
                    &:before {
                        display: none;
                    }
                }

                &.items {
                    &:after {
                        content: "";
                        position: absolute;
                        top: 15px;
                        right: 31px;
                        height:15px;
                        width: 1px;
                        background: $zarina-black-color;
                    }
                    &:before {
                        content: "";
                        position: absolute;
                        top: 22px;
                        right: 24px;
                        height:1px;
                        width: 15px;
                        background: $zarina-black-color;
                    }
                }

                &--email {
                    border-top: none;
                    padding: 0 16px;
                    @include up($md) {
                        padding: 0;
                    }

                    &:after {
                        display: none;
                    }
                    &:before {
                        display: none;
                    }

                    .footer__col-header {
                        font-weight: 500;
                        padding: 0;
                    }
                }

                &.open {
                    &:after {
                        display: none;
                    }
                }


                &-header {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 17px;
                    text-transform: uppercase;
                    color: $zarina-black-color;
                    white-space: nowrap;
                    padding: 12px 16px;

                    a {
                        font-size: 14px;
                        font-weight: 400;
                        text-transform: uppercase;
                        color: $zarina-black-color !important;
                    }

                    @include up($md) {
                        font-weight: 500;
                        padding: 0;

                        a {
                            font-weight: 500;
                        }
                    }
                }

                ul {
                    margin: 0;
                    padding: 0;
                    list-style: none;

                    li {
                        list-style-type: none;
                        white-space: nowrap;

                        border-top: 1px solid $grey-color;
                        background: $zarina-light-grey-color;
                        padding: 6px 24px;

                        @include up($md) {
                            margin: 8px 0 0 0;
                            border-top: 0;
                            padding: 0;
                            background: none;
                        }

                    }
                }
            }

            &__wallets {
                margin-top: 36px;
                display: flex;
                flex-wrap: wrap;

                &__item {
                    height: 25px;
                    margin: 0 12px 12px 0;

                    img {
                        max-width: 85px;
                        height: 100%;
                    }
                }
            }

            &__copyrights {
                margin-top: 20px;
                margin-bottom: 30px;
                text-transform: none;
                font-size: 12px;
                line-height: 14px;
                color: $zarina-black-color;
            }

            a {
                font-size: 14px;
                //line-height: 17px;
                color: $zarina-black-color !important;
                @include transition();

                &:hover {
                    opacity: 0.7;
                }
            }
        }
    }

</style>
