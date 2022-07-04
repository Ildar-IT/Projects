<template>
	<div class="review-finish-finish">
		<div class="flex-center pb-8">
			<svgicon name="kiss" original width="128"/>
		</div>
		<h2 class="pb-4">
			Спасибо за обратную связь</h2>
		<div class="pb-8 body-2 text-center">
			Будем рады Вас видеть снова
		</div>
	</div>
</template>

<script>
	export default {
		name: "review-finish2",
		mounted() {
			setTimeout(()=> {
				this.$router.replace({name:'feedback'});
			},2000)
		}
	}
</script>

<style lang="scss">

</style>