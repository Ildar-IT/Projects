<template>
    <div class="settings layout-top">
        <h1 class="text-center margin-bottom-main">
            Настройка
        </h1>

        <div class="flex flex-column align-center justify-center margin-bottom-main">
            <template v-if="imagePreview">
                <!--				<div class="settings__logo__image__wrap" :style="settingsLogoImage">-->
                <div class="settings__logo__image" ref="settingsLogoImage" id="settingsLogoImage"
                     :style="{ 'backgroundImage': 'url(' + imagePreview + ')' }">
                </div>
                <!--				</div>-->

                <!--				<v-img class="settings__logo__image"-->
                <!--						:src="imagePreview" contain-->
                <!--						max-width="500"-->
                <!--						max-height="300"-->
                <!--				/>-->

                <input @change="onLogoFileChange" class="settings__logo__input"
                       name="file" type="file" ref="fileInput"
                       accept=".jpg, .jpeg, .png, .gif">

                <div class="flex mt-3 settings__delete" @click="deleteImageModal()">
					<span class="mr-3 ">
						Удалить лого
					</span>
                    <svgicon name="trash_full" class="" :fill="false"
                             width="24" height="24"
                    />
                </div>

            </template>
            <div v-else class="settings__logo">
                <div class="settings__logo__text">
                    <div class="text-center">
                        <svgicon class="" name="upload" :fill="false" width="32" height="32" color="#B145F3"/>
                    </div>
                    <div class="text-center">
                        Загрузите ваш логотип
                    </div>
                </div>

                <input @change="onLogoFileChange" class="settings__logo__input"
                       name="file" type="file" ref="fileInput"
                       accept=".jpg, .jpeg, .png, .gif">
            </div>
        </div>

        <div class="margin-bottom-main">
            <v-form>
                <v-row>
                    <v-col cols="12" md="4">
                        <div :class="isWindowXS?'':'block-max-width'">
                            <v-text-field
                                    class="margin-bottom-main"

                                    label="Название компании"
                                    hide-details="auto"
                                    v-model="user.WORK_COMPANY"
                            />
                        </div>
                    </v-col>
                    <v-col cols="12" md="4">
                        <div :class="isWindowXS?'':'block-max-width'">
                            <v-text-field
                                    class="margin-bottom-main"
                                    label="Адрес эл. почты"
                                    hide-details="auto"
                                    v-model="user.EMAIL"
                                    :rules="emailRules"
                                    placeholder="user@mail.ru"
                            />
                        </div>
                    </v-col>
                    <v-col cols="12" md="4">
                        <div :class="isWindowXS?'':'block-max-width'">
                            <v-text-field-simplemask
                                    class="margin-bottom-main body-1 gray-text"
                                    label="Номер телефона"
                                    v-model="phone"
                                    :properties="{
			                        prefix: '+7',
			                        placeholder: '999 999-9999',
			                        'hide-details': 'auto'
			                        }"
                                    :options="{
			                        inputMask: '### ###-####',
			                        outputMask: '##########',
			                        empty: null,
			                        applyAfter: false,
			                        numeric: true,
			                        lowerCase: false,
	                            }"
                            />
                        </div>
                    </v-col>
                </v-row>

                <div class="settings__socials margin-bottom-main">
                    <h4 class="margin-bottom-main text-center gray-text">Ссылки на соцсети</h4>
                    <div class="margin-bottom-small margin-top-small"
                         :class="isWindowXS?'':'block-max-width'">
                        <v-text-field
                                label="Зазывающий загловок"
                                placeholder="Узнайте о нас больше"
                                hide-details="auto"
                                v-model="user.UF_SOCIALS_TITLE"
                        />
                    </div>
                    <div v-for="(item, index) of socials" :key="'socials_'+index"
                         class="pt-5 mb-1"
                         :class="isWindowXS?'':'block-max-width'">

                        <v-text-field
                                :label="item.label"
                                hide-details="auto"
                                :prepend-icon="item.icon"
                                v-model="user.UF_SOCIALS[item.name]"
                                @change="whatsappLinkFormatter(item.label)"
                        >
                            <template v-slot:prepend>
                                <svgicon :name="item.icon" width="32" height="32" color="#b3b8cb"/>
                            </template>
                        </v-text-field>
                    </div>
                </div>

                <!-- Error message modal window   -->
                <v-dialog                
                        v-model="isError"
                        persistent
                        class="poll-page-new__dialog"
                        overlay-opacity="0.5"
                        overlay-color="#8189A8"
                        max-width="500"
                >
                    <v-card v-if="error">
                      <div class="d-flex flex-column pa-md-12">
                        <v-card-title>
                            <span>{{ error.title ? error.title : "Что-то пошло не так..." }}</span>
                            <v-spacer></v-spacer>
                        </v-card-title>
                        <v-card-text>
                            {{
                            error.message ? error.message :
                            "К сожалению, сейчас не получилось принять ваш ответ. Пожалуйста, попробуйте ещё раз."
                            }}<br/>
                            <i v-if="error.detail">{{ error.detail }}</i>
                        </v-card-text>
                        <div class="d-flex flex-column align-center block-max-width">
                            <v-btn class="primary"  @click="error = null" >
                                Ок
                            </v-btn>
                        </div>
                        </div>
                    </v-card>
                </v-dialog>
            </v-form>

            <div class="flex justify-center">
                <v-btn :block="isWindowXS" class="primary box-shadow-primary" @click="save">
                    <svgicon name="save" width="24" height="24" color="white" class="mr-2" :fill="false"/>
                    <span>Сохранить</span>
                </v-btn>
            </div>
            <div class="d-flex justify-center margin-top-small">
                <v-btn :block="isWindowXS" text  class="v-btn--flat v-btn--text v-size--large primary--text ml-0" @click="deleteUserDialog">
                    <svgicon name="trash" width="24" height="24" color="#b3b8cb" class="mr-2" :fill="false"/>
                    <span class="gray-text">Удалить пользователя</span>
                </v-btn>
            </div>
        </div>

        <transition name="fade" mode="out-in">
            <div v-if="requestStatus" class="settings__alert">
                <v-alert
                        dense v-html="message"
                        :type="requestStatus"
                >

                </v-alert>
            </div>
        </transition>

        <v-dialog
            v-model="dialogDelFile"
            persistent class="settings__dialog"
            overlay-opacity="0.5"
            overlay-color="#8189A8"
            max-width="500px"
        >
            <v-card>
             <div class="d-flex flex-column pa-md-12">
              <div class="mb-8 d-flex align-center justify-center">
                    <img src="@/assets/Question.png" >
                </div>
                <div class="headline text-center pb-8">
                    Вы уверены, что хотите удалить логотип?
                </div>
                <div class="d-flex flex-column align-center block-max-width">
                    <v-btn block class="primary mb-4" text @click="deleteImage" >
                        Да
                    </v-btn>
                     <v-btn class=" v-btn--flat v-btn--text v-size--large primary--text ml-0" @click="closeDialogDelFile" >
                        Нет
                      </v-btn>
                </div>
              </div>
            </v-card>
        </v-dialog>

        <!--        deleteUserDialog-->
        <v-dialog
                v-model="dialogDelUser"
                persistent class="settings__dialog"
                overlay-opacity="0.5"
                overlay-color="#8189A8"
                max-width="500px"
        >
            <v-card>
                <div class="d-flex flex-column pa-md-12">
                    <div class="mb-8 d-flex align-center justify-center">
                        <img src="@/assets/Question.png" >
                    </div>
                    <div class="headline text-center pb-8">
                        Вы уверены, что хотите удалить свой аккаунт?
                    </div>
                    <div class="d-flex flex-column align-center block-max-width">
                        <v-btn block class="primary mb-4" text @click="deleteUser" >
                            <pulse-loader v-if="loadingDelete" :loading="true" color="#fff" size="5px"/>
                            <span v-else class="d-flex" >
                            Да
                        </span>
                        </v-btn>
                        <v-btn class=" v-btn--flat v-btn--text v-size--large primary--text ml-0" @click="closeDialogDelUser" >
                            Нет
                        </v-btn>
                    </div>
                </div>
            </v-card>
        </v-dialog>

        <v-dialog
                v-model="dialogPhone"
                overlay-opacity="0.5"
                overlay-color="#8189A8"
                persistent class="settings__dialog"
                max-width="500" >
            <card v-if="checkSMSCode">
                <div class="headline text-center pb-8">
                    Введите код из SMS для смены номера телефона
                </div>
                <v-row>
                    <v-col cols="6" offset="3">
                        <v-form ref="form" @submit.prevent="sendAuthSMSCode">
                            <v-text-field class="margin-bottom-main"
                                          label="Код из SMS"
                                          hide-details="auto"
                                          v-model="smsCode"
                                          maxlength="8"
                                          :rules="smsCodeRules"
                            />
                        </v-form>
                    </v-col>
                </v-row>

                <v-card-actions class="flex flex-space-between">
                    <v-btn
                            color="green darken-1 px-24"
                            text
                            @click="closeDialogPhone"
                    >
                        Отмена
                    </v-btn>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="sendAuthSMSCode"
                    >
                        Подтвердить
                    </v-btn>
                </v-card-actions>
            </card>
            <card v-else>
                <div class="headline text-center pb-8">
                    Вы изменили номер телефона. Для продолжения потребуется пройти авторизацию с новым номером.
                </div>
                <v-card-actions class="flex flex-space-between">

                    <v-btn
                            color="green darken-1 px-24"
                            text
                            @click="closeDialogPhone"
                    >
                        Отмена
                    </v-btn>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="sendAuthSMS"
                    >
                        Ок, давайте
                    </v-btn>
                </v-card-actions>
            </card>
        </v-dialog>
    </div>
</template>

<script>
    import axios from 'axios';
    import config from '@/config';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    export default {
        name: "settings",
        data: () => ({
            file: null,
            imagePreview: null,
            error: null,
            emailRules: [
                v => RegExp(/^$|^.+@.+.\.+..*$/).test(v) || ''
            ],
            requestStatus: null,
            message: null,
            dialogDelFile: false,
            dialogPhone: false,
            loadingDelete: false,
            dialogDelUser: false,
            imageSize: {},
            tmpPhone: '',
            smsCode: '',
            smsCodeRules: [
                v => RegExp(/\d{6}/).test(v),
            ],
            checkSMSCode: false
        }),
        components: { PulseLoader },
        watch: {
            logo() {
                console.log(this.logo)
            },
            file() {
                console.log(this.file)
            }
        },
        computed: {
            settingsLogoImage() {
                this.setSettingsLogoImage();
                if (this.imageSize)
                    return {
                        'width': this.imageSize.width + 'px',
                        'height': this.imageSize.height + 'px',
                    }
            },
            isWindowXS() {
                return this.$store.getters.isWindowXS;
            },
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
            isError() {
                return !!this.error;
            },
            page() {
                return this.$store.state.page.SettingsController
            },
            user() {
                let user = this.$store.state.session.user;
                if (!user.UF_SOCIALS || typeof user.UF_SOCIALS !== "object") user.UF_SOCIALS = {};
               
                return user;
            },
            phone: {
                get() {
                    if (!this.user.PHONE_NUMBER) return "";
                    return this.user.PHONE_NUMBER.replace(/^\+7(\d+)$/, '$1');
                },
                set(value) {   
                  value ?  this.user.PHONE_NUMBER = "+7" + value : this.user.PHONE_NUMBER = ""
                  }            
                
            },
            socials() {
                return [
                    {
                        label: "ВКонтакте",
                        name: "vkontakte",
                        icon: "mdi-vk",
                    },
                    {
                        label: "Facebook",
                        name: "facebook",
                        icon: "mdi-facebook",
                    },
                    {
                        label: "Instagram",
                        name: "instagram",
                        icon: "mdi-instagram",
                    },
                    {
                        label: "Telegram",
                        name: "telegram",
                        icon: "telegram",
                    },
                    {
                        label: "Whatsapp",
                        name: "whatsapp",
                        icon: "whatsapp",
                    },
                    {
                        label: "Twitter",
                        name: "twitter",
                        icon: "mdi-twitter",
                    },
                    {
                        label: "Youtube",
                        name: "youtube",
                        icon: "mdi-youtube",
                    },
                    {
                        label: "Ваш сайт",
                        name: "site",
                        icon: "site",
                    }
                ]
            }
        },
        methods: {
            whatsappLinkFormatter(label) {                
                if(label === "Whatsapp") {
                    if ((RegExp(/^[\+]?[0-9]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/).test(this.user.UF_SOCIALS.whatsapp))) { // если пользователь ввел нормальный номер телефона, то делаем ссылку
                        let directLink = this.user.UF_SOCIALS.whatsapp.replace(/\D/g,'').trim(); 
                          if (directLink.startsWith(8)) {
                            directLink = "7" + directLink.slice(1) 
                            } else if (directLink.startsWith(9)) {
                            directLink = "7" + directLink
                            }
                        this.user.UF_SOCIALS.whatsapp = "https://wa.me/" + directLink;
                        console.log("Number ok", directLink )
                    } else if (this.user.UF_SOCIALS.whatsapp.includes("chat.whatsapp.com") || this.user.UF_SOCIALS.whatsapp.includes("wa.me/")) {
                        console.log("Valid whatsapp link")
                    } else {
                        this.requestStatus = 'error';
                        this.message = "Некорретная ссылка. Пожалуйста, введите либо номер телефона, либо ссылку в формате chat.whatsapp.com + код группы.";
                        setTimeout(() => {
                            this.requestStatus = null;
                            this.user.UF_SOCIALS.whatsapp = "";
                        }, 5000)
                    }
                }
            },
            setSettingsLogoImage() {

                let settingsLogoImage = document.getElementById('settingsLogoImage');
                // let settingsLogoImage = this.$refs.settingsLogoImage;
                if (settingsLogoImage) {
                    let rect = settingsLogoImage.getBoundingClientRect();
                    this.imageSize = {
                        width: rect.width,
                        height: rect.height
                    }
                }
                return this.imageSize

            },
            deleteImageModal() {
                this.dialogDelFile = true;
            },
            deleteUserDialog() {
                this.dialogDelUser = true;
            },
            deleteImage() {
                this.$store.dispatch('post', {
                    action: 'RemoveLogoController',
                }).then((res) => {
                    this.dialogDelFile = false;
                    this.imagePreview = null;
                }).catch((err) => {
                    console.log('err', err)
                })
            },
            closeDialogDelFile() {
                this.dialogDelFile = false;
            },
            closeDialogPhone() {
                this.dialogPhone = false;
            },
            sendAuthSMS() {
                this.$store.dispatch('post', {
                    action: 'SettingsAuthController',
                    params: {
                        phone: this.tmpPhone,
                    }
                }).then(() => {

                    // сохраняем время последней отправки SMS
                    this.$store.state.lastAuthSMSSentAt = new Date();

                    // идем на проверку кода
                    this.checkSMSCode = true;
                    /*this.$router.push({
                        name: "login-code", query: {
                            p: window.btoa(String(this.loginPhone)),
                            hash: this.form.hash,
                        }
                    });*/
                }).catch((error) => {
                    this.requestStatus = 'error';
                    this.message = 'Не получилось отправить SMS. Пожалуйста, попробуйте еще раз через некоторое время...';
                }).finally(() => {
                    setTimeout(() => {
                        this.requestStatus = null;
                    }, 5000);
                });
            },
            sendAuthSMSCode() {
                this.$store.dispatch('post', {
                    action: 'SettingAuthSMSCodeController',
                    params: this.form
                }).then(() => {
                    console.log("Yeah! Auth!");
                    let query = {};
                    if ( this.withValidHash ) query['welcome'] = true;
                    // if (this.$router.name==='login-code')
                    this.$router.push({name: 'dashboard', query});
                }).catch((error) => {
                    this.error = error ? error : 'Всё плохо!';
                })
            },
            uploadFile() {
                let formData = new FormData();
                formData.append('WORK_LOGO', this.file);
                let authToken = localStorage.getItem(config.STORAGE_AUTH_TOKEN);
                if (authToken) axios.defaults.headers.common['Authorization'] = authToken;
                axios.post('/api/SettingsController',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                )
                    .then(() => {
                        this.setSettingsLogoImage();
                    })
                    .catch(() => {
                    });
            },
            isValid(phone) {
                let valid 
                if (phone !== '' && phone !== null) {
                    valid = (RegExp(/^[\+]?[0-9]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/).test(phone.trim()))
                    if (!valid) {
                        this.requestStatus = 'error';
                        this.message = "Некорретный номер телефона. Пожалуйста, исправьте.";
                        setTimeout(() => {
                            this.requestStatus = null;
                        }, 5000)
                        return valid
                    }
                }
                if (this.user.EMAIL !== '' || this.user.EMAIL !== null) {
                    valid = RegExp(/^$|^.+@.+.\.+..*$/).test(this.user.EMAIL)
                    if (!valid) {
                        this.requestStatus = 'error';
                        this.message = 'Некорректно указана почта';
                        setTimeout(() => {
                            this.requestStatus = null;
                        }, 5000)
                        return valid
                    }
                }
                return valid
            },
            save() {
                // if (!RegExp(/^\+7[0-9]{10}$/).test(this.tmpPhone)) {
                //     this.requestStatus = "error";
                //     this.message = "Некорретный номер телефона. Пожалуйста, исправьте.";
                //     setTimeout(() => {
                //         this.requestStatus = null;
                //     }, 3000);
                //     return;
                // }
                if ((!!this.user.PHONE_NUMBER && this.isValid(this.user.PHONE_NUMBER)) || (this.user.EMAIL !== null && this.user.EMAIL !== '')) {                
                  if(!this.user.PHONE_NUMBER)   this.user.PHONE_NUMBER = ""; 
                  if(!this.user.EMAIL)  this.user.EMAIL = "";
                    
                console.log("New user Data", this.user)
               
                this.$store.dispatch('post', {
                    action: 'SettingsController',
                    params: this.user/*{
                        'EMAIL': this.user.EMAIL,
                        'NAME': this.user.NAME,
                        'PHONE_NUMBER': this.user.PHONE_NUMBER,
                        // 'WORK_LOGO': this.user.WORK_LOGO,
                    }*/
                }).then((response) => {
                    // TODO: валидировать новый номер! узнать как?!
                    /*if (this.tmpPhone !== this.user.PHONE_NUMBER) {
                        this.checkSMSCode = false;
                        this.dialogPhone = true;
                    } else {*/
                        this.requestStatus = 'success';
                        this.message = 'Настройки успешно сохранены!'
                    //}

                }).catch((error) => {
                    this.requestStatus = 'error';
                    if (error.error === "This email is used by another user")
                        this.message = '<div>Такой email уже зарегистрирован другим пользователем.</div>Пожалуйста, авторизуйтесь под этим email, чтобы использовать его.'
                    else if (error.error === "This phone is used by another user")
                        this.message = '<div>Такой номер телефона уже зарегистрирован другим пользователем.</div>Пожалуйста, авторизуйтесь под этим номером телефона, чтобы использовать его.'
                    else if (error === "Could not save: Указан некорректный номер телефона.")
                        this.message = '<div>Указан некорректный номер телефона.</div>'
                    else
                        this.message = 'Что-то пошло не так :( Попробуйте еще раз.'
                }).finally(() => {
                    setTimeout(() => {
                        this.requestStatus = null;
                    }, 5000);
                })
              
            } else {
                  this.requestStatus = 'error';
                  this.message = 'Пожалуйста, заполните почту и/или номер телефона';
                  setTimeout(() => {
                      this.requestStatus = null;
                  }, 5000)
              }
            },
            onLogoFileChange() {
                this.file = this.$refs.fileInput.files[0];
                if (this.file) {
                    // ставим картинку превью
                    let reader = new FileReader();
                    reader.addEventListener("load", function () {
                        this.imagePreview = reader.result;
                    }.bind(this), false);
                    if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
                        reader.readAsDataURL(this.file);
                    }

                    // аплоадим
                    this.uploadFile();
                }
            },
            closeDialogDelUser() {
                this.dialogDelUser = false;
            },
            deleteUser() {
                this.loadingDelete = true;
                this.$store.dispatch('post', {
                    action: 'UserDeleteController',
                }).then((res) => {
                    this.loadingDelete = false;
                    this.$router.push({name: 'login'})
                    this.$store.state.alert = {
                        type: "success",
                        text: "Пользователь успешно удалён",
                    }
                }).catch((err) => {
                    this.$store.state.alert = {
                        type: "error",
                        text: "Не удалось удалить пользователя, попробуйте позже",
                    }
                    this.loadingDelete = false;
                    console.log('UserDeleteController err', err)
                })
            },
        },
        mounted() {
            if (this.user.WORK_LOGO) this.imagePreview = this.user.WORK_LOGO;
            this.setSettingsLogoImage();
            this.tmpPhone = this.user.PHONE_NUMBER;
        }
    }
</script>

<style lang="scss">
    #account-app {
        .v-dialog {
            box-shadow: none;
        }

        .settings {
            &__dialog {
                box-shadow: none;
            }

            &__logo {
                border: 2px dashed $primary;
                box-sizing: border-box;
                max-width: 296px;
                width: 100%;
                height: 128px;
                border-radius: 32px;
                cursor: pointer;
                color: $primary;
                position: relative;

                &__input {
                    box-sizing: border-box;
                    max-width: 296px;
                    width: 100%;
                    height: 128px;
                    border-radius: 32px;
                    cursor: pointer;
                    opacity: 0;
                    z-index: 2;
                    position: absolute;
                }

                &__text {
                    max-width: 296px;
                    padding: 0 16px;
                    width: 100%;
                    height: 128px;
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }

                &__image {
                    border-radius: 32px;
                    max-width: 296px;
                    width: 100%;
                    height: 128px;
                    background-size: contain;
                    background-position: center;
                    background-origin: border-box;

                    &__wrap {
                        /*max-width: 100%;*/
                        height: 100%;
                        border-radius: 32px;
                        margin-right: auto;
                        margin-left: auto;
                        max-width: 296px;
                        width: 100%;
                        background-size: contain;
                        background-position: center;
                        background-origin: border-box;
                        background-color: red;
                    }
                }
            }

            &__alert {
                position: fixed;
                z-index: 220;   // needs to be over dialog's 202
                width: 100%;
                right: 0;
                top: 35%;
                display: flex;
                justify-content: center;
                justify-items: center;

                .v-sheet.v-alert:not(.v-sheet--outlined) {
                    box-shadow: $box-shadow;
                }

                .v-alert {
                    border-radius: 1000px;
                }
            }

            &__delete {
                @include transition();
                cursor: pointer;
                z-index: 5;

                &:hover {
                    color: $primary;
                }
            }

            /*&__socials {
                .v-input__icon .v-icon {
                    //color: $gray;
                }
            }*/
        }
    }
</style>