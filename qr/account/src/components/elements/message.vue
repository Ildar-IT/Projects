<template>
    <v-dialog
            content-class="message-dialog"
            v-model="visible"
            :persistent="persistent"
            :maxWidth="maxWidth"
    >
        <card>
            <slot name="title">
                <v-card-title v-if="message" v-html="title"/>
            </slot>
            <slot name="body">
                <v-card-text v-if="body" v-html="body"/>
            </slot>
            <slot name="actions">
                <v-card-actions class="flex justify-end">
                    <v-btn color="green darken-1"
                           text
                           @click="ok">Ок
                    </v-btn>
                </v-card-actions>
            </slot>
        </card>
    </v-dialog>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: "message",
        props: {
            message: {
                type: Object,
                default: null
            },
        },
        data() {
            return {}
        },
        computed: {
            visible: {
                get () {
                    return this.message && (typeof this.message.visible === "undefined" || this.message.visible);
                },
                set(v) {
                    if ( this.message ) this.message.visible = v;
                }
            },
            persistent() {
                // todo странно, закрытие по фону - более не включает диалог... временно выводим модально
                return true;
                //return this.message?.persistent;
            },
            maxWidth() {
                return this.message?.maxWidth || 500;
            },
            title() {
                return this.message?.title;
            },
            body() {
                return this.message?.body;
            }
        },
        methods: {
            ok() {
                Vue.set(this.message, "visible", false);
                this.$emit('ok');
            },
            cancel() {
                Vue.set(this.message, "visible", false);
                this.$emit('cancel');
            },
        },
    }
</script>

<style lang="scss">
    .message-dialog.v-dialog {
        border-radius: 32px; // см. .card

        .card {
            padding: 15px;

            .v-card {
                &__title {
                    text-align:center;
                    word-break: normal;
                }
            }
        }
    }
</style>