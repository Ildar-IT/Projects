<template>
	<div class="page--padding text-center d-flex align-center justify-center under-construction">
		<section class="section--padding">
			<v-container>
				<v-row>
					<v-col>
						<img src="../assets/error/404.svg" alt="404">
						<h3 class="mt-4">Under construction</h3>
						<p class="size2 mt-8">Some sweets yet to be baked... Please come again later.</p>
						<btn-link :to="{ name: 'home' }" class="mx-auto mt-14" label="Home page"/>
					</v-col>
				</v-row>
			</v-container>
		</section>
	</div>
</template>

<script>
    import BtnLink from '../components/btn-link';

    export default {
        name: "under-construction",
        components: {
            BtnLink,
        }
    }
</script>

<style lang="scss">
</style>