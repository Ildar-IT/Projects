<template>
    <div class="checkbox-select-custom"
         :class="isActive ? 'checkbox-select-custom--active ' : 'animate__animated animate__fadeIn'"
    >
        <span class="pr-9 d-block text-left checkbox-select-custom__item"
              :class="isActive ? 'checkbox-select-custom__item-active ' : 'animate__animated animate__fadeIn'"
              @click="onItemClick"
        >
            {{ head }}
        </span>
        <ul v-if="isActive && options">
            <li v-for="(item, index) of options" :key="index"
                class="checkbox-select-custom__labels d-flex flex-column">
                <label class="custom-checkbox"
                       >
                    <input type="checkbox">
                    <span>{{ item.text }}</span>
                </label>
            </li>
        </ul>
    </div>
</template>

<script>
let id = 0;

export default {
    props: ["options", "text", "head"],
    data() {
        return {
            isActive: false,
            id: 0
        }
    },
    computed: {
        texts() {
            return this.$store.state.page?.ProductListController?.texts;
        },
    },
    methods: {
        onSelect() {
            this.isActive = !this.isActive;
            this.$emit('onSelect');
        },
        onItemClick() {
            this.isActive = !this.isActive;

            if ( this.isActive ) {
                this.$store.state.activeSelectId = this.id;
            }
        }

    },
    watch: {
        '$store.state.activeSelectId'(newValue, oldValue) {
            if ( this.id !== newValue ) this.isActive = false;
        }
    },
    mounted() {
        id++;
        this.id = id;
    }
}
</script>

<style lang="scss">
.checkbox-select-custom {
    padding: 13px 13px 13px 17px;
    background-color: $additional100;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.06);
    border-radius: 24px;
    font-size: 18px;
    width: 296px;
    margin: 32px auto;
    position: relative;
    cursor: pointer;
    @include up($md) {
        margin-right: 16px;
    }
    @include up($lg) {
        width: 190px;
        //margin-top: 64px;
        margin-right: 32px;
    }

    &::after {
        position: absolute;
        content: url("~@/assets/caret.svg");
        width: 10px;
        height: 5px;
        top: 10px;
        right: 15px;
    }

    & ul {
        position: absolute;
        background-color: $additional100;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.06);
        border-radius: 24px;
        font-size: 18px;
        width: 100%;
        top: 45px;
        left: 0;
        z-index: 2;
        max-height: 250px;
        overflow-y: auto;
    }

    &--active {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;

        & ul {
            border-top-right-radius: 0;
            border-top-left-radius: 0;
        }

        &::after {
            top: 30px;
            transform: rotate(180deg);
        }
    }

    &__labels {
        padding: 12px;
        font-weight: 300;
        //width: 100px;

        @include up($md) {
            width: 161px;
            background-color: #F3ECE5;
            box-shadow: 0px 5px 5px rgb(0 0 0 / 6%);
            margin-top: -20px;
            border-bottom-right-radius: 24px;
            border-bottom-left-radius: 24px;
        }
        @include up($lg) {
            width: 190px;
        }
    }

    & label {
        margin-top: 16px;
        font-size: 14px;
        line-height: 19px;
        display: flex;
        text-align: left;
    }

    & input {
        margin-right: 16px;
        width: 18px;
        height: 18px;
    }

    & .custom-checkbox > span {
        align-items: baseline;
    }
}
</style>