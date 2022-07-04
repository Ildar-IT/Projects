<template>
    <div class="layout-testimonials">
        <the-header/>
        <main>
            <transition name="route" mode="out-in">
                <router-view/>
            </transition>
        </main>
        <the-footer/>
    </div>
</template>

<script>
import TheHeader from "./main/the-header";
import TheFooter from "./main/the-footer";

export default {
    components: {TheHeader, TheFooter}
}
</script>

<style lang="scss">
.layout-testimonials {

    footer {
        padding-top: 0 !important;
        .footer__img {
            display: none;
        }
    }
}


</style>