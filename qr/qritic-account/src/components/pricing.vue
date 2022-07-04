<template>
    <div class="pricing layout-top">
        <h1 class="text-center margin-bottom-main">
            Наши тарифы
        </h1>

        <tariff-cards :cards="tariffs"
                      @select="onSelectTariff"/>

    </div>
</template>

<script>
    import TariffCards from "./elements/tariff-cards";

    export default {
        name: 'pricing',
        data: () => ({}),
        components: {
            TariffCards,
        },
        computed: {
            tariffs() {
                return this.$store.getters.tariffs;
            }
        },
        methods: {
            onSelectTariff(tariff) {
                // todo
            }
        }
    }
</script>

<style lang="scss">
    .pricing {
        .tariff-cards {
            div.card {
                .body-2 {
                    letter-spacing: unset !important;
                }
            }
        }

        .theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
            .v-btn__content {
                color: #FFF !important
            }
        }
    }
</style>