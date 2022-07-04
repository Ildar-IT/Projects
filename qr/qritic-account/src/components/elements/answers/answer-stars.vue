<template>
	<div>
		<div v-if="question && question.NAME" class="body-2">
			<span class="gray-text mr-4">#{{index}}</span>
			{{question.NAME}}
		</div>
		<div class="answer-stars flex-center">
			<svgicon v-for="idx of 5"
			         :key="idx"
			         width="24" height="24"
			         :color="Number(answer.NAME)>=idx? colorActiveStar:colorDisabledStar"
			         name="star"
			         original
			         class="svgicon mx-1"/>
		</div>

	</div>
</template>

<script>

	export default {
		name: "answer-stars",
		props: ['question', 'index', 'answer'],
		data: () => ({
			classStar: '',
			classWrap: '',
			colorActiveStar: '',
			colorDisabledStar: ''
		}),

		computed: {},
		methods: {},
		mounted() {
			if (Number(this.answer.NAME) > 2) {
				this.colorActiveStar = '#87F345';
				this.colorDisabledStar = 'rgba(135,243,69,0.22)'
				this.classWrap = 'question-stars--good';
				//	good
			} else {
				//bad
				this.colorActiveStar = '#F35A45';
				this.colorDisabledStar = 'rgba(243,90,69,0.22)';
				this.classWrap = 'question-stars--bad';
			}
		}
	}
</script>

<style lang="scss">
	.answer-stars {
		&--good {
			background-color: $color-good
		}

		&--bad {
			background-color: $color-bad
		}
	}
</style>