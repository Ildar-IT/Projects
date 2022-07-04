<template>
	<section class="section--padding text-center text-md-start laurent">
		<v-container class="container--narrow">
			<h3 class="mb-10 d-md-none">Share LE BONHEUR<br />with
				your loved ones</h3>
			<v-row justify="space-between">
				<v-col cols="12" md="6" class="pr-md-10 pr-md-14 d-flex justify-center justify-md-start">
					<animated-img :src="require('@/assets/laurent/H3.jpg')" alt="Laurent Moreno"
								  :reversed="true"
								  @loaded="isLoaded=true"
								  class="mb-8"/>
				</v-col>
				<v-col cols="12" md="6" lg="5" class="pl-md-8 pl-lg-0 d-flex align-center justify-center justify-md-start">
					<div v-if="isLoaded" class="anim-fade-in">
						<h3 class="mb-8 d-none d-md-block">
							Share LE BONHEUR<br/>with your loved ones
						</h3>
						<p class="limited">
							‘I tend to value more the simple things made by hand. I am an artisan,
							and I put my heart and soul into what I do.
							I find my happiness in seeing people’s emotions,
							when they taste my pralines or share it with the people they love.’
						</p>
						<svgicon name="signature" class="d-block mx-auto mx-md-0 mt-8 laurent__signature"/>
					</div>
				</v-col>
			</v-row>
		</v-container>

	</section>
</template>

<script>
    import AnimatedImg from "@/components/animated-img";

    export default {
        name: "laurent",
        components: {
            AnimatedImg
        },
		data: () => {
            return {
                isLoaded: false
			}
		}
    }
</script>

<style lang="scss">
	.laurent {
		&__signature {
			width: 210px;
			fill: $golden;
		}
	}
</style>