<template>
	<section class="our-services">
		<v-container>
			<v-row>
				<v-col cols="12" sm="6" class="d-flex align-center justify-center mb-auto">
					<img class="d-block mr-sm-10 mr-md-15" src="@/assets/Services/services.svg" alt="Services">
				</v-col>
				<v-col cols="12" sm="6">
					<h1 class="text-center text-sm-start my-8 mb-sm-16 mt-sm-0 ">{{ text.title }}</h1>
          <div class="projects-intro__text" v-html="text.content"></div>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script>
import ShowDown from "showdown";

const showdown = new ShowDown.Converter();
    export default {
        name: "our-services",
      computed: {
        text() {
          const text = this.$store.state.page?.textServices;
          if (!text) return null;
          if (text.content) text.content = showdown.makeHtml(text.content);
          return text;
        }
      }
    }
</script>

<style lang="scss">
	.our-services {
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

	}
</style>