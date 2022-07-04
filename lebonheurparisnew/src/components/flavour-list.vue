<template>
	<div v-if="isWindowMD" class="flavour-list">
		<v-row justify="center">
			<v-col v-for="(item, index) in items" :key="index"
				   cols="3"
				   class="flavour-list__item">
				<div class="py-4 py-lg-6 d-flex flex-column justify-start align-center">
					<div class="flavour-list__item-img">
						<router-link :to="{name:'under'}" class="hover"/>
						<v-img :src="item.PREVIEW_PICTURE" :alt="item.NAME" :class="{image:item.DETAIL_PICTURE}"/>
						<v-img v-if="item.DETAIL_PICTURE" :src="item.DETAIL_PICTURE" :alt="item.name"
							   class="cut"/>
					</div>
					<router-link :to="{name:'under'}" class="flavour-list__item-text">
						<div class="h5 mt-4 mt-lg-7 text-center flavour-list__name" v-html="nameWithoutChocoHtml(item)"></div>
						<div class="size2 text-center flavour-list__choco">{{ choco(item) }}</div>
					</router-link>
				</div>
			</v-col>
		</v-row>
	</div>
	<div v-else class="swiper flavour-list" :id="'flavour-list'+idCounter">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(item, index) in items" :key="index">
				<div class="px-2 d-flex flex-column justify-start align-center">
					<div class="flavour-list__item-img">
						<v-img :src="item.PREVIEW_PICTURE" :alt="item.NAME"/>
					</div>
					<div class="size2 mt-4 text-center flavour-list__name" v-html="nameHtml(item)"></div>
					<!--<div class="size2 text-center flavour-list__choco">{{ item.PREVIEW_TEXT }}</div>-->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import Vue from 'vue';
    import {Swiper} from 'swiper';
    import 'swiper/swiper.min.css';

    let idCounter = 1;

    export default {
        name: "flavour-list",
        props: ["items"],
        data() {
            return {
                idCounter: 0
            }
        },
        computed: {
            isWindowMD() {
                return this.$store.getters.isWindowMD;
            }
        },
        methods: {
            nameHtml(item) {
                //return item.name.substr(0, 1).toUpperCase() + item.name.substr(1).toLowerCase();
                return item.NAME.replace(/\n/, "<br/>");
            },
            nameWithoutChocoHtml(item) {
                //return item.name.substr(0, 1).toUpperCase() + item.name.substr(1).toLowerCase();
                return item.NAME.replace(/(^.+?)(in )?(dark|milk).+$/is, "$1");
            },
			choco(item) {
                //return item.choco.substr(0, 1).toUpperCase() + item.choco.substr(1).toLowerCase();
                return item.NAME.replace(/.+?((in )?(dark|milk).+$)/is, "$1");
            },
            setOver(item, v) {
                Vue.set(item, "isOver", v);
            }
        },
        mounted() {
            this.idCounter = idCounter++;

            setTimeout(() => {
                const swiper = new Swiper('#flavour-list' + this.idCounter, {
                    freeMode: true,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    //centeredSlides: true,
                    breakpoints: {
                        320: {
                            slidesPerView: 1,
                            //spaceBetween: 10
                        },
                        /*360: {
                        slidesPerView: 1.5,
                        //spaceBetween: 10
                    },*/
                        480: {
                            slidesPerView: this.items?.length > 2 ? 2.0 : this.items?.length,
                            //spaceBetween: 20
                        },
                        600: {
                            slidesPerView: this.items?.length > 2 ? 2.5 : this.items?.length,
                            //spaceBetween: 20
                        },
                        720: {
                            slidesPerView: this.items?.length > 3 ? 3.0 : this.items?.length,
                            //spaceBetween: 20
                        },
                        840: {
                            slidesPerView: this.items?.length > 3 ? 3.5 : this.items?.length,
                            //spaceBetween: 20
                        },
                        960: {
                            slidesPerView: this.items?.length > 4 ? 4.0 : this.items?.length,
                            //spaceBetween: 20
                        },
                        /*1000: {
                        slidesPerView: 6.5,
                        //spaceBetween: 20
                    }*/
                    }
                });
            }, 150);
        }
    }
</script>

<style lang="scss">
	.flavour-list {
		&__item {
			&-img {
				position: relative;
				width: 75px;
				height: 75px;

				@include up($md) {
					width: 132px;
					height: 132px;
				}
			}

			&-text {
				cursor: pointer;
				@include transition();

				&:hover {
					opacity: 0.6;
				}
			}
		}

		.hover {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 2;
			width: 100%;
			height: 100%;
			//background: rgba(0,0,0,0.2);
			cursor: pointer;

			&:hover ~ .cut {
				opacity: 1;
			}

			&:hover ~ .image {
				opacity: 0;
			}
		}

		.v-image {
			width: 100%;
			@include transition();

			&.cut {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
				opacity: 0;
			}
		}

		&__name {
			color: $black;
			//max-width: 200px;
			//white-space: nowrap;
			max-width: 240px;

			@include up($md) {
				color: $golden;
				text-transform: uppercase;
			}
		}

		&__choco {
			color: $black;
			//max-width: 200px;
			text-transform: lowercase;

			@include up($md) {
				padding-top: 1px;
				font-weight: 300;
				color: $golden;
				//text-transform: lowercase;
			}
		}

		/*&__slide-img {
			width: 58px;
			height: 58px;
		}*/
	}


</style>