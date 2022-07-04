<template>
  <v-form ref="formContacts" class="form-contacts" @submit.prevent="onSubmitPrevent">
    <v-row>
      <v-col class="py-0 pl-0 " cols="12" sm="6">
        <input v-model="form.name" @blur="validation.isNameTouched = true" type="text" id="name"  name="name" :placeholder="formInfo.namePlaceholder">
        <label v-if="InvalidName" for="name">
          {{ InvalidName }}
        </label>
      </v-col>
      <v-col class="py-0 pr-0 " cols="12" sm="6">
        <input v-model="form.email" @blur="validation.isEmailTouched = true" type="email" name="email" :placeholder="formInfo.emailPlaceholder">
        <label v-if="InvalidEmail" for="name" class="form-contacts__label2">
          {{ InvalidEmail }}
        </label>
      </v-col>
      <v-col class="py-0 px-0 " cols="12" sm="12">
        <textarea v-model="form.text" @blur="validation.isTextTouched = true" type="text" name="message" :placeholder="formInfo.textPlaceholder"></textarea>
        <label v-if="InvalidText" for="name" class="form-contacts__label3">
          {{ InvalidText }}
        </label>
      </v-col>
      <v-col class="py-0 pl-0" cols="12" sm="6">
        <a class="d-block">
          {{ formInfo.policyMessage}}
        </a>
        <input v-model="form.token" type="hidden" name="token">
      </v-col>
      <v-col class="py-0 pr-0 " cols="12" sm="6">
        <vue-recaptcha
          ref="recaptcha"
          sitekey="6LeJ1xcgAAAAANqHk-mXs4sNVjXaQYjusrSGrpPK"
          @verify="onCaptchaVerify"
          @error="onCaptchaError"
          @expired="onCaptchaExpired">
        <!--                <pulse-loader v-if="isLoading" :loading="true" color="black" size="5px"/>-->
        <submit-btn :class="!this.validation.isNameValid || !this.validation.isEmailValid ? 'disabled' : ''" name="submit" @click.native="submit">{{formInfo.submitTitle}}</submit-btn>
        <!--<primary-link-blue to="/"   class="d-flex mb-0">{{ 'Submit' }}</primary-link-blue>-->
        </vue-recaptcha>
      </v-col>
    </v-row>
    <v-dialog v-if="dialog" v-model="dialog">
      <v-btn
          icon
          dark
          @click="dialog = false"
      >
        <v-icon aria-hidden="false">mdi-close</v-icon>
      </v-btn>
      <v-card class="dialog">
        <v-card-title class="text-center">
          <h3 class="mx-auto" v-html="formInfo.resultMessage">
          </h3>
        </v-card-title>


      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import axios from "axios";
import Config from "@/config";
import { VueRecaptcha } from 'vue-recaptcha';
import SubmitBtn from "@/components/submit-btn";

const emailCheckRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameCheckRegex = /^.{2,}$/;

export default {
  name: "form-contacts",
  components: {
    VueRecaptcha,
    SubmitBtn
  },
  data() {
    return {
      dialog: false,
      form: {
        name: "",
        email: "",
        text: "",
        token: ""
      },
      validation: null,
      resources: {},
    }
  },
  created(){
    this.validation=this.initValidation();
  },
  computed: {
    InvalidEmail() {
      if (this.validation.isEmailTouched) {
        this.validation.isEmailValid = emailCheckRegex.test(String(this.form.email).toLowerCase());
        return this.validation.isEmailValid ? '' : this.formInfo.emailMessage;
      }
      return ''
    },
    InvalidName() {
      if (this.validation.isNameTouched) {
        this.validation.isNameValid = nameCheckRegex.test(String(this.form.name).toLowerCase());
        return this.validation.isNameValid ? '' : this.formInfo.nameMessage;
      }
      return ''
    },
    InvalidText() {
      if (this.validation.isTextTouched) {
        this.validation.isTextValid = !!this.form.email;
        return this.form.email ? '' : this.formInfo.textMessage;
      }
    },
    formInfo() {
      const el = this.$store.state.common?.email;
      return {
        title: el.FormBannerMessage,
        emailPlaceholder: el.FormEmailHint,
        namePlaceholder: el.FormNameHint,
        textPlaceholder: el.FormTextHint,
        emailMessage: el.FormEmailMessage,
        nameMessage: el.FormNameMessage,
        textMessage: el.FormTextMessage,
        policyMessage: el.FormPolicyMessage,
        submitTitle: el.FormSubmitTitle,
        resultMessage: el.ResultMessage.replace(/\n{2}/g,"<br>"),
      }
    }
  },
  methods: {
    submit() {

      if (this.form.token) {
        this.$refs.recaptcha.reset();
      }
    },

    initValidation() {
      return {
        isEmailTouched: false,
        isNameTouched: false,
        isTextTouched: false,
        isEmailValid: false,
        isNameValid: false,
        isTextValid: false,
      };
    },

    async onCaptchaVerify (recaptchaToken) {
/*      if (!this.form.name || !this.form.email) {
        this.form.name ? this.isNameTouched = false : this.isNameTouched = true;
        this.form.email ? this.isEmailTouched = false : this.isEmailTouched  = true;
        return
      }
      */
      this.form.token=recaptchaToken;
      try {
        const result = await axios.post(
            "/api/SubmitAmbassador", {
            name: this.form.name,
            email: this.form.email,
            toEmail: this.$store.state.common?.email.content,
            message: this.form.text,
            token: this.form.token
          }, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
          }
        );

        if (result) {
          console.log('Message has been sent to API');

          this.formReset();
          this.dialog = true;
        }
      } catch (error) {
        console.warn('API request error: ', error);
        this.dialog = false;
      }
    },

    onSubmitPrevent () {
        this.$refs.recaptcha.execute();
    },

    onCaptchaExpired () {
      this.$refs.recaptcha.reset();
    },

    onCaptchaError () {
      console.log("CaptchaError");
    },

    formReset() {
      this.form.name = "";
      this.form.email = "";
      this.form.text = "";
      this.validation = this.initValidation();
    },
  }
}
</script>

<style lang="scss">
.form-contacts {
  box-sizing: border-box;
  .col-12 {
    position: relative;
  }
  label {
    display: block;
    color: $error;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 11px;
/*    &::after {
      position: absolute;
      content: "";
      background-color: red;
      width: 10px;
      height: 10px;

      top: 5px;
    }*/
    @include up($sm) {
      bottom: 7px;
    }
    @include up($md) {
      bottom: 14px;
    }
  }
  &__label2 {
    @include up($sm) {
      left: 16px !important;
    }
  }
  &__label3 {
    bottom: 0 !important;
    @include up($md) {
      bottom: 14px !important;
    }
  }

  a {
    display: block !important;
    color: $dark-grey2 !important;
    margin-bottom: 32px;
  }




}
</style>
