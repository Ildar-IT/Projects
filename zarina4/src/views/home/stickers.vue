<template>
    <section class="stickers">
        <v-container>
            <div class="text-center">
                <h1>Стикеры в подарок</h1>
                <h3 class="mt-2 stickers__subheader">Будь оригинальна, для тебя суперподборка стикеров #силавтебе</h3>

                <divider color="accentColor"/>

                <p class="mt-8">Выражай свои эмоции еще ярче и почувствуй свою силу</p>

                <btn-link class="mt-5" href="https://tlgrm.ru/stickers/Zarina_Silavtebe" target="_blank">
                    <span class="d-flex justify-space-between align-center">
                        <span>Получить стикеры</span>
                        <span><img src="~@/assets/icons/social/telegram.svg" alt="Telegram"></span>
                    </span>
                </btn-link>

                <h3 class="mt-8 stickers__collection">women collection</h3>

                <div class="mt-16 stickers__items">
                    <v-row>
                        <v-col cols="4" sm="4" md="4"><a href="https://tlgrm.ru/stickers/Zarina_Silavtebe" target="_blank"><img src="~@/assets/stickers/1.png" alt="Sticker"></a></v-col>
                        <v-col cols="4" sm="4" md="4"><a href="https://tlgrm.ru/stickers/Zarina_Silavtebe" target="_blank"><img src="~@/assets/stickers/4.png" alt="Sticker"></a></v-col>
                        <v-col cols="4" sm="4" md="4"><a href="https://tlgrm.ru/stickers/Zarina_Silavtebe" target="_blank"><img src="~@/assets/stickers/3.png" alt="Sticker"></a></v-col>
                        <v-col cols="4" sm="4" md="4"><a href="https://tlgrm.ru/stickers/Zarina_Silavtebe" target="_blank"><img src="~@/assets/stickers/7.png" alt="Sticker"></a></v-col>
                        <v-col cols="4" sm="4" md="4"><a href="https://tlgrm.ru/stickers/Zarina_Silavtebe" target="_blank"><img src="~@/assets/stickers/6.png" alt="Sticker"></a></v-col>
                        <v-col cols="4" sm="4" md="4"><a href="https://tlgrm.ru/stickers/Zarina_Silavtebe" target="_blank"><img src="~@/assets/stickers/5.png" alt="Sticker"></a></v-col>
                        <v-col cols="4" sm="4" md="4"><a href="https://tlgrm.ru/stickers/Zarina_Silavtebe" target="_blank"><img src="~@/assets/stickers/10.png" alt="Sticker"></a></v-col>
                        <v-col cols="4" sm="4" md="4"><a href="https://tlgrm.ru/stickers/Zarina_Silavtebe" target="_blank"><img src="~@/assets/stickers/9.png" alt="Sticker"></a></v-col>
                        <v-col cols="4" sm="4" md="4"><a href="https://tlgrm.ru/stickers/Zarina_Silavtebe" target="_blank"><img src="~@/assets/stickers/8.png" alt="Sticker"></a></v-col>
                    </v-row>

                    <!--<img class="stickers__items-bg" src="~@/assets/stickers/bg.svg" alt="Background">-->
                    <!--<img class="stickers__items-bg stickers__items-bg_small"
                         src="~@/assets/stickers/bg_small.svg" alt="Background">-->
                </div>

                <divider class="stickers__bottom-divider" color="taupe"/>
            </div>
        </v-container>
    </section>
</template>

<script>
    import Divider from '../../components/divider.vue';
    import BtnLink from '../../components/btn-link.vue';

    export default {
        name: 'stickers',
        components: {
            Divider,
            BtnLink
        }
    }
</script>

<style lang="scss">

    .stickers {
        padding: 90px 0 50px;

        .container {
            position: relative;
        }

        &__subheader {
            max-width: 296px;
            margin: 0 auto;

            @include up($md) {
                max-width: 470px;
            }
        }

        &__collection {
            color: $accent-color;

            @include up($lg) {
                position: absolute;
                right: 0;
                bottom: 280px;
            }
        }

        .btn-link {
            //width: 235px;
            padding-right: 12px;
            padding-left: 24px;

            span {
                span:first-child {
                    white-space: nowrap;
                }

                span:nth-child(2) {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 40px;
                    height: 40px;
                    background-color: $grey-color;
                    border-radius: 20px;

                    img {
                        display: inline-block;
                    }
                }
            }
        }

        &__items {
            max-width: 640px;
            margin: 0 auto;

            background-image: url('~@/assets/stickers/bg.svg');
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 100%;

            @include up($sm) {
                padding: 0 50px;
            }

            img {
                width: 100%;
                max-width: 160px;
                border:0;
            }

        }

        &__bottom-divider.divider {
            margin-top: 82px;
            width: 100%;

            span:first-child, span:nth-child(3) {
                width: 40%;
            }
        }
    }

</style>
