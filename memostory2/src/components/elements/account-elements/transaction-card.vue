<template>
    <card class="transaction-card d-flex flex-column mb-8">
        <span class="mb-4">{{ transaction.DATE_CREATE }}</span>
        <span class="mb-4">{{ transaction.NAME }}</span>
        <span class="transaction-card__amount">
            {{transaction.SUM | nf}} ₽
        </span>
    </card>
</template>

<script>
    export default {
        name: 'transaction-card',
        props: ['transaction'],
    }
</script>

<style lang="scss">
    .transaction-card {

        &__amount {
            font-family: $heading-font-family;
            font-weight: bold;
            font-size: 18px;
            line-height: 23px;
        }
    }

    .new-transaction {
        border: 4px solid $beige2;
    }
</style>
