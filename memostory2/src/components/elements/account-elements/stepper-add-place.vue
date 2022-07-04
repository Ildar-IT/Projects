<template>
  <v-stepper v-model="e1" class="stepper-add-place card-light" elevation="0">

    <v-stepper-items>
      <!--        Step 1-->
      <v-stepper-content step="1" class="pa-0 ">

        <v-card class="mx-auto card-light pa-lg-16 pa-8" elevation="0">
          <v-card-text class="pt-0">
            <!--            <add-photo-field/>-->
            <form-avatar @imageUpload="imageUpload" class="margin-bottom-main" :changeable="true" :card="newPlace"/>
            <!--Анкета-->
            <data-form @fileUpload="fileUpload" @getInitialsEvent="getInitials" :card="newPlace"/>

          </v-card-text>

          <v-card-actions class="d-flex flex-column pb-0">
            <!--        BTN -->
            <v-col cols="12" md="7" class="mb-5 mt-lg-7 mt-0 mx-auto">
              <v-btn @click="saveCard" type="submit" class="btn--secondary large flex align-center btn-with-svg"
                     elevation="6"
                     block 
                     dark>
                <svgicon name="save" width="24" height="24" original class="mr-4" :fill="false"
                         color="#fff"></svgicon>
                <span>{{buttonContent}}</span>
              </v-btn>
            </v-col>
            <!--Link to policy-->
             <span> 
            <router-link to="/privacy-policy" target='_blank'>
              <p class="body-2 d-inline hover-link_dark grey-text px-0 mb-0">
                {{ placeHolders.policy ? placeHolders.policy : "Наша политика обработки персональных данных" }}
              </p>
            </router-link> 
            <span @click="fill">&nbsp;</span>
             </span>
          </v-card-actions>

        </v-card>

      </v-stepper-content>

      <!--Step 2-->
      <!-- <v-stepper-content step="2" class="pa-0 ">
        <v-card class="card-light pt-lg-16 pt-8 pa-xl-16 pb-5 px-4">
          <div>
            <div class="d-flex align-center justify-center margin-bottom-main">
            
              <form-avatar :changeable="true" :card="newPlace"/>
             
              <h5 class="form-avatar__name grey-text ml-4">{{ this.newPlace.initials }}</h5>
            </div>
          </div>
          <v-divider class="margin-bottom-main margin-top-main"></v-divider>
          <services-switch :services="newPlace.services"/>
          <v-row class="justify-center px-4 px-md-0">
            <v-col cols="12" md="6" class="pt-0 px-0">

              <v-btn block dark class="btn--secondary w100" @click="saveCard" :disabled="totalServicePrice<1">
                <svgicon class="mr-4" name="toggle-left" color="white" width="24" height="24"
                         :fill="false"/>
                {{ totalServicePrice }} &#8381;/мес.
              </v-btn>

            </v-col>
          </v-row>
        </v-card>

      </v-stepper-content> -->

    </v-stepper-items>
    <thank-you v-model="dialog" ref="thankYou" :message="this.message"/>
    <!--  Error message  -->
    <error-msg v-model="isError" ref="errorMsg" :error="this.error"/>
    <!--  Error message  -->
  </v-stepper>

</template>

<script>
import dataForm from "./data-form"
import formAvatar from "./form-avatar"
import servicesSwitch from "./services-switch"
import addPhotoField from "../account-elements/add-photo-field";
import thankYou from "@/components/elements/thankYou";
import errorMsg from '@/components/elements/error-msg'

export default {
  name: 'stepper-add-place',
  components: {thankYou, errorMsg, dataForm, formAvatar, servicesSwitch, addPhotoField},
  data() {
    return {
      isError: false,
      e1: 1,
      error: null,
      dialog: false,
      file: null,
      photoFile: null,
      regStr: /^[a-zA-Zа-яА-Я\s]*$/,
      newPlace: {
        NAME: '',
        initials: '',
        DETAIL_PICTURE: '',
        PERSON_LAST_NAME: '',
        PERSON_PATRONYMIC_NAME: '',
        PERSON_FIRST_NAME: '',
        PLACE_NUMBER: '',
        geolocation: [],
        PROPERTY_DOCUMENT: [],        
      },
    }
  },

  computed: {
    totalServicePrice() {
      let price = this.newPlace.services.filter(x => x.included === true).reduce((a, x) => a = a + x.price, 0);
      this.newPlace.serviceTotal = price;
      return price;
    },
    placeHolders() {
      return this.$store.state.common.formPlaceholders || {};
    },
    pageButtons() {
      return this.$store.state.common?.buttons;
    },
    buttonContent() {
      return this.pageButtons?.add ? this.pageButtons?.add : 'Добавить'
    },
    dialogs() {
      return this.$store.state.common.dialogs || {};
    },
    pageContent() {
      return this.$store.state.page.ReportListController.texts?.content || {};
    },
    messageTitle() {
      return this.dialog?.thanks ? this.dialog.thanks : 'Спасибо'
    },
    message() {
      return this.dialogs?.confirmationSubtitle ? this.dialogs.confirmationSubtitle : 'Захоронение передано на проверку. После подтверждения мы сможем начать ухаживать за ним.'
    },



    // isError() {
    //   return this.$store.state.isError;
    // },
  },
  methods: {
    validate() {
      if (this.newPlace.PERSON_LAST_NAME.length === 0 || !this.regStr.test(this.newPlace.PERSON_LAST_NAME) ) {
      this.isError = true
      this.error = {
        title: this.dialogs?.checkInfo ? this.dialogs.checkInfo : "Проверьте ввод",
        text: this.pageContent?.addNameErr ? this.pageContent.addNameErr : "Пожалуйста проверьте ввод Фамилии умершего."
      }
      this.$store.state.isError = true;
      return true
    } else if(this.newPlace.PERSON_FIRST_NAME.length === 0 || !this.regStr.test(this.newPlace.PERSON_FIRST_NAME)) {
        this.isError = true
          this.error = {
            title: this.dialogs?.checkInfo ? this.dialogs.checkInfo : "Проверьте ввод",
            text: this.pageContent?.addSecondNameErr ? this.pageContent.addSecondNameErr : "Пожалуйста проверьте ввод Имени умершего."
          }
         this.$store.state.isError = true;
        return true
      } else if (this.newPlace.PERSON_PATRONYMIC_NAME.length === 0 || !this.regStr.test(this.newPlace.PERSON_PATRONYMIC_NAME)) {
        this.isError = true
        this.error = {
          title: this.dialogs?.checkInfo ? this.dialogs.checkInfo : "Проверьте ввод",
            text: this.pageContent?.addThirdNameErr ? this.pageContent.addThirdNameErr : "Пожалуйста проверьте ввод Отчетсва умершего."
          }
            this.$store.state.isError = true;
        return true
      } else if (this.newPlace.NAME.length === 0) {
        this.isError = true
        this.error = {
          title: this.dialogs?.checkInfo ? this.dialogs.checkInfo : "Проверьте ввод",
           text: this.pageContent?.addAddressErr ? this.pageContent.addAddressErr : "Пожалуйста, укажите адрес кладбища."
          }
          this.$store.state.isError = true;
        return true
      } else if (this.newPlace.PLACE_NUMBER.length === 0) {
        this.isError = true
        this.error = {
            title: this.dialogs?.checkInfo ? this.dialogs.checkInfo : "Проверьте ввод",
            text: this.pageContent?.addPlaceErr ? this.pageContent.addPlaceErr : "Пожалуйста, укажите номер места."
          }
          this.$store.state.isError = true;
        return true
      } else {
        return false;
      }
    },
    imageUpload(photo) {
        this.photoFile = photo
    },
    fileUpload(file) {
        this.file = file
    },
    getInitials(initials) {
      this.newPlace.initials = initials;
    },
    fill() {
      this.newPlace = {
        PERSON_LAST_NAME: 'Иванова',
        PERSON_FIRST_NAME: 'Клавдия',
        PERSON_PATRONYMIC_NAME: 'Степановна',
        initials: 'Иванова А.А.',        
        NAME: 'Заусадебная ул., д. 33, Санкт-Петербург',
        PLACE_NUMBER: '15',
        geolocation: [],       
      }
    },
    goToNextStep() {
      this.e1 = 2;
      window.scrollTo({
        top: 0
      })
    },
    openThankYou() {
      this.$refs.thankYou.showThankyou();
    },
    saveCard() {     
       console.log("this.validate()", this.validate())
      if (this.validate() == true)  {
           console.log("this.validate()", this.validate())
        return;
      }
      // Используем formData чтобы сделать upload файла
      let formData = new FormData();
      Object.keys( this.newPlace).forEach((key) => {
        if(key == 'PROPERTY_DOCUMENT') {
          console.warn("Skipped");
          return;
        }
        formData.append(key, this.newPlace[key] === null ? "" : this.newPlace[key]);
      });
      for (var pair of formData.entries()) {
          console.log(pair[0]+ ', ' + pair[1]); 
      }
      if (this.photoFile) {       
        formData.append("DETAIL_PICTURE", this.photoFile);
      } 

      if (this.file) {       
        formData.append("PROPERTY_DOCUMENT", this.file);
      } 
    
      this.$store.dispatch('post', {
          action: 'PlaceItemController',
          params: formData,
      }).then(() => {
      //Открываем модальное окно v-dialog с сообщением
          this.openThankYou();
          //Переходим на страницу с сохраненными карточками
          //Timeout нужен, чтобы не перебивать показ модального окна
          setTimeout(() => {
                  this.$router.push({name: 'memory-places'})
              }, 2500
          )
      }).catch((error) => {          
          this.error = {
            title: this.dialogs?.checkInfo ? this.dialogs.checkInfo : "Проверьте ввод",
            message: error.error ? error.error : this.dialogs?.smthWentWrong ? this.dialogs.smthWentWrong : "Что-то пошло не так"
          }
          this.$store.state.isError = true;
      })
      //Открываем модальное окно v-dialog с сообщением
     // this.openThankYou();
      //Переходим на страницу с сохраненными карточками
      //Timeout нужен, чтобы не перебивать показ модального окна
      // setTimeout(() => {
      //       this.$router.push({name: 'memory-places'})
      //     }, 2500
      // )
    },

  }
}
</script>

<style lang="scss">

.v-stepper.stepper-add-place {
  border-radius: $border-radius-primary !important;
  box-shadow: none;
}
</style>
