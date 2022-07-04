<template>
    <div class="mt-8 ml-lg-4 select-custom"
         :class="isActive ? 'select-custom--active ' : 'animate__animated animate__fadeIn'"
    >
        <span class="pr-9 d-block text-left select-custom__item"
              @click="onItemClick">
            {{ selectedItem ? selectedItem.text : (text || "Выберите") }}
        </span>

        <ul v-if="isActive && options">
            <li v-for="(item, index) of options" :key="index"
                class="text-left"
                @click="onSelect(item)">
                {{ item.text }}
            </li>
        </ul>
    </div>
</template>

<script>

let id = 0;

export default {
    name: "select-custom",
    props: ["options", "value", "text"],
    data: () => {
        return {
            selectedItem: null,
            disabled: false,
            isActive: false,
            //isOpen: false,
            id: 0
        }
    },
    methods: {
        onSelect(item) {
            this.isActive = !this.isActive;
            this.selectedItem = item;
            this.$emit('change', item);
            this.$emit('input', item.value);
        },
        onItemClick() {
            this.isActive = !this.isActive;

            if ( this.isActive ) {
                this.$store.state.activeSelectId = this.id;
            }
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(newValue, oldValue) {
                //console.log("newValue:", newValue, "oldValue:", oldValue );
                this.selectedItem = this.options?.find(el => el.value === newValue);
            }
        },
        '$store.state.activeSelectId'(newValue, oldValue) {
            //console.log("Someone touches selects..."+newValue);
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
.select-custom {
    display: inline-block;
    padding: 13px 13px 13px 17px;
    background-color: $additional100;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.06);
    border-radius: 24px;
    font-size: 18px;
    width: 296px;
    margin-top: 32px;
    position: relative;
    cursor: pointer;
    @include up($lg) {
        margin-top: 64px;
        &:not(:last-child) {
            margin-right: 32px;
        }
    }
    & ul {
        position: absolute;
        padding: 13px !important;
        background-color: $additional100;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.06);
        border-radius: 24px;
        font-size: 18px;
        width: 296px;
        top: 45px;
        left: 0;
        z-index: 2;
        max-height: 250px;
        overflow-y: auto;
    }

    & li {
        &:not(:first-child) {
            margin-top: 16px;
        }
    }

    &::after {
        position: absolute;
        content: url("~@/assets/caret.svg");
        width: 10px;
        height: 5px;
        top: 10px;
        right: 15px;
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
}
</style>