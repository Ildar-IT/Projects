<template>
	<div class="login layout-top pt-8">
		<div v-if="withValidHash" class="login__with-hash">
			<h1>Добро пожаловать!</h1>
			<p>Ваш QR-код будет готов к работе после простой регистрации.</p>
		</div>
		<template v-else>
			<h1>Авторизация</h1>
		</template>
		<div class="margin-top-main">
			<div class="login-phone block-max-width">
				<v-form @submit.prevent="submit" @keyup.native.enter="submit">
					<!-- <v-text-field-simplemask class="margin-bottom-main body-1 gray-text"
											 @submit.prevent="submit" @keyup.native.enter="submit"
											 label="Ваш номер телефона"
											 v-model="loginPhone"
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
					/> -->
					<v-text-field
							class="mb-8 body-1 gray-text"
							label="Ваш телефон или email"
							hide-details="auto"
							v-model="loginInput"
					/>

					<!--          <div class="margin-bottom-main body-1 gray-text">-->
					<div class="flex-center">

						<!--<div class="flex-center">
							<v-btn :disabled="isSmsCounter" small class="secondary margin-bottom-small" id="login-code__btn"
								   @click="resend">
								<span>{{ isSmsCounter ? "Повторить отпрачерез "+timeout+" сек." : "Повторить код" }}</span>
							</v-btn>
						</div>-->

						<transition name='route' mode="out-in">
							<div v-if="smsRetryTimeout>0" class="margin-bottom-small gray-text text-center">
								Получить новый код можно через<br/>
								<span>{{smsRetryTimeout}}</span> {{secondTitle}}
							</div>
							<v-btn :disabled="loading" v-else type="submit" block large
								   class="primary margin-bottom-small">
								<pulse-loader v-if="loading" :loading="true" color="#fff" size="5px"/>
								<span v-else class="d-flex">
									<svgicon name="smartphone" :fill="false" color="white" height="20" class="mr-5"/>
                                	{{withValidHash ? "Регистрация" : "Получить код"}}
								</span>
							</v-btn>
						</transition>

					</div>
				</v-form>

			</div>
		</div>

		<div class="text-center">
			<a class="body-2 text-center"
			   href="https://qr-feedback.ru/policy"
			   target="_blank">
               <span class="login__link">
                   Политика обработки персональных данных
               </span>
			</a>
		</div>

		<!--  Error message  -->

		<v-dialog
				v-model="isError"
				overlay-opacity="0.5"
				overlay-color="#8189A8"
				max-width="500"
		>
			<card>
				<div class="d-flex flex-column pa-md-8">
					<div class="mb-8 d-flex align-center justify-center">
						<img src="@/assets/Warning.png"/>
					</div>
					<div class="body-1 mb-8 text-center">
						{{error && error.message ? error.message : `Что-то пошло не так... К сожалению, не получилось
						авторизоваться. Пожалуйста,
						попробуйте ещё раз.`}}<br/>
						<i v-if="error && error.detail">{{ error.detail }}</i>
					</div>
					<div class="d-flex flex-column align-center block-max-width">
						<v-btn block class="primary mb-4" @click="error = null">Попробовать еще раз...</v-btn>
					</div>
				</div>
			</card>

		</v-dialog>
	</div>
</template>

<script>
    import Config from '@/config';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import {end} from "@/utils/string";

    export default {
        name: "login",
        components: {PulseLoader},
        data: () => ({
            error: null,
            loginInput: '',
            form: {
                login: '',
                hash: '',
            },
            smsRetryInterval: null,
            smsRetryTimeout: 0,
            loading: false,
            alreadySent: false,
        }),
        computed: {
            page() {
                // return this.$store.state.page.AuthController;
            },
            isError() {
                return !!this.error;
            },
            hash() {
                if (this.$route.query && this.$route.query.hash)
                    return this.$route.query.hash;
                return '';
            },
            withValidHash() {
                return !!this.hash && this.hash.match(/^[\w\d_-]{8}$/);
            },
            secondTitle() {
                return end(this.smsRetryTimeout, 'секунду', 'секунды', 'секунд')
            },
        },
        methods: {
            submit() {
                if (this.smsRetryTimeout) return;
                if (this.alreadySent) return;
                // проверить что пользователь ввел коррекрные данные, почту или телефон                
                //console.log("this.form.phone", this.form.phone , this.loginInput)
                if ("RegExp", RegExp(/^[\+]?[0-9]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/).test(this.loginInput.trim())) {
                    // привести телефон к нужному виду
                    this.form.login = this.loginInput.replace(/\D/g, '').trim();
                    if (this.form.login.startsWith("7")) {
                        this.form.login = "+" + this.form.login;
                    } else if (this.form.login.startsWith(8)) {
                        this.form.login = "+7" + this.form.login.slice(1);
                    } else if (this.form.login.startsWith(9)) {
                        this.form.login = "+7" + this.form.login;
                    }
                } else if (RegExp(/.+@.+.\.+./).test(this.loginInput)) {
                    this.form.login = this.loginInput.trim();
                } else {
                    this.error = {
                        title: "Проверьте ввод",
                        message: "Пожалуйста, укажите корректный номер телефона или адрес электронной почты."
                    };
                    return;
                }

                this.loading = true;
                this.form.hash = this.hash;
                this.alreadySent = true;
                this.$store.dispatch('post', {
                    action: 'AuthController',
                    params: this.form
                }).then((res) => {
                    const email = res.session.email;
                    // сохраняем время последней отправки SMS
                    this.$store.state.lastAuthSMSSentAt = new Date();
                    // идем на проверку кода
                    this.$router.push({
                        name: "login-code", query: {
                            p: window.btoa(String(this.loginInput)),
                            hash: this.hash,
                            email: email
                        }
                    });
                }).catch((error) => {
                    this.error = error ? error : 'Что-то пошло не так...';
                    this.alreadySent = false;
                }).finally(() => {
                    this.loading = false;
                });
            },

            logInVk() {
            },
            logInGmail() {
            },
        },
        created() {
            if (this.$route.query && this.$route.query.p)
                this.loginPhone = window.atob(this.$route.query.p);

            if (this.$store.state.lastAuthSMSSentAt) {
                let countDown = () => {
                    let now = new Date();
                    this.smsRetryTimeout = Config.SMS_RETRY_TIMEOUT - Math.floor((now.valueOf() - this.$store.state.lastAuthSMSSentAt.valueOf()) / 1000);
                    if (this.smsRetryTimeout < 0) {
                        this.smsRetryTimeout = 0;
                        clearInterval(this.smsRetryInterval);
                    }

                };
                countDown();
                this.smsRetryInterval = setInterval(() => countDown(), 500);
            }
        },
        beforeDestroy() {
            clearInterval(this.smsRetryInterval);
        }
    }
</script>

<style lang="scss">
	.login {
		&__link {
			@include transition();
			color: $gray;

			&:hover {
				color: $primary;
			}
		}

		&__with-hash {
			h1 {
				margin: 0 0 20px 0;
			}

			p {
				text-align: center;
			}
		}

		&-phone {
			&__social {
				display: flex;
				justify-content: space-between;
				max-width: 300px;
				margin-right: auto;
				margin-left: auto;
			}
		}
	}
</style>