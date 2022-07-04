<template>
	<section class="contact-form">
		<v-container>
			<div class="contact-form__wrap d-md-flex justify-space-between">
				<v-row class="contact-form__row">
					<v-col cols="12 col-md-4 pl-0" class="case__col">
						<h3 class="h2 mb-8">{{title}}</h3>
					</v-col>
					<v-col cols="12 col-md-8 pr-sm-0 pl-sm-0 pl-md-4 pl-lg-6">
						<form-contacts/>
					</v-col>
				</v-row>
			</div>
		</v-container>
	</section>
</template>

<style lang="scss">
	.contact-form {
		position: relative;
		z-index: 9;
    padding-top: 60px;
    @include up($md) {
      padding-top: 120px;
    }

		.primary-link-blue {
			width: 100%;
		}

		h3 {
			@include up($md) {
				font-size: 45px;
				line-height: 61px;
			}
			@include up($lg) {
				font-size: 60px;
				line-height: 82px;
			}
		}


	}
</style>
<script>

    import FormContacts from "../components/form-contacts";

    export default {
        name: "contact-form",
        components: { FormContacts},
        computed: {
          title() {
            return this.$store.state.common.email.FormBannerMessage;
          }
        }

    }
</script>
