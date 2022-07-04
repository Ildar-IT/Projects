<template>
	<div class="socials padding-main mt-8 mt-lg-16 pt-lg-8 pt-0 pt-md-16 mx-auto" v-if="socials">
		<div class="h4 padding-bottom-small">{{socialsTitle}}</div>

		<div class="socials__list">
			<a v-for="(item) in socials" :href="item.link" target="_blank">
				<svgicon :name="item.key" original class="svgicon" :title="item.key"/>
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: "socials",
		data: () => ({
		}),
		computed: {
			page() {
				return this.$store.state.page.ReviewValidationController;
			},
			socialsTitle() {
				return this.page.socialsTitle || 'Узнайте о нас больше';
			},
			socials() {
				if ( !this.page.socials ) return null;
				return Object.entries(this.page.socials).map(keyValue=>{
					return {
						key: keyValue[0],
						link: keyValue[1]
					};
				});
			},
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.socials {
		text-align: center;
		max-width: 664px;
		@include up($md) {
			margin-top: $margin-main-md;
			border-radius: 32px;
			border: 4px solid #E6E7EE;
			width: fit-content;
		}

		@include up($lg) {
			margin-top: 32px;
		}

		h4 {
			margin: 0 0 20px 0;
			color: $gray;
		}
		&__list {
			display: flex;
			justify-content: center;

			svg {
				width: 32px;
				height: 32px;
				margin: 0 8px;

				@include up($sm) {
					width: 64px;
					height: 64px;
					margin: 0 16px;
				}
			}
		}
	}
</style>