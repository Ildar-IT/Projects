<template>
    <div class="slider-btns" :class="{'slider-btns--grey':bg==='grey'}">
        <div class="d-flex justify-space-between align-center">
            <div class="d-flex flex-grow-1 flex-md-grow-0 justify-space-between align-center slider-btns__wrap"
                 :class="{'order-1 mr-md-12 mr-lg-16':mirror, 'ml-md-12 ml-lg-16':!mirror}">
                <button class="button-arrow" @click="$emit('slidePrev')">
                    <svgicon name="arrow" class="svg-down"/>
                </button>
                <div class="d-md-none slider-btns__pagination">
                    <slot name="pagination">
                        <h3>
                            <span class="power-slider__pagination__current">{{currentSlide}}</span>
                            <span class="power-slider__pagination__sep"> / </span>
                            <span class="power-slider__pagination__total">{{total}}</span>
                        </h3>
                    </slot>
                </div>
                <button class="ml-md-4 button-arrow" @click="$emit('slideNext')">
                    <svgicon name="arrow"/>
                </button>
            </div>
            <div class="d-none d-md-block mr-md-12 mr-lg-16 slider-btns__pagination"
                 :class="{'order-1 mr-md-12 mr-lg-16':!mirror, 'ml-md-12 ml-lg-16':mirror}">
                <slot name="pagination">
                    <h3>
                        <span class="power-slider__pagination__current">{{currentSlide}}</span>
                        <span class="power-slider__pagination__sep"> / </span>
                        <span class="power-slider__pagination__total">{{total}}</span>
                    </h3>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'slider-btns',
        props: {
            total: {},
            currentSlide: {},
            mirror: {type: Boolean, default: false},
            bg: {default: "white"},
        }
    }
</script>

<style lang="scss">
    .slider-btns {
        position: relative;
        z-index: 1;

        @include up($md) {
            &:before {
                position: absolute;
                z-index: 0;
                content: '';
                left: 0;
                top: 25px;
                border-top: 0.5px solid $taupe-color;
                opacity: 0.5;
                width: 100%;
            }

            &--grey {
                .slider-btns__wrap {
                    @include up($md) {
                        background-color: $grey-color;
                    }
                }

                .slider-btns__pagination {
                    @include up($md) {
                        background-color: $grey-color;
                    }
                }
            }
        }

        button {
            width: 48px;
            height: 48px;
            padding: 0;
        }

        &__wrap {
            @include up($md) {
                position: relative;
                z-index: 1;
                padding: 0 24px;
                background-color: $white-color;

                &--grey {
                    background-color: $grey-color;
                }
            }
            @include up($lg) {
                padding: 0 48px;
            }
        }

        &__pagination {
            color: $taupe-color;

            @include up($md) {
                position: relative;
                z-index: 1;
                padding: 0 24px;
                background-color: $white-color;
            }
            @include up($lg) {
                padding: 0 48px;
            }
        }
    }
</style>
