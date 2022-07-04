<template>
    <router-link :to="to" class="arrow-link-white d-flex align-center">
        <slot name="default">
            Learn more
        </slot>
        <svg class="ml-3" width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.7798 2L13.0704 2.70592L16.0798 5.70086H3V6.69923H16.0797L13.0704 9.69408L13.7798 10.4L18 6.2L13.7798 2Z" />
        </svg>
    </router-link>
</template>

<style lang="scss">
.arrow-link-white {
    color: $primary-1 !important;
    padding: 10px 0;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.05em;
    & svg path {
      fill: $primary-1;
    }
    @include up($sm) {
        font-size: 16px;
        line-height: 22px;
        & svg {
            width: 25px;
            height: 14px;
        }
    }
    &:hover {
        color: $primary-2!important;
        & svg path {
            fill: $primary-2;
        }
    }
    &:active {
        color: $primary-2!important;
        background: $secondary-2;
        & svg path {
            fill: $primary-2;
        }
    }
    &:disabled {
        background-color: $light-grey;
        color: $mid-grey !important;

        & svg path {
            fill: $mid-grey;
        }
    }
}
</style>

<script>
export default {
    name: 'arrow-link-white',
    props: ["to"],
}
</script>
