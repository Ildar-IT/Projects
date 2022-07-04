<template>
	<!-- с переключением слайдов по ховеру-->
	<div class="gallery-hover">
		<div class="wrapper__visual">
			<div class="wrapper__visual-image"
			     v-if="images && images.length && images[0]!==null">
				<div
						v-for="(image, i) in images"
						:key="i"
						:style="{ 'backgroundImage': 'url(' + image + ')' }"
						:class="{ 'image-active': activeImageIndex === i }"
				>
				</div>
			</div>

			<div v-if="images && images.length>1 && images[0]!==null"
			     class="wrapper__custom-pagination"
			     @mouseleave="setDefaultImage">
				<div class="wrapper__custom-pagination-block"
				     v-for="(image, i) in images" :key="i"
				     @mouseover="onOverPagination(i)">
					<div class="wrapper__custom-pagination-block__bullet"
					     :class="{active:activeImageIndex === i}"></div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>

	export default {
		name: "gallery-hover",
		props: ['images'],
		data() {
			return {
				slideIndex: 0,
				activeImageIndex: 0,
			}
		},
		computed: {},
		methods: {
			setDefaultImage() {
				this.activeImageIndex = 0;
			},
			onOverPagination(i) {
				this.activeImageIndex = i;
			},
		},
		mounted() {
		}

	}
</script>

<style lang="scss">
	.gallery-hover {
		display: block;
		@include transition();

		.wrapper {
			&__visual {
				position: relative;
				height: calc((50vw - 64px)/16*9);

				&-image {
					position: relative;
					div {
						position: absolute;
						width: 100%;
						height: calc((50vw - 64px)/16*9);
						/*height: 100%;*/
						/*padding-top: 66%;*/
						opacity: 0;
						background-size: cover;
						background-position: center;
						@include transition();
						&.image-active {
							opacity: 1;
						}
					}
				}
			}
			&__custom-pagination {
				position: absolute;
				z-index: 3;
				bottom: 0;
				left: 0;
				width: 100%;
				height: calc((50vw - 64px)/16*9);
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding:0 48px;
				/*margin-bottom: -66%;*/
				&-block {
					position: relative;
					width: 100%;
					height: 100%;
					box-sizing: border-box;
					opacity: 1;
					margin-right: 16px;
					margin-left: 16px;

					&__bullet {
						position: absolute;
						width: 100%;
						height: 2px;
						left: 0;
						bottom: 64px;
						background-color: white;
						opacity: 0.5;
						@include transition();
						&.active {
							opacity: 1;
						}
					}
				}
			}
		}
		.image-active {
			opacity: 1;
		}
	}

</style>
