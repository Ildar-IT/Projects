<template>
    <a class="btn-link text-center" :href="href" :target="target" >
        <slot name="default">
            {{label}}
        </slot>
    </a>
</template>

<script>
    export default {
        name: 'btn-link',
        props: ["href", "target", "label"]
    }
</script>

<style scoped lang="scss">
    @import "../styles/index";

    .btn-link {
        display: block;
        width: 229px;
        background: $black-color;
        color: $white-color;
        border-radius: 5px;
        padding: 12px 24.5px;

        font-size: 14px;
        line-height: 22.4px;
        letter-spacing: 0.1em;

        @include up($sm) {
          font-size: 18px;
          line-height: 28.8px;
        }
        @include transition();

        &:hover {
            background: $taupe-color;
            color: $white-color;
        }
    }
</style>
