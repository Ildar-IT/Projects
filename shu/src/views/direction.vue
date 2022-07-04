<template>
    <section class="direction text-center" id="direction">
        <set-filter v-if="isFilterOpen" class="d-md-none"/>
        <div class="direction__head">
            <img :src="item.image" alt="" class="direction__img d-md-none">
            <img :src="item.imageLg" alt="" class="direction__img d-none d-md-block">
            <h1 class="direction__title"> {{ item.name }} </h1>
        </div>
        <v-container>
            <div class="direction__filter mb-16 mt-16">
                <div class="direction__wrapper">
                    <filter-checkboxes class="d-none d-md-flex"/>
                    <div class="direction__sort d-flex align-baseline">
                        <span class="mr-8 d-none d-lg-block">{{ texts.FILTER_SORT }}</span>

                        <select-custom
                            :options="filterOptions"
                            v-model="filterID"
                            @change="onFilterChange"
                        />
                        <!--<div class="select direction__select"
                             :class="activeSelect ? 'select-active ' : 'animate__animated animate__fadeIn'">
                            <li class="pr-9 text-left select__select-item list"
                                :class="activeSelect ? 'select__select-item-active ' : 'animate__animated animate__fadeIn'"
                                @click="rotateArrow"> {{ texts.FILTER_NEW }}
                            </li>
                            <ul :class="activeSelect ? 'd-block animate__animated animate__fadeIn' : 'd-none'">
                                <li @click="onSelect()"
                                    class="text-left mt-4">
                                    {{ texts.FILTER_PRICE }}
                                </li>
                                <li @click="onSelect()"
                                    class="text-left mt-4">
                                    {{ texts.FILTER_POP }}
                                </li>
                            </ul>
                        </div>
                        -->
                    </div>
                </div>
                <div @click="toggleSetFilter">
                    <switch-button class="d-md-none mt-8 mb-8"> {{ buttons.set }}</switch-button>
                </div>
            </div>


            <v-row>
                <v-col v-for="(product, index) of products" :key="index" cols="12" md="5" lg="4" xl="3">
                    <product :item="product" class="mb-16"/>
                </v-col>
            </v-row>


        </v-container>
        <main-banner :item="secondBanner"/>
    </section>

</template>

<style lang="scss">
.direction {

    &__head {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    &__title {
        color: $white;
        position: absolute;
        font-size: 30px;
        line-height: 35px;
        @include up($md) {
            font-size: 60px;
            line-height: 65px;
        }
    }

    &__img {
        width: 100%;
        max-height: 300px;
        object-fit: cover;
    }

    &__filter {
        display: flex;
        flex-direction: column;
        align-items: center;
        @include up($md) {
            flex-direction: row;
            align-items: baseline;
        }
    }

    &__select {
        @include up($md) {
            width: unset;
        }
    }

    & .select {
        position: relative;

        &-active {
            border-radius: unset;
            border-top-right-radius: 24px;
            border-top-left-radius: 24px;
        }

        & ul {
            position: absolute;
            top: 30px;
            left: 0;
            z-index: 2;
            width: 100%;
            border-bottom-right-radius: 24px;
            border-bottom-left-radius: 24px;
            background-color: $additional100;
            padding: 13px 30px 13px 17px;
            box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.06);
        }
    }

    &__wrapper {
        display: flex;
        align-items: baseline;
        margin: auto;
    }

    &__sort {
        font-weight: 300;
        font-size: 18px;
    }
}
</style>

<script>
import Directions from "./directions";
import MainBanner from "./main-banner";
import Product from "../components/product";
import SwitchButton from "../components/switch-button";
import SetFilter from "../components/set-filter";
import FilterCheckboxes from "../components/filter-checkboxes";
import SelectCustom from "../components/select-custom";


export default {
    name: 'Direction',
    components: {
        SelectCustom,
        FilterCheckboxes, SetFilter, SwitchButton, Product, Directions, MainBanner
    },
    props: {
        dir: {
            default: null,
            type: String
        },
    },
    data() {
        return {
            isFilterOpen: false,
            activeSelect: false,
            filterID: null
        }
    },
    computed: {
        secondBanner() {
            if (!this.$store.state.page?.ProductListController?.banners) return null;
            if (this.$store.state.page?.ProductListController?.banners.length < 2) return null;
            return this.$store.state.page?.ProductListController?.banners[1];
        },
        products() {
            return this.$store.state.page?.ProductListController?.items;
        },
        item() {
            return {
                name: this.$store.state.page?.ProductListController?.section?.NAME,
                image: require('@/assets/directions/dir-face.jpg'),
                imageLg: this.$store.state.page?.ProductListController?.section?.DETAIL_PICTURE,
                //image: this.$store.state.page?.ProductListController?.section?.UF_DIRECTION_PIC

            };
        },
        buttons() {
            return {
                set: this.$store.state.common?.buttons?.FILTER_OPEN,
            }
        },
        texts() {
            return this.$store.state.page?.ProductListController?.texts;
        },
        filterOptions() {
            return {
                new: this.$store.state.page?.ProductListController?.texts?.FILTER_NEW,
                pop: this.$store.state.page?.ProductListController?.texts?.FILTER_POP,
                price: this.$store.state.page?.ProductListController?.texts?.FILTER_PRICE
            }
        },
    },

    methods: {
        toggleSetFilter() {
            this.isFilterOpen = !this.isFilterOpen
        },

        onFilterChange() {
            this.filterID = null;
        }
    }
}


</script>