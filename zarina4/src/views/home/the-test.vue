<template>
    <section class="the-test d-flex align-center justify-center">

        <transition name="fade" appear mode="out-in">
            <div v-if="result" class="d-flex align-center justify-center the-test__done" id="test-result" key="test3">
                <v-container>
                    <div class="d-flex flex-column align-center">
                        <h1 class="mt-16 text-center">{{result.title}}</h1>

                        <divider class="mb-8" color="accentColor"/>

                        <p>{{result.text}}</p>

                        <h3 class="mt-6">ПОДПИШИСЬ И НЕ ПРОПУСТИ ПРОКАЧКУ СКИЛЛОВ ОТ ZARINA.<br/>Старт в сентябре</h3>

                        <subscription-form class="mt-6"/>

                        <!--<div class="mt-6" v-html="tmpResultDebug" style="font-size:10px"></div>-->
                    </div>
                </v-container>
            </div>
            <div v-else-if="isTestRunning" class="mt-16 text-left the-test__qs" id="test-qs" key="test2">
                <v-container>
                    <div class="d-flex justify-space-between align-center">
                        <span class="the-test__qs__n">
                            Вопрос {{n}} / {{total}}
                        </span>
                        <button @click="restart">Начать заново</button>
                    </div>
                    <div class="mt-3">
                        <transition name="q" appear mode="out-in">
                            <the-test-q v-for="(q, index) of qs" :key="'q'+index"
                                        :i="index" v-if="currentIndex===index" @answer="answer"/>
                        </transition>
                    </div>
                </v-container>
            </div>
            <div v-else class="d-flex align-center justify-center the-test__intro" key="test1">
                <v-container>
                    <h1 class="text-center">пройди тест</h1>
                    <h3 class="text-center mt-2 mt-md-0">#силавтебе</h3>

                    <divider class="mb-8" color="accentColor"/>

                    <p>Хочешь узнать, в чем твоя сила? Прокачать свои внутренние ресурсы и понять, над чем еще предстоит
                        поработать? Пройди наш тест и раскрой свой внутренний потенциал.</p>

                    <button class="mt-8" @click="startTest">
                        Пройти тест
                    </button>
                </v-container>
            </div>
        </transition>

    </section>
</template>

<script>
    import Vue from 'vue';
    import Divider from '../../components/divider.vue';
    import TheTestQ from '../../components/the-test-q.vue';
    import SubscriptionForm from "../../components/subscription-form";

    export default {
        name: 'the-test',
        components: {
            SubscriptionForm,
            Divider,
            TheTestQ,
        },
        data() {
            return {
                currentIndex: 0,
                isTestRunning: false,
                score: {},
                result: null,
            }
        },
        computed: {
            isWindowMD() {
                return this.$store.getters.isWindowMD;
            },
            n() {
                return this.currentIndex + 1;
            },
            qs() {
                return this.$store.state.testQs;
            },
            total() {
                return this.qs.length;
            },
            results() {
                return this.$store.state.testResults;
            },
            tmpResultDebug() {
                let text = [];
                this.results.forEach(el => {
                    if (this.score[el.category]) text.push(el.category + ": " + this.score[el.category]);
                });
                return text.join(", ");
            }
        },
        methods: {
            startTest() {
                this.isTestRunning = true;
                this.$store.state.isTestRunning = true; // говорим всему аппу, что начат тест, это используется для скрытия формы подписки

                this.scrollTo("test-qs", (this.isWindowMD?-60:0));
            },
            answer(a) {
                const q = this.qs[this.currentIndex];
                if (!this.score[q.category]) Vue.set(this.score, q.category, 0);
                this.score[q.category] += a.score;

                if (this.currentIndex + 1 < this.qs.length) {
                    this.currentIndex++;
                    this.scrollTo("test-qs", (this.isWindowMD?-60:0));
                }
                else {
                    this.isTestRunning = false;

                    // calc result
                    let r;
                    this.results.forEach(el => {
                        if (!r || this.score[el.category] > this.score[r.category]) r = el;
                    });

                    this.result = r;
                    this.scrollTo("test-result", (this.isWindowMD?40:60));
                }
            },
            restart() {
                this.currentIndex = 0;
                this.score = {};
                this.result = null;
            },
            scrollTo(el, offset) {
                setTimeout(()=>{
                    //this.$scrollTo(document.getElementById(el));
                    //this.$router.push({ name: 'Home', hash: `#${el}` });
                    el = document.getElementById(el);
                    window.scrollTo({
                        top: el.offsetTop-(this.isWindowMD?70:60) + (offset||0),
                        behavior: "smooth"
                    });
                },350);
            },
        },
        created() {
            //this.result = this.results[0];
            //this.isTestRunning = true;
        }
    }
</script>

<style lang="scss">

    .the-test {
        min-height: 700px;

        &__done {
            width: 100%;
            min-height: 800px;
            padding: 40px 0 40px 0;
            box-sizing: border-box;
            text-align: center;
            background-image: url('~@/assets/the-test/bg.jpg');
            background-position: center;
            //background-size: 1200px;
            background-repeat: no-repeat;

            @include up($lg) {
                min-height: 900px;
                background-size: unset;
            }

            h1 {
                font-size: 40px;
                //line-height: 43.2px;
                max-width: 580px;
                margin: 0 auto;

                @include up($md) {
                    font-size: 48px;
                    line-height: 43.2px;
                }
            }

            p {
                margin: 0 auto;

                @include up($md) {
                    width: 80%;
                    max-width: 720px;
                }
            }
        }

        &__intro {
            width: 100%;
            height: 700px;
            box-sizing: border-box;
            text-align: center;
            background-image: url('~@/assets/the-test/bg.jpg');
            background-position: center;
            background-size: 1200px;
            background-repeat: no-repeat;

            @include up($lg) {
                height: 900px;
                background-size: unset;
            }

            p {
                margin: 0 auto;

                @include up($md) {
                    width: 80%;
                    max-width: 720px;
                }
            }
        }

        &__qs {
            width: 100%;
            background: $grey-color;
            border-radius: 12px;
            padding: 16px 8px;
            box-sizing: border-box;

            @include up($md) {
                width: 700px;
                min-height: 580px;
                padding: 48px;
                border-radius: 12px;
            }

            //@include transition();

            &__n {
                color: $taupe-color;
                font-weight: 400;
                font-size: 15px;
            }

            button {
                width: auto;
                background: $grey-color;
                border: 1px solid rgba(0, 0, 0, 0.2); //$taupe-color;
                font-weight: 400;
                font-size: 15px;
                padding: 8px 16px;
                //font-size: 12px;

                /*@include up($lg) {
                    margin: 0 16px;
                    font-size: 15px;
                    padding: 12px 32px;
                }*/

                &:active, &:hover {
                    color: $white-color;
                    background: $taupe-color;
                }
            }
        }
    }

    .q-enter-active, .q-leave-active {
        transition: all 0.3s;
    }

    .q-enter {
        opacity: 0;
        transform: translateX(16px);
    }

    .q-leave-to {
        opacity: 0;
        transform: translateX(-16px);
    }

</style>
