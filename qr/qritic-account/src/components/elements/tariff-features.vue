<template>

    <div v-if="tariff && tariff.features" class="tariff-features text-left">
        <div v-for="(item, index) in tariff.features" :key='index'
             class="tariff-cards__item d-flex mb-4">
            <svgicon :name="item.icon" width="24" height="24" :fill=false
                     :color= "'#000000'"
                     class="mr-4 tariff-features__item-icon"/>
            <span class="body-2 tariff-features__item-text" v-html="item.text"></span>
        </div>
    </div>

</template>

<script>
    export default {
        name: "tariff-features",
        props: ['tariff'],
    }
</script>

<style lang="scss">
    .tariff-features {

        &__item {
            &-icon {
                min-width: 24px;
            }
            &-text {
                padding-top:2px;
            }
        }
    }
</style>
