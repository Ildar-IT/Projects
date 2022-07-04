<template>
	<section class="intro" ref="intro" v-scroll="handleScroll">
		<transition name="fade-long">
			<div v-if="withFade" class="intro__fade"></div>
		</transition>
		<transition name="fade" appear mode="out-in">
			<video v-if="canPlayVideo && isWindowMD" autoplay muted loop playsinline class="intro__video" key="video1" @loadeddata="withFade=false">
				<source src="@/assets/home/intro/video-background.mp4" type="video/mp4">
			</video>
			<video v-else-if="canPlayVideo" autoplay muted loop playsinline class="intro__video" key="video2" @loadeddata="withFade=false">
				<source src="@/assets/home/intro/video-background-mobile.mp4" type="video/mp4">
			</video>
		</transition>
		<v-container>
			<div class="d-flex flex-column justify-center align-center text-center mx-auto">
				<div class="h1">LE BONHEUR</div>
				<img src="@/assets/home/intro/signature.svg" alt="Laurent Moreno"
					 class="d-block mr-1 intro__signature">
				<div class="size1 mt-1 mt-md-2">CHOCOLATERIE</div>

				<btn-link :to="{ name: 'shop' }" class="mx-auto mt-14" label="SHOP NOW"/>

			</div>
		</v-container>
		<button class="intro__arrow" @click="$emit('click-scroll-down')">
			<div>Scroll down</div>
			<img src="@/assets/home/intro/arrow.svg" alt="Scroll down">
		</button>
	</section>
</template>

<script>
    import BtnLink from '../../components/btn-link';

    export default {
        name: "intro",
        components: {
            BtnLink
        },
		data: ()=> {
            return {
                canPlayVideo: true,
                withFade: true
			}
		},
        computed: {
            isWindowMD() {
                return this.$store.getters.isWindowMD;
            }
        },
        methods: {
            handleScroll() {
                const rect = this.$refs.intro.getBoundingClientRect();
                //const headerHeight = this.$store.state.headerHeight;
                //if (rect.bottom - this.$store.state.headerHeight > 0) {
                if (rect.bottom > 0) {
                    this.$store.state.isHeaderInversed = true;
                } else {
                    this.$store.state.isHeaderInversed = false;
                }
            }
        },
        mounted() {
            this.handleScroll();
        }
    }
</script>

<style lang="scss">
	.intro {
		position: relative;
		width: 100%;
		height: 100vh;
		background: $black;

		.container {
			height: 100%;
			position: relative;
			z-index: 2;
			display: flex;
			color: $white;
		}

		.h1 {
			font-size: 50px;
			line-height: 30px;
			@include up($md) {
				font-size: $fs-h1;
				line-height: 38px;
			}
		}

		&__video {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			object-fit: cover;
		}

		&__fade {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index:1;

			background: $black;
		}

		&__signature {
			max-width: 298px;
			@include up($md) {
				max-width: 338px;
			}
		}

		.size1 {
			font-weight: $fw-book;
			font-size: 14px;
			letter-spacing: 2.8px;
			@include up($md) {
				font-size: $fs-1;
				letter-spacing: $ls-1;
			}
		}

		.btn-link {
			color: $white !important;
			font-weight: $fw-book !important;
			width: 134px;
		}

		&__arrow {
			position: absolute;
			z-index: 3;
			bottom: 40px;
			left: 50%;
			transform: translateX(-50%);
			padding: 20px;
			@include transition();
			mix-blend-mode: difference;
			cursor: pointer;

			opacity: 0.4;

			&:hover {
				opacity: 1;
				transform: translateX(-50%) translateY(16px);

				div {
					opacity: 1;
					transform: translateY(0);
				}
			}

			div {
				color: $white;
				opacity: 0;
				@include transition();
				transform: translateY(24px);
			}
		}
	}
</style>