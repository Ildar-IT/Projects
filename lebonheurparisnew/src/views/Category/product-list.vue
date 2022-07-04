<template>
	<div class="product-list">
		<v-container>
			<h3 class="text-center mb-10 mb-md-12 product-list__title">{{category.NAME}}</h3>
			<v-row justify="center">
				<v-col cols="12" :md="colsMD(item)" v-for="(item, index) in items" :key="index">
					<div class="text-center d-flex flex-column align-center py-6 py-md-9 product-list__item"
						 :class="{loaded:item.loaded}">
						<router-link :to="{name:'product', params:{sectionCode:category.CODE,code:item.CODE}}"
									 class="product-list__image" :class="imageClass(item)">
							<v-img :src="item.PREVIEW_PICTURE" :alt="item.NAME"
								   :style="isWindowMD?item.PREVIEW_STYLE:null"
								   :class="{image:item.PREVIEW_HOVER}"
								   @load="onLoaded(item)"/>
							<v-img v-if="item.PREVIEW_HOVER" :src="item.PREVIEW_HOVER" :alt="item.name" class="hover"/>
						</router-link>

						<router-link :to="{name:'product', params:{sectionCode:category.CODE,code:item.CODE}}">
							<h5 class="mt-8 mt-md-11" v-html="nameHtml(item)"></h5>
							<div v-if="chocoHtml(item)" class="size2" v-html="chocoHtml(item)"></div>
						</router-link>
						<span class="h5 mt-2 product-list__price">{{item.PRICE | price(2)}} €</span>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
    import Vue from "vue";

    export default {
        name: "product-list",
        props: ["category", "items"],
        data() {
            return {}
        },
        computed: {
            isWindowMD() {
                return this.$store.getters.isWindowMD;
            }
        },
        methods: {
            photo1(item) {
                if (!item || !item.PHOTOS) return null;
                return item.PHOTOS[0];
            },
            colsMD(item) {
                if (!item.COLS) return 4;
                return parseInt(item.COLS);
                /*let cols = parseInt(item.COLS);
                if (cols < 1) cols = 1;
                if (cols > 3) cols = 3;
                return cols * 4;*/
            },
            imageClass(item) {
                if (!item.COLS) return null;
                return "cols-" + item.COLS;
            },
            nameHtml(item) {
                //return item.name.substr(0, 1).toUpperCase() + item.name.substr(1).toLowerCase();
                let name = item.NAME;
                name = name.replace(/(^.+?)(in )?(dark|milk).+$/is, "$1");
                name = name.replace(/(^.+?)filled with .+$/is, "$1");
                name = name.replace(/(^.+?)\d+ g$/is, "$1");
                name = name.replace(/(^.+?)(\d+ pcs)$/is, "$1<br>$2");
                return name;
            },
            chocoHtml(item) {
                //return item.choco.substr(0, 1).toUpperCase() + item.choco.substr(1).toLowerCase();
                let choco = null;
                if (item.NAME.match(/.+?filled with .+$/)) {
                    choco = item.NAME.replace(/.+?(filled with.+$)/is, "$1");
                    choco = choco.replace(/(.+?)(\d+ g$)/is, "$1<br>$2");
                } else if (item.NAME.match(/.+?(in )?(dark|milk).+$/)) {
                    choco = item.NAME.replace(/.+?((in )?(dark|milk).+$)/is, "$1");
                    choco = choco.replace(/(.+?)(\d+ g$)/is, "$1<br>$2");
                } else if (item.NAME.match(/\d+ g$/)) {
                    choco = item.NAME.replace(/.+?(\d+ g$)/is, "$1");
                }
                /*else if ( item.NAME.match(/\d+ pcs$/)) {
                    choco = item.NAME.replace(/.+?(\d+ pcs$)/is, "$1");
                }*/
                return choco;
            },
            /*imageStyle(item) {
                if ( !item.PREVIEW_STYLE ) return null;
                class s = {};
                return s;
			}*/
            onLoaded(item) {
                setTimeout(() => Vue.set(item, "loaded", true), 300);
            }
        }
    }
</script>

<style lang="scss">
	.product-list {
		.container {
			max-width: 1100px;
			min-height: 800px;
		}

		&__image {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;

			&:hover {
				opacity: unset;//0.2;
				//transform: translateY(-2px); // rotate(1deg);
				.v-image.image {
					opacity: 0;
				}
			}

			.v-image {
				filter: brightness(1.01); // для скрытия серго фона jpg
				@include transition();

				&:not(.image) {
					&:hover {
						filter: brightness(1.02) contrast(1.02);
						transform: translateY(-2px); // rotate(1deg);
					}
				}

				&.hover {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 1;
					opacity: 0;

					&:hover {
						opacity: 1; //0.85;
					}
				}
			}

			// по умолчанию - всегда выравнивание по физическому размеру картинок

			&.cols-8 {
				width: 100%;
				max-width: 320px;

				@include up($md) {
					max-width: 660px;
					height: 250px; // высота важна для сохранения квадратности с рядом стоящими квадратными картинками
				}

			}

			&.cols-12 {
				width: 100%;
				max-width: 720px;

				@include up($md) {
					max-width: 1035px;
				}
			}
		}

		&__price {
			color: $black !important;
		}

		&__item {
			@include transition();
			opacity: 0;
			transform: translateY(-10px);

			&.loaded {
				opacity: 1;
				transform: translateY(0);
			}
		}
	}
</style>