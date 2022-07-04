<template>
    <div class="about text-center">
        <section class="about__article">
            <v-container>
                <article>
                    <h1 class="about__title" v-html="texts.aboutH1"></h1>
                    <div class="d-md-flex align-start">
                        <img class="about__image mr-md-16" src="~@/assets/about/girl-lg.png" alt="">
                        <div v-html="texts.aboutText1" class="about__text text-md-left">

                        </div>
                    </div>
                    <div class="d-md-flex flex-md-row-reverse align-start mt-md-16">
                        <img class="about__image mt-8 mb-8 mt-md-0 ml-md-16" src="~@/assets/about/guy-lg.png" alt="">
                        <div v-html="texts.aboutText2" class="about__text text-md-left">

                        </div>
                    </div>
                </article>
            </v-container>
        </section>

        <section class="about__content">
            <v-container>
                <h2 v-html="texts.aboutH2" class="about__title-md about__decor"></h2>
                <v-row class="justify-center">
                    <v-col v-for="(item, index) of items" :key="index"
                           class="about__items d-flex flex-column align-center" cols="12"
                           md="5" lg="4" xl="3">
                        <div class="about__item">
                            <img v-if="item.img" :src="item.img">
                        </div>
                        <h4>
                            {{ item.name }}
                        </h4>
                    </v-col>
                </v-row>

                <h2 v-html="texts.aboutH2_2" class="about__title-md">
                </h2>
                <img class="about__pallette mb-8" src="~@/assets/about/pallette-lg.png" alt="">
                <p v-html="texts.aboutP" class="about__pallette-text mb-8">
                </p>
                <h2 v-html="texts.aboutH2_3" class="about__title-md">
                </h2>
            </v-container>
            <img class="about__img d-block d-sm-none ma-auto" src="~@/assets/about/tattoo.jpg" alt="">
            <img class="about__img about__img--map d-block d-sm-none ma-auto" src="~@/assets/about/map-sm.jpg" alt="">
            <img class="about__img d-none d-sm-block ma-auto" src="~@/assets/about/tattoo-lg.jpg" alt="">
        </section>

        <section class="about__contact">
            <div class="about__map">
                <v-container>
                    <div class="about__contacts d-none d-sm-block">
                        <div class="about__inner">
                            <h2 v-html="" class="about__contacts--title mb-4">{{ texts.contact }}</h2>
                            <div v-html="texts.contacts"></div>

                            <button @click="isModalOpened = true" class="d-block mt-4 ma-auto">
                                <switch-button> {{ buttons.formOpen }}</switch-button>
                            </button>

                            <modal-form
                                :is-open="isModalOpened"
                                @close="isModalOpened = false"></modal-form>

                        </div>
                    </div>
                </v-container>
            </div>
            <div class="about__contacts about__contacts-sm d-sm-none">
                <h2 class="about__contacts--title mb-4">{{ texts.contact }}</h2>
                <div v-html="texts.contacts"></div>

                <button @click="isModalOpened = true" class="d-block mt-4 ma-auto">
                    <switch-button> {{ buttons.formOpen }}</switch-button>
                </button>

                <modal-form
                    :is-open="isModalOpened"
                    @close="isModalOpened = false"></modal-form>
            </div>

        </section>

    </div>
</template>

<script>
import SwitchButton from "../components/switch-button";
import ModalForm from "../components/modal-form";


export default {
    name: "about",
    components: {
        ModalForm,
        SwitchButton,
    },

    data: () => {
        return {

        }
    },
    props: {
        isModalOpened: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        page() {
            return this.$store.state.page.AboutController;
        },
        texts() {
            return {
                aboutH1: this.$store.state.page.AboutController.texts?.ABOUT_H1,
                aboutText1: this.$store.state.page.AboutController.texts?.ABOUT_TEXT1,
                aboutText2: this.$store.state.page.AboutController.texts?.ABOUT_TEXT2,
                aboutH2: this.$store.state.page.AboutController.texts?.ABOUT_H2,
                aboutH2_2: this.$store.state.page.AboutController.texts?.ABOUT_H2_2,
                aboutH2_3: this.$store.state.page.AboutController.texts?.ABOUT_H2_3,
                aboutP: this.$store.state.page.AboutController.texts?.ABOUT_P,
                aboutList: this.$store.state.page.AboutController.texts?.ABOUT_LIST,
                contacts: this.$store.state.page.AboutController.texts?.ABOUT_CONTACTS,
                contact: this.$store.state.page.AboutController.texts?.ABOUT_CONTACT,
            }
        },
        buttons() {
            return {
                formOpen: this.$store.state.common?.buttons?.FORM_OPEN,
            }
        },
        /*aboutItem() {
            return {
                name: this.$store.state.page?.AboutController?.aboutItem?.NAME,
                img: this.$store.state.page?.AboutController?.aboutItem?.DETAIL_PICTURE
            }
        },*/
        items() {
            return this.$store.state.page?.AboutController?.aboutItem?.map(el=>{
                return {
                    img: el.DETAIL_PICTURE,
                    name: el.NAME
                };
            });
        },
    },
}
</script>

<style lang="scss">
.about {
    &__article {
        @include up($lg) {
            position: relative;
            &::before {
                position: absolute;
                content: "";
                background-image: url("~@/assets/tattoo/1.png");
                background-blend-mode: multiply;
                width: 571px;
                height: 854px;
                right: -139px;
                z-index: 0;
                top: -510px;
            }
            &::after {
                position: absolute;
                content: "";
                background-image: url("~@/assets/tattoo/2-lg.png");
                background-blend-mode: multiply;
                z-index: 0;
                width: 507.79px;
                height: 478.77px;
                transform: rotate(-30deg);
                top: 0;
                left: -110px;
            }
        }
    }

    &__content {
        @include up($lg) {
            position: relative;
            &::before {
                position: absolute;
                content: "";
                background-image: url("~@/assets/tattoo/4.png");
                width: 523px;
                height: 554px;
                z-index: -1;
                transform: rotate(270deg);
                top: -250px;
                left: -60px;
            }
            &::after {
                position: absolute;
                content: "";
                background-image: url("~@/assets/tattoo/7.png");
                width: 551px;
                height: 501px;
                bottom: 850px;
                right: -335px;
                z-index: 0;
            }
        }
    }

    h1 {
        font-size: 30px;
        line-height: 35px;
        margin: 32px 0;
        @include up($md) {
            font-size: 50px;
            line-height: 55px;
            margin: 64px 0;
        }
        @include up($lg) {
            font-size: 60px;
            line-height: 65px;
            margin: 128px 0;
        }
    }

    h2,
    h3 {
        font-size: 24px;
        line-height: 34px;
        @include up($md) {
            font-size: 38px;
            line-height: 43px;
        }
        @include up($lg) {
            font-size: 48px;
            line-height: 53px;
        }
    }

    h4 {
        font-weight: 300;
        font-size: 18px;
        line-height: 23px;
        margin-bottom: 32px;
        @include up($md) {
            font-size: 25px;
            line-height: 34px;
            max-width: 296px;
        }
    }

    p {
        &:not(:last-child) {
            margin-bottom: 15px;
        }
    }

    &__text {
        font-size: 18px;
        line-height: 23px;

        @include up($md) {
            font-size: 20px;
            line-height: 34px;
        }
        @include up($lg) {
            font-size: 24px;
            line-height: 34px;
        }
    }

    &__title-md {
        margin: 32px 0;
        @include up($md) {
            margin: 128px 0;
        }
    }

    &__item {
        width: 296px;
        height: 296px;
        background-color: $additional100;
        border-radius: 16px;
        margin: 0 auto 16px;
        @include up($md) {
            margin: 0 0 16px 0;
        }

        & img {
            object-fit: cover;
            width: 296px;
            height: 296px;
            border-radius: 16px;
        }
    }

    &__image {
        width: 296px;
        max-width: 606px;
        @include up($sm) {
            width: 396px;
        }
        @include up($lg) {
            width: 100%;
        }
    }

    &__pallette {
        width: 296px;
        max-width: 788px;
        @include up($sm) {
            width: 396px;
        }
        @include up($md) {
            width: 596px;
        }
        @include up($lg) {
            width: 100%;
        }
    }

    &__pallette-text {
        font-size: 18px;
        line-height: 23px;
        @include up($md) {
            font-size: 24px;
            line-height: 34px;
        }
    }

    &__img {
        height: 100%;
        max-height: 570px;
        width: 100%;
        object-fit: cover;
    }

    &__img--map {
        height: 100%;
        max-height: 755px;
        width: 100%;
        object-fit: cover;
    }

    &__map {
        background-image: url("~@/assets/about/map-lg.jpg");
        background-size: cover;
    }

    &__contacts {
        @include up($sm) {
            padding: 24px 0;
            left: 32px;
            top: 17%;
        }
        @include up($md) {
            padding: 192px 0;
            top: 22%;
        }
        @include up($md) {
            top: 25%;
        }

        &--title {
            font-size: 24px;
            line-height: 34px;
            @include up($lg) {
                font-size: 60px;
                line-height: 65px;
                letter-spacing: -0.5px;
            }
        }
    }

    &__contacts-sm {
        padding: 64px 0;
        background-color: $white;
    }

    &__inner {
        z-index: 10;
        background-color: $white !important;
        padding: 64px 20px;
        border-radius: 32px;
        max-width: 540px;
    }

    address {
        font-style: normal;
        @include up($lg) {
            font-size: 18px;
            line-height: 23px;
        }
    }

    &__tel {
        color: $black500 !important;
        @include up($lg) {
            font-size: 18px;
            line-height: 23px;
        }
    }

    .switch-button {
        width: 220px;
        border: 1px solid transparent;

        &:hover,
        &:focus,
        &:active {
            border: 1px solid $secondary500;
        }
    }
}
</style>
