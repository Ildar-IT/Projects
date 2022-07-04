<template>
	<section class="section--padding text-center text-md-start history">
		<v-container class="container--narrow">
			<h3 class="mb-10 d-md-none">OUR STORY</h3>
			<v-row justify="space-between">
				<v-col cols="12" md="6" class="pr-md-10 pr-lg-0 d-flex justify-center justify-md-start">
					<animated-img :src="require('@/assets/history/H1.jpg')" alt="Candies"
								  :reversed="true"
								  class="mb-8"/>
				</v-col>
				<v-col cols="12" md="6" class="d-flex justify-center justify-md-start">
					<div class="pt-md-4">
						<h3 class="mb-8 d-none d-md-block">OUR STORY</h3>
						<p class="limited">
							The story of Le Bonheur and Laurent Moreno
							dates back to autumn 2008, in the lobby of the
							Hôtel Costes, rue Saint-Honoré in Paris. This is
							when Laurent first discovers the brand Le
							Bonheur restaurants and a new confectionery
							project of the same name in Saint Petersburg. The
							idea inspired him to take up the kitchen of Le
							Bonheur as a pastry chef.</p>
						<p class="limited">
							Laurent has introduced the academic French
							confectionery know-how and the art of work with
							chocolate, and together with his team he has been
							surprising the guests with the play of ingredients,
							paying much attention to their quality and the
							nuances of preparation.
						</p>
					</div>
				</v-col>
			</v-row>
			<v-row justify="space-between" class="mt-md-4 mt-lg-12">
				<v-col cols="12" md="6" class="d-flex justify-center justify-md-start">
					<animated-img :src="require('@/assets/history/H2.jpg')" alt="Shop"
								  :reversed="false"
								  class="my-8 mt-md-4 history__img"/>
				</v-col>
				<v-col cols="12" md="6" class="pr-md-10 order-md-first d-flex justify-center justify-md-start">
					<div class="pt-md-4">
						<p class="limited">
							This is how the first pralines made by Laurent
							Moreno appeared in Le Bonheur restaurant in
							Saint Petersburg so that the guests could take apiece of happiness for their loved ones as a
							gift… It
							took Laurent a long time to work out the shape of
							pralines trying to make the edges of the sweets
							soft and to keep such size, that the praline cube
							could be placed in hand, its weight could be felt,
							and could become a manifestation of feelings
							towards a loved one, and for this reason each of
							the flavours was eye-catchingly wrapped.</p>
						<p class="limited">
							Later, to honour the very first meeting in Paris on
							rue Saint Honoré, where the story of Le Bonheur
							begins, our first boutique was opened at 148 rue
							Saint-Honoré.
						</p>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script>
    import AnimatedImg from "@/components/animated-img";

    export default {
        name: "history",
        components: {
            AnimatedImg
        },
    }
</script>

<style lang="scss">
	.history {
		background: $primary-50;
	}
</style>