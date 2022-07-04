<template>
    <div v-if="message && message.text" class="alert">
        <transition name="fade" mode="out-in">

            <v-alert v-if="message && message.text" class="alert__body"
                dense v-html="message.text"
                :type="message.type" />
        </transition>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: "alert",
        props: {
        },
        data() {
            return {}
        },
        computed: {
            message() {
                return this.$store.state.alert;
            }
        },        
        watch: {
            message(val) {
                if ( val ) {
                    setTimeout(() => {
                        this.$store.state.alert = null;
                    }, 3000);
                }
            }
        },
    }
</script>

<style lang="scss">

  .alert {
        &__body {
            position: fixed !important;
            z-index: 220;   // needs to be over dialog's 202
            width: 75%;
            min-width: 280px;
            left: 0;
            right: 0;
            margin: 0 auto;
            top: 35%;
            display: flex;
            justify-content: center;
            justify-items: center;
            border-radius: 1000px;

            &.v-sheet.v-alert:not(.v-sheet--outlined) {
                box-shadow: $box-shadow;
            }
        }
    }
    
</style>