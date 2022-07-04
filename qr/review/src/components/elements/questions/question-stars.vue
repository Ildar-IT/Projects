<template>
	<div>
		<h2 v-if="question && question.NAME" class="mb-8">{{question.NAME}}</h2>
		<div class="question-stars__wrap">
			<div class="question-stars" :class="classWrap">
				<svgicon v-for="idx of 5"
				         :key="idx"
				         :color="answer>=idx? colorActiveStar:colorDisabledStar"
				         @click="onClickStar(idx)"
				         name="star"
				         original
				         class="svgicon question-stars__star" width="37"/>
			</div>
		</div>

	</div>
</template>

<script>
	// import {debounce} from "../../../utils/utils";
	// import {debounce} from "lodash";

	export default {
		name: "question-stars",
		props: ['question'],
		data: () => ({
			classStar: '',
			classWrap: '',
			answer: 0,
			colorActiveStar: '',
			colorDisabledStar: ''
		}),

		computed: {
		  //TODO: fix debounce; По второму клику не включается по-новой пауза
			clickDebouced() {
				return this.debounce(function () {
					// Что то делаем
					this.$emit('click', this.answer)
				}, 500);
			}
		},

		methods: {
			onClickStar(idx) {
				// добавить, чтобы можно было передумать
				// debounce 1500ms
				this.answer = idx;
				if (idx > 2) {
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
				//окружить debounce 1.5s , если ничего не происходит - уходим
				// 				this.$emit('click'), 1500
				this.clickDebouced();
			},

			debounce(func, wait, immediate) {
				let timeout;

				return function executedFunction() {
					const context = this;
					const args = arguments;

					const later = function () {
						timeout = null;
						if (!immediate) func.apply(context, args);
					};
					const callNow = immediate && !timeout;
					clearTimeout(timeout);
					timeout = setTimeout(later, wait);
					if (callNow) func.apply(context, args);
				};
			}
		},
		mounted() {

		}
	}
</script>

<style lang="scss">
	.question-stars {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #F2F5FA;
		border-radius: 1000px;
		padding: 18px;
		max-width: 350px;
		width: 100%;
		margin-right: auto;
		margin-left: auto;

		&__wrap {
			height: 141px;
		}

		&--good {
			background-color: $color-good
		}

		&--bad {
			background-color: $color-bad
		}

		&__star {
			cursor: pointer;
		}
	}
</style>