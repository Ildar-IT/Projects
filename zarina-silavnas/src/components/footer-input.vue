<template>
    <div class="footer-input">
        <subscription-confirmation v-if="isSubscribed" />
        <v-form v-else @submit.prevent="submit" @keyup.native.enter="submit">
            <div class="footer-input__email">
                <input type="text" v-model="form.email" placeholder="e-mail">
                <button type="submit" class="footer-input__btn">→</button>
            </div>
            <div class="footer-input__checkbox">
                <v-checkbox
                        v-model="form.agree"
                        label="Принимаю пользовательское соглашение о конфиденциальности"
                ></v-checkbox>
            </div>
            <div v-if="error" class="mb-8 footer-input__error" v-html="error"></div>
        </v-form>
    </div>
</template>

<script>
    import SubscriptionConfirmation from "../components/subscription-confirmation.vue";
    import axios from "axios";
    import Config from "../config";

    export default {
        name: 'footer-input',
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
                    return this.error = "Введите правильный e-mail<br/>(например, anna@gmail.com)";
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

    .footer-input {
        width: 290px;
        margin-top: 15px;
        font-size: 14px;
        color: $taupe-color;

        &__email {
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: left;
            padding-left: 16px;

            border: 1px solid #b3b3b3;

            input {
                &::placeholder {
                    color: $zarina-grey-color;
                }
            }
        }

        &__btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 46px;
            height: 46px;
            padding: 0;
            background-color: $black-color;
            border-radius: 0;
            color: #fff;
            font-size: 22px;

            &:hover {
                background-color: $taupe-color;
            }
        }

        &__checkbox {
            .v-input--selection-controls {
                margin-top: 8px;
            }

            .v-icon.primary--text {
                opacity: 0.7;
                color: #000 !important;
            }

            .v-label {
                font-weight: 400;
                font-size: 12px;
                line-height: 17px;
                color: $zarina-grey-color;
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
