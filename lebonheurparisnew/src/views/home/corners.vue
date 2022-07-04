 <template>
	<section class="section--padding  corners">
		<v-container class="container--narrow">
			<h3 class="mb-10 d-md-none text-center">Our stores</h3>
			<v-row justify="space-between">
				<v-col cols="12" md="6" class="d-flex justify-center">
					<animated-img :src="require('@/assets/history/H2.jpg')" alt="Home of LE BONHEUR"/>
					<!--<home-swiper v-if="isWindowMD" :items="items" alt="Corners"/>-->
				</v-col>
				<v-col cols="12" md="6" lg="5" class="pr-md-8 pr-lg-0 pt-md-10 order-md-first">
					<h3 class="mb-8 d-none d-md-block">Corners</h3>

					<div class="corners__nav mx-auto mx-md-0 d-flex justify-center justify-md-start mt-8">
						<a class="h4 mx-1 mx-md-0 active" href="" @click.prevent="">PARIS</a>
						<!--<a class="h4 mx-1 mx-md-0 ml-md-6" href="" @click.prevent="">New york</a>
						<a class="h4 mx-1 mx-md-0 ml-md-6" href="" @click.prevent="">Kuwait</a>-->
					</div>

					<div class="d-flex flex-column align-center align-md-start">

						<div class="mx-auto mx-md-0">
							<div class="d-flex align-center mt-8">
								<img src="@/assets/geo.svg" alt="Address">
								<p class="ml-2">148 rue Saint-Honoré, Paris 75001</p>
							</div>
							<div class="d-flex align-center">
								<img src="@/assets/tel.svg" alt="Phone">
								<a href="tel:+33142605875" class="ml-2">+33 1 42 60 58 75</a>
							</div>
						</div>
						<p class="limited text-center text-md-left mt-8">To honour the very first meeting in Paris on
							rue Saint Honoré, where the
							story of LE BONHEUR begins, our first boutique was opened at 148 rue Saint-Honoré.
						</p>
					</div>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="12">
					<div class="corners__map">
						<MglMap
								container="corners-map"
								:center.sync="map.center"
								:zoom.sync="map.zoom"
								:accessToken="map.accessToken"
								:mapStyle="map.style"
						>
							<MglMarker :coordinates="point.coordinates" :offset="point.offset" color="red" />
							<MglNavigationControl position="top-right" />
						</MglMap>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script>
    import Mapbox from "mapbox-gl";
    import {MglMap, MglMarker, MglNavigationControl} from "vue-mapbox";
    import AnimatedImg from "../../components/animated-img";

    export default {
        name: "corners",
        components: {
            AnimatedImg,
            MglMap,
            MglMarker,
            //MglScaleControl,
            MglNavigationControl
            /*MglGeojsonLayer*/
        },
        data() {
            return {
                map: {
                    accessToken: "pk.eyJ1IjoicGxheW5leHQiLCJhIjoiY2wzdWpuMG5sMDB0MDNrcW5lOW9sYWgyYiJ9.FV91iCRxZ83-1B0OB3Ou6A",
                    style: "mapbox://styles/playnext/cl3ujogub002z15penxokhxmo",
                    center: [2.3382551, 48.8619812],
                    zoom: 15
                },
				point: {
                    coordinates: [2.3382, 48.8618],
                    offset: [6, -10]
				}
            }
        },
    }
</script>

<style lang="scss">
	.corners {
		background-color: $additional-100;

		a.h4 {
			text-decoration-color: $gray !important;
			color: $gray !important;
			white-space: nowrap;

			&:hover, &.active {
				text-decoration-color: $golden !important;
				color: $golden !important;
			}
		}

		&__nav {
			max-width: 295px;
		}

		&__map {
			padding-top: 28px;
			height: 258px;

			@include up($md) {
				padding-top: 64px;
			}
		}
		#corners-map {
			width: 100%;
			height: 256px;
			border: 1px solid $white;
		}


		/*background-color: $additional-100;
		padding: 64px 0;
		@include up($sm) {
			padding: 96px 0;
		}
		@include up($lg) {
			padding: 164px 0;
		}

		&:hover {
			.left {

				@include up($sm) {
					left: 24px;
					top: 24px;
				}
				@include up($lg) {
					left: 16px;
					top: 16px;
				}
			}
		}

		&__img {
			max-width: 296px;
			max-height: 296px;
			@include up($sm) {
				max-width: 374px;
				max-height: 374px;
			}
			@include up($lg) {
				max-width: 442px;
				max-height: 442px;
			}

			position: relative;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		a {
			@include transition();

			&:hover {
				opacity: 0.6;
			}
		}

		&__nav {
			width: 100%;

			h4 {
				color: $black-100;
			}

			.active {
				color: $primary-500;
			}

		}

		.my-text-3 {
			color: $black-200 !important;
		}*/
	}

</style>