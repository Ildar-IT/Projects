<template>
	<div class="services">
		<services-intro/>

		<section v-for="(item, index) of items" :key="index" class="services__item" :class="{reverse:index%2}">
			<v-container>
				<v-row>
					<v-col cols="12" sm="5" :order-sm="index%2?'first':'last'">
						<router-link :to="item.to">
							<img v-if="item.image" class="d-block mx-auto mb-10"
								 :src="item.image" :alt="item.name">
						</router-link>
					</v-col>
					<v-col cols="12" sm="7">
						<h2 class="mb-8 mb-sm-16">{{item.name}}</h2>
						<div v-if="item.text" class="services__item-text" v-html="item.text"></div>

						<btn-link class="d-md-none mt-10 mt-8 border" :to="item.to"/>

						<div class="services__item__btn-wrapper d-none d-md-flex justify-space-between align-center">
							<btn-link :to="item.to"/>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</section>
	</div>
</template>

<script>
    import ServicesIntro from "./Services/services-intro"
    import BtnLink from "../components/btn-link";
    import ShowDown from "showdown";

    const showdown = new ShowDown.Converter();

    export default {
        name: "Services",
        components: {
            ServicesIntro,
            BtnLink
        },
        computed: {
            items() {
                return this.$store.state.page?.services?.map(el => ({
                    name: el.shorttitle,
                    text: showdown.makeHtml(el.teaser),
                    image: el.media?.url,
                    to: {name: "ServiceItem", params: {code: el.url}}
                }));
            },
        },
    }
</script>

<style lang="scss">
	.services {

		&__item {
			background-color: $blue-color;
			padding: 60px 0;
			@include up($md) {
				padding: 120px 0;
			}

			img {
				object-fit: contain;
				width: 220px;
				height: 220px;
				//height: 100%;
				//width: 100%;

				@include up($sm) {
					width: 320px;
					height: 320px;
				}
				@include up($md) {
					width: 450px;
					height: 450px;
				}
				@include up($lg) {
					width: 570px;
					height: 570px;
				}
			}

			h2 {
				text-align: center;
				@include up($sm) {
					text-align: left;
				}
			}

			&-text {
				@include up($md) {
					min-height: 150px;
				}
				@include up($lg) {
					min-height: 200px;
				}
			}

			&__btn-wrapper {
				//max-width: 580px;
				margin-top: 55px;
				@include up($lg) {
					margin-top: 80px;
				}
			}

			.btn-link {
				//width: 100%;
				@include up($lg) {
					max-width: 300px;
				}
			}

			&.reverse {
				background-color: $white;
			}
		}
	}
</style>
