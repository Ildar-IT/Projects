<template>
  <div class="login-code mx-auto layout-top padding-bottom-main px-4">
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
              <v-text-field
                  v-model="form.smsCode"
                  :rules="smsCodeRules"
                  v-mask="smsCodeMask"
                  :placeholder="placeHolders.enterCode"
                  required
              />
              <div>
                <v-btn type="submit" class="mt-3 mx-auto btn--secondary large d-flex align-center mb-4 shadow btn-with-svg" block dark>
	              <PulseLoader v-if="loading" :loading="true" color="#fff" size="5px"/>
	              <span class="d-flex align-center" v-else>
	                  <svgicon name="log-in" width="24" height="24" original :fill="false" color="white"
	                           class="mr-4"></svgicon>
	                  {{buttonContent.login}}
	              </span>
                </v-btn>
              </div>

              <div class="flex-center">
                <v-btn class="mt-3 mx-auto small elevation-0 py-2 mb-8" block  id="login-code__btn"
                       @click="goBack">
                  <span class="grey-text">{{buttonContent.repeatCode}}</span>
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
    <!--  Error message  -->
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import errorMsg from '../elements/error-msg'
import { mask } from "vue-the-mask";

export default {
  name: 'login-code',
  directives: { mask },
  components: {errorMsg, PulseLoader},
  data() {
    return {
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
      return this.commonText.find(el => el.CODE == "AUTH_TITLE").PREVIEW_TEXT
    },
    pageButtons() {
      return this.$store.state.common.buttons;
    },
    buttonContent() {
      return {
       login: this.pageButtons?.logIn ? this.pageButtons?.logIn : 'Войти',
       repeatCode: this.pageButtons?.repeatCode ? this.pageButtons?.repeatCode : 'Повторить код',
      }
    },
    placeHolders() {
      return this.$store.state.common.formPlaceholders || {};
    },
    email() {
      if (this.$route.query && this.$route.query.email)
        return this.$route.query.email;
      return '';
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
	    this.loading = true;
     /* if (this.form.smsCode === '555888' ) {
        console.log('dev login')
        this.$router.replace({name: 'memory-places'});
        return
      }*/
      this.form.hash = this.hash;
      if (!this.email) {
        console.log("Phone Auth")
        this.$store.dispatch('post', {
          action: 'AuthSMSCodeController',
          params: this.form
        }).then((res) => {
          console.log("Yeah! Auth!");
          let query = {};
          this.$router.push({name: 'memory-places', query});
         this.$store.state.session.user = res.session.user;
        }).catch((error) => {
          console.log("AuthSMSCodeController", error);
          this.error =  {
            title: this.dialogs?.error ? this.dialogs.error : "Не получилось",
            text:  error.error ? error.error : this.dialogs?.errLogin ? this.dialogs.errLogin : "К сожалению, введен неверный код или код устарел. Пожалуйста, попробуйте еще раз."
          }
          this.$store.state.isError = true;
        }).finally(() => this.loading = false)
        // заходят по почте
      } else {
        console.log("Email Auth");
        const emailCode = this.form.smsCode;
        this.$store.dispatch('post', {
          action: 'AuthEmailCodeController',
          params: {emailCode: emailCode}
        }).then((res) => {
          console.log("Yeah! Auth!");
          let query = {};
	      this.loading = false
          this.$store.state.session.user = res.session.user;
          // if (this.$router.name==='login-code')
          this.$router.push({name: 'memory-places', query});
        }).catch((error) => {
          console.log("AuthEmailCodeController", error);
	      this.loading = false;
          this.error =  {
            title: this.dialogs?.error ? this.dialogs.error : "Не получилось",
            text:  error.error ? error.error : this.dialogs?.errLogin ? this.dialogs.errLogin : "К сожалению, введен неверный код или код устарел. Пожалуйста, попробуйте еще раз."
          }
          this.$store.state.isError = true;
        }).finally(() => this.loading = false)
      }
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
