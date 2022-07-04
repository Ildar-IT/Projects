<template>
    <section class="policy">
        <v-container>
            <div v-html="texts.policy"></div>
        </v-container>
    </section>
</template>

<script>
import FilterCheckboxes from "../components/filter-checkboxes";
import SwitchButton from "../components/switch-button";

export default {

    computed: {
        texts() {
            return {
                policy: this.$store.state.page?.HomeController?.texts?.POLICY
            }
        },

    }
}
</script>

<style lang="scss">
.policy {
    padding: 64px 0;

    h1 {
        font-size: 28px;
        line-height: 35px;
        color: $black500;
        font-weight: 300;
        text-align: center;
        letter-spacing: -0.5px;
        max-width: 845px;
        margin: 0 auto 60px;
        @include up($md) {
            font-size: 50px;
            line-height: 55px;
        }
        @include up($lg) {
            font-size: 60px;
            line-height: 65px;
        }
    }

    ol {
        font-weight: 300;
        font-size: 18px;
        line-height: 23px;

        li {
            margin-bottom: 12px;
        }
    }

    &__head {
        font-size: 24px;
        line-height: 34px;
    }
}
</style>