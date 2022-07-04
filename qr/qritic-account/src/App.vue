<template>
    <v-app id="account-app">
        <transition name="route" mode="out-in">
            <router-view />
        </transition>
        <premium-pop-up/>
        <message :message="message" />
    </v-app>
</template>

<script>
    import premiumPopUp from '@/components/elements/premium-pop-up';
    import message from '@/components/elements/message';

    export default {
        name: 'App',
        components: {
            premiumPopUp,
            message
        },
        data: () => ({
            //
        }),
        computed: {
            message() {
                return this.$store.state.message;
            }
        },
        methods: {
            updateWindow() {
                this.$store.commit('updateWindowWidth')
                let vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
                window.addEventListener('resize', () => {
                    document.querySelector(':root').style
                        .setProperty('--vh', window.innerHeight / 100 + 'px');
                })
            },
        },
        mounted() {
            window.addEventListener("resize", this.updateWindow);
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            window.addEventListener('resize', () => {
                document.querySelector(':root').style
                    .setProperty('--vh', window.innerHeight / 100 + 'px');
            })
        },
    };
</script>

<style lang="scss">
    #account-app {
        background: url('./assets/bg.jpg'), linear-gradient(0deg, #F3F4FC, #F3F4FC);
        /*background-blend-mode: lighten, normal;*/
        /*background: linear-gradient(0deg, #F3F4FC, #F3F4FC);*/
        @include up($lg) {
            /*background-color: #fff;*/
        }
    }
</style>
