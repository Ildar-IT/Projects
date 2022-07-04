<template>
    <div>
        <layout-header/>
        <div class="layout layout__wrap">
            <main class="layout-main">
                <transition name="route" mode="out-in">
                    <layout-menu v-if="isMenuOpen"/>
                    <router-view v-else/>
                </transition>
            </main>
            <layout-footer/>
        </div>

        <alert />
    </div>
</template>

<script>
    import LayoutHeader from "./layout-header";
    import LayoutFooter from "./layout-footer";
    import LayoutMenu from "./layout-menu";
    import Alert from "../elements/alert";

    export default {
        name: "layout-main",
        components: {LayoutMenu, LayoutFooter, LayoutHeader, Alert},
        computed: {
            isMenuOpen() {
                return this.$store.state.isMenuOpen;
            },
        },
    }
</script>

<style lang="scss">
    .layout__wrap {
        min-height: calc(var(--vh, 1vh) * 100);
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        .layout-main {
            width: 100%;
            max-width: $layout-width;
            margin-right: auto;
            margin-left: auto;
            /*padding-bottom: 200px;*/
        }
    }
</style>