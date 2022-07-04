<template>
    <section class="intro-text">
        <v-container>
            <h1>сила в тебе</h1>
            <h3 class="mt-2 mt-md-0">women collection</h3>

            <divider class="mb-8" color="accentColor"/>

            <p>В этом сезоне новым амбассадором ZARINA и лицом коллекции стала харизматичная актриса и телеведущая Екатерина Варнава. Вместе с гениальным режиссером Анной Меликян нам удалось воплотить в жизнь новый проект #СИЛАВТЕБЕ.</p>
            <p class="mt-4">Прямо сейчас листай до конца, тебя ждут: новая коллекция, вдохновляющие истории наших героинь, тест, который поможет узнать, в чём заключается твоя сила и прокачать скиллы при помощи видео от экспертов, подкаст “ВСЁ В СИЛЕ”, а также стикеры с Екатериной Варнава в подарок!</p>

            <btn-link class="mt-8" href="https://zarina.ru/catalog/new/" target="_blank"/>
        </v-container>
    </section>
</template>

<script>
    import BtnLink from '../../components/btn-link.vue'
    import Divider from '../../components/divider.vue'

    export default {
        name: 'intro-text',
        components: {
            BtnLink,
            Divider
        }
    }
</script>

<style lang="scss">

    .intro-text {

        padding: 80px 0 30px 0;
        text-align: center;

        @include up($sm) {
            min-height: 440px;
            padding: 120px 0 60px 0;
        }

        p {
            margin: 0 auto 0 auto;

            @include up($md) {
                width: 80%;
                max-width: 720px;
            }

        }
    }

</style>
