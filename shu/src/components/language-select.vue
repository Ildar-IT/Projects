<template>
    <div class="select">
        <!--<select class="select">
          <option class="select__option"> {{ texts.ruMob }} </option>
          <option class="select__option"> {{ texts.enMob }} </option>
        </select> -->

        <li class="pr-9 text-left select__select-item list"
            :class="activeSelect ? 'select__select-item-active ' : 'animate__animated animate__fadeIn'"
            @click="rotateArrow"> {{ texts.ruMob }}
        </li>
        <ul :class="activeSelect ? 'd-block animate__animated animate__fadeIn' : 'd-none'">
            <li @click="onSelect()" class="text-left mt-4">
                <a href="#"> {{ texts.enMob }} </a>
            </li>
        </ul>

    </div>
</template>

<script>
export default {
    name: "language-select",
    props: ['activeLang'],
    data: () => ({
        activeSelect: false,
    }),
    computed: {
        texts() {
            return {
                ruMob: this.$store.state.common?.commontext?.LANG_RU_MOBILE,
                enMob: this.$store.state.common?.commontext?.LANG_EN_MOBILE,
            }
        },
        notSelectList() {
            return this.texts?.enMob;
        },
    },
    methods: {
        rotateArrow() {
            this.activeSelect = !this.activeSelect;
        },
        onSelect() {
            this.activeSelect = !this.activeSelect;
            this.$emit('onSelect');
        }
    }
}
</script>

<style lang="scss">
.select {
    a {
        color: #000 !important;
    }
    width: 296px;
    padding: 13px 50px 13px 17px;
    background-color: $additional100;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.06);
    border-radius: 999px;
    font-size: 18px;
    margin: 0 auto;

    &__option {
        position: relative;

        &::after {
            position: absolute;
            content: "";
            width: 11px;
            height: 6px;
            top: 0;
            left: 0;
        }
    }

    &__select {
        position: relative;

        &-item.list {
            position: relative;
            cursor: pointer;

            &::after {
                z-index: 1;
                position: absolute;
                content: "";
                background-image: url("~@/assets/caret.svg");
                width: 15px;
                height: 9px;
                top: 7px;
                right: -30px;
                //@include transition-long();
            }


        }

        &-item-active {
            &::after {
                top: 3px !important;
                right: -25px !important;
                transform: rotate(180deg);
            }

        }

        ul {
            z-index: 10;
            position: absolute;
            bottom: -15px;
            transform: translateY(100%) !important;
            left: 0;
        }

        li {
            font-weight: 700;
            font-size: 14px;
            color: #000 !important;
            @include up($md) {
                font-size: 15px;
            }
        }
    }

}
</style>