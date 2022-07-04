<template>
    <section class="shops text-center mb-8" id="shops">
        <v-container>
            <h1 class="d-lg-none mt-8 mb-8">{{ texts.buy }}</h1>
            <div class="shops__selectors">
                <!--<div class="mr-lg-4 select-caret">
                    <select v-model="form.countryId">
                        <option v-for="(item, index) of countries" :value="item.ID">{{ item.UF_NAME }}</option>
                    </select>
                </div>
                <div class="ml-lg-4 select-caret">
                    <select v-model="form.cityXmlId" :disabled="!form.countryId" @change="onCityChange">
                        <option v-for="(item, index) of cities" :value="item.UF_XML_ID">{{ item.UF_NAME }}</option>
                    </select>
                </div>
                -->

                <!-- each option: .value, .text -->
                <select-custom v-model="form.countryId"
                               :options="countryOptions"
                               @change="onCountryChange"/>

                <select-custom v-model="form.cityXmlId"
                               :options="cityOptions"
                               :disabled="!form.countryId"
                               @change="onCityChange"/>

                <!-- <div class="mt-8 ml-lg-4 d-inline-block select shops__select"
                     :class="isActive ? 'select-active ' : 'animate__animated animate__fadeIn'"
                     v-model="form.countryId">
                    <li class="pr-9 text-left select__select-item list"
                        :class="isActive ? 'select__select-item-active ' : 'animate__animated animate__fadeIn'"
                    > Russia
                    </li>
                    <ul :class="isActive ? 'd-block animate__animated animate__fadeIn' : 'd-none'">
                        <li @click="onSelect(item)"
                            v-for="(item, index) of countries" :value="item.ID"
                            class="text-left mt-4">
                            {{ item.UF_NAME }}
                        </li>
                    </ul>
                </div>

                <div class="mt-8 ml-lg-4 d-inline-block select shops__select"
                     :class="isActive ? 'select-active ' : 'animate__animated animate__fadeIn'"
                     v-model="form.cityXmlId" :disabled="!form.countryId" @change="onCityChange">
                    <li class="pr-9 text-left select__select-item list"
                        :class="isActive ? 'select__select-item-active ' : 'animate__animated animate__fadeIn'"

                    > Moscow
                    </li>
                    <ul :class="isActive ? 'd-block animate__animated animate__fadeIn' : 'd-none'">
                        <li @click="onSelect(item)"
                            v-for="(item, index) of cities" :value="item.UF_XML_ID"
                            class="text-left mt-4">
                            {{ item.UF_NAME }}
                        </li>
                    </ul>
                </div>
                -->
            </div>
        </v-container>

        <div class="shops__map mb-8">
            <MglMap container="shops__mapbox"
                    :center="map.center"
                    :zoom.sync="map.zoom"
                    :accessToken="map.accessToken"
                    :mapStyle="map.style"
                    :scroll-zoom="false"
                    @load="onMapLoaded">
                <MglMarker v-for="(item,index) of items" :key="'marker'+index"
                           :coordinates="item.geo"
                           :offset="point.offset" color="rgb(32, 32, 32)">
                    <MglPopup anchor="right" :offset="point.offsetPopup">
                        <div class="shops__map-popup">
                            <h3 class="shops__name mb-2">{{ item.name }}</h3>
                            <div v-if="item.address" class="shops__address">{{ item.address }}</div>
                            <a v-if="item.site" :href="item.site" target="_blank" class="shops__site">{{
                                    item.siteMask
                                }}</a>
                            <a v-if="item.tel" class="shops__tel" href="tel:item.href">{{ item.tel }}</a>
                        </div>
                    </MglPopup>
                </MglMarker>
                <MglNavigationControl position="top-right"/>
            </MglMap>
        </div>

        <v-container class="shops__container">
            <div v-if="items && items.length" class="shops__inner">
                <div v-for="(item, index) of items" class="shops__list" :key="index">
                    <div class="shops__wrapper d-flex flex-column text-left">
                        <h3 class="shops__name mb-4">{{ item.name }}</h3>
                        <p class="shops__address mb-2">{{ item.address }}</p>
                        <a :href="item.site" target="_blank" class="shops__site mb-2">{{ item.siteMask }}</a>
                        <a class="shops__tel" href="tel:item.href">{{ item.tel }}</a>
                    </div>
                </div>
            </div>
            <div v-else>
                <h2>Пожалуйста, выберите город</h2>
            </div>
        </v-container>
    </section>
</template>

<script>
import Mapbox from "mapbox-gl";
import {MglMap, MglMarker, MglPopup, MglNavigationControl} from "vue-mapbox";
import Config from "@/config";
import SelectCustom from "../components/select-custom";

let mapbox;

export default {
    name: "shops",
    components: {
        SelectCustom,
        MglMap,
        MglMarker,
        MglPopup,
        MglNavigationControl
    },
    data: () => {
        return {
            form: {
                countryId: null,
                cityXmlId: null,
            },
            map: {
                accessToken: Config.MAPBOX.accessToken,
                style: Config.MAPBOX.style,
                zoom: 11,	// default zoom
                center: [37.618423, 55.751244],	// default to Moscow
            },
            point: {
                offset: [6, -10],
                offsetPopup: [-10, -16],
                //coordinates: [30.3906, 59.9181],
            },
            isActive: false,
        }
    },
    computed: {
        page() {
            return this.$store.state.page.ShopListController;
        },
        items() {
            if (!this.form.cityXmlId) return null;
            return this.page?.items?.filter(el => el.CITY === this.form.cityXmlId)
                .map(el => {
                    let item = {
                        name: el.NAME,
                        address: el.ADDRESS,
                        site: el.SITE,
                        siteMask: el.SITEMASK,
                        href: el.PHONE,
                        tel: el.PHONE,
                    };
                    const geo = el.GEO?.split(",");
                    if (geo.length >= 2) {
                        const lat = parseFloat(geo[0]);
                        const lng = parseFloat(geo[1]);
                        item.geo = [lat, lng]
                    }
                    return item;
                });
        },
        countries() {
            return this.page?.countries?.filter(el => this.page?.cities.some(c => c.UF_COUNTRY_ID === el.ID));
        },
        cities() {
            if (!this.form.countryId) return [];
            return this.page?.cities.filter(el => {
                return el.UF_COUNTRY_ID === this.form.countryId
            });
        },
        city() {
            return this.cities.find(el => el.UF_XML_ID === this.form.cityXmlId);
        },
        texts() {
            return {
                buy: this.$store.state.common?.buttons?.MENU_BUY
            }
        },
        notSelectList() {
            return this.texts?.enMob;
        },

        selectedCountry() {
            return this.countries.find(el => el.ID === this.form.countryId);
        },
        countryOptions() {
            return this.countries?.map(el => ({
                value: el.ID,
                text: el.UF_NAME
            }));
        },
        cityOptions() {
            return this.cities?.map(el => ({
                value: el.UF_XML_ID,
                text: el.UF_NAME
            }));
        }
    },
    methods: {
        onCountryChange(item) {
            this.form.cityXmlId = null; //this.cities.find(el => parseInt(el.UF_DEF))?.UF_XML_ID;
        },
        onCityChange() {
            this.fitMap();
        },
        onMapLoaded({map}) {
            mapbox = map;

            /*map.setLayoutProperty('country-label', 'text-field', [
                'get',
                'name_ru'
            ]);
            map.setLayoutProperty('settlement-label', 'text-field', [
                'get',
                'name_ru'
            ]);
            map.setLayoutProperty('street-label', 'text-field', [
                'get',
                'name_ru'
            ]);
            map.setLayoutProperty('poi-label', 'text-field', [
                'get',
                'name_ru'
            ]);*/

            this.fitMap();
        },
        fitMap() {
            if (!this.items) return;
            const bounds = new Mapbox.LngLatBounds();
            this.items.forEach(el => bounds.extend(el.geo));

            mapbox.fitBounds(bounds, {
                linear: true,
                padding: 50,
                maxZoom: 13
            });
        },

        onSelect() {
            this.isActive = !this.isActive;
            this.$emit('onSelect');
        }
    },
    mounted() {
        // set Russia by default
        this.form.countryId = this.countries.find(el => parseInt(el.UF_DEF))?.ID;
        this.form.cityXmlId = this.cities.find(el => parseInt(el.UF_DEF))?.UF_XML_ID;
    }
}
</script>

<style lang="scss">

.shops {
    h1 {
        font-size: 30px;
        line-height: 35px;
    }

    &__selectors {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 64px;
        z-index: 2;
        @include up($lg) {
            position: absolute;
            display: block;
            left: 0;
            right: 0;
        }
    }

    &__map {
        //background-image: url("~@/assets/map-bg.jpg");
        height: 60vh; //calc(100vh - 119px);
        max-height: 755px;
        width: 100%;
        background-size: cover;
        position: relative;

        /*&::before {
            content: "";
            position: absolute;
            background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(255, 255, 255, 0) 100%);
            width: 100%;
            height: 178px;
            left: 0;
            top: 0;
            z-index: 1;
        }*/

        .mapboxgl-popup-content &-popup {
            padding: 5px 5px 0 5px;
            text-align: left;

            a {
                outline: none;
                color: $primary500 !important;
                @include transition();

                &:hover {
                    color: $black500 !important;
                }
            }
        }

        .mapboxgl-popup-close-button {
            font-size: 20px;
            right: 3px;
        }
    }

    a {
        color: $black500 !important;
    }

    &__container {
        padding: 0;
        @include up($xl) {
            padding: 0 32px;
        }
    }

    &__inner {
        display: grid;
        @include up($sm) {
            grid-template-columns: repeat(2, 1fr);
        }
        @include up($md) {
            grid-template-columns: repeat(3, 1fr);
        }
        @include up($lg) {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    &__list {
        padding: 16px;
        transition: all 0.2s ease-in;

        &:hover {
            background-color: $primary500;
            color: $white;
            width: 100%;
        }

        &:hover a {
            color: $white !important;
        }
    }

    &__name {
        font-weight: 400;
        font-size: 18px;
        line-height: 23px;
    }
}

</style>