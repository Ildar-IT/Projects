<template>
    <div class="subscription-confirmation" @click.self="$emit('close')" v-html="texts.confirm">

    </div>
</template>

<script>
export default {
    name: 'subscription-confirmation',
    computed: {
        texts() {
            return {
                confirm: this.$store.state.page?.AboutController?.texts?.CONFIRMATION,
            }
        },
    }
}
</script>

<style lang="scss">
.subscription-confirmation {
    background-image: url("~@/assets/bg/bg-lg.jpg");
    background-size: cover;
    border-radius: 32px;
    padding: 32px;
    max-width: 541px;
    width: 100%;

    &__title {
        font-size: 48px;
        line-height: 53px;
        text-align: center;
        margin-bottom: 16px;
        @include up($md) {
            margin-bottom: 32px;
        }
    }
}
</style>