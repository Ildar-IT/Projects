<template>
    <div class="burger-menu">
        <v-container>

            <ul class="burger-menu__list">
                <li @click="$emit('click','about')">О проекте</li>
                <li @click="$emit('click','heroes')">Наши героини</li>
                <li @click="$emit('click','videos')">Прокачай свою силу</li>
                <li @click="$emit('click','podcasts')">Подкаст</li>
                <li @click="$emit('click','stickers')">Стикеры в подарок </li>
            </ul>

            <btn-link href="https://zarina.ru/catalog/new/" target="_blank"/>

            <social-items/>

            <div class="burger-menu__tel">
                <a href="tel:88002500557">
                    <span class="burger-menu__tel-text">8-800-250-05-57</span>
                    <span class="burger-menu__tel-subtext">Звонок бесплатный</span>
                </a>
            </div>

            <a href="https://zarina.ru/shops/"
                target="_blank" class="d-flex burger-menu__search-shop">
                <img src="~@/assets/the-header/geo.svg" alt="geo">
                <div class="d-flex flex-column">
                    <span class="burger-menu__search-shop-text">Найти магазины
                    </span>
                    <span class="burger-menu__search-shop-subtext">Рядом с вами</span>
                </div>
            </a>
        </v-container>
    </div>
</template>

<script>
    import BtnLink from './btn-link.vue'
    import SocialItems from './social-items.vue'

    export default {
        name: 'burger-menu',
        components: {
            BtnLink,
            SocialItems
        }
    }
</script>

<style lang="scss">

    .burger-menu {
        background-color: $white-color;
        position: absolute;
        left:0;
        top:0;
        width: 100%;
        height: 100vh;
        padding: 70px 16px 16px 16px;
        box-sizing: border-box;
        overflow-y: auto;


        ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        li {
            list-style-type: none;
            padding: 0;
            margin: 16px 0 0 0;
            text-transform: uppercase;

            color: $taupe-color;
            font-size: 14px;
            line-height: 22.4px;
            font-weight: 500;
        }

        .btn-link {
            margin: 32px 0 0 0;
            width: 230px;
        }

        .social-items {
            margin-top: 40px;
        }

        &__tel {
            margin-top: 32px;
            border-top: 1px solid $zarina-grey-color;
            padding: 10px 0;

            a {
                display: flex;
                flex-direction: column;
            }

            &-text {
                font-size: 18px;
                color: #000 !important;
            }

            &-subtext {
                font-size: 12px;
                line-height: 14px;
                color: $zarina-grey-color !important;
            }
        }

        &__search-shop {
            border-top: 1px solid $zarina-grey-color;
            position: relative;
            display: block;
            padding: 12px 0 0 0;

            img {
                width: 20px;
                height: 20px;
                display: block;
                margin-right: 8px;
            }

            &:after {
                content: "";
                position: absolute;
                right: 0;
                top: 50%;
                width: 12px;
                height: 12px;
                border-right: 1px solid #000;
                border-bottom: 1px solid #000;
                transform: translateY(-50%) rotate(-45deg);
            }

            &-text {
                font-size: 15px;
                color: #000 !important;
            }

            &-subtext {
                font-size: 12px;
                line-height: 14px;
                color: $zarina-grey-color !important;
            }
        }
    }
</style>
