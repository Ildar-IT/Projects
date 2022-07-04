<template>
	<div class="review-finish">
		<div class="flex-center pb-8">
			<svgicon name="kiss" original width="128"/>
		</div>
		<h2 class="pb-4">
			Спасибо!</h2>
		<div class="pb-8 body-2 text-center">
			Ваш комментарий принят
		</div>
	</div>
</template>

<script>
	export default {
		name: "review-finish",
		mounted() {
			setTimeout(()=> {
				this.$router.replace({name:'feedback'});
			},2000)
		}
	}
</script>

<style lang="scss">

</style>