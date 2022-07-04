<template>
    <section class="directions text-center pt-16">
        <v-container>
            <h2 v-html="texts.directions" class="mb-8 mb-md-16"></h2>
            <div class="directions__list pb-8 pb-md-16 d-lg-flex justify-space-between">
                <div v-for="(item, index) of items" class="directions__item">
                    <router-link :to="{name:'Direction', params:{dir:item.dir}}" class="directions__link">


                        <img :src="item.img" alt="" class="d-lg-none">
                        <img :src="item.imgLG" alt="" class="d-none d-lg-block">


                        <h3 class="directions__item-title">
                            {{ item.name }}
                        </h3>
                    </router-link>
                </div>
            </div>
        </v-container>
    </section>
</template>

<style lang="scss">
.directions {
    @include up($lg) {
        position: relative;
        &::before {
            position: absolute;
            content: url("~@/assets/tattoo/2.png");
            width: 452px;
            height: 286px;
            left: -100px;
            top: -25px;
        }
        &::after {
            position: absolute;
            content: url("~@/assets/tattoo/1-sm.png");
            width: 513px;
            height: 604px;
            right: -90px;
            top: 35px;
        }
    }

    h2,
    h3 {
        font-size: 30px;
    }

    h2 {
        @include up($md) {
            font-size: 60px;
            line-height: 70px;
        }
    }

    &__item {
        display: flex;
        justify-content: center;

        &:not(:last-child) {
            margin-bottom: 32px;
            @include up($lg) {
                margin-bottom: 0;
                justify-content: space-between;
            }
        }
    }

    img {
        border-radius: 32px;
        object-fit: cover;
        width: 296px;
        height: 132px;
        @include up($lg) {
            width: 230px;
            height: 296px;
        }
    }

    &__link {
        color: $white !important;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 296px;
        height: auto;
        border-radius: 16px;
        position: relative;
        z-index: 1;
        @include up($lg) {
            max-width: 230px;
            height: 100%;
            width: 100%;
        }

        &:hover {
            &::after {
                content: "";
                display: block;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.08));
                background-color: rgb(193, 0, 22, 0.65);
                box-shadow: 0px 10px 10px 0px #00000014;
                border-radius: 30px;
                opacity: 65%;
                @include up($lg) {
                    border-radius: 32px;
                }
            }
        }
    }

    &__item-title {
        position: absolute;
        z-index: 10;
    }
}
</style>

<script>
export default {
    name: "directions",
    data() {
        return {
            /*     items: [
                    {name: 'Лицо', dir: 'face', img: require('@/assets/directions/face.png'), imgLG: require('@/assets/directions/face-lg.png')},
                    {name: 'Глаза', dir: 'eyes', img: require('@/assets/directions/eyes.png'), imgLG: require('@/assets/directions/eyes-lg.png')},
                    {name: 'Брови', dir: 'brows', img: require('@/assets/directions/brows.png'), imgLG: require('@/assets/directions/brows-lg.png')},
                    {name: 'Губы', dir: 'lips', img: require('@/assets/directions/lips.png'), imgLG: require('@/assets/directions/lips-lg.png')},
                    {name: 'Ногти', dir: 'nails', img: require('@/assets/directions/nails.png'), imgLG: require('@/assets/directions/nails-lg.png')},
                  ]*/
        }
    },
    computed: {
        items() {
            return this.$store.state.common?.sections?.map(el => ({
                name: el.NAME,
                dir: el.CODE,
                imgLG: el.PICTURE
            }))
        },
        texts() {
            return {
                directions: this.$store.state.page?.HomeController?.texts?.MAIN_DIRECTIONS,
            }
        }
    }
}
</script>