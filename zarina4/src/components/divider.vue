<template>
    <div class="divider" :class="colorClass">
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>
    export default {
        name: 'divider',
        props: ['color'],
        computed: {
            colorClass() {
                return this.color
            }
        }
    }
</script>

<style lang="scss">

    .divider {
        width: 290px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        margin-top: 32px;

        span {
            width: 114px;
            height: 1px;
            //background-color: $accent-color;

            &:nth-child(2) {
                width: 10px;
                height: 4px;
                border-radius: 50%;
            }
        }

        &.taupe {
            span {
                background-color: $taupe-color;
            }
        }

        &.accentColor {
            span {
                background-color: $accent-color;
            }
        }
    }
</style>
