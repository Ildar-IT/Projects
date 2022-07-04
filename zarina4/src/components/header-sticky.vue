<template>
    <div class="header-sticky">
        <v-container>

            <div class="d-flex justify-space-between align-center">

                <img src="~@/assets/the-header/logo.svg" alt="Zarina" @click="$emit('click','home')">

                <ul class="header-sticky__list">
                    <li @click="$emit('click','about')">О проекте</li>
                    <li @click="$emit('click','heroes')">Наши героини</li>
                    <li @click="$emit('click','videos')">Прокачай свою силу</li>
                    <li @click="$emit('click','podcasts')">Подкаст</li>
                    <li @click="$emit('click','stickers')">Стикеры</li>
                </ul>
            </div>

        </v-container>
    </div>
</template>

<script>
    import BtnLink from './btn-link.vue'

    export default {
        name: 'header-sticky',
        components: {
            BtnLink,
        }
    }
</script>

<style lang="scss">

    .header-sticky {
        position: absolute;
        width: 100%;
        height: 79px;
        left: 0;
        top: 0;
        background: $white-color;
        border-bottom: 1px solid $grey-color;

        .container {
            padding-top: 0;
            padding-bottom: 0;
        }

        img {
            cursor:pointer;
            width: 140px;
            padding: 10px 0;
        }

        ul {
            list-style: none;
            margin:0;
            padding: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-transform: uppercase;
            height: 79px;

            li {
                list-style-type: none;
                margin:0;
                padding: 0 14px;
                color: $taupe-color;
                font-size: 14px;
                font-weight: 500;
                line-height: 79px;
                height: 77px;
                overflow: hidden;
                cursor: pointer;
                border-bottom: 2px solid $white-color;
                white-space: nowrap;

                @include transition();

                &:hover {
                    color: $black-color;
                    border-bottom: 2px solid $black-color;
                }

                @include up($lg) {
                    padding: 0 32px;
                }
            }
        }
    }
</style>
