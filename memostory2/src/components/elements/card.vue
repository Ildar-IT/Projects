<template>
	<div class="card" :class='cardClass' @click="click">
		<slot name="default"/>
	</div>
</template>

<script>
	export default {
		name: "card",
		props: ['small','hoverable'],
		computed: {
			cardClass() {
				let classes=[];
				if (this.small) classes.push('card--small');
				if (this.hoverable) classes.push('card--hoverable');

				return classes.join(' ')
			}
		},
		methods: {
			click() {
				this.$emit('click')
			},
		}
	}
</script>

<style lang="scss">
.card{
	box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.15);
	border-radius: 30px;
	padding:32px;
	background: $gradient-dark;
	color: $beige5;
	@include up($md) {
		padding:64px;
	}
	&--small{
		padding:16px;
	}
	&--hoverable{
		@include transition();
		&:hover{
			@include transition();
			/*color: $primary;
			background-color: $secondary;*/
		}
	}
	h5 {
		font-size: 24px;
		line-height: 29px;
	}
}

.no-card{
	box-shadow: none;
	padding: 32px 0;
}
</style>