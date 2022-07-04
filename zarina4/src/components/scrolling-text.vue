<template>
    <div class="scrolling-text">
        <div class="scrolling-text__motto d-none d-md-block" :class="type"></div>
    </div>
</template>

<script>
    export default {
        name: 'scrolling-text',
        props: ['type']
    }
</script>

<style lang="scss">

    .scrolling-text {
        position: absolute;
        overflow: hidden;
        z-index: 0;
        width: 100%;

        @include up($lg) {
            height: 220px;
        }

        @include up($xl) {
            height: 250px;
        }

        &__motto {
            background-position: bottom;
            background-repeat: repeat-x;
            background-size: 50% 50%;
            height: 100%;
            width: 350vw;
            animation: scroll-left 60s infinite linear;
            opacity: 0.4;
            @include up($lg) {
                background-size: 60% 60%;
            }
            @include up($xl) {
                background-size: unset;
            }
        }

        .power-text {
            background-image: url('~@/assets/power-slider/power-text.svg');
        }

        .contest {
            background-image: url('~@/assets/contest.svg');
        }
    }

    @keyframes scroll-left {
        0% {
            transform: translateX(0%);
        }
        100% {
            transform: translateX(-50%);
        }
    }
</style>
