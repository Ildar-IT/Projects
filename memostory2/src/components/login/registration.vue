<template>
	<div class="registration mx-auto layout-top text-center px-4 pb-0 pb-lg-15">
		<h2 class="beige-text ">{{pageTitle}}</h2>
		<v-row>
			<v-col cols="12" lg="6" class="mx-auto pt-0">
				<v-card class="mx-auto card-light pa-lg-16 pa-8 margin-bottom-main" elevation="0">
					<v-card-actions class="pa-0 flex-column">
						<v-form class="mx-auto text-center" @submit.prevent="submit">
							<v-text-field v-model="NAME"
							              :placeholder="placeHolders.name ? placeHolders.name : 'Ваше Имя'"
							              class="text-center mb-8 mb-md-0 mt-0 pt-0"
							              hide-details="auto"
							              maxlength="64"/>
							<div class="d-flex flex-wrap flex-lg-nowrap flex-column flex-lg-row mt-8">
								<vue-tel-input-vuetify
										class=" mr-0 mr-lg-8"
										v-model="PHONE_NUMBER"
										:placeholder="placeHolders.enterPhone ? placeHolders.enterPhone : 'Введите телефон'"
										label=""
										:error="!isPhoneValid && PHONE_NUMBER.length>0"
										@validate="onValidate"
										:preferred-countries="['ru']"
								>
								</vue-tel-input-vuetify>

								<v-text-field v-model="EMAIL" placeholder="example@mail.ru" class="text-center"
								              hide-details="auto" maxlength="128" :rules="emailRules"/>
							</div>

							<v-col col="12" class="mb-md-5 mt-5 mt-lg-0 mx-auto px-0 pb-0 pb-md-3">
								<v-btn type="submit"
								       class="mx-auto btn--secondary large d-flex align-center btn-with-svg shadow"
								       block
								       dark>
									<span class="d-flex align-center">  {{ pageButtons.register ? pageButtons.register : 'Регистрация' }}</span>
								</v-btn>
							</v-col>

							<div class="body-2 hover-link_dark grey-text mb-0">
								<router-link to="/privacy-policy" target="_blank" v-if="isWindowMD">
									{{placeHolders.policy || 'Наша политика обработки персональных данных' }}
								</router-link>
							</div>

						</v-form>

					</v-card-actions>

					<div class="d-flex mx-auto justify-center form body-1 align-center margin-top-small">

							<div class="d-none d-sm-block">
								{{placeHolders.gotAnAccount}}
							</div>
							<v-btn class="ml-2 flex align-center elevation-0 small"
							       maxWidth="200"
							       @click="goToLogin">
								{{pageButtons.logIn}}
							</v-btn>

					</div>

				</v-card>
			</v-col>
		</v-row>
		<thank-you v-model="dialog" ref="thankYou" :message="message" :title="messageTitle"/>
		<!--  Error message  -->
		<error-msg v-model="isError" ref="errorMsg" :error="this.error"/>
		<!--  Error message  -->
	</div>
</template>

<script>
	import thankYou from "@/components/elements/thankYou";
	import errorMsg from '../elements/error-msg'
	import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
	import {mask} from "vue-the-mask";
	import Config from '../../config'

	export default {
		name: 'registration',
		directives: {mask},
		components: {thankYou, PulseLoader, errorMsg},
		data() {
			return {
				smsCode: null,
				loading: false,
				loadingLogout: false,
				dialog: false,
				error: null,
				isEmail: null, // будем ли валидовать новый email

				NAME: '',
				PHONE_NUMBER: '',
				EMAIL: '',

				isPhoneValid: false,

				emailReg: /^$|^.+@.+.\.+..*$/,
				nameReg: /^$|[a-zA-Zа-яА-Я]+$/g,
				phoneReg: /\d{3} \d{3} \d{2} \d{2}/,
				emailRules: [
					v => RegExp(this.emailReg).test(v) || v.length === 0 ? true : this.dialogs?.wrongEmail ? this.dialogs.wrongEmail : 'Неверная почта'
				],
				nameRules: [
					v => RegExp(this.nameReg).test(v) || this.dialogs?.invalidName ? this.dialogs.invalidName : 'Имя может содержать только буквы'
				],
				phoneRules: [
					v => !!(this.phoneReg).test(v) || v.length === 0 ? true : this.dialogs?.wrongPhone ? this.dialogs.wrongPhone : 'Неверный номер телефона'
				],
				smsCodeRules: [
					v => v.length < 5 ? this.validadtionErrors.short : true,
					v => RegExp(/[\d{5}]+/g).test(v) || this.validadtionErrors.wrong
				],
				smsCodeMask: "######",
				phoneMask: "+7 ### ### ## ##",
			}
		},
		computed: {
			validEmail() {
				return this.emailReg.test(this.EMAIL) || this.EMAIL?.length === 0
			},
			validName() {
				console.log("this.nameReg.test(this.form.NAME) ", this.nameReg.test(this.NAME));
				return this.nameReg.test(this.NAME);
			},
			isWindowLG() {
				return this.$store.getters.isWindowLG;
			},
			isWindowMD() {
				return this.$store.getters.isWindowMD;
			},
			isWindowXS() {
				return this.$store.getters.isWindowXS;
			},
			isError() {
				return this.$store.state.isError;
			},
			message() {
				return this.dialogs?.dataSaved ? this.dialogs.dataSaved : 'Ваши данные сохранены'
			},
			messageTitle() {
				return this.dialogs?.dataSavedSuccess ? this.dialogs.dataSavedSuccess : 'Сохранено'
			},
			dialogs() {
				return this.$store.state.common.dialogs || {};
			},
			pageButtons() {
				return this.$store.state.common?.buttons;
			},
			placeHolders() {
				return this.$store.state.common.formPlaceholders || {};
			},
			commonText() {
				return this.$store.state.common.textsCommon;
			},
			pageTitle() {
				return this.commonText.find(el => el.CODE == "AUTH_TITLE").DETAIL_TEXT
			},

		},
		methods: {
			onValidate() {
				let phoneNumber =  this.PHONE_NUMBER.replace(/[\s\-\(\)]/g, '')
				if (this.PHONE_NUMBER && phoneNumber.length > 10) {
					console.log("Val phone", phoneNumber);
					this.isPhoneValid = true;
				} else {
					this.isPhoneValid = false;
				}
			},
			goToLogin() {
				this.$router.push({name: 'login'});
			},
			openThankYou() {
				this.$refs.thankYou.showThankyou();
			},
			submit() {
				// this.$router.push({name: "login-code"})
				if (this.smsRetryTimeout) return;
				let phoneNumber = this.PHONE_NUMBER.replace(/[\s\-\(\)]/g, '');
				if (this.PHONE_NUMBER?.length === 0 || !this.isPhoneValid) {
					this.$store.state.isError = true
					this.error = {
						title: this.dialogs?.checkInfo ? this.dialogs.checkInfo : "Проверьте ввод",
						text: this.dialogs?.enterValidPhone ? this.dialogs.enterValidPhone : 'Пожалуйста, добавьте валидный номер телефона.'
					}
				} else if (this.validEmail) {
					console.log("We are going to AuthController")
					this.loading = true
					this.$store.dispatch('post', {
						action: 'RegistrationController',
						params: {PHONE_NUMBER: this.PHONE_NUMBER, EMAIL: this.EMAIL, NAME: this.NAME}
					}).then((res) => {
						// сохраняем время последней отправки SMS
						this.$store.state.lastAuthSMSSentAt = new Date();
						const email = res.session.email
						this.loading = false
						// идем на проверку кода
						this.$router.push({
							name: "login-code", query: {
								p: window.btoa(String(this.loginPhone)),
								hash: this.hash,
								email: email
							}
						});

					}).catch((error) => {
						console.log("AuthController error", error)
						this.$store.state.isError = true;
						this.loading = false

						//Todo fix this thing
						if (error.code === Config.API_EXCEPTION_PHONE_EXISTS) {
							this.error= { text: this.dialogs?.phoneInUse ? this.dialogs.phoneInUse : '<div>Такой номер телефона уже зарегистрирован другим пользователем.</div>Пожалуйста, авторизуйтесь под этим номером телефона, чтобы использовать его.'}
						} else if (error.code === Config.API_EXCEPTION_EMAIL_EXISTS) {
							this.error= { text: this.dialogs?.emailInUse ? this.dialogs.emailInUse : '<div>Такой email уже зарегистрирован другим пользователем.</div>Пожалуйста, авторизуйтесь под этим email, чтобы использовать его.'}
						} else {
							this.error = {
								title: this.dialogs?.smthWentWrong ? this.dialogs.smthWentWrong : "Что-то пошло не так",
								text: error.error ? error.error : this.dialogs?.tryAgain ? this.dialogs.tryAgain : "Пожалуйста, попробуйте еще раз."
							}
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
			format(value, pattern) {
				let i = 0;
				let v = value.toString();
				return pattern.replace(/#/g, _ => v[i++]);
			}
		},
		created() {
		}
	}

</script>

<style lang="scss">
	.registration {
		position: relative;
		height: 100%;
		max-width: 1200px;
		padding-top: 66px;

		h2 {
			margin-bottom: 32px;
			@include up($md) {
				margin-bottom: 64px;
			}
		}

		.v-card {
			max-width: 844px;
			width: 100%;

			form {
				width: 100%;

				input {
					color: $grey1 !important;

					&::placeholder {
						color: $grey3 !important;
					}
				}

				& > .col {
					max-width: 264px;
				}
			}
		}

		div.v-text-field__slot {
			div.v-text-field__prefix {
				width: 60%;
				text-align: right;
				line-height: 23px;
				font-size: 18px;


				& + input {
					text-align: left;
				}

				& + input::-webkit-input-placeholder {
					text-align: left;

				}

				& + input:-moz-placeholder {
					text-align: left;
				}

				& + input:-moz-placeholder {
					text-align: left;
				}
			}
		}
	}
</style>
