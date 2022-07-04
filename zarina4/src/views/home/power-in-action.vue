<template>
    <section v-if="!isTestRunning" class="power-in-action">
        <v-container>
            <h1 class="text-center">сила в действии</h1>
            <h3 class="text-center mt-4">ПОДПИШИСЬ И НЕ ПРОПУСТИ ПРОКАЧКУ СКИЛЛОВ ОТ ZARINA.<br/>Старт в сентябре</h3>

            <subscription-form class="mx-auto mt-16"/>

        </v-container>
    </section>
</template>

<script>
    import SubscriptionForm from '../../components/subscription-form.vue';

    export default {
        name: 'power-in-action',
        components: {
            SubscriptionForm
        },
        computed: {
            isTestRunning() {
                return this.$store.state.isTestRunning;
            }
        }
    }
</script>

<style scoped lang="scss">

    .power-in-action {
        padding: 80px 0 80px 0;

        h3 {
            max-width: 340px;
            margin: 0 auto;
        }
    }
</style>
