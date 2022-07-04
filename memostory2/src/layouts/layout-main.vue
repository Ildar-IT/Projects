<template>
	<div class="layout-main">
		<header-component/>
		<main>
			<transition name="route" mode="out-in">
				<router-view/>
			</transition>
		</main>
		<footer-component/>
	</div>
</template>

<script>
    // import header from "../components/header-component";
    // import LayoutFooter from "./layout-footer";
    import mobileMenu from "../components/mobile-menu";
    import HeaderComponent from "../components/header-component";
    import footerComponent from "../components/footer-component";
    // import layoutAccount from "./layout-account";

    export default {
        name: "layout-main",
        components: {mobileMenu, HeaderComponent, footerComponent},
        computed: {
            isMobileApp() {
                return this.$store.state.common.isMobileApp;
            },
            isMenuOpen: {
                set(v) {
                    this.$store.state.isMenuOpen = v;
                },
                get() {
                    return this.$store.state.isMenuOpen
                }
            },
        },
        methods: {
            scrollUpToId(section) {
                this.$router.replace({name: 'home', hash: section.linkTo}).catch(() => {
                });
                setTimeout(() => {
                    const scrollTo = scroller();
                    scrollTo(section.linkTo)
                }, 10)
            },
        }
    }
</script>

<style lang="scss">
	.layout-main {
		overflow-x: hidden;
	}
</style>
