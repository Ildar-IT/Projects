<template>
    <div class="play-btn" @click="$emit('click')">
        <div class="play-btn__circle1">
            <div class="play-btn__circle2">
                <svgicon name="play"/>
            </div>
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
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &__circle1 {
            width: 60px;
            height: 60px;
            border: 1px dashed rgba(255, 255, 255, 0.2);
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;

            @include transition();
        }

        &__circle2 {
            width: 50px;
            height: 50px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;

            @include transition();
        }

        svg {
            position: absolute;
            left: 50%; /* % of surrounding element */
            top: 50%;
            transform: translate(-50%, -50%); /* % of current element */
            width: 13px;
            height: 13px;
            fill: $white-color;
            margin-left: 2px;
        }

        &:hover {
            .play-btn__circle1 {
                border: 1px dashed rgba(255, 255, 255, 0.0);
            }
            .play-btn__circle2 {
                width: 60px;
                height: 60px;
                border: 1px solid rgba(255, 255, 255, 1);
            }

        }
    }
</style>
