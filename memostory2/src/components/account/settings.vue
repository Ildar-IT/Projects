<template>
  <div class="settings text-center margin-top-main px-4 pb-0 ">
	  <v-container>
	    <h2 class="beige-text margin-bottom-main"> {{pageContent.title ? pageContent.title : "Настройка заботы" }}</h2>
	    <v-row class="px-0 mx-auto">
	      <v-col cols="12" lg="8" xl="6" class="mx-auto pa-0">
	        <v-card class="mx-auto card-light px-xl-16 px-lg-16 px-8  pt-md-16 pt-8" elevation="0">
	          <v-row class="align-center justify-center margin-bottom-main">
	            <form-avatar @imageUpload="imageUpload" class="mr-4" :card="currentCard" :changeable="true"/>
	              <div class="d-flex pa-4 flex-column" :class="isMobileApp && !isWindowSM ? 'align-center' : 'align-start'">
	                <h5 class="form-avatar__name grey-text">{{ currentCard.NAME_SHORT }}</h5>
	                  <div  v-if="currentCard.PLACE_TARIFF" class=" beige-text mb-4">
	                    {{pageContent.tariff || "Тариф: "}} {{ tariffName(currentCard) }}
	                  </div>
	              </div>

	            <!--          <v-col cols="7" class="form-avatar__info pb-0">
	                      </v-col>-->
	          </v-row>
	          <div v-show="!expand" class="settings__btn-wrapper mx-auto mb-lg-15 mb-8">
	            <v-btn outlined block class="outlined outlined_secondary d-flex align-center mx-auto btn_roboto"
	                   @click="showDataForm">
	              <svgicon name="chevron-down" color="#234052" :fill="false" width="24" height="24"
	                       class="mr-4"></svgicon>
	              {{pageContent.expandProfile ? pageContent.expandProfile :  "Развернуть профиль"}}
	            </v-btn>
	          </div>

	          <v-expand-transition>
	            <div v-show="expand">

	              <!--Анкета-->
	              <data-form @fileUpload="fileUpload" :card="currentCard" class="margin-bottom-main" />

	              <v-row class="justify-center padding-bottom-main mt-md-13 mt-5">
	                <v-col cols="12" md="4" class="pa-0">
	                  <div class="settings__btn-section"  >
	                    <v-btn block dark class="btn--secondary mb-4 px-0" @click="saveDataForm" >
	                      <pulse-loader v-if="loading" :loading="true" color="#fff" size="5px" />
	                      <span class="d-flex align-center" v-else>
	                      <svgicon class="mr-4" name="save" color="white" width="24" height="24" :fill="false" />
	                     {{ pageButtons.save || 'Сохранить'}}
	                    </span>
	                    </v-btn>

	                    <v-btn block dark class="btn--primary " @click="deletePlaceDialog = true">
	                      <span class="d-flex align-center" >
	                       {{ pageButtons.delete || 'Удалить'}}
	                    </span>
	                    </v-btn>
	                  </div>
	                </v-col>
	              </v-row>
	            </div>
	          </v-expand-transition>

	        <template v-if="currentCard.IS_CONFIRMED && currentCard.SQUARE">

	          <h4 class="text-center grey-text margin-bottom-main" id="services">
	            {{ pageContent.selectService ? pageContent.selectService : "Выбрать услугу"}}
	          </h4>

	          <services-switch :place="currentCard" :services="page.services"/>

	          <div class="margin-bottom-small">
	            <h4 class="text-center grey-text mb-4"> {{ pageContent.regularService ? pageContent.regularService : "Регулярное выполнение услуг"}}

	            </h4>
	            <p class="body-1"> {{ pageContent.periodicService ? pageContent.periodicService : "Закажите периодическое обслуживание данного захоронения. Это позволит нам ухаживать за ним менее затратно."}}</p>
	          </div>
	          <div  class="d-flex justify-center flex-wrap mx-auto mx-lg-0 ">
	<!--            <v-col  cols="12" sm="12" md="6" lg="6"  class="d-flex justify-center align-stretch px-0 px-md-8 mb-sm-8 mb-lg-0 ">-->
	              <card-tariff v-for="item in tariffs" :key="item.ID"  :place="currentCard" :item='item'  />
	<!--            </v-col>-->
	          </div>

	          <!--          <v-card-actions class="d-flex flex-column  pb-8 pb-lg-16">-->

	          <!--        BTN -->
	          <!-- <v-row class="justify-center padding-bottom-main settings__btn-wrapper mx-auto">

	            <v-btn block large  :class="totalServicePrice > 0 ? 'theme--dark btn--secondary' : 'v-btn v-btn--block v-btn--contained v-btn--disabled theme--light v-size--large'"
	                   @click="goToCards">
	              <svgicon class="mr-4" name="toggle-left" :color="totalServicePrice > 0 ? '#fff' : '#234052'" width="24" height="24" :fill="false"/>

	            </v-btn>

	          </v-row>  -->
	        </template>
	        <template v-else>
	          <div class="h5 grey-text pb-4">
	            {{pageContent.confirmationPlaceholder || 'Место захоронения на подтверждении'}}
	          </div>
	          <p class="body-1 grey-text  pb-8">
	            {{dialogs.confirmationSubtitle || 'Заказ и оплата услуг будут доступны после подтверждения места захоронения нашими сотрудниками.'}}
	          </p>
	        </template>


	          <!--          </v-card-actions>-->

	        </v-card>
	      </v-col>
	    </v-row>

	    <thank-you v-model="dialog" ref="thankYou" :message="this.message"/>
	    <v-dialog class="round"
	              v-model="deletePlaceDialog"
	              width="500"
	              content-class="elevation-0"
	    >
	      <v-card class="pa-4 pa-8 round">
	        <div class="d-flex flex-column pa-md-8">
	          <div class="mb-8 d-flex align-center justify-center">
	            <img src="@/assets/images/Question.png"/>
	          </div>

	          <v-card-text class="body-1 text-center pb-8" v-html="dialogs.deletePlace ? dialogs.deletePlace : 'Вы хотите удалить запись о месте захоронения? <br> Это действие нельзя отменить.'">
	          </v-card-text>

	          <div class="d-flex flex-column align-center block-max-width">
	            <v-btn
	                    class="btn--secondary  mb-4" dark block
	                    @click="onDeletePlace"
	            >
	              {{ pageButtons.confirm ? pageButtons.confirm : 'Подтвердить'}}
	            </v-btn>

	            <v-btn class="btn--primary"
	                   dark
	                   block
	                   @click="deletePlaceDialog = false"
	            >
	              {{pageButtons.back ? pageButtons.back : 'Назад'}}
	            </v-btn>
	          </div>

	        </div>
	      </v-card>
	    </v-dialog>


	    <transition name="fade" mode="out-in">
		    <v-alert
				    v-if="isPictureSaved"
		            dense
		            color="#234052"
		    >
		      <v-row align="center" justify="center">
		        <v-col class="grow">
		          <span> {{ dialogs.isPictureSaved ?  dialogs.isPictureSaved :  "Изображение сохранено"}}</span>
		        </v-col>
		      </v-row>
		    </v-alert>
	    </transition>
		  <error-msg v-model="isError" ref="errorMsg" :error="this.error"/>
	  </v-container>
  </div>
</template>

<script>
import errorMsg from '../elements/error-msg'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import dataForm from "../../components/elements/account-elements/data-form";
import formAvatar from "../../components/elements/account-elements/form-avatar"
import CardTariff from '../elements/tariff-elements/card-tariff.vue'
import servicesSwitch from "../../components/elements/account-elements/services-switch"
import thankYou from "@/components/elements/thankYou";

export default {
  name: 'settings',
  components: {dataForm, formAvatar, servicesSwitch, thankYou, PulseLoader, CardTariff, errorMsg},
  data: () => ({
    isPictureSaved: false,
    isError: false,
    error: {text: ''},
    expand: false,
    loading: false,
    file: null,
    photoFile: null,
    dialog: false,
    deletePlaceDialog: false,
    settings: {
      services: [],
      total: Number,
    },
    regStr: /^[a-zA-Zа-яА-Я\s]*$/
  }),
  computed: {
    message() {
     return this.pageContent?.dataSaved ? this.pageContent.dataSaved : 'Данные сохранены.'
    },
    cardId() {
      return this.$route.params?.id;
    },
    currentCard() {
      return this.page.item
    },
    page() {
      return this.$store.state.page.PlaceItemController
    },
    tariffs() {
       return this.page.tariffs
    },
    pageButtons() {
      return this.$store.state.common?.buttons;
    },
    pageContent() {
      return this.$store.state.page.PlaceItemController.texts.content || {}
    },
    dialogs() {
      return this.$store.state.common?.dialogs || {}
    },
    isMobileApp() {
      return this.$store.state.common.isMobileApp;
    },
	isWindowSM() {
      return this.$store.getters.isWindowSM;
	}
  },
  methods: {
    tariffName(place) {
      console.log('tariffName(place)', this.tariffs.find(el => el.ID == place.PLACE_TARIFF))
        return this.tariffs.find(el => el.ID == place.PLACE_TARIFF).NAME
    },
    fileUpload(file) {
        this.file = file
    },
    showDataForm() {
      this.expand = !this.expand
    },
	validate() {
		  console.log("PERSON_LAST_NAME check" , this.currentCard.PERSON_LAST_NAME , this.currentCard.PERSON_LAST_NAME.length === 0 ,  !(/^[a-zA-Z\s]*$/.test(this.currentCard.PERSON_LAST_NAME))
		  )

		  if (this.currentCard.PERSON_LAST_NAME.length === 0  || !this.regStr.test(this.currentCard.PERSON_LAST_NAME)) {
			  this.currentCard.isError = true
			  this.error = {
				  title: this.pageContent?.checkInfo ? this.pageContent.checkInfo : "Проверьте ввод",
				  text: this.pageContent?.addNameErr ? this.pageContent.addNameErr : "Пожалуйста проверьте ввод Фамилии умершего."
			  }
			  this.$store.state.isError = true;
			  return true
		  } else if(this.currentCard.PERSON_FIRST_NAME.length === 0  ||  !this.regStr.test(this.currentCard.PERSON_FIRST_NAME)) {
			  this.isError = true
			  this.error = {
				  title: this.pageContent?.checkInfo ? this.pageContent.checkInfo : "Проверьте ввод",
				  text: this.pageContent?.addSecondNameErr ? this.pageContent.addSecondNameErr : "Пожалуйста проверьте ввод Имени умершего."
			  }
			  this.$store.state.isError = true;
			  return true
		  } else if ( this.currentCard.PERSON_PATRONYMIC_NAME.length === 0  || !this.regStr.test(this.currentCard.PERSON_PATRONYMIC_NAME)) {
			  this.isError = true
			  this.error = {
				  title: this.pageContent?.checkInfo ? this.pageContent.checkInfo : "Проверьте ввод",
				  text: this.pageContent?.addThirdNameErr ? this.pageContent.addThirdNameErr : "Пожалуйста проверьте ввод Отчетсва умершего."
			  }
			  this.$store.state.isError = true;
			  return true
		  } else if (this.currentCard.NAME.length === 0) {
			  this.isError = true
			  this.error = {
				  title: this.pageContent?.checkInfo ? this.pageContent.checkInfo : "Проверьте ввод",
				  text: this.pageContent?.addAddressErr ? this.pageContent.addAddressErr : "Пожалуйста, укажите адрес кладбища."
			  }
			  this.$store.state.isError = true;
			  return true
		  } else if (this.currentCard.PLACE_NUMBER?.length === 0) {
			  this.isError = true
			  this.error = {
				  title: this.pageContent?.checkInfo ? this.pageContent.checkInfo : "Проверьте ввод",
				  text: this.pageContent?.addPlaceErr ? this.pageContent.addPlaceErr : "Пожалуйста, укажите номер места."
			  }
			  this.$store.state.isError = true;
			  return true
		  } else {
			  return false;
		  }
	  },
    saveDataForm() {
	    console.log("this.validate()", this.validate())
	    if (this.validate() == true)  {
		    console.log("this.validate()", this.validate())
		    return;
	    }

      this.loading = true
        let formData = new FormData();

        Object.keys( this.currentCard).forEach((key) => {
          if(key == 'PROPERTY_DOCUMENT') {
            console.warn("Skipped");
            return;
          }

          formData.append(key, this.currentCard[key] === null ? "" : this.currentCard[key]);
        });

        if (this.file) {
          formData.append("PROPERTY_DOCUMENT", this.file);
        }

        if (this.photoFile) {
          formData.append("DETAIL_PICTURE", this.photoFile);
        }

        this.$store.dispatch('post', {
        action: 'PlaceItemController',
        params: formData,
      }).then(() => {
        this.loading = false
        //this.expand = !this.expand
        this.openThankYou()
        this.dialog = true

      }).catch((error) => {
          this.isError = true;
          this.error.text = error?.error ? error.error : {detail: this.dialogs?.error ? this.dialogs.error : 'Ай-яй! Всё плохо!'};
      })
    },
    onDeletePlace() {
      this.$store.dispatch('post', {
          action: 'RemovePlaceController',
          params: {'ID': this.currentCard.ID}
      }).then((res) => {
        this.deletePlaceDialog = false;
        this.$router.push({name: 'memory-places'})
      }).catch((err) => {
          console.log('err', err)
      })
    },
    isAnyServiceChosen(){
      return this.currentCard.services.filter(service => service.included).length > 0
    },
    goToCards() {
      this.$router.push({name: 'memory-places'})
    },
    openThankYou() {
      this.$refs.thankYou.showThankyou();
    },
    imageUpload(photo) {
      this.photoFile = photo
      let formData = new FormData();

      Object.keys(this.currentCard).forEach((key) => {
        if(key == 'PROPERTY_DOCUMENT') return;
        formData.append(key, this.currentCard[key] === null ? "" : this.currentCard[key]);
      });

      if (this.file) formData.append("PROPERTY_DOCUMENT", this.file);
      if (this.photoFile)  formData.append("DETAIL_PICTURE", this.photoFile);
      this.$store.dispatch('post', {
        action: 'PlaceItemController',
        params: formData,
      }).then(() => {
        console.log("isPictureSaved " , this.isPictureSaved );
        this.isPictureSaved = true;
        setTimeout(() => this.isPictureSaved = false, 3000)
      }).catch((error) => {
        this.isError = true
        this.error.text = error?.error ? error.error : {detail: 'Ай-яй! Всё плохо!'};
      })
    },
    submit() {
      //Открываем модальное окно v-dialog с сообщением
      this.openThankYou();
      setTimeout(() => {
            this.goToCards()
          }, 2500
      )
    }
  },
  mounted() {
    //this.form.photo = this.$store.state.memories.filter(x => x.ID == this.cardId)[0].photo;
    if (this.$route.params.edit) this.showDataForm()
    if (this.$route.params.services) {
      let el = document.getElementById('services');
      window.scrollTo({
        top: el.offsetTop + 100,
        behavior: "smooth"
      });
    }
  }

}
</script>

<style lang="scss">
.settings {
	position: relative;
  .v-alert {
    position: fixed;
	z-index: 10;
    left: 50%;
    bottom: 65%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
	font-family: $font-family-secondary;
	color: $white;
	font-size: 22px;
  }

  &__btn-wrapper {
    max-width: 278px;
    width: 100%;

  }

  &__btn-section {
    width: 254px ;
    margin: 0 auto ;
  }

  .beige-text {
    position: relative;
    z-index: 2 !important;
  }

  &__card {
    // &:nth-child(odd) {
    //   @include up($sm) {
    //     justify-content: flex-start;
    //   }
    // }
    // &:nth-child(even) {
    //   @include up($sm) {
    //     justify-content: flex-end;
    //   }
    // }

    .col-12:nth-child(odd) {
      margin-right: 0;

      @include up($md) {
        padding-right: 32px !important;

      }
    }
    .col-12:nth-child(even) {
      margin-right: 0;
      @include up($sm) {
        // margin-right: 15px !important;
      }
      @include up($md) {
        padding-left: 32px !important;
      }
    }
  }

}
</style>
