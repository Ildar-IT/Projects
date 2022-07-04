<template>
	<div>
		<v-rating class="rating-stars rounded-pill"
				  hover
				  length="5"
				  @input="updateInput"
				  v-model='updRating'
				  :readonly="readonly"
		>
			<template v-slot:item="props">
				<svgicon
						original
						large
						@click="props.click"
						:name="props.isFilled ? 'star-filled' : 'star-empty'"
						width="24"
						height="24"
						:fill="props.isFilled ? true : false"
						:color="props.isFilled ? '#234052': '#C8CFD4'"
				>
				</svgicon>
			</template>
		</v-rating>
	</div>
</template>

<script>
    export default {
        name: 'rating-stars',
        props: ['report',"readonly"],
        data: () => ({
            classStar: '',
            classWrap: '',
            answer: 0,
            updRating: 0,
            colorActiveStar: '',
            colorDisabledStar: ''
        }),
        computed: {
        },

        methods: {
            updateInput() {
                if ( this.readonly ) return;

                this.report.RATING = this.updRating;
                this.$emit('updateRating', this.report)
            },
        },
        watch: {
            report() {
                this.updRating = parseInt(this.report.RATING);
            }
        },
        mounted() {
            this.updRating = parseInt(this.report.RATING);
        }
    }
</script>

<style lang="scss">
	.rating-stars {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		background: $gradient-dark-disabled;
		padding: 12px 42px;
		width: 100%;

		svg {
			cursor: pointer;
		}
	}
</style>