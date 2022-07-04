<template>
    <div class="template-banner">
        <div class="anti-margin-row">
            <v-row class="ma-0">
                <v-col cols="12" class="ma-0 pa-0">
                    <div class="margin-right-small margin-left-small margin-bottom-main">
                        <div class="margin-bottom-main">
                            <card>
                                <div class="template-cards__image__wrap mb-8">
                                    <a target="_blank" href="https://qr-feedback.ru/kit">
                                        <v-img class="template-cards__image"
                                               :aspect-ratio="isWindowXS? 1: 16/9"
                                               src="@/assets/template-banner.jpg"/>
                                    </a>
                                </div>
                                <div class="text-sm-center h5 mb-4">
                                    Лень печатать? Получите напечатанные наклейки!
                                </div>
                                <div class="text-sm-center body-1 mb-4">
                                    В наборе 3 готовые наклейки и инструкция
                                </div>

                                <div class="text-sm-center">
                                    <a target="_blank" href="https://qr-feedback.ru/kit">
                                        <v-btn :block="isWindowXS" large class="primary">
                                            Подробнее
                                        </v-btn>
                                    </a>
                                </div>
                            </card>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "template-banner",
        data() {
            return {}
        },
        computed: {
            isWindowXS() {
                return this.$store.getters.isWindowXS;
            },
        },
        methods: {}
    }
</script>

<style lang="scss">
    .template-banner {

        &__image {
            cursor: pointer;
            /*border-radius: 32px;*/
            @include transition-long();

            &:hover {
                overflow: hidden;
                transform: scale(1.1);
            }

            &__wrap {
                overflow: hidden;
                border-radius: 32px;
            }
        }
    }
</style>