<template>
    <section v-if="item"
             class="main-banner text-center" :style="bgStyle">
        <v-container class="d-flex align-center">
            <v-row>
                <v-col class="mt-n13">
                    <h3 v-html="item.NAME"/>
                    <p v-if="item.PREVIEW_TEXT" class="d-block mb-8" v-html="item.PREVIEW_TEXT"/>
                    <btn-link v-if="item.LINK && item.BTN" :to="{path: item.LINK}">{{ item.BTN }}</btn-link>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<style lang="scss">
.main-banner {
    background-position: top center;
    background-size: cover;
    color: $white;
    height: 100%;
    @include up($xs) {
        height: 641px;
    }


    .container {
        height: 100%;
    }

    h3 {
        font-size: 30px;
        line-height: 117%;
        margin-bottom: 10px;
        @include up($md) {
            font-size: 60px;
        }
    }

    p {
        @include up($md) {
            font-size: 18px;
        }
    }

    .btn-link {
        &:nth-child(3) {
            background-color: $secondary500 !important;

            &:hover {
                color: $secondary500;
                background-color: $white;
            }
        }
    }
}
</style>

<script>
import BtnLink from '../components/btn-link.vue'

export default {
    name: 'MainBanner',
    components: {
        BtnLink
    },
    props: ["item"],
    computed: {
        isWindowSM() {
            return this.$store.getters.isWindowSM;
        },
        bgStyle() {
            return {
                "background-image": "url("
                    + (this.isWindowSM ? this.item.DETAIL_PICTURE : (this.item.PREVIEW_PICTURE || this.item.DETAIL_PICTURE))
                    + ")"
            };
        }
    }
}
</script>