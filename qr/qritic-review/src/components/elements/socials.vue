<template>
	<div v-if="socials" class="socials">
		<h5 class="pb-4">{{socialsTitle}}</h5>

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
        data: () => ({}),
        computed: {
            page() {
                return this.$store.state.currentPage;
            },
            socialsTitle() {
                return this.page.socialsTitle || 'Узнайте о нас больше';
            },
            socials() {
                if (!this.page.socials) return null;
                return Object.entries(this.page.socials).map(keyValue => {
                    return {
                        key: keyValue[0],
                        link: keyValue[1]
                    };
                });
            },
        },
        methods: {}
    }
</script>

<style lang="scss">
	.socials {
		text-align: center;
		background: white;
		max-width: 400px;
		border-radius: 10px;
		padding: 20px 40px;
		margin: 40px auto 0 auto;

		@include up($lg) {
			margin-top: 60px;
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
				margin: 0 12px;

				@include up($sm) {
					width: 40px;
					height: 40px;
					//margin: 0 16px;
				}
			}
		}
	}
</style>