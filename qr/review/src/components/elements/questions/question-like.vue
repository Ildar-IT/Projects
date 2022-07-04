<template>
	<div>
		<h2 v-if="question && question.NAME" class="mb-8">{{question.NAME}}</h2>
		<div class="question-like">

			<div class="answer-button" @click="onClickGood" :class="classGood">
				<svgicon name="like" original class="svgicon"/>
				<div class="body-2 mt-4 text-center">
					Класс!
				</div>
			</div>
			<div class="answer-button" @click="onClickBad" :class="classBad">
				<svgicon name="dislike" original class="svgicon"/>
				<div class="body-2 mt-4 text-center">
					Так себе
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		name: "question-like",
		props: ['question'],
		data: () => ({
			classGood: '',
			classBad: null,
		}),
		computed: {},
		methods: {
			onClickGood() {
				this.classBad = '';
				this.classGood = 'answer-button--good';
        this.$emit('click',1);
			},
			onClickBad() {
				this.classGood = '';
				this.classBad = 'answer-button--bad';
				this.$emit('click', -1);
			}
		}
	}
</script>

<style lang="scss">
	.question-like {
		height: 141px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 350px;
		width: 100%;
		margin-right: auto;
		margin-left: auto;
	}

</style>