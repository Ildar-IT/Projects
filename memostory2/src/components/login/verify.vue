<template>
  <div class="login-code mx-auto padding-bottom-main px-4">
    <svgicon v-if="isWindowXS" name="dandelion-cut-xs" width="194" height="144" original color="#ECE3CF"
             class="login-code__bg"/>
    <svgicon v-if="!isWindowXS" name="dandelion-cut" original color="#ECE3CF" class="login-code__bg"></svgicon>

    <h2 class="text-center padding-bottom-main beige-text px-3 px-lg-0">
      {{pageTitle}}
    </h2>

    <v-row>
      <v-col cols="12" md="6" class="mx-auto">
        <v-card class="mx-auto card-light padding-left-main pt-7 pt-md-12 padding-right-main padding-bottom-main"
                elevation="0">
          <v-card-actions class="pa-0">
            <v-form class="mx-auto text-center" @submit.prevent="submit" @keyup.native.enter="submit">
              <!--  Code-->

              <div class="flex-center">
                <div class="beige-text body-1">
                  {{dialogs.codeSent ? dialogs.codeSent : "На адрес" }} {{ email}} {{ dialogs.codeSent2 ? dialogs.codeSent2 : "отправлен код подтверждения"}}
                </div>
              </div>
              <v-text-field
                  v-model="form.smsCode"
                  :rules="smsCodeRules"
                  v-mask="smsCodeMask"
                  :placeholder="currentPlaceholder"
                  required
              />
              <div>
                <v-btn type="submit" class="mt-3 mx-auto btn--secondary large d-flex align-center mb-4 shadow btn-with-svg" block dark>
                  <!--<svgicon name="log-in" width="24" height="24" original :fill="false" color="white"
                           class="mr-4"></svgicon>-->
<!--                  <span>{{buttonContent.login}} </span>-->
                  <pulse-loader v-if="loading" :loading="true" color="#fff" size="5px"/>
                  <span v-else> {{pageButtons.confirm}} </span>
                </v-btn>
              </div>

              <div class="flex-center">
                <v-btn class="mt-3 mx-auto small elevation-0 py-2 mb-8" block  id="login-code__btn"
                       @click="goBack">
                  <span class="grey-text">{{pageButtons.cancel}}</span>
                </v-btn>
              </div>

              <router-link to="/privacy-policy" target="_blank">
                <p class="body-2 hover-link_dark grey-text mb-0">
                  {{ placeHolders.policy }}
                </p>
              </router-link>

            </v-form>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!--  Error message  -->
    <error-msg v-model="isError" ref="errorMsg" :error="this.error"/>
    <!--  Confirm dialog  -->
    <v-dialog v-model="dialogConfirm" class="mx-auto pa-8" width="414">
      <v-card class="error-dialog mx-auto text-center py-8 px-4">
        <div class="h5 beige-text d-flex justify-center mb-4"> {{ dialogs.confirmedEmail ? dialogs.confirmedEmail : "Ваша почта успешно подтверждена"}}  </div>
        <v-card-actions class="pb-0">
          <v-btn class="mx-auto btn--secondary "
                 width="200"
                 text dark large
                 @click="onOk"
          >
            ОК
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import errorMsg from '../elements/error-msg'
import { mask } from "vue-the-mask";

export default {
  name: 'verify',
  directives: { mask },
  components: {errorMsg, PulseLoader},
  data() {
    return {
      dialogConfirm: false,
      loading: false,
      error: {
        text: ''
      },
      form: {
        smsCode: '',        
      },
      smsCodeRules: [
        v => v.length < 5 ? this.validadtionErrors.short : true ,
        v => RegExp(/[\d{5}]+/g).test(v) || this.validadtionErrors.wrong
      ],
      smsCodeMask: "######",
    }
  },
  computed: {
    validadtionErrors() {
      return  {
        short : this.$store.state.common.dialogs?.validationErrorShort || 'Слишком короткий код',
        wrong : this.$store.state.common.dialogs?.validationErrorWrong || 'Неверный код'
      }
    },
    currentPlaceholder() {
      return this.email ? this.placeHolders.enterCodeEmail : this.placeHolders.enterCodePhone;
    },
    dialogs() {
      return this.$store.state.common.dialogs || {};
    },
    isWindowLG() {
      return this.$store.getters.isWindowLG;
    },
    isWindowXS() {
      return this.$store.getters.isWindowXS;
    },
    commonText() {
      return this.$store.state.common.textsCommon;
    },
    smsCodeDebug() {
      return this.$store.state.response?.session?.smsCodeDebug;
    },
    pageTitle() {
      return this.dialogs?.confirmEmail ? this.dialogs?.confirmEmail : "Подтвердите вашу почту"
    },
    pageButtons() {
      return this.$store.state.common.buttons;
    },
    buttonContent() {
      return {
       login: this.pageButtons?.logIn ? this.pageButtons?.logIn : 'Войти',
       repeatCode: this.pageButtons?.repeatCode ? this.pageButtons?.repeatCode : 'Отмена',
      }
    },
    placeHolders() {
      return this.$store.state.common.formPlaceholders || {};
    },
    email() {
      /*if (this.$route.query && this.$route.query.email)
        return this.$route.query.email;*/
      return this.user.EMAIL;
    },
    user() {
      return this.$store.state.session.user
    },
    isError() {
      return this.$store.state.isError;
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
    codeOriginLabel() {
      return !this.email? "Введите код из SMS" : "Введите код из письма"
    },
    withValidHash() {
      return !!this.hash && this.hash.match(/^[\w\d_-]{8}$/);
    }
  },
  methods: {
    goBack() {
      const previousRoute = this.$store.state.previousRoute?.name?   this.$store.state.previousRoute.name : 'login'
      this.$router.push({
        name: previousRoute, query: {
          p: this.phoneCode,
          hash: this.hash,
        }
      });
    },
    submit() {
      //this.form.hash = this.hash;
     //if (this.form.smsCode === '0000 0000' ) this.$router.replace({name: 'memory-places'});

      if (!this.email) {
        console.log("Phone Auth")
        this.$store.dispatch('post', {
          action: 'AuthSMSCodeController',
          params: this.form
        }).then((res) => {
          console.log("Yeah! Auth!");
          let query = {};
          this.$store.state.session.user = res.session.user;
          this.dialogConfirm = true;
         // this.$router.push({name: 'memory-places', query});
        }).catch((error) => {
          console.log("AuthSMSCodeController", error);
          this.error =  {
            title: this.dialogs?.error ? this.dialogs.error : "Не получилось",
            text: this.dialogs?.errLogin ? this.dialogs.errLogin : "К сожалению, введен неверный код или код устарел. Пожалуйста, попробуйте еще раз."
          }
          this.$store.state.isError = true;
        })
        // заходят по почте
      } else {
        console.log("Email Auth")

        if (!this.form.smsCode) return;
        const emailCode = this.form.smsCode
        this.$store.dispatch('post', {
          action: 'ValidateEmailCodeController',
          params: { emailCode, userId: this.user['ID']}
        }).then((res) => {
          console.log("Yeah! Auth!", res);

          //todo диалог что все норм
          this.dialogConfirm = true;
          //this.$router.push({name: 'my-account'});
        }).catch((err) => {
          console.log("ValidateEmailCodeController", err);
          this.$store.state.isError = true;
          this.error =  {
            title: this.dialogs?.error ? this.dialogs.error : "Не получилось",
            text: this.dialogs?.errLogin ? this.dialogs.errLogin : "К сожалению, введен неверный код или код устарел. Пожалуйста, попробуйте еще раз."
          }
        })
      }
    },
    onOk() {
      this.$router.push({name: 'my-account'})
    }
  }

}
</script>

<style lang="scss">
.login-code {
  height: 100%;
  max-width: 845px;
  padding-top: 66px;
  @include up($lg) {
    padding-top: 64px;
  }

  &__bg {
    position: fixed;
    z-index: -1;
    bottom: 0;
    left: 0;
  }
  

  .v-input__append-inner {
    display: none !important;
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
    display: none !important;
  }
  .v-btn.small {
    height: unset !important;
  }

}
</style>
