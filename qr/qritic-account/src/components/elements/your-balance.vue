<template>
    <div class="your-balance">
        <!--<h4 class="text-center margin-bottom-main gray-text">
            Ваш баланс
        </h4>-->
        <v-form @submit.prevent="submit" @keyup.native.enter="submit">
            <v-row class="ma-0 justify-center">
                <v-col cols="12" sm="6" md="4" class="ma-0 pa-0">
                    <card class="text-center mb-8 d-flex flex-column">
                        <span class="gray-text text-center mb-8">Ваш баланс</span>
                        <span class="h3">{{ (balance || 0) | nf}} ₽</span>
                    </card>

                    <template v-if="!hidePayment">

                        <v-text-field
                                type="number"
                                class="mb-8"
                                label="Укажите сумму"
                                hide-details="auto"
                                v-model="form.amount"
                        />
                        <v-btn type="submit" class="primary mb-8" block>
                            <pulse-loader v-if="loading" :loading="true" color="#fff" size="5px"/>
                            <span v-else class="d-flex align-center">
                            <svgicon class="mr-4 svg-money" name="money" width="24" height="24" :fill="false"
                                     color="#FFF"/>
                            Пополнить
                        </span>
                        </v-btn>

                        <!--<div class="text-center">
                            <a class="body-2 text-center gray-text"
                               href="https://qr-feedback.ru/policy"
                               target="_blank">
                                   <span class="link_secondary">
                                       Политика обработки персональных данных
                                   </span>
                            </a>
                        </div>-->
                    </template>
                </v-col>
            </v-row>
        </v-form>

        <div v-if="paymentFormHTML" v-html="paymentFormHTML" id="your-balance__payment-form"></div>
    </div>
</template>

<script>
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

    export default {
        name: 'your-balance',
        props: {
            sum: {},
            hidePayment: {
                type: Boolean,
                default: false
            },
            tariff: {
                type: Object,
                default: null
            },
            period: {
                default: null
            }
        },
        components: {
            PulseLoader
        },
        data() {
            return {
                loading: false,
                form: {
                    amount: null,
                    tariffId: null,
                    period: null,
                },
                paymentFormHTML: ''
            }
        },
        computed: {
            balance() {
                return this.$store.state.session.user.BALANCE;
            },
        },
        methods: {
            submit() {
                if (RegExp(/^[1-9][0-9]+$/).test(this.form.amount)) {

                    this.loading = true;

                    this.form.tariffId = this.tariff?.ID;
                    this.form.period = this.period

                    this.$store.dispatch('post', {
                        action: 'PaymentController',
                        params: this.form
                    }).then((res) => {
                        this.paymentFormHTML = res?.page?.PaymentController?.html;

                        setTimeout(() => {
                            const el = document.getElementById("your-balance__payment-form");
                            const form = el.children[0];
                            form.submit();
                        }, 100);
                    }).catch((error) => {
                        this.$store.state.message = {
                            title: "Что-то пошло не так... Пожалуйста, попробуйте еще раз."
                        };
                        /*this.$store.state.alert = {
                            text: "Что-то пошло не так... Пожалуйста, попробуйте еще раз.",
                            type: "error"
                        };
                        setTimeout(() => {
                            this.alert = null;
                        }, 3000);*/
                    }).finally(() => {
                        this.loading = false;
                    });
                } else {
                    this.$store.state.message = {
                        title: "Пожалуйста, укажите сумму для пополнения.",
                    };
                }
            }
        },
        mounted() {
            this.form.amount = this.sum || '';
        }
    }
</script>

<style lang="scss">
    .your-balance {
        svg.svg-money {
            path:nth-child(2) {
                fill: #fff;
                stroke: none !important;
            }
        }
    }

    #your-balance__payment-form {
        overflow: hidden;
        height: 0;
        opacity: 0;
    }
</style>
