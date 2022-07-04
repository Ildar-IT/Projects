<template>
    <div class="layout-main">
        <div></div>
        <main>
            <transition name="route" mode="out-in">
                <router-view></router-view>
            </transition>
        </main>
        <layout-footer/>
    </div>
</template>

<script>
    import LayoutHeader from "./layout-header";
    import LayoutFooter from "./layout-footer";

    export default {
        name: "layout-main",
        components: {
            LayoutHeader,
            LayoutFooter
        },

        data() {
            return {};
        },
        computed: {
            route() {
                return this.$route.name
            },
        },
    }
</script>


<style lang="scss">
    .layout-main {
        /*min-height: 100vh;*/

        max-width: $layout-width;
        padding-top: $layout-margin-xs;
        padding-bottom: 16px;
        padding-right: $layout-margin-xs;
        padding-left: $layout-margin-xs;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /*min-height: calc(100vh - 48px);*/
        min-height: calc(var(--vh, 1vh) * 100);
        /*-webkit-animation: expand 0.5s;*/
        @include up($lg) {
            padding-top: $layout-margin-lg;
            margin-right: auto;
            margin-left: auto;

        }
    }

    /*@-webkit-keyframes expand{
        0%{height:0px}
        100%{height:100vh}
    }*/
</style>