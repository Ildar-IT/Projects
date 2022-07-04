<template>
    <a class="btn-link" :href="href" :target="target">
        <slot name="default">
            Смотреть коллекцию
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
        display: inline-block;
        width: 229px;
        background: $accent-color;
        color: $taupe-color;
        border-radius: 32px;
        padding: 12px 32px;

        @include transition();

        &:hover {
            background: $taupe-color;
            color: $white-color;
        }
    }
</style>
