<template>
    <div class="payment-fail layout-top">
        <div class="margin-bottom-small">
            <h1 class="text-center mb-4">
                Платеж не выполнен...
            </h1>

            <v-row>
                <v-col cols="6" offset="3">
            <v-alert
                    type="error"
                    text
            >К сожалению, платеж не прошел. Пожалуйста, попробуйте еще раз.</v-alert>
                </v-col>
            </v-row>
        </div>

        <div class="flex-center flex-column">
            <div class="mb-8">
                <v-btn large class="primary" @click="$router.push({name:'subscription'})">
                    <span>Повторить</span>
                </v-btn>
            </div>

            <div>
                <v-btn large class="default" @click="$router.push({name:'support'})">
                    <span>Обратиться в поддержку</span>
                </v-btn>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'payment-fail',
    }
</script>

<style lang="scss">
</style>
