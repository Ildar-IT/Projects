<template>
    <card v-if="data"
          :class="noCard? 'no-card' : (isWindowLG && !small)?  '': 'dashboard-moods__card'">
        <div class="dashboard-moods">
            <div class="h7 flex-center gray-text mb-6">
                Общее настроение ответов
            </div>

            <template v-if="questionsCount">

<!--                отображается на главной странице dashboard а большом экране-->
                <template v-if="isWindowLG && !small">
                    <div class="flex-space-between">
                        <div class="">
                            <h3 class="light-green-text dashboard-moods__num text-end">
                                {{sharePositives}}%
                            </h3>
                            <div class="body-3 dark-gray-text text-end">Позитив</div>
                        </div>
                        <div class="position-relative" >
                            <pie-chart :chartData="data"/>
                            <div class="dashboard-moods__smile ">
                                <svgicon :name="smile" original width="64" height="64"/>
                            </div>
                        </div>

                        <div class="">
                            <h3 class="red-text dashboard-moods__num">
                                {{shareNegatives}}%
                            </h3>
                            <div class="body-3 dark-gray-text">Негатив</div>
                        </div>                      
              
                    </div>
                        <div class="flex-center d-flex flex-column mt-4">
                            <h3 class="neutral-text pl-4 dashboard-moods__num">
                                {{shareNeutrals}}%
                            </h3>
                            <div class="body-3 dark-gray-text">Средне</div>
                      </div>
                </template>

<!--                отображается в остальных случаях-->
                <template v-else>
                    <div class="dashboard-moods__chart">
                        <pie-chart class="mb-6 mx-auto pie-chart" :chartData="data"/>
                        <div class="dashboard-moods__smile"
                             :style="dashboardMoodsSmile" >
                            <svgicon :name="smile" original width="64" height="64"/>
                        </div>
                        <div class="flex-space-between flex-wrap">
                            <div class="flex align-baseline">
                                <div class="light-green-text mr-2"
                                     :class="isWindowLG? 'h6':'h6'">
                                    {{sharePositives}}%
                                </div>
                                <div class="body-3 dark-gray-text text-end mr-2">Позитив</div>
                            </div>

                            <div class="flex align-baseline">
                                <div class="red-text mr-2"
                                :class="isWindowLG? 'h6':'h6'">
                                    {{shareNegatives}}%
                                </div>
                                <div class="body-3 dark-gray-text">Негатив</div>
                            </div>
                            
                            <div class="flex flex-center mt-2">
                                <div class="neutral-text mr-2"
                                :class="isWindowLG? 'h6':'h6'">
                                    {{shareNeutrals}}%
                                </div>
                                <div class="body-3 dark-gray-text">Средне</div>
                            </div>
                        </div>
                    </div>
                </template>
            </template>
            <template v-else>
                <div class="text-center gray-text boby-1">
                    Пока нет ответов
                </div>
            </template>
        </div>
    </card>
</template>

<script>
    import PieChart from "./pie-chart";
    import {nf} from "@/utils/string";

    export default {
        name: "moods-card",
        components: {PieChart},
        props: ['chartData', 'small', 'noCard'],
        computed: {
            isWindowXS() {
                return this.$store.getters.isWindowXS;
            },
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
            isWindowMD() {
                return this.$store.getters.isWindowMD;
            },
            isWindowXL() {
                return this.$store.getters.isWindowXL;
            },
            questionsCount() {
                return this.chartData.countNegatives+this.chartData.countPositives +  this.chartData.countNeutrals
            },
            dashboardMoodsSmile() {
                if (this.noCard) {
                    if (this.isWindowXL) return { 'top': '103' }
                    //else if (this.isWindowXS) return { 'top': '85px' }
                    else return { 'top': '85px'  }
                }
                else if (this.small) {
                  if (this.isWindowXL) return { 'top': '103' }
                  //else if (this.isWindowXS) return { 'top': '85px' }
                  else return { 'top': '85px'  }
                }
                else{
                  if (this.isWindowXL) return { 'top': '103' }
                  //else if (this.isWindowXS) return { 'top': '85px' }
                  else return { 'top': '85px'  }
                }
            },
            data() {
                if (!this.chartData) return null;

                let negatives = this.chartData.countNegatives || 0;
                let positives = this.chartData.countPositives || 0;
                let neutrals = this.chartData.countNeutrals || 0;
                let sum = negatives + positives + neutrals;
                negatives = negatives / sum * 100;
                positives = positives / sum * 100;
                neutrals = neutrals / sum * 100;
                neutrals
                return {
                    hoverBackgroundColor: "red",
                    hoverBorderWidth: 5,
                    labels: ["Негатив", "Позитив", "Средне"],
                    datasets: [
                        {
                            borderWidth: 5,
                            hoverBorderWidth: 5,
                            pointBackgroundColor: 'white',
                            hoverBorderColor: 'white',
                            backgroundColor: ["#F35A45", "#87F345",  '#FFCF99'],
                            data: [negatives, positives, neutrals]
                        }
                    ]
                };
            },
            shareNegatives() {
                let value = this.data.datasets[0]?.data[0] || 0;
                return nf(value, 1);
            },
            sharePositives() {
                let value = this.data.datasets[0]?.data[1] || 0;
                return nf(value, 1);
            },
            shareNeutrals() {
                let value = this.data.datasets[0]?.data[2] || 0;
                return nf(value, 1);
            },
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
            smile() {
                if ( !this.data.datasets || !this.data.datasets[0] || !this.data.datasets[0].data ) return 'upside down';
                if (this.data.datasets[0].data[0] === this.data.datasets[0].data[1]) return 'neutral';
                if (this.data.datasets[0].data[0] > this.data.datasets[0].data[1] ) return 'anger';
                return 'smile';
            }
        },
        mounted() {

        }
    }
</script>

<style lang="scss">
    .dashboard-moods {
        max-width: 650px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        position: relative;

        .pie-chart {
            max-width: 232px;
            @include up($sm) {
                width:unset;
            }
        }
    

        &__card{
            min-height: 450px;
            display: flex;
            flex-direction: column;
            align-content: space-between;
            justify-content: space-between;
            @include up($lg) {
                min-height: 410px;
            }
        }

        &__num{
            width: 160px;
        }

        &__chart {
            width: 100%;
            max-width: 272px;
            margin-right: auto;
            margin-left: auto;
            position: relative;
        }

        &__smile {
            width: 100%;
            position: absolute;
            display: flex;
            justify-content: center;
            top: 103px;

            @include up($lg) {
                top: 83px;
            }

            &--auto {
                top: auto;
            }

            /*@include up($lg){
                top: auto;
            }*/
        }
    }
</style>