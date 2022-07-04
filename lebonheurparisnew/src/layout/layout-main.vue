<template>
	<div class="layout-main">
		<the-header/>
		<v-main>
			<transition name="route" mode="out-in">
				<router-view />
			</transition>
		</v-main>
		<pop-up-basket/>
		<the-footer/>
	</div>
</template>

<script>
    import TheHeader from './the-header';
    import TheFooter from './the-footer';
    import PopUpBasket from "../views/basket/pop-up-basket";

    export default {
        name: "layout-main",
        components: {
            PopUpBasket,
            TheHeader,
            TheFooter
        },
    }
</script>

<style lang="scss">

</style>