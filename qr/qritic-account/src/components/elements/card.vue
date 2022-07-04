<template>
    <div class="card" :class='cardClass' @click="click">
        <slot name="default"/>
    </div>
</template>

<script>
    export default {
        name: "card",
        props: ['small', 'hoverable'],
        computed: {
            cardClass() {
                let classes = [];
                if (this.small) classes.push('card--small');
                if (this.hoverable) classes.push('card--hoverable');

                return classes.join(' ')
            },
            isWindowXS() {
              return this.$store.getters.isWindowXS;
            },
        },
        methods: {
            click() {
                this.$emit('click')
            },
        },

    }
</script>

<style lang="scss">
    .card {
        box-shadow: 0 16px 24px rgba(103, 110, 134, 0.1);
        border-radius: 20px;
        padding: 32px;
        background: #FFFFFF;

        &--small {
            padding: 16px;
        }


        &--hoverable {
            @include transition();

            &:hover {
                @include transition();
                color: $primary;
                background-color: $secondary;
            }
        }
    }

    .no-card {
        box-shadow: none;
        padding: 32px 0;
    }
</style>