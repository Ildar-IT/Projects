<template>
	<div class="my-account text-center margin-top-main px-4 pb-0 pb-lg-15">
		<v-container>
			<h2 class="beige-text margin-bottom-main">{{ pageContent.title ? pageContent.title : "Мой профиль" }}</h2>
			<v-row>
				<v-col cols="12" lg="6" class="mx-auto">
					<v-card class="mx-auto card-light pa-lg-16 pa-8" elevation="0">

						<v-alert
								class="mb-8"
								v-model="isPhoneNotValidated"
								prominent
								dense
								color="#EEE5D9"
						>
							<v-row align="center" justify="center">
								<v-col class="grow body-1 text-left pl-sm-8">
									<span> {{ pageContent.phoneAlert ? pageContent.phoneAlert :  "Ваш телефон не подтвержден"}}</span>
								</v-col>
								<v-col class="shrink">
									<v-btn elevation="0" @click="confirmPhone">
										<pulse-loader v-if="loadingConfirmationPhone" :loading="true" color="#ba9568"
										              size="5px"/>
										<span v-else> {{pageButtons.confirm ? pageButtons.confirm : "Подтвердить"}} </span>
									</v-btn>
								</v-col>
							</v-row>
						</v-alert>

						<v-alert
								class="mb-8"
								v-model="isEmailNotValidated"
								prominent
								dense
								color="#EEE5D9"
						>
							<v-row align="center" justify="center">
								<v-col class="grow body-1 text-left pl-sm-8">
									<span>{{pageContent.emailAlert ? pageContent.emailAlert : "Ваш email не подтвержден"}}</span>
								</v-col>
								<v-col class="shrink">
									<v-btn elevation="0" @click="confirmEmail">
										<pulse-loader v-if="loadingConfirmation" :loading="true" color="#ba9568"
										              size="5px"/>
										<span v-else> {{pageButtons.confirm ? pageButtons.confirm : "Подтвердить"}} </span>
									</v-btn>
								</v-col>
							</v-row>
						</v-alert>

						<v-card-actions class="pa-0 flex-column">
							<v-form class="mx-auto text-center" @submit.prevent="submit">
								<v-text-field v-model="form.NAME"
								              :placeholder="placeHolders.name ? placeHolders.name : 'Ваше Имя'"
								              class="text-center mb-8 mb-md-0 mt-0 pt-0"
								              hide-details="auto"
								              maxlength="64"
								              :rules="nameRules"/>
								<div class="d-flex flex-wrap flex-lg-nowrap flex-column flex-lg-row mt-5">

									<!--                  <v-text-field class=" pt-0 pt-md-3 mr-0 mr-lg-16"-->
									<!--                      v-model="form.PHONE_NUMBER"-->
									<!--                      :rules="phoneRules"-->
									<!--                      v-mask="phoneMask"-->
									<!--                      maxlength="32"-->
									<!--                      placeholder="+7 000 000-000"-->
									<!--                      type="tel"-->
									<!--                  />-->
									<vue-tel-input-vuetify
											class=" mr-0 mr-lg-16"
											v-model="form.PHONE_NUMBER"
											:placeholder="placeHolders.phone"
											label=""
											:preferred-countries="['ru']"
									>
									</vue-tel-input-vuetify>

									<v-text-field v-model="form.EMAIL" placeholder="example@mail.ru" class="text-center"
									              hide-details="auto" maxlength="128" :rules="emailRules"/>
								</div>


								<v-col col="12" class="mb-md-5 mt-9 mt-lg-0 mx-auto px-0 pb-0 pb-md-3">
									<v-btn type="submit"
									       class="mx-auto btn--secondary large d-flex align-center btn-with-svg shadow"
									       block
									       dark>
				                  <span class="d-flex align-center">
				                  <svgicon name="save" width="24" height="24" original class="mr-4" color="#fff"
				                           :fill="false"></svgicon>
				                  <pulse-loader v-if="loading" :loading="true" color="#fff" size="5px"/>
				                      <span v-else>  {{ pageButtons.save || 'Сохранить' }}</span> </span>
									</v-btn>
								</v-col>


								<div class="body-2 hover-link_dark grey-text mb-0" v-if="isWindowMD">
									<router-link to="/privacy-policy" target="_blank">
										{{placeHolders.policy || 'Наша политика обработки персональных данных' }}
									</router-link>
								</div>

							</v-form>

							<v-row class="w100" no-gutters >
								<v-col col="12"  class="mb-md-5  mx-auto px-0 pb-0 pb-md-3" >
									<v-btn class="mx-auto btn--primary d-md-none margin-top-small large d-flex align-center btn-with-svg shadow"
									       large dark @click="logout">
										<pulse-loader v-if="loadingLogout" :loading="true" color="#fff" size="5px"/>
										<span v-else class="d-flex align-center">
                            <svgicon name="log-out" width="24" height="24" original class="mr-2" color="#fff"
                                     :fill="false"></svgicon>
                            {{pageButtons.changeUser ? pageButtons.changeUser : 'Сменить пользователя'}}</span>
									</v-btn>
								</v-col>
							</v-row>
						</v-card-actions>


					</v-card>
				</v-col>
			</v-row>
			<thank-you v-model="dialog" ref="thankYou" :message="message" :title="messageTitle"/>
			<!--  Error message  -->
			<error-msg v-model="isError" ref="errorMsg" :error="this.error"/>
			<!--  Error message  -->
			<v-dialog
					v-model="dialogValidation"
					width="500"
					content-class="elevation-0"
			>
				<v-card class="pa-md-8 round">
					<div class="d-flex flex-column pa-4 pa-md-8">
						<div class="mb-8 d-flex align-center justify-center">
							<img src="@/assets/images/Question.png"/>
						</div>

						<v-card-text class="h5 d-flex align-center justify-center text-center beige-text"
						             v-html="validationText">
						</v-card-text>

						<v-text-field
								class="pb-2"
								v-model="smsCode"
								:rules="smsCodeRules"
								v-mask="smsCodeMask"
								:placeholder="validationPlaceholder"
								required
						/>

						<div class="d-flex flex-column align-center block-max-width">
							<v-btn
									class="btn--secondary  mb-4" dark block
									@click="onOk"
							> {{pageButtons.confirm ? pageButtons.confirm : "Подтвердить"}}

							</v-btn>

							<v-btn class="btn--primary"
							       dark
							       block
							       @click="dialogValidation = false"
							> {{ pageButtons.back ? pageButtons.back : "Назад"}}

							</v-btn>
						</div>

					</div>
				</v-card>
			</v-dialog>
		</v-container>
	</div>
</template>

<script>
	import thankYou from "@/components/elements/thankYou";
	import errorMsg from '../elements/error-msg'
	import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
	import {mask} from "vue-the-mask";
	import Config from "../../config";

	export default {
		name: 'my-account',
		directives: {mask},
		components: {thankYou, PulseLoader, errorMsg},
		data() {
			return {
				smsCode: null,
				loading: false,
				loadingConfirmation: false,
				loadingConfirmationPhone: false,
				loadingLogout: false,
				dialog: false,
				dialogValidation: false,
				validationText: '',
				validationPlaceholder: '',
				alert: false,
				error: null,
				isEmail: null, // будем ли валидовать новый email
				form: {
					NAME: '',
					PHONE_NUMBER: '',
					EMAIL: ''
				},
				emailReg: /^$|^.+@.+.\.+..*$/,
				nameReg: /^$|[a-zA-Zа-яА-Я]+$/g,
				phoneReg: /\d{3} \d{3} \d{2} \d{2}/,
				emailRules: [
					v => RegExp(this.emailReg).test(v) || v.length === 0 ? true : (this.dialogs?.wrongEmail ? this.dialogs.wrongEmail : 'Неверная почта')
				],
				nameRules: [
					v => RegExp(this.nameReg).test(v) || this.dialogs?.invalidName ? this.dialogs.invalidName : 'Имя может содержать только буквы'
				],
				phoneRules: [
					v => !!(this.phoneReg).test(v) || v.length === 0 ? true : (this.dialogs?.wrongPhone ? this.dialogs.wrongPhone : 'Неверный номер телефона')
				],
				smsCodeRules: [
					v => !!v && v.length < 5 ? this.validadtionErrors.short : true,
					v => RegExp(/[\d{5}]+/g).test(v) || this.validadtionErrors.wrong
				],
				smsCodeMask: "######",
				phoneMask: "+7 ### ### ## ##",
			}
		},
		computed: {
			validadtionErrors() {
				return {
					short: this.common.dialogs?.validationErrorShort || 'Слишком короткий код',
					wrong: this.common.dialogs?.validationErrorWrong || 'Неверный код'
				}
			},
			common() {
				return this.$store.state.common;
			},

			validName() {
				console.log("this.nameReg.test(this.form.NAME) ", this.nameReg.test(this.form.NAME));
				return this.nameReg.test(this.form.NAME);
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
			user() {
				return this.$store.state.session.user
			},
			isEmailNotValidated() {
				return this.$store.getters.isEmailNotValidated;
			},
			isPhoneNotValidated() {
				return this.$store.getters.isPhoneNotValidated;
			},
			isValidationNeeded() {
				return this.isEmailNotValidated || this.isPhoneNotValidated;
			},
			message() {
				return this.dialogs?.dataSaved ? this.dialogs.dataSaved : 'Ваши данные сохранены'
			},
			messageTitle() {
				return this.dialogs?.dataSavedSuccess ? this.dialogs.dataSavedSuccess : 'Сохранено'
			},
			dialogs() {
				return this.$store.state.common?.dialogs || {};
			},
			pageButtons() {
				return this.common?.buttons;
			},
			placeHolders() {
				return this.$store.state.common?.formPlaceholders || {};
			},
			pageContent() {
				return this.$store.state.page?.ProfileController?.texts?.content;
			},

		},
		methods: {
			confirmEmail() {
				this.loadingConfirmation = true;
				this.$store.dispatch('post', {
					action: 'ProfileValidationController',
					params: {EMAIL: this.user.EMAIL, userId: this.user.ID}
				}).then((res) => {
					// сохраняем время последней отправки SMS
					this.$store.state.lastAuthSMSSentAt = new Date();
					const email = res.session.email
					// идем на проверку кода
					this.$router.push({
						name: 'verify', query: {
							/*p: window.btoa(String(this.user.PHONE_NUMBER)),
							email: this.user.EMAIL*/
						}
					});
					//this.dialogValidation = true;
				}).catch((error) => {
					console.log("ProfileValidationController error", error)
					this.$store.state.isError = true;
					this.loading = false
					this.error = {
						title: this.dialogs?.smthWentWrong ? this.dialogs.smthWentWrong : "Что-то пошло не так",
						text: error.error ? error.error : this.dialogs?.tryAgain ? this.dialogs.tryAgain : "Пожалуйста, попробуйте еще раз."
					}
				}).finally(() => this.loadingConfirmation = false);
			},
			confirmPhone() {
				this.loadingConfirmationPhone = true;
				this.$store.dispatch('post', {
					action: 'ProfileValidationController',
					params: {PHONE_NUMBER: this.user.PHONE_NUMBER, userId: this.user.ID}
				}).then((res) => {
					// сохраняем время последней отправки SMS
					this.$store.state.lastAuthSMSSentAt = new Date();

					// идем на проверку кода
					this.dialogValidation = true;
					this.validationText = this.dialogs?.codeToPhone ? this.dialogs.codeToPhone : "На ваш номер телефона был выслан код подтвержения. <br/> Пожалуйста, введите его в поле ниже."
					this.validationPlaceholder = this.placeHolders.enterCodePnone;
					/*this.$router.push({
						name: 'verify', query: {
							/!*p: window.btoa(String(this.user.PHONE_NUMBER)),
							email: this.user.EMAIL*!/
						}
					});*/
					//this.dialogValidation = true;
				}).catch((error) => {
					console.log("ProfileValidationController error", error)
					this.$store.state.isError = true;
					this.loading = false
					this.error = {
						title: this.dialogs?.smthWentWrong ? this.dialogs.smthWentWrong : "Что-то пошло не так",
						text: error.error ? error.error : this.dialogs?.tryAgain ? this.dialogs.tryAgain : "Пожалуйста, попробуйте еще раз."
					}
				}).finally(() => this.loadingConfirmationPhone = false);
			},
			openThankYou() {
				this.$refs.thankYou.showThankyou();
			},
			onOk() {
				this.dialogValidation = false;
				// не используется
				if (this.smsCode === '555888' ) this.$router.replace({name: 'memory-places'});
				if (this.isEmail) {
					const emailCode = this.smsCode
					this.$store.dispatch('post', {
						action: 'ValidateEmailCodeController',
						params: {emailCode: emailCode, userId: this.user['ID']}
					}).then((res) => {
						console.log("Yeah! Auth!", res);
						if (res.validated) {
							//this.$store.state.session.user = res.session.user;
							this.saveInfo()
						} else {
							this.error = {
								title: this.dialogs?.error ? this.dialogs.error : "Не получилось",
								text: this.dialogs?.errLogin ? this.dialogs.errLogin : "К сожалению, введен неверный код или код устарел. Пожалуйста, попробуйте еще раз."
							}
							this.$store.state.isError = true;
						}
					}).catch((err) => {
						console.log("ValidateEmailCodeController", err);
					})
				} else {

					const smsCode = this.smsCode;
					this.$store.dispatch('post', {
						action: 'ValidateSMSCodeController',
						params: {smsCode: smsCode, userId: this.user['ID']}
					}).then((res) => {
						if (res.validated) {
							console.log('Is phone Validated!', res.session.user);
							this.$store.state.session.user = res.session.user;

							this.openThankYou();
						} else {
							this.error = {
								title: this.dialogs?.error ? this.dialogs.error : "Не получилось",
								text: this.dialogs?.errLogin ? this.dialogs.errLogin : "К сожалению, введен неверный код или код устарел. Пожалуйста, попробуйте еще раз."
							}
							this.$store.state.isError = true;
						}
					}).catch((err) => {
						console.log("ValidateCodeController", err);
					}).finally(() => this.smsCode = "");
				}
			},
			submit() {
				let phoneNumber = this.form.PHONE_NUMBER.replace(/[\s\-\(\)]/g, '');
				if (this.form.PHONE_NUMBER?.length === 0) {
					this.$store.state.isError = true;
					this.error = {
						title: this.dialogs?.checkInfo ? this.dialogs.checkInfo : "Проверьте ввод",
						text: this.dialogs?.enterValidPhone ? this.dialogs?.enterValidPhone : 'Пожалуйста, укажите номер телефона.'
					}
				} else if (this.form?.EMAIL && !this.emailReg.test(this.form?.EMAIL)) {
					this.$store.state.isError = true;
					this.error = {
						title: this.dialogs?.checkInfo ? this.dialogs.checkInfo : "Проверьте ввод",
						text: this.dialogs?.enterValidEmail ? this.dialogs?.enterValidEmail : 'Пожалуйста, укажите корректный email.'
					}
				} else {

					this.saveInfo();

					/* if(this.form.EMAIL !== this.user.EMAIL && this.form.EMAIL.length > 0) {
						 this.$store.dispatch('post', {
							 action: 'ProfileValidationController',
							 params: {EMAIL: this.form.EMAIL, userId: this.user.ID }
						 }).then((res) => {
							   this.isEmail = res.session.email
							   this.dialogValidation = true;
							   this.validationText = "На вашу почту был выслан код подтвержения. <br/> Пожалуйста, введите его в поле ниже";
							   this.validationPlaceholder = this.placeHolders.enterCodeEmail;
						 })
					 }*/
					/*	if (phoneNumber !== this.user.PHONE_NUMBER && phoneNumber.length > 0) {
							this.$store.dispatch('post', {
								action: 'ProfileValidationController',
								params: {PHONE_NUMBER: phoneNumber, userId: this.user.ID}
							}).then(() => {

								this.validationText = "На ваш номер телефона был выслан код подтвержения. <br/> Пожалуйста, введите его в поле ниже"
								this.dialogValidation = true;
								this.validationPlaceholder = this.placeHolders.enterCodePnone;
							})
						}*/
				}
			},
			saveInfo() {
				let phoneNumber = this.form.PHONE_NUMBER.replace(/[\s\-\(\)]/g, '');
				this.loading = true;
				this.$store.dispatch('post', {
					action: 'ProfileController',
					params: {EMAIL: this.form.EMAIL, NAME: this.form.NAME, PHONE_NUMBER: phoneNumber}
				}).then((res) => {
					this.$store.state.session.user = res.session.user;

					if (res.session.isPhoneValidationRequired) {
						this.dialogValidation = true;
						this.validationText = this.dialogs?.codeToPhone ? this.dialogs.codeToPhone : "На ваш номер телефона был выслан код подтвержения. <br/> Пожалуйста, введите его в поле ниже."
						this.validationPlaceholder = this.placeHolders.enterCodePnone;
					} else {
						this.openThankYou();
					}

				}).catch((error) => {
					console.log("ProfileController error ", error);
					this.error = {}
					//Todo fix this thing
					if (error.code ===  Config.API_EXCEPTION_PHONE_EXISTS) {
						this.error.text = this.dialogs?.phoneInUse ? this.dialogs.phoneInUse : '<div>Такой номер телефона уже зарегистрирован другим пользователем.</div>Пожалуйста, авторизуйтесь под этим номером телефона, чтобы использовать его.'
					} else if (error.code ===  Config.API_EXCEPTION_EMAIL_EXISTS) {
						this.error.text = this.dialogs?.emailInUse ? this.dialogs.emailInUse : '<div>Такой email уже зарегистрирован другим пользователем.</div>Пожалуйста, авторизуйтесь под этим email, чтобы использовать его.'
					} else {
						this.error.text = error.error ? error.error : this.dialogs?.smthWentWrong ? this.dialogs.smthWentWrong : 'Ой! Что-то пошло не так...';
					}
					this.$store.state.isError = true;
					this.error.title = this.dialogs?.smthWentWrong ? this.dialogs.smthWentWrong : "Что-то пошло не так...";
				}).finally(() => {
					this.loading = false;
				});
			},
			logout() {
				this.loadingLogout = true;
				this.$store.dispatch('post', {
					action: 'LogoutController',
				}).then((res) => {
					this.loadingLogout = false;
					this.$router.push({name: 'login'})
				}).catch((error) => {
					this.loadingLogout = false;
					console.log("error", error)
					this.$store.state.isError = true;
					this.error = {
						title: this.dialogs?.smthWentWrong ? this.dialogs.smthWentWrong : "Что-то пошло не так",
						text: this.dialogs?.tryAgain ? this.dialogs.tryAgain : "Пожалуйста, перезагрузите страницу и попробуйте еще раз"
					}
				})
			},
			format(value, pattern) {
				let i = 0;
				let v = value.toString();
				return pattern.replace(/#/g, _ => v[i++]);
			}
		},
		created() {
			let user = JSON.parse(JSON.stringify(this.user))

			this.form.EMAIL = user.EMAIL
			const mask = "## ### ### ## ##";
			if (this.user.PHONE_NUMBER) this.form.PHONE_NUMBER = this.format(this.user.PHONE_NUMBER, mask);
			this.form.NAME = user.NAME
			//this.alert = this.isEmailNotValidated;
		}
	}

</script>



<style lang="scss">
	.my-account {
		position: relative;
		padding-bottom: 69px;


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

			}
				 .col {
					max-width: 264px;
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

	.v-text-field {
		input {
			text-align: center !important;
		}
	}
</style>
