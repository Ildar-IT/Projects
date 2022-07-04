<template>
    <section class="podcasts">
        <v-container>
            <h1>Подкаст «Всё в силе»</h1>
            <h3 class="mt-2 mt-md-0">#силавтебе</h3>

            <p class="mt-8">Журналисты Гриша Туманов и Женя Милова разговаривают с классными успешными женщинами про их профессию, самореализацию и внутреннюю силу, а также обсуждают мировые и российские явления и новости, связанные с жизнью женщин в широком понимании.</p>

            <div class="mt-16 podcasts__items">
<!--                <iframe src="https://soundstream.media/player/?clip=1002468" width="100%" height="136" frameborder="0" frameBorder="0" scrolling="auto"></iframe>-->
              <iframe src="https://soundstream.media/player/?playlist=4515" width="100%" height="298" frameborder="0" frameBorder="0" scrolling="auto"></iframe>
            </div>
        </v-container>
    </section>
</template>

<script>
    export default {
        name: 'podcasts',
        components: {
        }
    }
</script>

<style lang="scss">
    .podcasts {
        background-color: $grey-color;
        background-image: url('~@/assets/podcasts/bg.svg');
        background-repeat: no-repeat;
        background-position: center top;
        background-size: 270%;
        padding: 80px 0 80px 0;
        text-align: center;
        box-sizing: border-box;

        @include up($md) {
            background-size: unset;
            background-position: center center;
            padding: 120px 0 120px 0;
        }

        @include up($lg) {
            padding: 120px 0 120px 0;
            //min-height: 936px;
        }

        h1 {
            margin: 0 auto;
            max-width: 300px;

            @include up($sm) {
                max-width: unset;
            }
        }

        p {
            margin: 0 auto;

            @include up($md) {
                width: 80%;
                max-width: 720px;
            }
        }

        &__items {
            max-width: 640px;
            margin: 0 auto;
            //height: 200px;
            background: $white-color;
        }
    }

</style>
