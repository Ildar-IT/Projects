<template>
	<section class="box-type mx-auto">

		<v-container>
			<v-row>
				<v-col cols="12" sm="6">
					<img class="box-type__img d-block mx-auto mx-sm-0" src="../../../assets/box/box-type/angel.jpg"
						 alt="Angel Box">
				</v-col>
				<v-col cols="12" sm="6" class="text-center text-sm-start">
					<h3 class="my-primary mt-8">ANGEL BOX</h3>
					<div class="size1 my-primary mt-2">9 pcs</div>
					<div class="d-flex  justify-space-around justify-sm-start">
						<div class="box-type__choice-item mr-sm-12 d-sm-flex align-sm-center">
							<router-link to="/shop/box/Laurent">
								<img src="../../../assets/box/laurent.svg" alt="Laurent">
							</router-link>
							<div class="my-text-2 mt-4 mt-sm-0 ml-sm-6 ">Set by Laurent Moreno</div>

						</div>
						<div class="box-type__choice-item d-sm-flex align-sm-center">
							<router-link to="/shop/box/my">
								<img src="../../../assets/box/your.svg" alt="My choice">
							</router-link>
							<div class="my-text-2 mt-4 mt-sm-0 ml-sm-6">Your choice</div>
						</div>
					</div>
					<Divider class="my-8"/>
					<div class="box-type__payment d-sm-flex align-sm-center">
						<BtnPrimary class="d-none d-sm-block large mr-sm-16" label="Add Box to cart" click="false"/>
						<h3 class="my-black">15.6 €</h3>
						<BtnPrimary class="d-block d-sm-none  large mx-auto mt-8" label="Add to cart" click="false"/>
					</div>
				</v-col>
			</v-row>
		</v-container>
		<div class="box-type__img "></div>
	</section>
</template>

<script>
    import Divider from "../../../components/divider";
    import BtnPrimary from "../../../components/btn-primary"


    export default {
        name: "box-type",
        components: {
            Divider,
            BtnPrimary,

        },
    }
</script>

<style lang="scss">
	.box-type {
		padding-top: 32px;
		padding-bottom: 64px;
		@include up($sm) {
			padding-top: 96px;
			padding-bottom: 192px;
		}

		&__img {
			max-width: 100%;
		}

		&__choice {
			&-item {
				width: 132px;
				@include up($sm) {
					width: 100%;
				}

				img {
					width: 64px;
					height: 64px;
				}
			}
		}

		&__img {
			width: auto;
			margin: 96px 32px 32px 32px;
			height: 296px;
			background-image: url("../../../assets/box/nuts.jpg");
			background-position: center;
			object-fit: cover;
			@include up($sm) {
				margin: 0 0 96px 0;
				background-image: url("../../../assets/box/nuts-sm.jpg");
				height: 418px;
				background-size: cover;
				width: 100%;
			}
			@include up($lg) {
				margin: 0 0 128px 0;
				background-image: url("../../../assets/box/bg-lg.jpg");
				height: 552px;

			}
		}
	}
</style>