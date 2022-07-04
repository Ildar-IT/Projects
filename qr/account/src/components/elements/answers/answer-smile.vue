<template>
	<div>
		<div v-if="question && question.NAME" class="body-2">
			<span class="gray-text mr-4">#{{index}}</span>
			{{question.NAME}}
		</div>

		<div class="flex-center">
			<div v-if="answer.NAME === '1'" class="" >
				<svgicon name="smile" original width="24" height="24" class="svgicon"/>
			</div>
			<div v-else-if="answer.NAME === '0'" class="" >
				<svgicon name="neutral" original width="24" height="24" class="svgicon"/>
			</div>
			<div v-else>
				<svgicon name="anger" original width="24" height="24" class="svgicon"/>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "answer-smile",
		props: ['question', 'index', 'answer'],
		data: () => ({

		}),
		methods: {

		}
	}
</script>

<style lang="scss">
	.answer-smile {

	}
</style>