<template>
	<div class="smile-type">
		<h2 v-if="question && question.NAME" class="mb-8 mb-lg-12">{{question.NAME}}</h2>
		<div class="question-smile">
			<div class="answer-button" @click="onClickBad" :class="classBad">
				<svgicon name="anger" original class="svgicon"/>
			</div>
			<div class="answer-button" @click="onClickNeutral" :class="classNeutral">
				<svgicon name="neutral" original class="svgicon"/>
			</div>
			<div class="answer-button" @click="onClickGood" :class="classGood">
				<svgicon name="smile" original class="svgicon"/>
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
                this.classBad = 'answer-button--bad';
                this.classNeutral = 'answer-button--neutral';
                this.classGood = '';
                this.$emit('click', {answer: 1, id: this.question.ID});

            },
            onClickNeutral() {
                this.classBad = 'answer-button--bad';
                this.classNeutral = '';
                this.classGood = 'answer-button--good';
                this.$emit('click', {answer: 0, id: this.question.ID});
            },
            onClickBad() {
                this.classGood = 'answer-button--bad';
                this.classNeutral = 'answer-button--neutral';
                this.classBad = '';
                this.$emit('click', {answer: -1, id: this.question.ID});
            },
            isVisible() {
                return
            }
        },
        computed: {},

        mounted() {
            if (!this.question.CAPTIONS || this.question.CAPTIONS.length < 2) {
                this.question.CAPTIONS = new Array(3);
                this.question.CAPTIONS[0] = {NAME: "Отлично", answerStats: []};
                this.question.CAPTIONS[1] = {NAME: "Хорошо", answerStats: []};
                this.question.CAPTIONS[2] = {NAME: "Плохо", answerStats: []};
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
			align-items: flex-start;
			max-width: 317px;
			//@include up($sm) {
			//  max-width: 450px;
			//}

			width: 100%;
			margin-right: auto;
			margin-left: auto;
		}

		.answer-button {
			@include transition();
			cursor: pointer;
			//padding: 18px 12px;
			//@include up($sm) {
			//  padding: 18px 32px;
			//}
			.svgicon {
				//@include up($sm) {
				width: 86px;
				height: 86px;
				//}
			}
		}
	}
</style>