<template>
	<div class="d-flex flex-column align-center">
		<div v-if="page.poll.COUPON_TEXT || page.poll.COUPON">
			<div class="flex-center padding-bottom-main">
				<svgicon name="giftbox" original :height="isWindowMD ? '128' : '64' " :width="isWindowMD ? '128' : '64' " class="svgicon"/>
			</div>
			<h2 class="padding-bottom-small">
				{{page.poll.COUPON}}
			</h2>
			<div class="padding-bottom-main body-1 text-center secondary-text">
				{{page.poll.COUPON_TEXT}}
			</div>
		</div>

		<h4 >
			{{mainTitle}}
		</h4>
		<h4 class="mb-6">
			{{ headerTitle }}
		</h4>

	    <v-form class="feedback pa-2 pa-lg-4 d-flex flex-column"  :class="isWindowMD ? 'padding-main' : '' " lazy-validation ref="form">

	        <div class="secondary-text mb-3 mb-md-6 feedback__contacts">
	            <v-textarea class="secondary-text"
	                        :auto-grow="true"
                            hide-details="auto"
	                        rows="1"
	                        placeholder=""
	                        label="Ваш комментарий"
	                        v-model="form.comments"
	                        :rules="commentRules"
	            ></v-textarea>
	        </div>
	        <div class="secondary-text   feedback__contacts">
	            <div @click="onButtonClick" class="feedback__file-input">
	                <input @change="onFileChange"  class="d-none" name="file" type="file" ref="uploader"   >
	                <v-icon class="mb-1"> mdi-paperclip mdi-rotate-45 </v-icon>
	                <span :class="file? '':''"> {{fileName}}</span>
	            </div>
	        </div>
        <div class="mb-8 mt-10  body-1 text-center grey--text">
	        Оставьте свои контактные данные, если хотите, чтобы мы с вами связались
        </div>
	        <div class="mb-4 secondary-text feedback__contacts">
            <v-text-field
                label="Имя"
                hide-details="auto"
                v-model="form.name"
                class="pt-0 mt-0 mb-3 mb-md-6"
            />

            <v-text-field
                label="Телефон / E-mail"
                hide-details="auto"
                v-model="contactInfo"
                class="pt-0 mt-0"
                :rules="phoneRules"
            >
            </v-text-field>

	        </div>
	    </v-form>


	        <div class="flex-center margin-top-main">
	            <!-- <div class="button-text" @click="onCancel">
	                Нет, спасибо
	            </div> -->

		        <v-btn elevation="0" @click="onSubmit"  class="flex-center mb-8 mx-auto">
			        Завершить отзыв
		        </v-btn>

	        </div>

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
	                    {{error.message ? error.message : `К сожалению, сейчас не получилось принять ваш ответ. Пожалуйста,
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

	</div>
</template>

<script>
export default {
  name: "feedback",
  data: () => ({
    file: null,
    fileName: "Прикрепите файл",
    //Rules для проверки, что комментарий не пустой и длинее двух символов
    commentRules: [
      v => v.length === 0 || v.length >= 2 || 'Пожалуйста, хотя бы пару букв...'
    ],
    /*            nameRules: [
                  v => !!v || 'Не заполнено',
                  v => v.length <= 20 || 'Имя не должно быть больше 20 символов',
                  v => v.length >= 2 || 'Неккоректное имя ',
                  v => !v || RegExp(/^([A-яё]+|[A-z]+[a-яё]+|[a-z]+)$/).test(v) || 'Проверьте правильность ввода'
                ],*/
    phoneRules: [
      v => !v || RegExp(/^[\+]?[0-9]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/).test(v) || RegExp(/^.+@.+.\.+..*$/).test(v) || 'Проверьте правильность ввода'
    ],
    emailRules: [
      v => !v || RegExp(/^.+@.+.\.+..*$/).test(v) || 'Если указываете емейл, проверьте его корректность'
    ],
    // phoneEdit: '',
    contactInfo: '',
    form: {
      hash: null,
      comments: '',
      phone: '',
      email: '',
      name: '',
    },
    error: null
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
    headerTitle() {
      console.log("route params", this.$route.params);
      if (this.$route.params?.isPositive < 0) {
        return 'Расскажите нам, что вам не понравилось'
      } else if (this.$route.params?.isPositive == 0) {
        return 'Есть что добавить?';
      }
    },
	  mainTitle() {
		  if (this.$route.params?.isPositive <= 0) {
			  return 'Мы ценим ваше мнение!'
		  } else if (this.$route.params?.isPositive > 0) {
			  return 'Спасибо за отзыв!';
		  }
	  }
  },
  methods: {
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener('focus', () => {
      }, {once: true})
      this.$refs.uploader.click()
    },
    onFileChange() {
      this.fileName = this.$refs.uploader.files[0].name;
      this.file = this.$refs.uploader.files[0]
    },
    onSubmit() {
      // если форма не заполнена, то просто отправляем на  feedback-finish2
      if (this.form.comments == "" && this.contactInfo == "" && this.form.name == "") {
        this.$router.push({name: 'feedback-finish2', params: {isPositive: this.$route.params?.isPositive}})
        return
      }
      // обязательно сообщаем, к какому опросу комментим
      this.form.hash = this.$route.params.hash;

      // добавим +7 к телефону TODO не получилось это сделать сразу в инпуте
      // this.form.phone =  this.phoneEdit;

      /*if (this.$refs.form.validate()) {*/
      if (this.$refs.form.validate()) {
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
          this.form.email = this.contactInfo
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
       /* console.log("=============================")
        for (var pair of formData.entries()) {
          console.log(pair[0] + " - " + pair[1]);
        }*/

        this.$store.dispatch('post', {
          action: 'ReviewFeedbackController',
          params: formData
        }).then(() => {
        	console.log("feedback-finish ", this.isPositive);
        	if(this.$route.params.isPositive) {
		       this.$router.push({name: 'feedback-finish2',  params: {isPositive: this.$route.params?.isPositive}});
	        } else {
		        this.$router.push({name: 'feedback-finish'});
	        }

        }).catch((error) => {
          this.error = error ? {detail: error} : {detail: 'Всё плохо!'};
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
		background-color: white;
	    border-radius: 15px;
	    max-width: 400px;

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
           border-width:  0 0 thin 0;
          
        }
        &__contacts {
          max-width:  300px;
	        &-text {
		        max-width:  400px;
	        }
        }
    }
</style>