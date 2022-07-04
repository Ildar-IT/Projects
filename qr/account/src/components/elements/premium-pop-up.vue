<template>
    <v-dialog ref="getPremiumModal"
              v-model="premiumPopUp"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
    >
        <div class="premium-pop-up text-center padding-top-main px-2 padding-bottom-main">
            <v-row class="flex-column align-center">
                <v-col cols="12" lg="5" md="8">
                    <svgicon original class="mb-12 mb-lg-16 svgicon" name="wow-smile" width="221" height="206"  />
                    <h2 class="premium-pop-up__title">Получите больше!</h2>
                    <p class="body-1 mt-8">с «Премиум» подпиской QR&#8209;feedback</p>
                    <p class="body-1 mt-2">за {{minPrice | price }} ₽ / мес.</p>

                    <!--<v-col cols="12" sm="7" md="12" lg="10" xl="10"
                           class="premium-pop-up__list mb-1 mb-md-4 d-flex flex-wrap mx-auto align-center justify-center">

                        <v-col cols="12" sm="8" md="6" lg="6" v-for="(item, index) in this.premiumTariffs" :key='index'
                               class="premium-pop-up__list text-left mx-auto ">

                            <div class="d-flex">
                                <svgicon :name="item.icon" width="24" height="24"
                                         color="#F35A45"
                                         class="mr-4" style="min-width: 24px"/>
                                <span class="body-2" v-html="item.text"></span>
                            </div>
                        </v-col>
                    </v-col>-->
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="3" class="mx-auto px-8">
                    <v-btn block class="premium-pop-up__btn premium_primary premium standard-size mb-8 mx-auto"
                           @click="goToDetails">
                        Подробнее
                    </v-btn>
                    <v-btn text block class="button-text mx-auto premium premium_text" @click="closeModal"
                           elevation="0">
                        Нет, спасибо
                    </v-btn>
                </v-col>
            </v-row>
        </div>

    </v-dialog>
</template>

<script>
    export default {
        name: 'premium-pop-up',
        computed: {
            minPrice() {
                let prices = this.$store.state.common?.tariffs?.filter(x => x.PRICE).map(el=>el.PRICE);
                if ( prices ) {
                  console.log("prices", prices)
                    prices.sort(function(a, b){return a - b});
                    return prices[0];
                }
                
                return null;
            },

            premiumPopUp() {
                return this.$store.state.common.premiumPopUpDialog;
            }
        },
        data: () => ({
            items:
                [{icon: 'heart', text: 'Неограниченное количество респондентов на опрос!'},
                    {icon: 'heart', text: 'Неограниченное количество  вопросов в опросе!'},
                    {icon: 'heart', text: 'Полная статистика!'},
                    {icon: 'heart', text: 'Доступ ко всем шаблонам!'}],
        }),
        methods: {
            closeModal() {
                this.$store.state.common.premiumPopUpDialog = false;
            },
            goToDetails() {
                this.$router.push({name: 'tariffs'});
                this.$store.state.common.premiumPopUpDialog = false;
            }
        }
    }
</script>

<style lang="scss">
    .premium-pop-up {
        background-color: white;
        height: 100%;
        overflow-x: hidden;

        h2.premium-pop-up__title {
            font-size: 48px;
            line-height: 53px;
            @include up($md) {
                font-size: 64px;
                line-height: 69px;
            }
        }

        &__list {
            max-width: 610px;
        }

        &__btn {
            background-color: $premium;
            box-shadow: $premium-shadow;

            &:before {
                background-color: $premium;
            }
        }

        /* хром, сафари */
        &::-webkit-scrollbar {
            width: 0;
        }

        /* ie 10+ */
        & {
            -ms-overflow-style: none;
        }

        /* фф (свойство больше не работает, других способов тоже нет)*/
        & {
            overflow: -moz-scrollbars-none;
        }

        button {
            display: block;
            min-width: 301px !important;

        }
    }
</style>
