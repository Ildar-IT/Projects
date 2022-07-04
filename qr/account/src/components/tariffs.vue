<template>
    <div class="tariffs layout-top">
        <h1 class="text-center margin-bottom-main">
            Варианты тарифов
        </h1>

        <tariff-cards @select="onSelectTariff"/>

        <v-dialog
                v-model="showDialog"
                persistent
                overlay-opacity="0.5"
                overlay-color="#8189A8"
                max-width="500">
            <card>
            <div class="d-flex flex-column pa-md-4">
              <div class="mb-8 d-flex align-center justify-center">
                <img src="@/assets/Question.png" />
              </div>
               <div class="h5 text-center pb-8" v-html="paymentMessage"></div>
                <div class="d-flex flex-column align-center block-max-width">
                    <v-btn block class="primary mb-4"  @click="onOk">Да, давайте</v-btn>
                    <v-btn class=" v-btn--flat v-btn--text v-size--large primary--text ml-0"  @click="onCancel">Отмена</v-btn>
                </div>
              </div>
            </card>
        </v-dialog>

        <your-balance v-if="showPayForm"
                      ref="paymentForm"
                      :sum="paymentSum"
                      :tariff="tariff"
                      :period="selectedPeriod"
                      class="mb-8"/>

    </div>
</template>

<script>
    import Vue from 'vue';
    import TariffCards from "./elements/tariff-cards";
    import YourBalance from "./elements/your-balance";
    import {nf} from "../utils/string";
    import Message from "./elements/message";

    export default {
        name: 'tariffs',
        components: {
            Message,
            TariffCards,
            YourBalance
        },
        data: () => ({
            showDialog: false,
            showPayForm: false,
            paymentMessage: '',
            paymentSum: 0,
            tariff: null,
            requestStatus: null,
            message: '',
            selectedPeriod: null
        }),
        computed: {
            user() {
                return this.$store.state.session.user;
            },
            tariffs() {
                return this.$store.getters.tariffs;
            },
            complexTariffs() {
              let temp = this.tariffs.reduce(function(p, c){
                  p[c.NAME] = (p[c.NAME] || 0) + 1;
                  return p;
                }, {});
                let result = this.tariffs.filter(function(obj){
                  return temp[obj.NAME] > 1;
                });
              return result
            },

            periods() {  // перенести в геттер 
              let  periodsTemp
              if(this.complexTariffs.length > 0) {
                periodsTemp = JSON.parse(this.complexTariffs[0].PERIOD_DISCOUNTS?.TEXT);
                for (let key in periodsTemp) {              
                    periodsTemp[key] = Number(periodsTemp[key]);
                }
              } else {                
                periodsTemp = JSON.parse(this.tariffs.find(el => el.PRICE !==0).PERIOD_DISCOUNTS?.TEXT)
              }
              
              return periodsTemp;
            },
            periodsDisplay() {
              let values =[];
               for (let key in this.periods) {
                    if(key==1)  values.push( {name: "Месячная оплата" , value: key, discount: this.periods[key], priceTag: "/ мес." })
                    if(key==6)  values.push( {name: "Полугодовая оплата" , value: key, discount: this.periods[key], priceTag: "/ 6 мес." })
                    if(key==12)  values.push( {name: "Ежегодная оплата" , value: key, discount: this.periods[key], priceTag: "/ год." })
                }
              return values
            },
        },
        methods: {
            onSelectTariff(payload) {
                this.tariff = payload.tariff;
                this.selectedPeriod = payload.period; 
                                
                //Рассчет необходимой суммы доплаты
                let diff 
                if( this.tariff.PRICE != 0 ) {
                  diff = this.computedPrice(payload.tariff, this.selectedPeriod) - parseInt(this.user.BALANCE||0) - parseInt(this.user.amountLeftInCurrentTariff || 0); 
                  diff = Math.round(diff)     
                }   
                if (  this.tariff.PRICE !== 0  && diff > 0 ) {
                    this.paymentMessage = "Для подключения тарифа '" + payload.tariff.NAME + "' необходимо пополнить баланс<br />на <b>" + nf(diff) + " ₽</b>";
                    this.showDialog = true;
                    this.onAfterOk = () => {
                        this.showPayForm = true;
                        this.paymentSum = diff;
                        setTimeout(()=>{
                            this.$refs['paymentForm'].$el.scrollIntoView({
                                behavior: 'smooth'
                            });
                        },100);
                    };
                }
                else {
                    this.paymentMessage = "Подключить тариф '" + payload.tariff.NAME + "'?";
                    this.showDialog = true;
                    this.onAfterOk = () => {
                        Vue.set(this.tariff, "loading", true);
                        this.$store.dispatch('applyForTariff', {tariff: payload.tariff, period: this.selectedPeriod}).then(()=>{
                            this.$router.push({name:'subscription'});
                        });
                    }
                }
            },
            computedPrice(tariff, period) {  
              console.log("period", period);
              let tariffDiscount = this.periodsDisplay.find(el => el.value ==  period ).discount; 
              this.periodsDisplay.forEach(el => { 
                if ( el.period == period ) tariffDiscount = el.discount
               })                  

                return tariff.PRICE * period * ( 1 -tariffDiscount ) 
            },
            onOk() {
                this.showDialog=false;
                if ( this.onAfterOk ) this.onAfterOk();
            },
            onCancel() {
                this.showDialog=false;
                this.showPayForm=false;
            }
        }
    }
</script>

<style lang="scss">
</style>
