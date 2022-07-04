<template>
    <section class="intro-video" :style="{height}">
        <transition name="fade" appear mode="out-in">
            <div v-if="isPlaying" class="d-flex flex-column intro-video__full" @click="close">
                <div class="d-md-none flex-grow-0 text-center intro-video__full-close">
                    <span @click="close">Вернуться</span>
                </div>
                <video v-if="isPlayingAllowed" id="introVideo" class="flex-grow-1 intro-video__full-clip"
                       :class="{'intro-video__full-clip--playing':isPlayingReallyStarted}"
                       controls="" autoplay="" preload="auto">
                    <source src="@/assets/intro-video/clip-full.mp4" type='video/mp4;'>
                </video>
            </div>
            <div v-else class="intro-video__preview">
                <video v-if="!isPlayingAllowed" class="intro-video__preview-clip" @click.prevent="onPlay"
                       autoplay="" loop="" muted="" playsinline>
                    <!--<source src="@/assets/home/intro.webm" type='video/webm;'>-->
                    <source src="@/assets/intro-video/clip-preview.mp4" type='video/mp4;'>
                </video>
                <div class="intro-video__play">
                    <play-btn @click="onPlay"/>
                </div>
            </div>
        </transition>
        <!--<div class="intro-video__fade"></div>-->
    </section>
</template>

<script>
    import PlayBtn from '../../components/play-btn.vue';

    export default {
        name: 'intro-video',
        components: {
            PlayBtn
        },
        data() {
            return {
                isPlaying: false,
                isPlayingAllowed: false, // needed for proper full video playback
                isPlayingReallyStarted: false
            }
        },
        computed: {
            height() {
                //return (this.$store.state.windowHeight-193) + "px";
                //return this.$store.state.windowHeight + "px";
                //if (this.isWindowMD) return Math.round(this.$store.state.windowWidth / (1920/1080))+"px";
                if (this.isWindowMD) {
                    const height = Math.round(this.$store.state.windowWidth/1.8);
                    //console.log("video height: "+height);
                    return height+"px";
                }
                return "480px";
            },
            isWindowMD() {
                return this.$store.getters.isWindowMD;
            },
        },
        methods: {
            /*onResize() {
            },*/
            /*playPause(video) {
                console.log("clicked!");
                //let video = document.getElementById("introVideo").pause();
                //if ( this.isPlaying ) document.getElementById("introVideo").pause();
                if (video.paused)
                    video.play();
                else
                    video.pause();
            },*/
            close() {
                this.isPlaying = false;
                setTimeout(() => {
                    this.isPlayingAllowed = false;
                }, 50);
            },
            onPlay() {
                this.isPlaying = true;
                setTimeout(() => {
                    this.isPlayingAllowed = true;
                    setTimeout(() => {
                        if ( this.isWindowMD ) this.scrollTo("introVideo");
                        this.isPlayingReallyStarted = true;
                    }, 500);
                }, 50);
                /*setTimeout(()=>{
                    document.getElementById("introVideo").play();
                },350);*/
            },
            scrollTo(el, offset) {
                //this.$scrollTo(document.getElementById(el));
                //this.$router.push({ name: 'Home', hash: `#${el}` });
                el = document.getElementById(el);
                window.scrollTo({
                    top: el.offsetTop + (offset||0),
                    behavior: "smooth"
                });
            },
        },
        mounted() {
            //window.addEventListener("resize", this.onResize);
            //this.onResize();
        },
        destroyed() {
            //window.removeEventListener("resize", this.onResize);
        }
    }
</script>

<style lang="scss">
    .intro-video {
        position: relative;
        background: $black-color;
        height: 480px;
        /*animation-name: fadeIn;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-delay: 0.5s;*/
        //overflow: hidden;

        @include up($md) {
            height: unset;
        }

        &__preview {
            &-clip {
                display: block;
                position: absolute;
                z-index: 2;
                cursor: pointer;
                height: 100%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);

                @include up($md) {
                    position: static;
                    width: 100%;
                    height: unset;
                    top: 0;
                    left: 0;
                    transform: unset;
                }
            }
        }

        &__full {
            background: rgba(0, 0, 0, 0.85);
            position: fixed;
            z-index: 15;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            @include up($md) {
                position: static;
                transform: unset;
                height: unset;
                //padding-top: 40px;
            }

            &-clip {
                display: block;
                position: absolute;
                width: 100%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                @include up($md) {
                    position: static;
                    transform: unset;
                    opacity: 0;
                    @include transition();
                }

                &--playing {
                    opacity: 1;
                }
            }

            &-close {
                color: $white-color;
                padding: 24px 0;
            }
        }

        &__play {
            position: absolute;
            z-index: 5;
            width: 60px;
            height: 60px;
            left: 50%; /* % of surrounding element */
            top: 75%;
            transform: translate(-50%, -50%); /* % of current element */
        }

        &__fade {
            //background-blend-mode: multiply;
            //background: rgba(0,0,0,0.25);
            position: absolute;
            z-index: 4;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

</style>
