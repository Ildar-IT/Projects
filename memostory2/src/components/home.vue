<template>
	<div class="home">
		<top-banner id="top"/>
		<services id="services"/>
		<mobile-manager id="manager"/>
		<examples id="examples" class="mt-n2 mt-sm-0"/>
		<tariffs id="tariffs"/>
		<about id="about" />
		<reviews id="reviews"/>
		<questions id="questions"/>
		<block-care id="care"/>
	</div>
</template>

<style lang="scss">

	.home {
		&__main {
			position: relative;
			height: auto;
			@include up($md) {
				height: 900px;
			}
		}

	}
</style>

<script>
    import {scroller} from 'vue-scrollto/src/scrollTo'

    import topBanner from "../components/home/top-banner";
    import services from "../components/home/services";
    import mobileManager from "../components/home/mobile-manager";
    import examples from "../components/home/examples";
    import tariffs from "../components/home/tariffs";
    import about from "../components/home/about";
    import reviews from "../components/home/reviews";
    import questions from "../components/home/questions";
    import blockCare from "../components/home/block-care";

    import HeaderComponent from "../components/header-component";

    export default {
        name: 'home',
        components: {
            topBanner,
            services,
            mobileManager,
            examples,
            tariffs,
            about,
            reviews,
            questions,
            blockCare,
            HeaderComponent
        },
        computed: {
            isWindowXS() {
                return this.$store.getters.isWindowXS;
            },
            isWindowSM() {
                return this.$store.getters.isWindowSM;
            },
            isWindowMD() {
                return this.$store.getters.isWindowMD;
            },
            isWindowLG() {
                return this.$store.getters.isWindowLG;
            },
            isMobileApp() {
                return this.$store.state.common.isMobileApp;
            }
        },
        methods: {
            scrollToId(section) {
                console.log('home scroll', section)
                this.$router.push({name: 'home', hash: section.linkTo}).catch(() => {
                });
                setTimeout(() => {
                    const scrollTo = scroller();
                    scrollTo(section.linkTo)
                }, 100)
            },
            scrollUpToId(section) {
                console.log('home scroll', section)
                this.$router.replace({name: 'home', hash: section.linkTo}).catch(() => {
                });
                setTimeout(() => {
                    const scrollTo = scroller();
                    scrollTo(section.linkTo)
                }, 10)
            },
        },
        created() {
            if (this.isMobileApp) {
                this.$router.replace({name: 'memory-places'});
                return;
            }
        }
    }

</script>
