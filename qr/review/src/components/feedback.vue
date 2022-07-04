<template>
	<div class="d-flex flex-column align-center feedback">
		<div v-if="page.poll.COUPON_TEXT || page.poll.COUPON">
			<div class="flex-center padding-bottom-main">
				<svgicon name="giftbox" original :height="isWindowMD ? '128' : '64' "
						 :width="isWindowMD ? '128' : '64' " class="svgicon"/>
			</div>
			<h2 class="padding-bottom-small">
				{{page.poll.COUPON}}
			</h2>
			<div class="padding-bottom-main body-1 text-center secondary-text">
				{{page.poll.COUPON_TEXT}}
			</div>
		</div>

		<v-form class="mb-0 mb-md-12 pa-md-14 feedback__form" lazy-validation ref="form">
			<h4 class="mb-6">
				Есть, что добавить?
			</h4>
			<div class="mb-16 body-1 text-center">
				<span v-if="withHiddenFeedbackContacts">Мы будем признательны за любые дополнительные комментарии.</span>
				<span v-else>Если Вы хотите, чтобы мы связались с Вами – пожалуйста, оставьте контактные данные.</span>
			</div>

			<div class="secondary-text mb-0 mb-md-6">
				<v-textarea class="secondary-text"
							outlined
							hide-detaols
							auto-grow
							rows="1"
							placeholder="Ваш комментарий"
							label=""
							v-model="form.comments"
							:rules="commentRules"
				></v-textarea>
			</div>

			<v-row justify="center">
				<v-col :cols="12" sm="8" md="6">
					<div class="secondary-text mb-6 feedback__contacts">
						<div @click="onButtonClick" class="feedback__file-input">
							<input @change="onFileChange" class="d-none" name="file" type="file" ref="uploader">
							<v-icon class="mb-1"> mdi-paperclip mdi-rotate-45</v-icon>
							<span :class="file? '':'grey--text'"> {{fileName}}</span>
						</div>
					</div>
					<div v-if="!withHiddenFeedbackContacts" class="mb-6 secondary-text feedback__contacts">
						<!-- <v-text-field-simplemask
								label="Телефон"
								v-model="phoneEdit"
								:properties="{
									'hide-details': 'auto',
									rules: phoneRules
								}"
								:options="{
									inputMask: '###########',
									outputMask: '###########',
									empty: null,
									lowerCase: false,
								}"
						/> -->
						<v-text-field
								label="Телефон/E-mail"
								hide-details="auto"
								v-model="contactInfo"
								:rules="phoneRules">
						</v-text-field>
						<!--	            <v-text-field-->
						<!--	                    label="Адрес эл. почты"-->
						<!--	                    hide-details="auto"-->
						<!--	                    v-model="form.email"-->
						<!--	                    :rules="emailRules"-->
						<!--	            />-->
					</div>
					<div class="flex-center mt-12 mb-2">
						<v-btn @click="onSubmit" block>
							<pulse-loader v-if="isLoading" :loading="true" color="#fff" size="5px"/>
							<span v-else class="d-flex align-center">
								<svgicon class="mr-4" name="mail" :fill="false" width="24" color="white"/>
								Закончить опрос
							</span>
						</v-btn>
					</div>
				</v-col>
			</v-row>


			<!--<div class="flex-center">
				<div class="button-text" @click="onCancel">
					Нет, спасибо
				</div>
			</div>-->

			<!-- Error message modal window   -->
			<v-dialog
					v-model="isError"
					max-width="500px"
			>
				<v-card v-if="error">
					<v-card-title>
						<span>{{error.title ? error.title : "Что-то пошло не так..."}}</span>
						<v-spacer></v-spacer>
					</v-card-title>
					<v-card-text>
						{{error.message ? error.message : `К сожалению, сейчас не получилось принять ваш ответ.
						Пожалуйста,
						попробуйте ещё раз.`}}<br/>
						<i v-if="error.detail">{{ error.detail }}</i>
					</v-card-text>
					<v-card-actions>
						<v-btn
								@click="error = null"
						>
							Ок
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-form>
	</div>
</template>

<script>
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

    export default {
        name: "feedback",
        components: {PulseLoader},
        data: () => ({
            file: null,
            fileName: "Прикрепите файл",
            //Rules для проверки, что комментарий не пустой и длинее двух символов
            commentRules: [
                //v => v.length >= 2 || 'Пожалуйста, хотя бы пару букв...'
            ],
            phoneRules: [
                v => !v || RegExp(/^[\+]?[0-9]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/).test(v) || RegExp(/^.+@.+.\.+..*$/).test(v) || 'Проверьте правильность ввода'
            ],
            emailRules: [
                v => !v || RegExp(/^.+@.+.\.+..*$/).test(v) || 'Если указываете емейл, проверьте его корректность'
            ],
            contactInfo: '',
            form: {
                hash: null,
                comments: '',
                phone: '',
                email: '',
            },
            error: null,
            isLoading: false
        }),
        computed: {
            page() {
                return this.$store.state.currentPage;
            },
            isError() {
                return !!this.error;
            },
            isWindowMD() {
                return this.$store.getters.isWindowMD
            },
            withHiddenFeedbackContacts() {
                return this.page.poll?.HIDDEN_CONTACT;
                //return this.$store.
            }
        },
        methods: {
            onButtonClick() {
                window.addEventListener('focus', () => {
                }, {once: true});
                this.$refs.uploader.click();
            },
            onFileChange() {
                this.fileName = this.$refs.uploader.files[0].name;
                this.file = this.$refs.uploader.files[0]
            },
            onSubmit() {
                // если форма не заполнена, то просто отправляем на feedback-finish2
                if (this.form.comments === "") {
                    this.$router.push({name: 'feedback-finish2'});
                    return;
                }

                // обязательно сообщаем, к какому опросу комментим
                this.form.hash = this.$route.params.hash;

                // добавим +7 к телефону TODO не получилось это сделать сразу в инпуте

                if (this.$refs.form.validate()) {
                    if (this.contactInfo) {
                        // задан емейл/телефон?
                        if (RegExp(/^[\+]?[0-9]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/).test(this.contactInfo.trim())) {
                            this.form.phone = this.contactInfo.replace(/\D/g, '').trim();
                            if (this.form.phone.startsWith("7")) {
                                this.form.phone = "+" + this.form.phone
                                console.log("phone PHONE", this.form.phone)
                            } else if (this.form.phone.startsWith(8)) {
                                this.form.phone = "+7" + this.form.phone.slice(1)
                            } else if (this.form.phone.startsWith(9)) {
                                this.form.phone = "+7" + this.form.phone
                            }
                        } else {
                            this.form.email = this.contactInfo;
                        }
                    }

                    // Используем formData чтобы сделать upload файла
                    let formData = new FormData();
                    if (this.file) {
                        console.log("upload файла ", this.file);
                        formData.append("FILE", this.file);
                    } else {
                        console.log("No File attached");
                    }
                    Object.keys(this.form).forEach((key) => {
                        if (key == "DETAIL_PICTURE") {
                            console.warn("Skipped");
                            return;
                        } else {
                            formData.append(key, this.form[key] === null ? "" : this.form[key]);
                        }
                    });
                    /*console.log("=============================")
                    for (var pair of formData.entries()) {
                        console.log(pair[0] + " - " + pair[1]);
                    }*/

                    this.isLoading = true;
                    this.$store.dispatch('post', {
                        action: 'ReviewFeedbackController',
                        params: formData
                    }).then(() => {
                        this.$router.push({name: 'feedback-finish'});
                    }).catch((error) => {
                        this.error = error ? {detail: error} : {detail: 'Всё плохо!'};
                    }).finally(() => {
                        this.isLoading = false;
                    });

                } else this.error = {
                    title: "Проверьте ввод",
                    message: "Пожалуйста, введите корректные данные в форму."
                };

            },
            onCancel() {
                this.$router.push({name: 'feedback-finish2'});
            },

        }
    }
</script>

<style lang="scss">
	.feedback {
		width: 100%;

		&__form {
			@include up($md) {
				border-radius: 32px;
				border: 4px solid #E6E7EE;
				width: fit-content;
			}
		}

		.text-button {
			color: $secondary;
			font-weight: bold;
			font-size: 17px;
			line-height: 21px;
			height: 50px;
			display: flex;
			cursor: pointer;
			justify-content: center;
			align-items: center;
		}

		&__file-input {
			border-color: rgba(0, 0, 0, 0.42);
			border-style: solid;
			border-width: 0 0 thin 0;

		}

		&__contacts {
			max-width: 300px;
		}
	}
</style>