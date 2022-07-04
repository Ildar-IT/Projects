<template>
	<card>
		<h6 class="text-center gray-text mb-8">
			Прямая ссылка
		</h6>
		<div class="flex-center align-center mb-8">
			<svgicon class="mr-3" name="target2" width="24" height="24" :fill="false" color="black"/>
			<a :href="link" target="_blank">{{link}}</a>
		</div>
		<div class="flex-center">
			<a :href="link" target="_blank" style="color:inherit">
				<v-btn block small class="secondary">
					Предпросмотр
				</v-btn>
			</a>
		</div>
	</card>
</template>

<script>
	export default {
		name: "link-card",
		props: ['link']
	}
</script>

<style scoped>

</style>