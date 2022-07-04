<template>
	<div>
		<div v-if="question && question.NAME" class="body-2">
			<span class="gray-text mr-4">#{{index}}</span>
			{{question.NAME}}
		</div>

		<div class="flex-center">
			<div v-if="answer.NAME === '1'">
				<svgicon name="like" original width="24" height="24" class="svgicon"/>
			</div>
			<div v-else>
				<svgicon name="dislike" original width="24" height="24"  class="svgicon"/>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "answer-like",
		props: ['question', 'index', 'answer'],
		data: () => ({

		}),
		computed: {},
		methods: {

		},
		mounted() {

		}
	}
</script>

<style lang="scss">
	.answer-like {

	}

</style>