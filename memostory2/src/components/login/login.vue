<template>
	<div class="login mx-auto layout-top px-4 margin-bottom-main padding-bottom-main">

		<h2 class="text-center padding-bottom-main beige-text px-3 px-lg-0 ">
			{{pageTitle}}
		</h2>

		<v-row>
			<v-col cols="12" md="6" class="mx-auto login__form-wrapper">
				<v-card class="mx-auto card-light padding-left-main pt-7 pt-md-12 padding-right-main padding-bottom-main d-flex flex-column"
				        elevation="0">
					<v-card-actions class="pa-0">
						<v-form class="mx-auto text-center" @submit.prevent="submit" @keyup.native.enter="submit">
							<!--                Contact  -->
							<v-text-field :placeholder="placeHolders.contact" class="text-center"
							              single-line
							              :rules="loginRules"
							              v-model="form.login"
							              maxlength="128"
							>

							</v-text-field>

<!--							<vue-tel-input-vuetify-->
<!--									v-model="form.login"-->
<!--									:placeholder="placeHolders.contact"-->
<!--									label=""-->
<!--									:preferred-countries="['ru']"-->
<!--							>-->
<!--							</vue-tel-input-vuetify>-->

							<v-btn type="submit" class="mt-3 mx-auto flex align-center btn--secondary large mb-8 shadow btn-with-svg"
							       block
							       dark>
								<PulseLoader v-if="loading" :loading="true" color="#fff" size="5px"/>
								<span class="d-flex align-center" v-else> <svgicon name="smartphone" width="24" height="24" original :fill="false" color="white" class="mr-4"></svgicon>{{placeHolders.getCode  ? placeHolders.getCode : "Получить код"}}</span>
							</v-btn>
							<router-link to="/privacy-policy" target="_blank" class="body-2 hover-link_dark">
								{{ placeHolders.policy  }}
							</router-link>

						</v-form>

					</v-card-actions>
						<div class="d-flex  mx-auto form body-1 align-center margin-top-small">
							<div class="d-none d-sm-block">
								{{placeHolders.firstTime}}
							</div>
							<v-btn class="mx-auto ml-2 flex align-center elevation-0 small"
							@click="goToRegister">
								{{pageButtons.register}}
						</v-btn>
						</div>
				</v-card>
			</v-col>
		</v-row>

		<!--  Error message  -->
		<error-msg v-model="isError" ref="errorMsg" :error="this.error"/>
		<!--  Error message  -->
	</div>
</template>

<script>
	import errorMsg from '../elements/error-msg'
	import Config from '../../config'
	import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
	//import VueTelInputVuetify from "vue-tel-input-vuetify";

	export default {
		name: 'login',
		components: {errorMsg, PulseLoader},
		data() {
			return {
				error: null,
				dialog: false,
				// loginPhone: '',
				// loginEmail: '',
				loginRules: [
					v => (/.+@.+\.+[a-zA-Z]{2,}/.test(v) || !!(/\+7|7|8 \d{10}/).test(v)) ? true : this.validadtionError,
				],
				form: {
					login: '',
				},
				loading: false,
				smsRetryInterval: null,
				smsRetryTimeout: 0,
				phoneReg: RegExp(/^[\+]?[0-9]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/),
				/*  emailRules: [
					(v) => (v.length === 0 || /.+@.+\.+[a-zA-Z]{2,}/.test(v)) ? true : "Неверная почта"
				  ],*/
			}
		},
		computed: {
			validadtionError() {
				return this.$store.state.common.dialogs?.validationError || "Неверный телефон или email"
			},
			isWindowLG() {
				return this.$store.getters.isWindowLG;
			},
			isWindowXS() {
				return this.$store.getters.isWindowXS;
			},
			isError() {
				return this.$store.state.isError;
			},
			secondTitle() {
				return end(this.smsRetryTimeout, 'секунду', 'секунды', 'секунд')
			},
			commonText() {
				return this.$store.state.common.textsCommon;
			},
			pageTitle() {
				return this.commonText.find(el => el.CODE == "AUTH_TITLE").PREVIEW_TEXT
			},
			pageButtons() {
				return this.$store.state.common.buttons || {};
			},
			buttonContent() {
				return this.pageButtons?.callback ? this.pageButtons?.callback : 'Свяжитесь со мной'
			},
			placeHolders() {
				return this.$store.state.common.formPlaceholders || {};
			},
			dialogs() {
				return this.$store.state.common.dialogs || {};
			},
		},
		methods: {
			goToRegister() {
				this.$router.push({name: 'registration'});
			},
			validate() {
				return this.$refs.questionForm.validate();
			},
			reset() {
				this.$refs.questionForm.reset();
			},
			submit() {
				// this.$router.push({name: "login-code"})
				if (this.smsRetryTimeout) return;
				if (!this.form.login) {
					this.error = {
						title: this.dialogs?.checkInfo ? this.dialogs.checkInfo : "Проверьте ввод",
						text: this.dialogs?.enterPhone ? this.dialogs.enterValid : "Пожалуйста, введите Ваш номер телефона или емейл, для продолжения."
					}
				}
				// if (!this.validate()) console.log(!this.validate()); return;
				console.log("Validation 1  ", this.phoneReg.test(this.form.login.trim()));
				if (this.phoneReg.test(this.form.login.replace(/[\s\-\(\)]/g, '')) || RegExp(/.+@.+\.+[a-zA-Z]{2,}/).test(this.form.login)) {
					if (this.phoneReg.test(this.form.login.trim())) {
						this.form.login = this.form.login.trim();
						if (this.form.login.startsWith(9)) {
							this.form.login = "+7" + this.form.login
						}
						//на беке будем смотреть
						/* if(this.form.login.startsWith("7")) {
							   this.form.login = "+" + this.form.login
							} else if ( this.form.login.startsWith(8)) {
							  this.form.login = "+7" + this.form.login.slice(1)
							} else if ( this.form.login.startsWith(9)) {
							  this.form.login = "+7" + this.form.login
							}*/

					}

					this.form.login=this.form.login.trim();
					console.log("We are going to AuthController")
					this.loading = true
					this.$store.dispatch('post', {
						action: 'AuthController',
						params: this.form
					}).then((res) => {
						// сохраняем время последней отправки SMS
						this.$store.state.lastAuthSMSSentAt = new Date();
						const email = res.session.email;
						this.loading = false;
						// идем на проверку кода
						this.$router.push({
							name: "login-code", query: {
								p: window.btoa(String(this.loginPhone)),
								hash: this.form.hash,
								email: email
							}
						});

					}).catch((error) => {
						console.log("AuthController error", typeof error, error);
						this.$store.state.isError = true;
						this.loading = false;
						this.error = {
							title: this.dialogs?.smthWentWrong ? this.dialogs.smthWentWrong : "Что-то пошло не так",
							text: error.error ? error.error : this.dialogs?.tryAgain ? this.dialogs.tryAgain : "Пожалуйста, попробуйте еще раз."
						}
					});
				} else {
					console.log('error')
					this.$store.state.isError = true;
					this.error = {
						title: this.dialogs?.checkInfo ? this.dialogs.checkInfo : "Проверьте ввод",
						text: this.dialogs?.enterValid ? this.dialogs.enterValid : "Пожалуйста, укажите корректный номер телефона или электронной почты."
					}
				}
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
		position: relative;
		height: 100%;
		max-width: 900px;
		padding-top: 66px;
		@include up($lg) {
			padding-top: 64px;
		}

		form, .form {
			max-width: 264px;
			width: 100%;

			a {
				color: $grey1;
			}
		}

		.v-text-field {
			input {
                color: $grey1 !important;
				font-size: 18px;
				line-height: 23px;
				text-align: center;

				&::placeholder {
                    color: $grey3 !important;
					color: inherit;
					opacity: 1;
					text-align: center;
				}
			}
		}

		/*  .v-input__append-inner {
			display: none !important;
		  }*/
	}

	.v-text-field > .v-input__control > .v-input__slot::before {
		border: 1px solid $grey3;
		background: $grey2;
		opacity: .5;
	}

	.v-text-field > .v-input__control > .v-input__slot::after {
		background: $beige5;
	}

	.theme--light.v-text-field:not(.v-input--has-state):hover > .v-input__control > .v-input__slot::before {
		border-color: $grey3;
	}

	.v-input__append-inner {
		//display: none !important;
	}

	.wrapper {
		width: 264px;
		margin: 0 auto 6px;
	}
</style>
