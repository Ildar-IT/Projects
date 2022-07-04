<template>
    <!-- data-aos="fade-up" :data-aos-delay="aosDelay" -->
    <div class="heroes">
        <v-container>
            <v-row>
                <v-col>
                    <h1 class="text-center">наши героини</h1>
                    <h3 class="text-center mt-2 mt-md-0">#силавтебе</h3>
                    <divider class="mb-6" color="taupe"/>
                </v-col>
            </v-row>
        </v-container>


        <swiper ref="swiper" :options="swiperOption" @slideChange="onSlideChange">
            <swiper-slide v-for="(item, index) in slides" :key="index">
                <v-container>
                    <div class="d-block d-md-flex flex-column flex-md-row justify-space-between heroes__slide">
                        <div class="heroes__slide-img-video order-md-1 ml-md-auto mx-lg-auto">
                            <img class="d-block mt-md-7 heroes__slide-img" :src="item.img"
                                 :alt="item.name"/>

                            <div class="mt-1 mt-lg-0 heroes__slide-video" @click="showVideo(item)">
                                <img class="d-block heroes__slide-video-poster" :src="item.video.poster"
                                     :alt="item.name"/>

                                <!--<video loop="" muted="" playsinline :poster="item.video.poster">
                                    <source :src="item.video.horizontal" type='video/mp4;'>
                                </video>-->
                                <play-btn/>
                            </div>
                        </div>

                        <div class="mt-7 heroes__text">
                            <h2> {{ item.name }} </h2>
                            <p class="header2 mt-4"> {{ item.title }}</p>
                            <p class="mt-4"> {{ item.text }} </p>
                            <h3> {{ item.tag }} </h3>
                        </div>
                    </div>
                </v-container>
            </swiper-slide>
        </swiper>

        <v-container>
            <slider-btns class="mt-6 heroes__btns" mirror bg="grey"
                         :total="slides.length" :currentSlide="currentSlide"
                         @slideNext="slideNext" @slidePrev="slidePrev"/>


        </v-container>

        <div class="d-none d-md-block heroes__bg"></div>

        <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition">
            <div class="d-flex flex-column heroes__video-dialog">
                <div class="flex-grow-0 text-center heroes__video-dialog-header">
                    <span @click="dialog=false">Вернуться</span>
                </div>
                <div class="flex-grow-1 d-flex align-center heroes__video-dialog-content" id="ytPlayerContainer">
                    <iframe v-if="dialog" type="text/html"
                            :src="'https://www.youtube.com/embed/'+videoId+'?autoplay=1'"
                            width="100%" :height="videoHeight" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
        </v-dialog>
    </div>
</template>

<script>
    import Divider from '../../components/divider.vue';
    import PlayBtn from '../../components/play-btn.vue';
    import SliderBtns from '../../components/slider-btns.vue';

    export default {
        name: 'heroes',
        components: {
            Divider,
            PlayBtn,
            SliderBtns
        },
        data() {
            return {
                currentSlide: 1,
                dialog: false,
                videoId: null,
                slides: [
                    {
                        img: require('@/assets/heroes/hero1.jpg'),
                        name: "Алёна Попова",
                        title: "Юристка, правозащитница, соавтор законопроекта «О профилактике семейно-бытового насилия», кандидат в депутаты Госдумы, соосновательница сети взаимопомощи женщин «ТыНеОдна»",
                        text: "Алёна Попова вместе с единомышленниками основала сеть взаимопомощи женщин «ТыНеОдна», которая помогает женщинам, столкнувшимся с домашним насилием. Также она соавтор законопроекта «О профилактике семейно-бытового насилия». Своим примером Алена доказывает, что сила женщины — в действии.",
                        tag: "#силавдействии",
                        video: {
                            id: "jULJNAMI1Po",
                            //vertical: "",
                            //horizontal: require('@/assets/horizontal-video/POPOVA_15.mp4'),
                            poster: require('@/assets/heroes/poster1.jpg')
                        }
                    }, {
                        img: require('@/assets/heroes/hero2.jpg'),
                        name: "Ольга Смирнова",
                        title: "Кандидат медицинских наук, акушер-гинеколог, врач-онколог, научный сотрудник отделения онкогинекологии НМИЦ онкологии им.Н.Н.Петрова",
                        text: "Журнал «Собака» включил Ольгу Смирнову в список 25 молодых специалистов, за которыми — будущее российской медицины. Большую часть своего рабочего времени она проводит в операционной, а ее заветная профессиональная мечта — введение бесплатной вакцинации от вируса папилломы человека. В своем инстаграме, Ольга, простым языком рассказывает о тонкостях работы врача-онколога, развенчивает мифы о гинекологических заболеваниях и рассказывает о себе.",
                        tag: "#силавпомощи",
                        video: {
                            id: "P2ZUqb53Hzo",
                            poster: require('@/assets/heroes/poster2.jpg')
                            //vertical: '',
                            //horizontal: require('@/assets/horizontal-video/SMIRNOVA_15.mp4'),
                        }
                    }, {
                        img: require('@/assets/heroes/hero3.jpg'),
                        name: "Мария Абашова",
                        title: "Прима-балерина, муза Бориса Эйфмана, обладательница театральных наград и звания заслуженной артистки России",
                        text: "Профессионал на сцене и в репетиционном зале, дома она превращается в заботливую маму трех детей и… популярного комедианта: ее ироничные видео про жизнь артиста балета набирают сотни тысяч просмотров и лайков. При виде титанической физической и духовной работы Марии сомнений не остается: сила женщины — в непрекращающемся движении.",
                        tag: "#силавдвижении",
                        video: {
                            id: "uA7vOrg-aYo",
                            poster: require('@/assets/heroes/poster3.jpg')
                            //vertical: "",
                            //horizontal: require('@/assets/horizontal-video/ABASHOVA_15.mp4'),
                        }
                    }, {
                        img: require('@/assets/heroes/hero4.jpg'),
                        name: "Александра Сулим",
                        title: "Журналистка, писательница, автор книги «Безлюдное место»",
                        text: "Сначала Александра профессионально писала о кино, а после, в общественно-политических медиа, стала рассказывать о сложных, противоречивых темах, которые многие не осмеливаются поднимать. Помимо того, что Саша отважно берет интервью у преступников, разбирается с причинами трагедий и прямо указывает на проблемы, она также ведет блог о статусе \"single\" и том, почему не быть в отношениях — это нормально. Благодаря журналистке и ее работе можно почувствовать, что огромная сила женщины заключена в слове.",
                        tag: "#силавслове",
                        video: {
                            id: "qLFOOpZcEWs",
                            poster: require('@/assets/heroes/poster4.jpg')
                            //vertical: '',
                            //horizontal: require('@/assets/horizontal-video/SULIM_15.mp4'),
                        }
                    }
                ],
                swiperOption: {
                    slidesPerView: 1,
                    spaceBetween: 12,
                    loop: false,
                    //speed: 1000,
                    //observer: true,
                    //observeParents: true,
                    /*navigation: {
                        nextEl: "#heroes-btn-next",
                        prevEl: "#heroes-btn-prev",
                    },
                    pagination: {
                        el: '.heroes_pagination',
                        type: 'fraction'
                    },*/
                }
            }
        },
        computed: {
            aosDelay() {
                return this.$store.state.aosDelay;
            },
            videoHeight() {
                if ( this.isWindowMD ) return "100%";
                return "320px";
            },
            isWindowMD() {
                return this.$store.getters.isWindowMD;
            },
        },
        methods: {
            onSlideChange() {
                this.currentSlide = (this.$refs.swiper?.$swiper?.activeIndex || 0) + 1;
            },
            slideNext() {
                this.$refs.swiper?.$swiper?.slideNext(500);
            },
            slidePrev() {
                this.$refs.swiper?.$swiper?.slidePrev(500);
            },
            showVideo(item) {
                this.videoId = item.video.id;
                this.dialog = true;

                /*if (!document.getElementById("scriptYTPlayer")) {

                    console.log("Loading...");
                    window.onYouTubePlayerAPIReady = function () {
                        console.log("Loaded!!!");
                        window.ytPlayer = new YT.Player('ytPlayerContainer', {
                            height: '100%',
                            width: '100%',
                            videoId: 'M7lc1UVf-VE'
                        });
                    };

                    let tag = document.createElement('script');
                    tag.id = "scriptYTPlayer";
                    tag.src = "//www.youtube.com/player_api";
                    let firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                }*/
                /*this.setTimeout(() => {
                    if ( window.ytPlayer ) {
                        ytPlayer.play();
                    }
                }, 300);*/
            }
        },
        mounted() {
            setTimeout(() => {
                this.$store.state.swipers['heroes'] = this.$refs.swiper?.$swiper;
            }, 300);
        }
    }
</script>

<style lang="scss">
    .heroes {
        position: relative;
        padding: 70px 0 60px 0;
        background-color: $grey-color;

        @include up($md) {
            padding: 110px 0 60px 0;
        }

        .container, .swiper-container {
            //overflow: visible;
        }

        .container {
            width: auto;
        }

        // анимация слайдов
        .swiper-slide-next, .swiper-slide-prev {
            //@include transition();
            //opacity: 0;
        }

        &__slide {
            position: relative;
            width: 100%;
            height: 100%;

            &-img-video {
                @include up($md) {
                    width: 280px;
                }

                @include up($lg) {
                    width: unset;
                }
            }

            &-img {
                display: block;
                width: 100%;
                //border: 1px solid #757575;
                box-sizing: border-box;
                //cursor: auto;
                overflow: hidden;

                @include up($lg) {
                    width: 380px;
                }

                &:hover {
                    transform: none;
                }

                /*@include up($lg) {
                    width: 380px;
                }*/
            }

            &-video {
                position: relative;
                width: 100%;

                @include up($lg) {
                    position: absolute;
                    bottom: 24px;
                    width: 445px;
                    right: 0;
                }

                &-poster {
                    width: 100%;
                    display: block;
                }

                .play-btn {
                    position: absolute;
                    z-index: 1;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    margin: auto;
                }
            }
        }

        &__text {
            @include up($md) {
                max-width: 370px;
            }

            h3 {
                color: $taupe-color;
            }
        }

        &__bg {
            position: absolute;
            z-index: 0;
            background-color: $accent-color;
            top: 420px;
            width: 57%;
            right: 0;
            height: 403px;

            @include up($md) {
                width: 50%;
            }
            @include up($lg) {
                width: 57%;

            }
        }

        &__video-dialog {
            background: $black-color;
            width: 100%;
            height: 100%;

            &-header {
                height: 40px;
                line-height: 40px;
                color: #fff;

                span {
                    cursor: pointer;
                    @include transition();

                    &:hover {
                        opacity: 0.5;
                    }
                }
            }
        }
    }
</style>