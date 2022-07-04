<template>
    <header class="layout-header">
        <div v-if="page.poll && page.poll.DETAIL_PICTURE" >
            <img :src="page.poll.DETAIL_PICTURE" class="layout-header__logo">
        </div>
        <svgicon v-else
                 name="logo3"
                 original
                 :fill="false"
                 :height="isWindowLG ? '76' : '48'"
                 :width="isWindowLG ? '224' : '140'"></svgicon>
    </header>
</template>

<script>
    export default {
        name: "layout-header",
        components: {},
        data: () => ({}),
        computed: {
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
            page() {
                return this.$store.state.currentPage;
            },
        }
    }
</script>

<style lang="scss">
    .layout-header {
        position: relative;    // нужно для красоты с конфети
        z-index: 10;    // нужно для красоты с конфети
        display: flex;
        justify-content: center;
        padding-bottom: $layout-margin-xs;
        padding-top: 0;

        &__logo {
            max-width: 180px;
            width:100%;
            margin-left: auto;
            margin-right: auto;

            @include up($sm) {
                max-width: 300px;
            }
        }
    }

</style>