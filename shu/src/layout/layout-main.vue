<template>
	<div class="layout-main">
		<the-header/>
		<v-main>
			<transition name="route" mode="out-in">
				<router-view :key="'a' + $route.params.dir"/>
			</transition>
		</v-main>
		<the-footer/>
	</div>
</template>


<script>
    import TheHeader from "./main/the-header";
    import TheFooter from "./main/the-footer";

    export default {
        components: {TheFooter, TheHeader}
    }
</script>