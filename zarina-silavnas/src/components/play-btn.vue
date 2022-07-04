<template>
    <div class="play-btn" @click="$emit('click')">
            <div class="play-btn__circle2">
                <svgicon name="play"/>
            </div>
    </div>
</template>

<script>

    export default {
        name: 'play-btn',
        props: []
    }
</script>

<style scoped lang="scss">
    .play-btn {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &__circle2 {
            width: 100px;
            height: 100px;
            border: 1px solid $accent-color;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            @include up($sm) {
              width: 240px;
              height: 240px;
            }

            @include transition();
        }

        svg {
            position: absolute;
            left: 50%; /* % of surrounding element */
            top: 50%;
            transform: translate(-50%, -50%); /* % of current element */
            width: 24px;
            height: 24px;
            fill: $white-color;
            margin-left: 2px;
            @include up($sm) {
              width: 48px;
              height: 48px;
            }
        }

        &:hover {
            .play-btn__circle2 {
                width: 110px;
                height: 110px;
              @include up($sm) {
                width: 250px;
                height: 250px;
              }
            }

        }
    }
</style>
