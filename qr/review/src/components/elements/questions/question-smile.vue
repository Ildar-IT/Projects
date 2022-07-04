<template>
	<div class="smile-type">
		<h2 v-if="question && question.NAME" class="mb-8">{{question.NAME}}</h2>
		<div class="question-smile">
			<div v-if="question.CAPTIONS[2].NAME" class="answer-button" @click="onClickBad" :class="classBad">
				<svgicon name="anger" original class="svgicon"/>
				<div class="body-2 mt-4 text-center">
					{{ question.CAPTIONS[2].NAME }} 
				</div>
			</div>
      <div v-if="question.CAPTIONS[1].NAME" class="answer-button" @click="onClickNeutral" :class="classNeutral">
				<svgicon name="neutral" original class="svgicon"/>
				<div class="body-2 mt-4 text-center">
					{{ question.CAPTIONS[1].NAME }} 
				</div>
			</div>
			<div v-if="question.CAPTIONS[0].NAME" class="answer-button" @click="onClickGood" :class="classGood">
				<svgicon name="smile" original class="svgicon"/>
				<div class="body-2 mt-4 text-center">
					{{ question.CAPTIONS[0].NAME }} 
				</div>
			</div>

		</div>
	</div>

</template>

<script>
	export default {
		name: "question-smile",
		props: ['question'],
		data: () => ({
			classGood: '',
			classBad: null,
      classNeutral: null
		}),
		methods: {
			onClickGood() {
				this.classBad = '';
				this.classNeutral = '';
				this.classGood = 'answer-button--good';
				this.$emit('click',1);

			},
      onClickNeutral() {
				this.classBad = '';
				this.classNeutral = 'answer-button--neutral';
        this.classGood = '';
				this.$emit('click',0);
      },
			onClickBad() {
				this.classGood = '';
				this.classNeutral = '';
				this.classBad = 'answer-button--bad';
				this.$emit('click', -1);
			},  
      isVisible() {
        return 
      }    
		},
    computed: {
        },

	mounted() {
			console.log(this.question)

			if(!this.question.CAPTIONS || this.question.CAPTIONS.length < 2 ) {
				this.question.CAPTIONS = new Array(3);
				this.question.CAPTIONS[0] = { NAME: "Отлично" , answerStats: [] }
				this.question.CAPTIONS[1] = { NAME: "Хорошо" , answerStats: [] }
				this.question.CAPTIONS[2] = { NAME: "Плохо" , answerStats: [] }
			}

		}
	}
</script>

<style lang="scss">
.smile-type {
	.question-smile {
		height: 141px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 400px;
		width: 100%;
		margin-right: auto;
		margin-left: auto;
	}
  .answer-button {
    padding: 18px 12px;
    @include up($sm) {
      padding: 18px 32px;
    }
  }
}
</style>