<template>
    <div class="subscription layout-top">
        <h1 class="text-center margin-bottom-main">
            Управление подпиской
        </h1>

        <v-row class="justify-center margin-bottom-main">
            <v-col cols="12" sm="6" md="4" class="ma-0 pa-0">
                <card-tariff />
            </v-col>
        </v-row>

        <your-balance class="mb-8"/>

        <template v-if="transactions && transactions.length">

            <div class="d-flex align-center justify-space-between justify-lg-center mb-8 mb-lg-13">
                <h4 class="text-center gray-text">
                    Последние операции
                </h4>
                <svgicon v-if="!isWindowLG" name="clock-reverse" :fill="true" width="24" height="24" color="#B3B8CB"/>
            </div>

            <transaction-table :items="transactions"/>
        </template>

        <template v-else-if="false">
            <div>
                <p class="text-center mt-10">
                    Пока нет операций
                </p>
            </div>
        </template>

    </div>
</template>
<script>
    import YourBalance from "./elements/your-balance";
    import TransactionTable from "./subscription/transaction-table";
    import CardTariff from './subscription/card-tariff';

    export default {
        name: 'subscription',
        components: {
            TransactionTable,
            YourBalance,
            CardTariff,
        },
        computed: {
            isPremium() {
                return this.$store.getters.isPremium;
            },
            transactions() {
                return this.$store.state.page.SubscriptionController.transactions;
            },
            currentTariff() {
                return this.$store.state.session.user.TARIFF;
            },
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
        }
    }
</script>

<style lang="scss">
</style>
