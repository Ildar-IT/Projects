<template>
    <div class="product d-inline-block" v-if="item">

        <div class="mb-8">
            <div :class="item.IS_NEW ? 'product__main-image--before' : ''" class="product__main-image  mx-auto">

                <router-link :to="{name:'ProductPage', params:{code:item.CODE}}"
                             class="product__link mb-8">
                    <transition name="fade" mode="out-in">
                        <img v-if="imageUrl && selectedPhotoIndex === 0" :src="imageUrl" :alt="item.NAME" key="i1">
                        <img v-else-if="imageUrl2 && selectedPhotoIndex === 1" :src="imageUrl2" :alt="item.NAME" key="i2" >
                    </transition>
                    <div @mouseover="onImageOver"
                         @mouseout="onImageOut"/>
                </router-link>

            </div>

            <div v-if="item.offers && item.offers.length" class="product__colors ma-auto mb-8 d-inline-block">
                <div class="d-flex align-center justify-center flex-wrap">
                    <button v-for="(offer, index) of displayedOffers" :key="index"
                            @click="onOfferClick(offer, index)"
                            class="product__color"
                            >
                        <div :style="hexStyle(offer)"/>
                    </button>
                </div>
            </div>

            <div class="product__info px-4">
                <router-link :to="{name:'ProductPage', params:{code:item.CODE}}" class="mb-4">
                    <h3 class="d-inline"> {{ item.NAME }} </h3>
                </router-link>
                <!--<span> {{ item.description }} <br> {{ item.description2 }} </span>-->
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'product',
    props: {
        item: {
            type: Object,
            default: {}
        },
    },
    data() {
        return {
            selectedOfferIndex: 0,
            selectedPhotoIndex: 0
        }
    },

    computed: {
        displayedOffers() {
            return this.item.offers?.slice(0,4);
        },

        imageUrl() {
            if (!this.item?.offers?.length) return;

            const offer = this.item.offers[this.selectedOfferIndex];
            if (!offer.PHOTOS?.length) return;

            const imageUrl = offer.PHOTOS[0];
            return imageUrl;
        },
        imageUrl2() {
            if (!this.item?.offers?.length) return;

            const offer = this.item.offers[this.selectedOfferIndex];
            if (!offer.PHOTOS?.length) return;

            const imageUrl = offer.PHOTOS[1] ? offer.PHOTOS[1] : null;
            return imageUrl;
        },
        texts() {
            return this.$store.state.page?.ProductItemController?.texts;
        }
    },
    methods: {
        hexStyle(offer) {
            return {
                "background-color": "#" + offer.COLOR_HEX
            };
        },
        onOfferClick(offer, index) {
            this.selectedOfferIndex = index;
        },
        onImageOver() {
            const offer = this.item.offers[this.selectedOfferIndex];
            if (offer.PHOTOS.length < 2) return;
            this.selectedPhotoIndex = 1;
        },
        onImageOut() {
            this.selectedPhotoIndex = 0;
        }
    }

}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active{transition: opacity .15s}
.fade-enter, .fade-leave-to{opacity: 0;}
.product {


    &__badge {
        position: absolute;
        transform: rotate(315deg);
        top: 25px;
        left: 5px;
        text-transform: uppercase;
    }

    &__main-image {
        width: 296px;
        position: relative;

        img {
            width: 100%;
        }

        &--before {
            &:before {
                position: absolute;
                content: "";
                background-image: url("~@/assets/badge.svg");
                width: 93.34px;
                height: 93.34px;
                left: 0;
                top: 0;
            }
        }

    }

    h2 {
        font-size: 30px;
        line-height: 35px;
        color: $black500;
    }

    &__link {
        width: 296px;
        height: 296px;
        background-color: $white;
        display: block;
        border-radius: 30px;
        position: relative;

        img {
            border-radius: 30px;
            @include transition();

            &:hover {
                opacity: 0.7;
            }
        }

        div {
            position: absolute;
            z-index: 1;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }
    }

    &__colors {
        //width: 208px;
        //height: 64px;
        padding: 16px 20px;
        background-color: $additional150;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.06);
        border-radius: 1000px;
        box-sizing: border-box;
    }

    &__color {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: 2px solid transparent;
        transition: all 0.3s ease-in;


        &:hover,
        &:focus,
        &:active {
            border: 2px solid #E53935;
        }

        & div {
            width: 32px;
            height: 32px;
            border-radius: 50%;
        }

    }

    .active {
        border: 2px solid #E53935;
    }

    &__info {
        h3 {

            font-weight: normal;
            font-size: 18px;
            line-height: 23px;
            color: black;
            @include transition();

            &:hover {
                opacity: 0.7;
            }
        }

        span {
            display: block;
        }
    }
}
</style>