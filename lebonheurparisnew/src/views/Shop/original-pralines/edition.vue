<template>
    <section class="edition">
        <v-container>
            <v-row>
                <v-col class="edition--relative" cols="12" sm="4" md="5">
                    <div class="edition__wrapper  text-center text-sm-start"
                         v-for="(item, index) in items" :key="index">
                        <h3>{{ item.h3 }}</h3>
                        <div class="my-text-2 mt-8">
                            {{ item.text }}
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" sm="8" md="7">
                    <div class="edition__img-wrapper d-none d-sm-block ma-auto">
                        <img src="@/assets/original/00.png" alt="">
                        <img src="@/assets/original/01.png" alt="">
                        <img src="@/assets/original/02.png" alt="">
                        <img src="@/assets/original/03.png" alt="">
                        <img src="@/assets/original/04.png" alt="">
                        <img src="@/assets/original/05.png" alt="">
                        <img src="@/assets/original/06.png" alt="">
                        <img src="@/assets/original/06-2.png" alt="">
                    </div>
                    <div class="edition__img-wrapper mx-auto d-block d-sm-none">
                        <img src="@/assets/original/00-mb.png" alt="">
                        <img src="@/assets/original/01-mb.png" alt="">
                        <img src="@/assets/original/02-mb.png" alt="">
                        <img src="@/assets/original/03-mb.png" alt="">
                        <img src="@/assets/original/04-mb.png" alt="">
                        <img src="@/assets/original/05-mb.png" alt="">
                        <img src="@/assets/original/06-mb.png" alt="">
                        <img src="@/assets/original/06-2-mb.png" alt="">
                    </div>
                </v-col>
            </v-row>
        </v-container>

    </section>
</template>

<script>
export default {
    name: "edition",
    props: ["items"],

}
</script>

<style lang="scss">
.edition {
    &--relative {

    }

    &__wrapper {
        position: relative;
        z-index: 10;
        width: auto;
        @include up($sm) {
            width: 248px;
            margin: 100px auto;
        }

        h3 {
            color: $primary-500;
        }

        .my-text-2 {
            color: $black-200;
        }

    }

    &__img-wrapper {
        position: relative;
        width: 360px;
        height: 290px;
        @include up($sm) {
            width: 450px;
            height: 500px;
        }

        img {
            position: absolute;
            opacity: 0;

            &:nth-child(1) {
                animation: showBG 700ms linear forwards;
                @include up($sm) {
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
            }

            &:nth-child(2) {
                z-index: 2;
                animation: showBird 700ms linear forwards;
                animation-delay: 2s;
            }

            &:nth-child(3) {
                z-index: 2;
                animation: showSmallBird 700ms linear forwards;
                animation-delay: 1s;
            }

            &:nth-child(4) {
                animation: showRainCoat 700ms linear forwards;
                animation-delay: 2.5s;
            }

            &:nth-child(5) {
                z-index: 4;
                animation: showCap 700ms linear forwards;
                animation-delay: 1.5s;
            }

            &:nth-child(6) {
                z-index: 2;
                animation: showElephant 700ms linear forwards;
            }

            &:nth-child(7) {
                animation: showWingLeft 4s linear forwards;
            }

            &:nth-child(8) {
                animation: showWingRight 700ms linear forwards;

            }
        }
    }

    @keyframes showBG {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes showBird {
        from {
            right: -18%;
            top: 40%;
            transform: translateY(-50%);
        }
        to {
            opacity: 1;
            right: 0%;
            top: 40%;
            transform: translateY(-50%);
        }
    }
    @keyframes showElephant {
        from {
            left: -30%;
            top: 40%;
            transform: translateY(-50%);
        }
        to {
            opacity: 1;
            left: 10%;
            top: 40%;
            transform: translateY(-50%);
        }
    }
    @keyframes showCap {
        from {
            opacity: 0;
            right: 0;
            top: 0;
        }
        to {
            opacity: 1;
            right: 47%;
            top: 38%;
            transform: translateY(-50%);
        }
    }
    @keyframes showSmallBird {
        from {
            opacity: 0;
            left: 15%;
            top: -10%;
        }
        to {
            opacity: 1;
            left: 25%;
            top: 18%;
            transform: translateY(-50%);
        }
    }
    @keyframes showRainCoat {
        from {
            opacity: 0;
            left: 34%;
            top: 41%;
            transform: translateY(-50%);
        }
        to {
            opacity: 1;
            left: 23%;
            top: 41%;
            transform: translateY(-50%);
        }
    }
    @keyframes showWingLeft {
        from {
            opacity: 0;
            left: -35%;
            top: 30%;
            transform: translateY(-50%);
            animation-delay: 1s;

        }
        16%, 80% {
            opacity: 1;
            left: 6%;
            top: 30%;
            transform: translateY(-50%);
        }

        90% {
            opacity: 1;
            left: 6%;
            top: 30%;
            transform: translateY(-50%) rotate(10deg);
        }
        to {
            opacity: 1;
            left: 6%;
            top: 30%;
            transform: translateY(-50%);

        }
    }
    @keyframes showWingRight {
        from {
            opacity: 1;
            left: -30%;
            top: 30%;
            transform: translateY(-50%);
        }
        to {
            opacity: 1;
            left: 15%;
            top: 30%;
            transform: translateY(-50%);
        }
    }


}
</style>