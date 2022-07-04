<template>
	<div class="d-flex flex-column flex-sm-row align-center justify-center justify-sm-end first-screen-slide">

		<div v-if="animationStep >= 2" class="first-screen-slide__text">
			<div class="first-screen-slide__text-h1">
				<h1>
					<div v-for="item in slide.texts" class="animate__animated animate__fadeInUp">{{ item }}</div>

				</h1>
				<btn-link :to="slide.route"
						  class="animate__animated animate__fadeIn animate__delay-1s mt-8 d-none d-sm-inline-flex justify-start pl-0"/>
			</div>
			<!--<secondary-link
					class="animate__animated animate__fadeIn animate__delay-5s first-screen-slide__link d-sm-none"
					:to="slide.route"/>-->
		</div>
		<div v-if="animationStep >= 1" class="order-sm-first animate__animated animate__fadeIn animate__delay-1s first-screen-slide__img">
			<img :src="slide.img">
		</div>
	</div>
</template>

<style lang="scss">
	.first-screen-slide {
		position: relative;
		width: 100%;
		height: 95%;

		@include up($sm) {
			height: 100%;
		}

		&__img {
			/*position: absolute;
				left: 10vw;
				top: 25vh;*/
			margin-top: 4vh;
			width: 100%;
			height: 30vh;

			@include up($sm) {
				//position: unset;
				//height: auto;
				margin-top: 0;
				width: unset;
				height: 40vh;
				flex-basis: 40%;

			}
			@include up($md) {
				height: 60vh;
			}


			img {
				display: block;
				margin: 0 auto;
				//blend-mode: screen;
				//opacity: 0.3;
				//width: 382px;
				height: 100%;
				min-height: 100px;
			}

		}

		&__text {
			position: relative;
			z-index: 1;
			flex-basis: 45%;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;

			@include up($sm) {
				display: block;
				flex-basis: 55%;
			}
			@include up($lg) {
				top: 0;
			}
			&-h1 {
				h1 {
					div {
						&:nth-child(2) {
							animation-delay: 0.1s;
						}
						&:nth-child(3) {
							animation-delay: 0.2s;
						}
						&:nth-child(4) {
							animation-delay: 0.3s;
						}
						&:nth-child(5) {
							animation-delay: 0.4s;
						}
						&:nth-child(6) {
							animation-delay: 0.5s;
						}
					}
				}
			}
		}

		.secondary-link {
			border: 1px solid $white;
			color: $white !important;
		}
	}
</style>

<script>
    import BtnLink from "../../components/btn-link";
    import SecondaryLink from "../../components/secondary-link";
    import 'animate.css';


    export default {
        props: ['slide'],
        components: {SecondaryLink, BtnLink},
        data: () => {
            return {
                animationStep: 0
            }
        },
        mounted() {
            setTimeout(() => {
                this.animationStep++;
                setTimeout(() => {
                    this.animationStep++;
                }, 150);
            }, 50);

        }
    }
</script>
