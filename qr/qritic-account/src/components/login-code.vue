<template>
	<div class="login">
		<div v-if="withValidHash" class="login__with-hash">
			<h1>Подтверждение авториза<span :title="smsCodeDebug">ции</span></h1>
			<p>{{codeOriginLabel}} для завершения регистрации.</p>
		</div>
		<template v-else>
			<h1>Авторизац<span :title="smsCodeDebug">ия</span></h1>
		</template>
		<div class="margin-top-main">
			<div class="login-code block-max-width">
				<v-form ref="form" @submit.prevent="submit">
					<v-text-field class="mb-8"
								  :label="codeOriginLabel"
								  hide-details="auto"
								  v-model="form.smsCode"
								  maxlength="8"
								  :rules="smsCodeRules"
					/>
				</v-form>

				<div class="flex-center">
					<v-btn block large class="primary" @click="submit">
						<svgicon name="log-in" :fill="false" color="white" height="20" class="mr-5"/>
						<span>{{withValidHash ? "Регистрация" : "Войти"}}</span>
					</v-btn>
				</div>

				<div class="mt-8 flex-center">
					<v-btn small class="secondary margin-bottom-small" id="login-code__btn"
						   @click="goBack">
						<span>Повторить код</span>
					</v-btn>
				</div>

				<!--<div class="flex-center">
					<v-btn small class="secondary margin-bottom-main" id="login-code-back__btn" @click="backToPhone">
						<span>Назад</span>
					</v-btn>
				</div>-->
			</div>
		</div>
		<!--        <router-link :to="{name: 'privacy'}" target= '_blank'>
					<div class="body-2 gray-text text-center">
						Политика обработки персональных данных
					</div>
				</router-link>-->
		<div class="text-center gray-text">
			<a class="body-2  text-center"
			   href="https://my.qritic.ru/policy"
			   target="_blank">
              <span class="login-code__link">
                  Политика обработки персональных данных
              </span>
			</a>
		</div>

		<!--  Error message    -->
		<v-dialog
				persistent
				overlay-opacity="0.5"
				overlay-color="#8189A8"
				v-model="isError"
				max-width="500px"
		>
			<v-card>
				<div class="d-flex flex-column pa-md-12">
					<div class="mb-8 d-flex align-center justify-center">
						<img src="@/assets/Warning.png"/>
					</div>
					<div class="h5 text-center pb-8">
						Неверный код
					</div>
					<div class="body-1 margin-bottom-small text-center">
						Попробуйте ещё раз.
					</div>
					<div class="d-flex flex-column align-center block-max-width">
						<v-btn block class="primary mb-4" @click="error = null">
							Ок
						</v-btn>
					</div>
				</div>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>

    export default {
        name: "login-code",
        components: {},
        data: (() => {
            return {
                error: null,
                smsCodeRules: [
                    v => RegExp(/\d{5}/).test(v),
                ],
                form: {
                    smsCode: '',
                    hash: '',
                }
            }
        }),
        computed: {
            smsCodeDebug() {
                return this.$store.state.response?.session?.codeDebug;
            },
            isError() {
                return !!this.error;
            },
            phoneCode() {
                if (this.$route.query && this.$route.query.p)
                    return this.$route.query.p;
                return '';
            },
            hash() {
                if (this.$route.query && this.$route.query.hash)
                    return this.$route.query.hash;
                return '';
            },
            email() {
                if (this.$route.query && this.$route.query.email)
                    return this.$route.query.email;
                return '';
            },
            withValidHash() {
                return !!this.hash && this.hash.match(/^[\w\d_-]{8}$/);
            },
            codeOriginLabel() {
                return !this.email ? "Введите код из SMS" : "Введите код из письма"
            }
        },
        methods: {
            goBack() {
                this.$router.push({
                    name: "login", query: {
                        p: this.phoneCode,
                        hash: this.hash,
                    }
                });
            },
            submit() {
                this.form.hash = this.hash;
                if (!this.email) {
                    this.$store.dispatch('post', {
                        action: 'AuthSMSCodeController',
                        params: this.form
                    }).then((res) => {
                        this.afterAuth(res);
                    }).catch((error) => {
                        this.error = error ? error : 'Всё плохо!';
                    })
                    // заходят по почте
                } else {
                    const emailCode = this.form.smsCode;
                    this.$store.dispatch('post', {
                        action: 'AuthEmailCodeController',
                        params: {hash: this.form.hash, emailCode: emailCode}
                    }).then((res) => {
                        this.afterAuth(res);
                    }).catch((error) => {
                        this.error = error ? error : 'Всё плохо!';
                    })
                }
            },
            afterAuth(res) {
                /*const tariffDefault = !res.session.user?.TARIFF ? true : res.session.user?.TARIFF?.IS_DEFAULT;

                if (tariffDefault) {
                    this.$router.push({name: 'suspended'});
                } else */
                if (res.session?.isFirstTime) {
                    let query = {};
                    if (this.withValidHash) query['welcome'] = true;
                    this.$router.push({name: 'polls', query});
                } else this.$router.push({name: 'dashboard'});
            }
        },
    }
</script>

<style lang="scss">
	.login {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

		&__with-hash {
			h1 {
				margin: 0 0 20px 0;
			}

			p {
				text-align: center;
			}
		}


		&-code {
			&__link {
				@include transition();
				color: $gray;
				font-size: 12px;
				white-space: nowrap;

				@include up($sm) {
					font-size: 16px;
				}

				&:hover {
					color: $primary;
				}
			}

			#login-code__btn {
				min-width: 296px;
				@include up($sm) {
					min-width: 296px;
					width: 296px;
				}
			}

			#login-code-back__btn {
				min-width: 296px;
				@include up($sm) {
					min-width: 296px;
					width: 296px;
				}
			}
		}
	}
</style>
