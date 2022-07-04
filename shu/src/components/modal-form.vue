<template>
    <div v-if="isOpen" class="modal-form__shadow" @click.self="$emit('close')">
        <v-form class="modal-form"
                @submit.prevent="submit"
                ref="questionForm">
            <h3 class="modal-form__title">{{ texts.formHead }}</h3>
            <div class="modal-form__content">

                <v-text-field class="input"
                              v-model="form.name"
                              :rules="validationRules.name"
                              type="text"
                              :placeholder="texts.formInput1">
                </v-text-field>

                <v-text-field class="input"
                              v-model="form.contact"
                              :rules="validationRules.contact"
                              type="text"
                              :placeholder="texts.formInput2">
                </v-text-field>

                <label>
                    <textarea class="mt-8"
                        v-model="form.text"
                        type="text">
                    </textarea>
                </label>

                <label class="custom-checkbox d-flex">
                    <input v-model="form.agree"
                           type="checkbox" class="mb-8" width="auto">
                    <span v-html="texts.formArgee"/>
                </label>

                <p v-if="error" class="mt-3 mb-0 join__error" v-html="error"></p>

            </div>
            <button type="submit">
                <switch-button v-html="texts.formSend"/>
            </button>
            <subscription-confirmation v-if="isSubscribed"/>
        </v-form>
    </div>
</template>

<style lang="scss">
.modal-form__shadow {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.39);
    z-index: 10;
}

.modal-form {
    background-image: url("~@/assets/bg/bg-lg.jpg");
    background-size: cover;
    border-radius: 32px;
    padding: 32px;
    max-width: 541px;
    width: 100%;
    position: absolute;
    top: 83%;
    left: 50%;
    transform: translate(-50%, -50%);
    @include up($md) {
        padding: 64px;
    }


    &__title {
        font-size: 48px;
        line-height: 53px;
        text-align: center;
        margin-bottom: 16px;
        @include up($md) {
            margin-bottom: 32px;
        }
    }

    &__content {
        margin-bottom: 20px;

        a {
            color: $primary500 !important;
        }
    }

    & .v-input input {
        max-height: 50px;
    }

    & .v-text-field input {
        padding: 13px;
        background-color: $additional100;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.06);
        border-radius: 999px;
        width: 100%;
        margin-bottom: 16px;
        @include up($md) {
            margin-bottom: 15px;
        }
    }

    & .v-text-field > .v-input__control > .v-input__slot:before {
        //bottom: 15px;
    }
    & .v-input__slot {
        //margin-bottom: 0;
    }

    & textarea {
        padding: 13px;
        background-color: $additional100;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.06);
        border-radius: 999px;
        width: 100%;
        margin-bottom: 16px;
        @include up($md) {
            margin-bottom: 32px;
        }

    }

    & textarea {
        height: 100px;
        border-radius: 32px;
        @include up($md) {
            height: 161px;
        }
    }

    &__submit {
        padding: 64px;
        background-image: url("~@/assets/bg/bg-lg.jpg");
        background-size: cover;
        border-radius: 32px;
        max-width: 541px;
        position: absolute;
        top: 83%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        line-height: 23px;
    }
}

.custom-checkbox > span {
    display: flex;
    align-items: baseline;
    text-align: left;
}

.custom-checkbox > span::before {
    margin-right: 16px;
}
</style>

<script>
import SwitchButton from "./switch-button";
import SubscriptionConfirmation from "./subscription-confirmation";

export default {
    name: "ModalForm",
    components: {SubscriptionConfirmation, SwitchButton},
    props: {
        isOpen: {
            type: Boolean,
            default: true,
        },
    },
    emits: {
        close: null,
        isOpen: null,
    },
    data() {
        return {
            isSubscribed: false,

            validationRules: {
                name: [
                    v => v.length >= 2 ? true : 'Слишком короткое имя',
                    v => RegExp(/^[a-zA-Zа-яА-Я]/g).test(v) ? true : 'Имя может содержать только буквы',
                ],
                contact: [
                    v => (/.+@.+\.+[a-zA-Z]{2,}/.test(v) || !!(/\+7|7|8 \d{10}/).test(v)) ? true : "Неверный телефон или email",
                ],
            },

            form: {
                name: "",
                contact: "",
                agree: null,
                text: "",
            },
            error: "",
        }
    },
    computed: {
        texts() {
            return {
                formHead: this.$store.state.page.AboutController.texts?.FORM_HEAD,
                formInput1: this.$store.state.page.AboutController.texts?.FORM_INPUT1,
                formInput2: this.$store.state.page.AboutController.texts?.FORM_INPUT2,
                formArgee: this.$store.state.page.AboutController.texts?.FORM_AGREEMENT,
                formSend: this.$store.state.page.AboutController.texts?.FORM_SUBMIT,

            }
        },
    },
    methods: {

        validate() {
            return this.$refs.questionForm.validate();
        },
        reset() {
            this.$refs.questionForm.reset();
        },

        submit() {

            if (!this.validate() && this.form.agree) return;
            this.$store.dispatch('post', {
                action: 'CallRequestController',
                params: {'name': this.form.name, 'phoneoremail': this.form.contact, 'agree': this.form.agree, 'text': this.form.text}
            }).then((response) => {
                console.log('Hello!')
            }).catch((error) => {
                console.log('error', error);
                this.requestStatus = 'error';
            }).finally(() => {
                setTimeout(() => {
                    this.requestStatus = null;
                }, 5000)
            })


            /*const reName = (/^.{2,}$/);
            if (!reName.test(String(this.form.name).toLowerCase())) {
                return this.error = "Пожалуйста, введите Ваше имя";
            }

            //todo validate tel
            if (!reName.test(String(this.form.contact).toLowerCase())) {
                return this.error = "Пожалуйста, введите номер телефона или email";
            }

            if (!reName.test(String(this.form.text).toLowerCase())) {
                return this.error = "Пожалуйста, введите текст сообщения";
            }

            if (!this.form.agree) return this.error = "Необходимо принять пользовательское соглашение";


            this.$store.dispatch('post', {
                action: 'CallRequestController',
                params: {'name': this.form.name, 'phoneoremail': this.form.contact, 'formtext': this.form.text}
            }).then(() => {
                this.$router.push({name: 'About'});
            }).catch((error) => {
                console.log('error', error);
                this.error = 'Всё плохо!';
            })*/
        }
    }
}
</script>