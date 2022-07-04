<template>
		<a :href="formAhref(link)" target="_blank" >
			<v-btn elevation="0" class="link-feedback mx-auto">
				  {{ name }} <svgicon :name="name.toLowerCase()" width="32" height="32" />

			</v-btn>
		</a>
</template>

<script>
	export default {
		name: "link-feedback",
		props: ['link', 'name'],
		data: () => ({
			error: null
		}),
		computed: {
			page() {
				return this.$store.state.currentPage;
			},
			isError() {
				return !!this.error;
			},
			isWindowMD() {
				return this.$store.getters.isWindowMD
			},
		},
		methods: {
			formAhref(url) {
				url =  url.replace(/(^\w+:|^)\/\//, '');
				url = "http://"+url;
				return url
			}
		}
	}
</script>

<style lang="scss">
	body {
		#review-app {
			.link-feedback {
				//padding: 15px 0px 13px 19px;
				background-color: white !important;
				color: black !important;
				text-align: left;
				display: block;
				margin-bottom: 17px;
				font-weight: 600;
				font-size: 14px !important;
				line-height: 15px;
				border-radius: 5px;
				min-width: 320px;
				.v-btn__content {
					display: flex;
					align-items: center;
					justify-content: space-between;
					svg {
						color: #b3b8cb;
						fill: #b3b8cb;
					}
				}

				&:hover {
					color: white !important;
					.v-btn__content {
						svg {
							color: white;
							fill: white;
						}
					}
				}
			}
		}
	}
</style>