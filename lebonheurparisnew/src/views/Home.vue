<template>
	<div class="home">
		<intro @click-scroll-down="scrollTo('about')"/>
		<about id="story"/>
		<history/>
		<laurent/>
		<collections :collections="collections" :flavours="flavours" id="flavours"/>
		<section class="section--padding"><category-list :items="categories"/></section>
		<corporate-orders id="special"/>
		<partnership id="partnership"/>
		<corners id="stores"/>
		<contacts id="contacts"/>
	</div>
</template>

<script>
    import Intro from './Home/intro';
    import About from './Home/about';
    import History from './Home/history';
    import Laurent from './Home/laurent';
    import Partnership from './Home/partnership';
    import Collections from './Home/collections';
    import CategoryList from '@/components/category-list';
    import CorporateOrders from './Home/corporate-orders';
    import Contacts from './Home/contacts';
    import Corners from './Home/corners';
    import {scrollTo} from '@/utils/utils';
    //import collections from '@/store/tmp-collections';
    //import categories from '@/store/tmp-categories';

    export default {
        name: "Home",
        components: {
            Intro,
            About,
            History,
            Laurent,
            Collections,
            Partnership,
            CategoryList,
            CorporateOrders,
            Contacts,
            Corners
            // yandexMap, ymapMarker
        },
        data() {
            return {
                //categories
            }
        },
		computed: {
            categories() {
                return this.$store.state.page.HomeController.categories;
            },
            collections() {
                return this.$store.state.page.HomeController.collections;
			},
            flavours() {
                return this.$store.state.page.HomeController.flavours;
            }
		},

        methods: {
            scrollTo(id) {
                scrollTo(id);
            }
        }
    }
</script>

<style lang="scss">
	.home {
		.collections {
			background: $additional-100;
		}
	}
</style>