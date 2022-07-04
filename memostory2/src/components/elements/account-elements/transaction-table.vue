<template>
    <div class="transaction-table">

        <template v-if="isWindowMD">
            <!--table header-->
            <div class="flex px-4 py-0 align-center justify-space-between h7">
                <v-row class="d-flex px-4">
                    <v-col cols="2" class="text-left">
                        <span>{{pageContent.date ? pageContent.date : "Дата"}}</span>
                    </v-col>
                    <v-col cols="8">
                        <span>{{pageContent.transaction ? pageContent.transaction : "Операция"}}</span>
                    </v-col>
                    <v-col cols="2" class="text-right">
                        <span>{{pageContent.amount ? pageContent.amount : "Сумма"}}</span>
                    </v-col>
                </v-row>
            </div>

            <card class="transaction-table__card px-3 py-1">
                <v-row v-for="(item, index) in items" :key="index" class="d-flex px-4">
                    <v-col cols="2">
                        <span>{{item.DATE_CREATE}}</span>
                    </v-col>
                    <v-col cols="8">
                        <span>{{item.NAME}}</span>
                    </v-col>
                    <v-col cols="2" class="text-right">
                        {{item.SUM | nf}} ₽
                    </v-col>
                </v-row>
            </card>
        </template>
        <div v-else v-for="(transaction, index) in items" :key="index">
            <transactions-card :transaction="transaction"/>
        </div>

        <!--    <v-data-table
                hide-default-footer
                :headers="headers"
                :disable-sort="false"
                :items="items"
                :items-per-page="5"
                class="elevation-0"
            ></v-data-table>-->


    </div>
</template>

<script>
    import TransactionsCard from "./transaction-card";

    export default {
        name: 'transaction-table',
        props: ['items'],
        components: {
            TransactionsCard,
        },
        data() {
            return {}
        },
        computed: {
            isWindowMD() {
                return this.$store.getters.isWindowMD;
            },
            pageContent() {
                return this.$store.state.page.SubscriptionController.texts.content || {}
            },
        },
    }
</script>

<style lang="scss">
    .transaction-table {
      .card {
        background: white;
        color: $grey1
      }

        div.card.transaction-table__card {
            border-radius: 16px;
            

            .row {
                border-bottom: 1px solid $beige2;

                &:last-child {
                    border-bottom: none;
                }
            }
        }


        .v-data-table-header > tr > th {
            span {
                font-family: $heading-font-family;
                font-style: normal;
                font-weight: bold !important;
                font-size: 16px !important;
                line-height: 19px !important;
                color: #262831;
            }

            border-bottom: none !important;

        }


        div.theme--light.v-data-table {
            background-color: transparent !important;
            border-radius: 16px 16px 0px 0px;

            tbody {
                background-color: #FFFFFF;
                border-radius: 16px 16px 0px 0px;
            }

        }
    }
</style>
