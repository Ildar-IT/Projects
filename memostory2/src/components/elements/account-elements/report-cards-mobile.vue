<template>
    <div class="report-card-mobile">    <!-- todo bad naming, mix with child component -->
        <v-row class="wrap flex-column flex-sm-row justify-center align-center px-sm-16 ">
            <v-col cols="12" v-for="(place, index) in places" :key="index">
                <reportCardMobile :place="place" :items="reportsOfPlace(place)"/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import '@/plugins/swiper';
    import ratingStars from '@/components/elements/account-elements/rating-stars';
    import reportCardMobile from '../account-elements/report-card-mobile.vue'
    import beforeAfterSwiper from "@/components/elements/beforeAfterSwiper";

    export default {
        name: 'report-cards-mobile',
        components: {ratingStars, reportCardMobile},
        data() {
            return {
                isShowedBeforeObj: {updateCounter: 1},
            }
        },
        computed: {
            items() {
                return this.$store.state.page.ReportListController.items || []
            },
            places() {
                return this.$store.state.page.ReportListController.places || [];
            },
            swiper() {
                return this.$refs.cardsCareReportSwiper.swiper;
            },
        },
        methods: {
            reportsOfPlace(place) {
                return this.items?.filter(el=>el.PLACE === place.ID);
            }
        }
    }
</script>

<style lang="scss">
    // todo move this css to child component
    .report-card-mobile {
        .v-card {
            position: relative;
            top: -32px;
            bottom: 0;
            border-radius: $border-radius-primary;
            background: $white4;
            width: 100%;
            z-index: 2;
        }

        .name {
            position: absolute;
            z-index: 3;
            bottom: 64px;
            left: 50%;
            transform: translateX(-50%);
            color: $white;
        }

        .swiper-slide {
            min-height: 300px;
            border-radius: $border-radius-primary $border-radius-primary 0 0;
            height: 100%;
            background-size: cover;
        }

        .swiper-pagination {
            bottom: 62px;
        }
    }
</style>
