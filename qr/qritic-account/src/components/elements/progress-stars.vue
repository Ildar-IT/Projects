<template>
	<div>
		<div class="answer-stars flex align-center">
			<span class="mr-3 dark-gray-text">Средняя оценка</span>

			<svgicon v-for="idx of 5"
			         :key="idx"
			         width="32" height="32"
			         :color="Number(averageAnswer)>=idx? colorActiveStar:colorDisabledStar"
			         name="star"
			         original
			         class="svgicon mx-1"/>

			<span class="ml-3  dark-gray-text">{{averageAnswer.toFixed(1)}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "progress-stars",
		props: ["answerStats"],
		data: () => ({
			colorActiveStar: '',
			colorDisabledStar: ''
		}),
		computed: {
			averageAnswer() {
				let sum=0, count=0;

				this.answerStats.forEach(el=> {
					if (el.value) {
						count+=el.value;
						if (el.key) {
							sum+=el.value*el.key;
						}
					}
				});
				return sum/count
			}
		},
		mounted() {
			if (this.averageAnswer > 2) {
				this.colorActiveStar = '#87F345';
				this.colorDisabledStar = 'rgba(135,243,69,0.22)'

			} else {
				this.colorActiveStar = '#F35A45';
				this.colorDisabledStar = 'rgba(243,90,69,0.22)';
			}
		}
	}
</script>

<style scoped>

</style>