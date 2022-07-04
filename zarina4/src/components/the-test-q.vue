<template>
    <div class="the-test-q text-left d-flex flex-column">
        <h2>{{label}}</h2>
        <ul class="mt-6 mt-md-8">
            <li v-for="(a,index) of as" :key="'a'+index" @click="$emit('answer', a)">{{index+1}}. {{a.label}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'the-test-q',
        props: ["i"],
        computed: {
            q() {
                return this.$store.state.testQs[this.i];
            },
            label() {
                return this.q.label;
            },
            as() {
                return this.q.as;
            }
        },
    }
</script>

<style scoped lang="scss">
    .the-test-q {
        ul {
            list-style: none;
            margin:0;
            padding:0;
            li {
                background: $white-color;
                padding: 16px;
                margin:1px 0 0 0;
                border-radius: 4px;
                @include transition();

                cursor:pointer;

                @include up($md) {
                    padding: 24px;

                    // fix iphone hover on touch
                    &:hover {
                        background: $accent-color;
                    }
                }
            }
        }

    }
</style>
