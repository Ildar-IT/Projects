<template>
    <div class="subscription-confirmation text-center">
        <h2>Спасибо!</h2>
        <p>Вы успешно подписались на нашу рассылку.</p>

        <button class="mt-4" @click="scrollTo('videos')">Прокачай свою силу</button>
    </div>
</template>

<script>
    import BtnLink from "./btn-link";

    export default {
        name: 'subscription-confirmation',
        components: {BtnLink},
        methods: {
            scrollTo(el) {
                this.$router.push({name: 'Home', hash: `#${el}`});
                el = document.getElementById(el);
                window.scrollTo({
                    top: el.offsetTop - (this.isWindowMD ? 70 : 60),
                    behavior: "smooth"
                });
            },
        }
    }
</script>

<style lang="scss">

    .subscription-confirmation {
        p {
            width: 100% !important;
        }
        button {
            width: auto;
        }
    }
</style>
