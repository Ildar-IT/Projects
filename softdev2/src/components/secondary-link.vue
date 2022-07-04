<template>
    <router-link :to="to" class="secondary-link">
        <slot name="default">
            Learn more
        </slot>
    </router-link>
</template>

<script>
export default {
    name: 'secondary-link',
    props: ["to"],
}
</script>

<style lang="scss">
.secondary-link {
    display: block;
    text-align: center;
    padding: 15px 25px;
    border: 2px solid $primary-1;
    color: $primary-1 !important;
    font-weight: 700;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    background: transparent;
    &:hover {
        background: $white;
        border: 2px solid transparent;
    }
    &:active {
        background: $white;
        border: 2px solid transparent;
        color: $secondary-1 !important;
    }
    &:disabled {
        background: transparent;
        border: 2px solid $mid-grey;
        color: $mid-grey !important;
    }
    @include up($sm) {
        font-size: 16px;
        line-height: 22px;
    }
    @include up($md) {
        font-size: 20px;
        line-height: 27px;
    }
}
</style>