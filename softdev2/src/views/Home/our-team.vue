<template>
    <section class="our-team d-none">
        <v-container>
            <v-row>
                <v-col cols="12 col-lg-4 py-0 pl-0">
                    <h3 class="our-team__title h2 mb-8 mb-md-10 mb-lg-12">“We build products that give The competitive
                        advantage”</h3>
                </v-col>
                <v-col cols="12 col-md-8 col-lg-4 pr-md-4 py-0 px-0">
                    <div class="our-team__wrap d-md-flex justify-start">
                        <img class="our-team__ceo d-none d-lg-block" src="@/assets/Main/Presnyak-lg.jpeg">
                        <img class="our-team__photo d-lg-none" src="@/assets/Main/Presnyak-sm.jpg">
                    </div>
                </v-col>
                <v-col cols="12 col-md-4 py-0 px-0 pl-md-4">
                    <figure class="mt-8 mt-md-0">
                        <blockquote>
                            <p class="d-lg-none our-team__text mb-md-0">
                                “Situated in St.Petersburg, a big European city that is well-known for its educational establishments with respectable traditions, SoftDev enjoys a unique opportunity of hiring the best and the brightest. Our engineers’ approach to problem-solving is both innovative and result-oriented. This makes the engineering team of SoftDev well-armed for solving problems of any level of complexity. ”
                            </p>
                            <p class="d-none d-lg-block our-team__text">
                                “Situated in St.Petersburg, a big European city that is well-known for its educational establishments with respectable traditions, SoftDev enjoys a unique opportunity of hiring the best and the brightest. Our engineers’ approach to problem-solving is both innovative and result-oriented. This makes the engineering team of SoftDev well-armed for solving problems of any level of complexity. ”
                            </p>
                        </blockquote>
                        <div class="d-sm-flex justify-space-between align-center align-md-start flex-md-column">
                            <p class="our-team__author mb-0">Sergey Presnyak,
                                <span class="d-block mt-md-1 mb-8 mb-sm-0">CEO & Director General</span>
                            </p>
                          <btn-link class="d-none d-sm-flex d-md-none justify-end ml-md-auto" :to="{name:'OurTeam'}">
                            {{ 'our team' }}
                          </btn-link>
                        </div>
                        <btn-link class="d-none d-md-flex justify-end ml-md-auto" :to="{name:'OurTeam'}">
                            {{ 'our team' }}
                        </btn-link>
                    </figure>
                </v-col>
                <primary-link-blue class="d-flex d-sm-none" :to="{name: 'OurTeam'}">{{ 'our team' }}</primary-link-blue>
            </v-row>
        </v-container>
    </section>
</template>

<style lang="scss">
.our-team {
    padding: 40px 0 60px;
    @include up($sm) {
        padding: 60px 0 100px;
    }
    @include up($md) {
        padding: 70px 0 120px;
    }
    @include up($lg) {
        padding: 120px 0 160px;
    }

    &__title {
        max-width: unset;
        @include up($lg) {
            flex-basis: 30%;
        }
    }

    &__photo {
        width: 100%;

    }


    p {
        color: $black;
    }

    &__text {
        margin-bottom: 32px;
        @include up($md) {
            font-size: 15px;
            line-height: 150%;
        }
        @include up($lg) {
            font-size: 15px;
            line-height: 150%;
            margin-bottom: 100px;
        }
    }

    &__author {
        color: $dark-grey !important;
        @include up($md) {
            margin-bottom: 50px;
        }
    }

    span {
        font-size: 13px;
        line-height: 150%;
        color: $dark-grey;
    }

    &__ceo {
        @include up($lg) {
            display: block;
            width: 506px;
            height: 100%;
        }
    }

    blockquote {
        @include up($md) {

        }
    }

    figure {
        @include up($md) {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    }
}
</style>
<script>
import PrimaryLinkBlue from "../../components/primary-link-blue";

import BtnLink from "../../components/btn-link";

export default {
    components: {BtnLink, PrimaryLinkBlue}
}
</script>
