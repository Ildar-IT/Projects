<!--Colorful progress bar for LIKES, SMILES and STARS-->
<template>
    <div class="progress-bar" :class="chartTypeClass">
        <div class="progress-bar__inner">
            <!--  Делим progress bar на части, создаем маленькие дивы    -->
            <div v-for="answer in answerStats" :style="widthStyle(answer)"
                 :title="textShare(answer)"
                 :class="ratingClasses(answer.key)"></div>
        </div>
    </div>
</template>
<script>
    import {nf, end} from "@/utils/string";
    import Config from "@/config";

    export default {
        name: "progress-bar-votes",
        props: ["answerStats", "questionType"],
        computed: {
            /**
             * Считаем сумму всех элементов (вариантов ответов) для progress bar
             */
            total() {
                // console.log(this.answers);
                return this.answerStats.reduce((accumulator, item) => accumulator + parseFloat(item.value || 0), 0);
            },
            chartTypeClass() {
                return ["progress-bar--" + this.questionType];
            }
        },
        methods: {
            textShare(answer) {
                let str = nf((answer.value / this.total) * 100, 1) + "%";
                if ( this.questionType === Config.QUESTION_TYPE.LIKE ) {
                    let what = answer.key === 1 ? end(answer.value, "лайк", "лайка", "лайков")
                        : end(answer.value, "дизлайк", "дизлайка", "дизлайков");
                    str = answer.value + " " + what + " (" + str + ")";
                }
                else if ( this.questionType === Config.QUESTION_TYPE.SMILE ) {
                    let what = answer.key === 1 ? end(answer.value, "смайл", "смайла", "смайлов")
                        : end(answer.value, "слеза", "слезы", "слез");
                    str = answer.value + " " + what + " (" + str + ")";
                }
                else if ( this.questionType === Config.QUESTION_TYPE.STARS ) {
                    str = answer.key + " " + end(answer.key, "звезда", "звезды", "звезд") + " (" + str + ")";
                }
                else if ( this.questionType === Config.QUESTION_TYPE.SELECT ) {
                    str = answer.key ? answer.key + " (" + str + ")" : "";
                }
                return str;
            },
            ratingClasses(key) {
                let classes = ['progress-bar__rating'];
                if ( this.questionType === Config.QUESTION_TYPE.SELECT ) classes.push('progress-bar__rating--' + (key?"option":"empty"));
                else classes.push('progress-bar__rating--' + key);
                return classes;
            },
            widthStyle(answer) {
                //total = сумма всех ответов, value = количество ответов конкретного типа
                return {
                    width: (answer.value / this.total) * 100 + "%"
                }
            },
        },
    }
</script>

<style lang="scss">
    .progress-bar {
        box-sizing: border-box;
        border-radius: 1000px;
        font-weight: bold;
        text-align: center;
        overflow: hidden;
        position: relative;

        @include transition();

        .progress-bar__inner {
            height: 100%;
            display: flex;
            background-color: white;
        }

        .progress-bar__rating {
            display: inline;
        }

        //Colors
        &--LIKE, &--SMILE {

            .progress-bar__rating {
                height: 10px;

                // негатив
                &---1 {
                    background-color: $red1;
                }
                
                &--0 {
                  background-color: $color-neutral;
                }

                // позитив
                &--1 {
                    background-color: $green1;
                }
            }
        }

        &--STARS {
            .progress-bar__rating {
                height: 10px;
                //Rating-1 соответствует ответу со значением "2 звезды"
                &--1 {
                    background-color: $red1;
                }

                //Rating-2 соответствует ответу со значением "2 звезды"
                &--2 {
                    background-color: $orange1;
                }

                // 3 соответствует ответу со значением "3 звезды"
                &--3 {
                    background-color: $yellow1;
                }

                // 4 соответствует ответу со значением "4 звезды"
                &--4 {
                    background-color: $green3;
                }

                // 5 соответствует ответу со значением "5 звезд"
                &--5 {
                    background-color: $green1;
                }
            }
        }

        &--SELECT {
            .progress-bar__rating {
                height: 5px;

                &--option {
                    background-color: $gray2;
                }

                &--empty {
                    background: #F0F0F0;
                }
            }
        }

        //для разных chartType
/*        &--line {
            //серая
            &_slim {
                width: 100%;
                height: 3px;
            }

            //цветная
            &_thick {
                height: 10px;
                width: 100%;
            }
        }*/
    }
</style>
