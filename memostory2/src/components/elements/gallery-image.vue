<template>
	<div class="image-hoverable__wrap" @click="onClickImage" >
		<div class="gallery-image__wrap" >
			<div class="gallery-image image-hoverable"
			     :class="imageClass"
			     :style="{ 'backgroundImage': 'url(' + item.PREVIEW_PICTURE + ')',  'transform': item.transform }">
				<div v-if="filterLight" class="gallery-image__filter-light"></div>
				<div v-if="filterDark" class="gallery-image__filter-dark"></div>
			</div>
			<h3 v-if="textTop||textCenter||textBottom"
			    class="gallery-image__text white--text "
			    :class="textClass">
				<span class="gallery-image__text__wrap margin-right-main margin-left-main">
					{{ item.NAME }}
				</span>
			</h3>
			<h6 v-if="withYear && item.YEAR"
			    class="gallery-image__text white--text gallery-image__text--bottom padding-bottom-main">
				<span class="gallery-image__text__wrap margin-right-main margin-left-main  ">
					{{ item.YEAR }}
				</span>
			</h6>
		</div>
	</div>

</template>

<script>
	export default {
		name: "gallery-image",

		props: {
			item: {
				type: Object,
			},
			fullwidth: {
				type: Boolean,
				default: false
			},
			square: {
				type: Boolean,
				default: false
			},
			textTop: {
				type: Boolean,
				default: false
			},
			textCenter: {
				type: Boolean,
				default: false
			},
			textBottom: {
				type: Boolean,
				default: false
			},
			filterLight: {
				type: Boolean,
				default: false
			},
			filterDark: {
				type: Boolean,
				default: false
			},
			withYear: {
				type: Boolean,
				default: false
			},
		},
		computed: {
			textClass() {
				return{
					"gallery-image__text--center": this.textCenter,
					"gallery-image__text--top": this.textTop,
					"padding-top-main": this.textTop,
					"gallery-image__text--bottom": this.textBottom,
					"padding-bottom-main": this.textBottom,
				}
			},
			imageClass() {
				return {
					"gallery-image--square": this.square,
					"gallery-image--default": !this.square,
				}
			}
		},
		methods: {
			onClickImage() {
				this.$emit('click', this.item);
			},
		},
		mounted() {

		}
	}
</script>

<style lang="scss">
.gallery-image{
	width: 100%;
	height: 0;
	position: relative;
	background-position: center;
	background-size: cover;

	&__wrap{
		position: relative;
	}

	&--square{
		padding-top: 100%;
	}

	&--default{
		padding-top: 66%;
	}

	&__filter-light{
		background: linear-gradient(0deg, rgba(38, 40, 49, 0.25), rgba(38, 40, 49, 0.25));
		height:100%;
		position:absolute;
		width:100%;
		top:0;
		left:0;
	}

	&__filter-dark{
		/*background: #262831;*/
		/*opacity: 0.4;*/
		background: linear-gradient(0deg, rgba(38, 40, 49, 0.4), rgba(38, 40, 49, 0.4));
		height:100%;
		position:absolute;
		width:100%;
		top:0;
		left:0;
	}


	&__text{
		position: absolute;
		width: 100%;
		z-index: 1;

		@include up($sm) {
			/*width: 50%;*/
		}

		&__wrap{
			display: block;
			flex: none;
		}

		&--center{
			top: 50%;
			left: 50%;
			margin-right: -50%;
			transform: translate(-50%, -50%);
			text-align: center;
		}

		&--top{
			top:0;
			text-align: left;
		}

		&--bottom{
			bottom:0;
			text-align: left;
		}
	}
}
</style>