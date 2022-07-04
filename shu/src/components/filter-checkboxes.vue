<template>
    <div class="filter-checkboxes">
        <!--<details class="text-left mb-8">
            <summary>{{ texts.PRODUCT_FINISH }}</summary>
            <div v-for="(item, index) of finish" :key="index" class="filter-checkboxes__labels d-flex flex-column">
                <label class="custom-checkbox" >
                    <input type="checkbox">
                    <span>{{ item.text }}</span>
                </label>
            </div>
        </details>

        <details class="text-left mb-8">
            <summary>{{ texts.PRODUCT_FORMULA }}</summary>
            <div v-for="(item, index) of formula" :key="index" class="filter-checkboxes__labels d-flex flex-column">
                <label class="custom-checkbox">
                    <input type="checkbox">
                    <span>{{ item.text }}</span>
                </label>
            </div>
        </details>
        -->

        <checkbox-select-custom :options="formula" :head="texts.PRODUCT_FORMULA"/>
        <checkbox-select-custom :options="finish" :head="texts.PRODUCT_FINISH"/>

        <!-- <div class="select filter-checkboxes__select"
             :class="activeSelect ? 'select-active ' : 'animate__animated animate__fadeIn'">
            <li class="pr-9 text-left select__select-item list"
                :class="activeSelect ? 'select__select-item-active ' : 'animate__animated animate__fadeIn'"
                @click="rotateArrow"> {{ texts.PRODUCT_FINISH }}
            </li>
            <ul :class="activeSelect ? 'd-block animate__animated animate__fadeIn' : 'd-none'">
                <div v-for="(item, index) of finish"
                     :key="index"
                     @click="onSelect(item)"
                     class="filter-checkboxes__labels d-flex flex-column">
                    <label class="custom-checkbox">
                        <input type="checkbox">
                        <span>{{ item.text }}</span>
                    </label>
                </div>
            </ul>
        </div>

        <div class="select filter-checkboxes__select"
             :class="activeSelect ? 'select-active ' : 'animate__animated animate__fadeIn'">
            <li class="pr-9 text-left select__select-item list"
                :class="activeSelect ? 'select__select-item-active ' : 'animate__animated animate__fadeIn'"
                @click="rotateArrow"> {{ texts.PRODUCT_FORMULA }}
            </li>
            <ul :class="activeSelect ? 'd-block animate__animated animate__fadeIn' : 'd-none'">
                <div v-for="(item, index) of formula"
                     :key="index"
                     @click="onSelect(item)"
                     class="filter-checkboxes__labels d-flex flex-column">
                    <label class="custom-checkbox">
                        <input type="checkbox">
                        <span>{{ item.text }}</span>
                    </label>
                </div>

            </ul>
        </div>
        -->
    </div>
</template>

<script>
import SelectCustom from "./select-custom";
import CheckboxSelectCustom from "./checkbox-select-custom";

export default {
    components: {CheckboxSelectCustom, SelectCustom},
    data() {
        return {
            activeSelect: false,
        }
    },
    computed: {
        finish() {
            return this.$store.state.page?.ProductListController?.filterfinish?.map(el => ({
                text: el.DETAIL_TEXT
            }));
        },
        formula() {
            return this.$store.state.page?.ProductListController?.filterformula?.map(el => ({
                text: el.DETAIL_TEXT
            }));
        },
        texts() {
            return this.$store.state.page?.ProductListController?.texts;
        }
    },
}
</script>
