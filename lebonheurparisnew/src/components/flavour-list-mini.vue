<template>
	<div class="anim-fade-in flavour-list-mini">
		<v-row :class="compact?'justify-start':'justify-center'">
			<v-col v-for="(item, index) in itemsCopy" :key="index"
				   cols="6" :sm="3" :md="compact?4:2" :lg="compact?3:2"
				   class="flavour-list-mini__item" :class="{loaded:item.loaded,shown:item.shown}">
				<div class="py-4 d-flex flex-column justify-start align-center">
					<div class="flavour-list-mini__item-img">
						<span class="hover" @click="$emit('click', item)"/>
						<svgicon v-if="!item.shown" name="logo" />
						<v-img :src="item.PREVIEW_PICTURE" :alt="item.NAME" :class="{image:item.DETAIL_PICTURE}" @load="onLoaded(item)"/>
						<v-img v-if="item.DETAIL_PICTURE" :src="item.DETAIL_PICTURE" :alt="item.name"
							   class="cut"/>
					</div>
					<div class="size2 mt-4 text-center flavour-list-mini__item-name" v-html="nameHtml(item)" @click="$emit('click', item)"></div>
				</div>
			</v-col>
		</v-row>
	</div>
</template>

<script>
    import Vue from 'vue';
    import {Swiper} from 'swiper';
    import 'swiper/swiper.min.css';

    export default {
        name: "flavour-list-mini",
        props: {
            items: {
                type: Array,
			},
			compact: {
                type: Boolean,
				default: false
			}
        },
        data() {
            return {
                isLoaded: false,
				countLoaded: 0,
                itemsCopy: null
            }
        },
        watch: {
            items: {
                immediate: true,
				handler() {
                    this.itemsCopy = this.items.map(el=>({...el, loaded:false, shown: false}));
				}
			}
        },
        methods: {
            nameHtml(item) {
                //return item.name.substr(0, 1).toUpperCase() + item.name.substr(1).toLowerCase();
                return item.NAME.replace(/\n/, "<br/>");
            },
            setOver(item, v) {
                Vue.set(item, "isOver", v);
            },
            onLoaded(item) {
                //console.log("Loaded: ", item);
                setTimeout(()=>Vue.set(item, "loaded", true),300);
                setTimeout(()=>Vue.set(item, "shown", true),500);
                this.countLoaded++;
                if ( this.countLoaded >= this.items.length ) this.isLoaded = true;
			}
        },
        mounted() {
            this.countLoaded = 0;
        }
    }
</script>

<style lang="scss">
	.flavour-list-mini {
		&__item {

			&.loaded {
				svg {
					opacity: 0;
				}
			}
			&.shown {
				.v-image {
					opacity: 1;
				}
				.flavour-list-mini__item-name {
					color: $black;
				}
			}

			&-img {
				position: relative;
				width: 60px;
				height: 60px;

				/*@include up($md) {
					width: 132px;
					height: 132px;
				}*/

				svg {
					position: absolute;
					z-index: 1;
					width: 52px;
					height: 52px;
					top: 4px;
					left: 4px;
					fill: $golden-light;
					@include transition();
				}
			}

			&-name {
				/*opacity: 0;
				transform: translateY(5px);*/
				color: $golden-light;
				//max-width: 200px;
				//white-space: nowrap;
				max-width: 240px;
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
			opacity: 0;
			@include transition();

			&.cut {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
				opacity: 0;
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
	}


</style>