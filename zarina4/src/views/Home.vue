<template>
    <div class="home" id="home">
        <the-header/>
        <intro-video/>
        <intro-text id="about"/>
        <intro-products/>
        <power-slider/>
        <heroes id="heroes"/>
        <!--<the-test id="test"/>-->
        <the-videos id="videos"/>
        <collection-slider/>
        <power-in-action/>
        <two-photos/>
        <podcasts id="podcasts"/>
        <stickers id="stickers"/>
        <follow-us/>
        <the-footer/>
    </div>
</template>

<script>

    import TheHeader from './home/the-header.vue';
    import IntroVideo from './home/intro-video.vue';
    import IntroText from './home/intro-text.vue';
    import IntroProducts from './home/intro-products.vue';
    import PowerSlider from './home/power-slider.vue';
    import Heroes from './home/heroes.vue';
//    import TheTest from './home/the-test.vue';
    import TheVideos from './home/the-videos.vue';
    import CollectionSlider from './home/collection-slider.vue';
    import PowerInAction from './home/power-in-action.vue';
    import TwoPhotos from './home/two-photos.vue';
    import Podcasts from './home/podcasts.vue';
    import Stickers from './home/stickers.vue';
    import FollowUs from './home/follow-us.vue';
    import TheFooter from './home/the-footer.vue';

    export default {
        name: 'Home',

        components: {
            TheHeader,
            IntroVideo,
            IntroText,
            IntroProducts,
            PowerSlider,
            Heroes,
            //TheTest,
            TheVideos,
            CollectionSlider,
            PowerInAction,
            TwoPhotos,
            Podcasts,
            Stickers,
            FollowUs,
            TheFooter
        },
    }
</script>

<style lang="scss">
    .home {
        padding-top: 64px;
        @include up($md) {
            padding-top: 193px;
        }
    }
</style>
