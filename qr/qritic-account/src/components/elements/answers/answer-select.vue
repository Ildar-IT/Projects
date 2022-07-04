<template>
	<div>
		<div v-if="question && question.NAME"
		     class="body-2">
			<span class="gray-text mr-4">#{{index}}</span>
			{{question.NAME}}
		</div>
		<div v-if="answer && answer.NAME"
		     class="answer-select body-2 brown-text">
			{{answer.NAME}}
		</div>
	</div>

</template>

<script>
	export default {
		name: "answer-select",
		props:['question','index', 'answer'],
	}
</script>

<style lang="scss">
.answer-select{
    padding: 2.5px 6.5px;
}
</style>