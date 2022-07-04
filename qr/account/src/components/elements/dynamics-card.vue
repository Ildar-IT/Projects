<template>
    <div class="dynamics-card" v-if="data">
        <card class=" margin-bottom-main"
              :class="noCard ? 'no-card' : 'dynamics-card__card'">
            <div class="dashboard-moods">
                <div class="h7 flex-center gray-text mb-8">
                    Динамика ответов
                </div>
                <template v-if="questionsCount">
                    <div>
                        <bar-chart
                                :class="small? 'mb-8' : 'margin-bottom-main'"
                                :chartdata="data" :visible="visible"/>
                    </div>
                    <div class="flex-center">
                        <v-btn small class="secondary" @click="downloadXLS">
                            <span>Экспорт в XLS</span>
                        </v-btn>
                    </div>
                </template>
                <template v-else>
                    <div class="text-center gray-text boby-1">
                        Пока нет ответов
                    </div>
                </template>
            </div>
        </card>
    </div>
</template>

<script>
    import BarChart from "./bar-chart";
    import {crossDownload} from "@/utils/utils";

    export default {
        components: {BarChart},
        props: ['chartData', 'small', 'noCard', 'visible', 'hash', 'period', 'question'],
        name: "dynamics-card",
        computed: {
            questionsCount() {
                return this.chartData.countNegatives + this.chartData.countPositives +  this.chartData.countNeutrals
            },
            data() {
                if (!this.chartData) return null;

                let negativeData;
                let positiveData;
                let neutralData
                if (this.chartData.datasets?.data[0])
                    negativeData = this.chartData.datasets.data[0].map(el => el * -1);
                if (this.chartData.datasets?.data[1])
                    positiveData = this.chartData.datasets.data[1];
                if (this.chartData.datasets?.data[2])
                    neutralData = this.chartData.datasets.data[2];
                return {
                    labels: this.chartData.labels,
                    // labels: ['1 янв.', '2 янв.', '3 янв.', '4 янв.', '5 янв.', '6 янв.', '7 янв.', '8 янв.', '9 янв.', '10 янв.',],
                    datasets: [
                        {
                            maxBarThickness: 12,
                            type: 'bar',
                            backgroundColor: '#f87979',
                            data: negativeData
                        },
                        {
                            maxBarThickness: 12,
                            type: 'bar',
                            backgroundColor: '#FFCF99',
                            data: neutralData
                        },
                        {
                            cornerRadius: 20,
                            radius: 12,
                            borderColor: "rgba(1, 116, 188, 0.50)",
                            maxBarThickness: 12,
                            backgroundColor: '#87F345',
                            data: positiveData
                        }
                    ],

                }
            },
            isPremium() {
                return this.$store.getters.isPremium;
            },
        },
        methods: {
            downloadXLS() {
                if (!this.isPremium) {
                    this.$store.state.common.premiumPopUpDialog = true;
                    return;
                }
                let period = this.period ? this.period : "-3";
                let params = '?period=' + period;
                if (this.hash) params += "&hash=" + this.hash;
                if (this.question) params += "&question=" + this.question;
                const url = "/api/ExportXLSController" + params;
                crossDownload(url);
            }
        },
    }
</script>

<style lang="scss">
    .dynamics-card {
        &__card {
            min-height: 450px;
            display: flex;
            flex-direction: column;
            align-content: space-between;
            justify-content: space-between;
            @include up($lg) {
                min-height: 417px;
            }
        }
    }
</style>
