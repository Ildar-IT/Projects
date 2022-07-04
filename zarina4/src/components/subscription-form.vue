<template>
    <div class="subscription-form">
        <subscription-confirmation v-if="isSubscribed" />
        <v-form v-else @submit.prevent="submit" @keyup.native.enter="submit">
            <div class="subscription-form__email">
                <input type="text" v-model="form.email" placeholder="Ваш E-mail">
                <button type="submit">
                    <svgicon class="d-md-none" name="arrow"/>
                    <span class="d-none d-md-inline">Подписаться</span>
                </button>
            </div>
            <div class="mx-6 mt-4 subscription-form__checkbox">
                <v-checkbox
                        v-model="form.agree"
                        label="Принимаю пользовательское соглашение о конфиденциальности"
                ></v-checkbox>
                <!--<input :id="checkboxId" type="checkbox" class="mr-3">
                <label :for="checkboxId">Принимаю пользовательское соглашение о конфиденциальности</label>-->
            </div>
            <div v-if="error" class="mb-8 text-center footer-input__error" v-html="error"></div>
        </v-form>
    </div>
</template>

<script>
    import SubscriptionConfirmation from "../components/subscription-confirmation.vue";
    import axios from "axios";
    import Config from "../config";

    export default {
        name: 'subscription-form',
        components: {
            SubscriptionConfirmation
        },
        data() {
            return {
                //checkboxId: null
                form: {
                    email: "",
                    agree: true
                },
                error: null,
                isSubscribed: false
            }
        },
        methods: {
            submit() {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if ( !re.test(String(this.form.email).toLowerCase())) {
                    return this.error = "Введите правильный e-mail (например, anna@gmail.com)";
                }
                if ( !this.form.agree) return this.error = "Необходимо принять пользовательское соглашение";

                this.error = false;
                return axios.post(Config.SUBSCRIPTION_URL, this.form)
                    .then((response) => {
                        console.log('API Response: ', response);
                        this.isSubscribed = true;
                    })
                    .catch((error) => {
                        console.warn('API request error: ', error);
                        this.error = error;
                    })
                    .finally(()=>{

                    });
            }
        }
    }
</script>

<style lang="scss">

    .subscription-form {

        max-width: 546px;

        &__email {
            width: 100%;
            display: flex;
            justify-content: space-between;

            padding: 3px 3px 3px 24px;
            border: 0.5px solid $black-color;
            border-radius: 100px;

            input {
                flex: 1;
                width: 75%; // fixme
                text-align: left;
                outline: none;
                margin-right: 16px;

                @include up($md) {
                    margin-right: 32px;
                }

                &::placeholder {
                    color: $black-color;
                }
            }

            button {
                color: $white-color;
                background: $black-color;

                width: 48px;
                height: 48px;
                padding: 0;

                @include up($md) {
                    width: unset;
                    padding: 12px 32px;
                }

                &:active, &:hover {
                    background: $taupe-color;
                }

                svg {
                    stroke: $white-color;
                }
            }
        }

        &__checkbox {
            .v-icon.primary--text {
                opacity: 0.7;
                color: #000 !important;
            }

            .v-label {
                font-weight: normal; // = Book
                font-size: 13px;
                line-height: 20.8px;
                color: $taupe-color;
            }

            .v-input__slot {
                align-items: start;
                @include up($sm) {
                    align-items: center;
                }
            }
        }

    }
</style>
