<template class="Home">
    <div class="home" id="home">

        <main-banner :item="mainBanner"/>

        <new-items id="new"/>
        <main-banner :item="secondBanner"/>
        <directions/>

        <main-banner :item="thirdBanner"
                     class="btnLinkBlue"
        />

        <popular-items/>
        <insta-shu/>
    </div>
</template>


<script>

import TheHeader from "../layout/main/the-header";
import TheFooter from "../layout/main/the-footer";
import MainBanner from "./main-banner";
import Directions from "./directions";
import PopularItems from "./popular-items";
import NewItems from "./new-items";
import Product from "../components/product";
import InstaShu from "./insta-shu";

export default {
    name: 'Home',
    components: {
        InstaShu,
        Product,
        NewItems,
        PopularItems,
        MainBanner,
        TheFooter,
        TheHeader,
        Directions,
    },
    computed: {
        popularProducts() {
            return this.$store.state.page?.HomeController?.popularProducts;
        },
        mainBanner() {
            /*title="Коллекция Urban осень-зима 2021"
            text="Ослепительный хайлайтер в невесомой бархатистой текстуре"
            btn="Подробнее"*/
            if (!this.$store.state.page?.HomeController?.banners) return null;
            return this.$store.state.page?.HomeController?.banners[0];

        },
        secondBanner() {

           /* title="Создай образ"
            text="Открой для себя актуальные образы и самые главные тренды в макияже вместе с косметикой SHU"
            btn="Подробнее"*/
            if (!this.$store.state.page?.HomeController?.banners) return null;
            if (this.$store.state.page?.HomeController?.banners.length < 2) return null;
            return this.$store.state.page?.HomeController?.banners[1];
        },
        thirdBanner() {

            /* title="Создай образ"
             text="Открой для себя актуальные образы и самые главные тренды в макияже вместе с косметикой SHU"
             btn="Подробнее"*/
            if (!this.$store.state.page?.HomeController?.banners) return null;
            if (this.$store.state.page?.HomeController?.banners.length < 3) return null;
            return this.$store.state.page?.HomeController?.banners[2];
        }


    },
    mounted() {
        console.log("Newp products: ", this.$store.state.page?.HomeController?.newProducts);
        console.log("Pop products: ", this.$store.state.page?.HomeController?.popularProducts);
    },
}
</script>