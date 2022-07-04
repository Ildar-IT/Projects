<template>
	<div class="service-item">
		<section>
			<v-container>
				<div class="service-item__head">
					<v-row>
						<v-col v-if="item.image" cols="12" sm="5" class="d-flex align-start justify-center mb-5">
							<img class="d-block" :src="item.image" :alt="item.h1">
						</v-col>
						<v-col cols="12" sm="7">
							<h1 class="text-center text-sm-start my-8 mb-sm-16 mt-sm-0">{{item.h1}}</h1>
							<div class="content" v-html="item.teaser"></div>
							<div class="d-flex justify-end mt-10">

							</div>
						</v-col>
					</v-row>
				</div>
				<div v-if="item.text" class="service-item__text">
					<v-row>
						<v-col v-if="item.image2" cols="12" sm="6" class="d-sm-none mb-5">
							<div class="d-flex justify-center"><img :src="item.image2" :alt="item.h1"></div>
						</v-col>
						<v-col cols="12" sm="6">
							<div  v-html="item.text" class="content service-item__text-content"></div>
						</v-col>
						<v-col v-if="item.image2" cols="12" sm="6" class="d-none d-sm-block">
							<div class="mb-auto justify-center align-center">
								<img class="ml-sm-10 ml-md-15" :src="item.image2" :alt="item.h1">
							</div>
						</v-col>
					</v-row>
				</div>

			</v-container>
		</section>

		<competencies/>

		<section class="service-item__more">
			<v-container>
				<btn-link class="d-inline-flex mb-15" :linkLeft="true" :to="{name: 'Services'}">
          {{btnText[0].title}}
				</btn-link>
			</v-container>
		</section>
	</div>
</template>

<script>
    import Competencies from '@/views/About-us/competencies'
    import BtnLink from "@/components/btn-link"

    import ShowDown from "showdown";

    const showdown = new ShowDown.Converter();

    export default {
        name: "service-item",
        components: {
            Competencies,

            BtnLink
        },
        computed: {
            item() {
                const item = this.$store.state.page?.service;
                if (!item) return {};
                return {
                    h1: item.title,
                    teaser: showdown.makeHtml(item.teaser),
                    text: showdown.makeHtml(item.content),
                    image: item.media?.url,
                    image2: item.media2?.url,
                }
            },
          btnText() {
            return this.$store.state.common?.buttonsText.filter(el => el.uid === "home_services");
          }
        }
    }
</script>

<style lang="scss">
	.service-item {

		&__head, &__text {
			img {
				object-fit: contain;
				width: 240px;
				height: 240px;

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

		}

		&__head {
      padding: 104px 0 60px;
      @include up($sm) {
        padding: 120px 0 60px 0;
      }

      @include up($md) {
        padding: 170px 0 120px;
      }
      @include up($lg) {
        padding: 200px 0 120px;
      }
		}

		&__text {
			padding: 20px 0;


		}

		p {
			color: $black !important;
		}

		&__wrapper {
			padding-bottom: 70px;
			@include up($sm) {
				padding-bottom: 135px;
			}
			@include up($md) {
				padding-bottom: 160px;
			}
			@include up($lg) {
				padding-bottom: 270px;
			}
		}

	}


</style>
