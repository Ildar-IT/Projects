<template>
	<div class="category">

		<section v-if="item.UF_INTRO_TITLE" class="section--page category__intro">
			<v-container>
				<v-row class="justify-center align-center">
					<v-col cols="12" md="4" lg="3">
						<div class="text-center text-md-left pl-md-8 d-flex flex-column align-center align-md-start category__text">
							<h3>{{ item.UF_INTRO_TITLE }}</h3>
							<p class="limited size2 mt-8">
								{{ item.UF_INTRO_TEXT }}
							</p>
						</div>
					</v-col>
					<v-col cols="12" md="6" lg="5">
						<!--<div class="category__anim mx-auto d-block d-md-none">
							<img src="@/assets/original/00-mb.png">
							<img src="@/assets/original/01-mb.png">
							<img src="@/assets/original/02-mb.png">
							<img src="@/assets/original/03-mb.png">
							<img src="@/assets/original/04-mb.png">
							<img src="@/assets/original/05-mb.png">
							<img src="@/assets/original/06-mb.png">
							<img src="@/assets/original/06-2-mb.png">
						</div>-->
						<div class="category__anim">
							<category-animation-1 class="mx-auto"/>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</section>
		<section :class="{'section--page':!item.UF_INTRO_TITLE}">
			<product-list :items="products" :category="item"/>
		</section>
	</div>
</template>

<script>

    import CategoryHeader from "@/views/Category/category-header";
    import CategoryAnimation1 from "@/views/Category/category-animation-1";
    import ProductList from "@/views/Category/product-list";

    export default {
        name: "Category",
        components: {
            CategoryHeader,
            CategoryAnimation1,
            ProductList,
        },
        props: {
            code: {
                default: null,
                type: String,
            }
        },
        data() {
            return {
            }
        },
        computed: {
            categories() {
                return this.$store.state.common.sections;
            },
            item() {
                return this.categories.find(el=>el.CODE===this.code);
            },
            products() {
                return this.$store.state.page.CategoryController.items;
			}
        }
    }
</script>

<style lang="scss">
	.category {

		&__intro {
			@include up($md) {
				padding-top: 40px;
			}
		}

		/*section.section--padding {
			@include up($md) {
				padding-top: 0;
			}
		}*/

		&__text {
			position: relative;
			z-index: 1;
		}

		&__anim {
			position: relative;
			height: 240px;

			@include up($md) {
				height: auto;
			}

			.category-animation-1 {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%) scale(0.55);

				@include up($md) {
					top: unset;
					left: unset;
					transform: unset;
					position: relative;
				}
			}
		}
	}
</style>