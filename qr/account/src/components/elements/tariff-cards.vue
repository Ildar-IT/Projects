<template>
    <div class="tariff-cards anti-margin-row">
        <v-row class="ma-0 justify-center align-stretch">
            <v-col v-for="(card, idx) in pageTariffs" :key="idx" cols="12" sm="6" md="4" class="ma-0 pa-0">
                <div class="margin-left-small margin-right-small margin-bottom-main">
                    <card class="d-flex flex-column justify-space-between">
                        <div>
                            <div class="text-center h7 gray-text mb-8">
                                {{ card.NAME }}
                            </div>
                            <div class="tariff-cards__image__wrap mb-8">
                                <v-img class=" tariff-cards__image"
                                       :src="card.PREVIEW_PICTURE"/>
                            </div>

                            <div class="body-2 text-center h7 mb-8 "> {{ card.PREVIEW_TEXT }}</div> 
                            <tariff-features :tariff="card" class="mb-8"/>
                        </div>

                          <v-col v-if="card.MAX_POLLS && card.PRICE" cols="12" class="ma-0 pa-0">
                            <div class="margin-bottom-small">
                              <v-select
                                  item-text="name"
                                  item-value="value"
                                  :items="pollsNumber(numberOfPollsInTariff)"
                                  v-model="numberOfPolls"
                              ></v-select>
                            </div>
                          </v-col>

                          <!-- не по цене решать, что это комплексный! -->
                          <v-col v-if="card.PRICE" cols="12" class="ma-0 pa-0">
                            <div class="margin-bottom-small">
                              <v-select
                                  item-text="name"
                                  item-value="value"
                                  :items="periodsDisplay"
                                  v-model="period[idx]"
                              ></v-select>
                            </div>
                          </v-col>
                            <!-- не по цене решать, что это комплексный! -->
                            <div class="text-center h5 mb-8">
                                <span v-if="card.PRICE">{{ computedPrice(card, idx) | price }} ₽ {{ pricePeriodLabel(card,idx) }} </span>
                                <span v-else> Бесплатно </span>
                            </div>

                        <div class="flex-center" v-if="isAuthorized">
                            <v-btn block small
                                   @click="$emit('select', {tariff: selectedCard(card), period: ( period[idx]) })"
                                   :class="cardClass(selectedCardID(card), idx)">
                                <pulse-loader v-if="card.loading" :loading="true" color="#fff" size="5px"/>
                                <span v-else>{{ currentTariff.ID == selectedCardID(card, idx) && currentPeriod == period[idx]  ? 'Текущий тариф' : card.BTN_LABEL }}</span>
                            </v-btn>
                        </div>

                    </card>
                </div>
            </v-col>
        </v-row>
    </div>

</template>

<script>
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import TariffFeatures from "../elements/tariff-features";

    export default {
        name: "tariff-cards",
        components: {
            PulseLoader,
            TariffFeatures
        },
        data() {
            return {
             // periods: [{name: "Месячная оплата", value: 1}, {name: "Ежегодная оплата", value: 12}],
              period: [],
              numberOfPolls: null
            }
        },
        computed: {
            isPremium() {
               return this.$store.getters.isPremium;
            },
            tariffs() {
                return this.$store.getters.tariffs;
            },
            isAuthorized() {
                return !!this.$store.state.session?.user;
            },
            currentTariff() {
                return this.$store.state.session?.user?.TARIFF;
            },
            currentPeriod() {
                return this.$store.state.session?.user?.UF_PAYMENT_PERIOD;
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
            pageTariffs() { 
              return this.uniqueNamesTariffs( this.tariffs , it => it.NAME)
            },
            numberOfPollsInTariff() { 
              return this.complexTariffs.map(({ MAX_POLLS }) => MAX_POLLS)
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
              console.log(periodsTemp)
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
            // pricePeriodLabel() { 
            //   let label = this.periodsDisplay.find(el => el.value ==  (this.currentPeriod.value || this.currentPeriod) ).priceTag;
            //   return label
            // },

            
        },
        methods: {
            selectedCard(card, idx) {                        
                if (this.complexTariffs.some( el => el.NAME == card.NAME) )  {                  
                  return this.complexTariffs.find( el => el.MAX_POLLS == (this.numberOfPolls?.value || this.numberOfPolls));
                } else  return card 
                         
            },
            selectedCardID(card, idx) {
                  if (this.complexTariffs.some( el => el.NAME == card.NAME) )  { 
                    console.log("cardID", this.complexTariffs.find( el => el.MAX_POLLS == (this.numberOfPolls?.value || this.numberOfPolls)).ID)                 
                    return this.complexTariffs.find( el => el.MAX_POLLS == (this.numberOfPolls?.value || this.numberOfPolls)).ID;
                  } else  {
                    console.log("cardID not complex", card.ID, )
                    return card.ID
                  }                 
            }, 
            pricePeriodLabel(card, idx) { 
             if(!card.PRICE) return ""
              let label
               this.periodsDisplay.map(el => {            
                //console.log(el.value, this.period[idx], el.value ==  this.period[idx])             
                if (el.value ==  this.period[idx])  {
                  label =el
                } 
                 })          
              return label ? label.priceTag : "";
            },
            uniqueNamesTariffs(data, key) {
                return [
                  ...new Map (
                    data.map(x => [key(x), x])
                  ).values()
                ]
            },
            cardClass(tariffID, idx) { 
              // Если премиум, то смотрим также период оплаты для вывода корректного класса кнопки 
                if(this.isPremium) {                  
                  if (this.currentTariff.ID !== tariffID ||  this.currentPeriod !=  this.period[idx]  ) return 'primary';
                    return 'primary_disabled v-btn--disabled v-size--small';
                } else {                  
                   if ( this.currentTariff.ID !== (tariffID.ID || tariffID) ) return 'primary';
                  return 'primary_disabled v-btn--disabled v-size--small';
                }       
            },
            pollsNumber(a) { // TODO use string end() utils
              let arr = [] 
               a.forEach(el => { 
                 if (el == 1)  arr.push( {name:`${el} опрос`, value: el}) 
                 else if (el > 1 && el < 5 ) arr.push( {name:`${el} опроса`, value: el}) 
                 arr.push( {name:`${el} опросов`, value: el}) 
                 });  
              return arr
            }, 
            computedPrice(card, idx) { 
              //console.log("Compare: ", "ids", this.currentTariff.ID, this.selectedCardID(card, idx).ID , this.currentTariff.ID == this.selectedCardID(card, idx) && this.currentPeriod == this.period[idx])
              //console.log("card.PRICE" , card.PRICE)
              if (card.PRICE) {                
                let tariffPrice
                // Если это комплексный тариф, то ищем цену исходя из количества опросов  
                if( this.complexTariffs.some( el => card.ID == el.ID)) {
                  tariffPrice = this.complexTariffs.find( el => el.MAX_POLLS == (this.numberOfPolls.value || this.numberOfPolls)).PRICE;
                } else {
                    tariffPrice = this.tariffs.find(el => el.ID == card.ID).PRICE;
                }                
                  let tariffDiscount 
                  this.periodsDisplay.map(el =>  {
                    if (el.value ==  this.period[idx]) tariffDiscount = el
                      })  
                  return tariffPrice * ( this.period[idx]) * ( 1 - tariffDiscount?.discount) 
              }
              return  card.PRICE
            }
        },
        created() { // если у пользователя нет оплаченного тарифа, то показываем 1 мес и 1 опрос в селекте  
            this.period.length = this.pageTariffs.length
            this.numberOfPolls = {name: "1 опрос", value: 1}           
            this.period.fill("1")        
          if (this.isPremium && this.isAuthorized) { 
            //console.log(" this.pageTariffs.length",  this.pageTariffs.length
            this.currentTariff.MAX_POLLS ? this.numberOfPolls = this.currentTariff.MAX_POLLS :  this.numberOfPolls = {name: "1 опрос", value: 1}
            if (this.currentPeriod ) {
                // Подключен комплексный тариф? 
                 if( this.complexTariffs.some( el => this.currentTariff.ID == el.ID)) {
                    this.period[1] = this.currentPeriod;
              } else {
                this.period[1] = this.currentPeriod;
              }
          }
        }
     }
    }
</script>

<style lang="scss">
    .tariff-cards {
        overflow: hidden;

        .card {
            min-height: 800px;
        }

        &__image {
            cursor: pointer;
            /*border-radius: 32px;*/
            @include transition-long();

            &:hover {
                overflow: hidden;
                transform: scale(1.1);
            }

            &__wrap {
                overflow: hidden;
                border-radius: 32px;
            }
        }

        button.v-btn.primary_disabled.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
            background-color: $gray0 !important;
            text-transform: inherit;
            font-family: $heading-font-family;
            font-style: normal;
            font-weight: bold;
            font-size: 17px;
            width: 100%;
            @include transition();

            span.v-btn__content {
                color: #FFFFFF !important;
            }

            &:before {
                background-color: $gray0 !important;
            }
        }

      }

        .menuable__content__active::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
          }

          .menuable__content__active::-webkit-scrollbar {
            width: 6px;
          }

          .menuable__content__active::-webkit-scrollbar-track {
            background: #F3F4FC;
          }
</style>
