<template>
	<div class="login layout-top pt-8">
		<div v-if="withValidHash" class="login__with-hash">
			<h1>Подтверждение авториза<span :title="smsCodeDebug">ции</span></h1>
			<p>{{codeOriginLabel}} для завершения регистрации.</p>
		</div>
		<template v-else>
			<h1>Введите код</h1>
		</template>
		<div class="margin-top-main">
			<div class="login-code block-max-width">
				<v-form ref="form" @submit.prevent="submit">
					<v-text-field class="margin-bottom-main"
								  :label="codeOriginLabel"
								  hide-details="auto"
								  v-model="form.smsCode"
								  maxlength="8"
								  :rules="smsCodeRules"
					/>
				</v-form>

				<div class="flex-center">
					<v-btn block large class="primary mb-8" @click="submit">
						<pulse-loader v-if="loading" :loading="true" color="#fff" size="5px"/>
						<span v-else class="d-flex">
                            <svgicon name="log-in" :fill="false" color="white" height="20" class="mr-5"/>
                        	{{withValidHash ? "Регистрация" : "Войти"}}
						</span>
					</v-btn>
				</div>

				<div class="flex-center">
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
		<!--        <router-link :to="{name: 'privacy'}" target= '_blank'>-->
		<!--            <div class="body-2 gray-text text-center">-->
		<!--                Политика обработки персональных данных-->
		<!--            </div>-->
		<!--        </router-link>-->
		<div class="text-center gray-text">
			<a class="body-2  text-center"
			   href="https://qr-feedback.ru/policy"
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
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

    export default {
        name: "login-code",
        components: {PulseLoader},
        data: (() => {
            return {
                error: null,
                loading: false,
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
                this.loading = true;
                this.form.hash = this.hash;
                if (!this.email) {
                    this.$store.dispatch('post', {
                        action: 'AuthSMSCodeController',
                        params: this.form
                    }).then(() => {
                        let query = {};
                        if (this.withValidHash) query['welcome'] = true;
                        // if (this.$router.name==='login-code')
                        this.$router.push({name: 'dashboard', query});
                    }).catch((error) => {
                        this.error = error ? error : 'Всё плохо!';
                    })
                    // заходят по почте
                } else {
                    const emailCode = this.form.smsCode;
                    this.$store.dispatch('post', {
                        action: 'AuthEmailCodeController',
                        params: {hash: this.form.hash, emailCode: emailCode}
                    }).then(() => {
                        let query = {};
                        if (this.withValidHash) query['welcome'] = true;
                        // if (this.$router.name==='login-code')
                        this.$router.push({name: 'dashboard', query});
                    }).catch((error) => {
                        this.error = error ? error : 'Всё плохо!';
                        this.loading = false;	// специально, не в finally, чтобы пульсировал доупора, пока не загрузится Дашбоард
                    });
                }
            },
        },
    }
</script>

<style lang="scss">
	.login {
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
