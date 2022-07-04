<template>
	<div class="category-animation-1" :class="{'final':isFinished}">
		<img src="@/assets/original/00.png">
		<img src="@/assets/original/01.png">
		<img src="@/assets/original/02.png">
		<img src="@/assets/original/03.png">
		<img src="@/assets/original/04.png">
		<img src="@/assets/original/05.png">
		<img src="@/assets/original/06.png">
		<img src="@/assets/original/06-2.png">
	</div>
</template>

<script>
    export default {
        name: "category-animation-1",
        components: {},
        data: () => {
            return {
                isFinished: false
            }
        },
        mounted() {
            setTimeout(() => this.isFinished = true, 2800);

        }
    }
</script>

<style lang="scss">
	.category-animation-1 {
		position: relative;
		width: 550px;
		height: 400px;

		img {
			position: absolute;
			opacity: 0;

			&:nth-child(1) {
				animation: animBG 1000ms forwards;
				animation-delay: 400ms;
			}

			&:nth-child(6) {
				z-index: 2;
				animation: animElephant 700ms forwards;
				animation-delay: 800ms;
			}

			&:nth-child(3) {
				z-index: 2;
				animation: animSmallBird 700ms forwards;
				animation-delay: 1200ms;
			}

			&:nth-child(5) {
				z-index: 3;
				animation: animHat 700ms forwards;
				animation-delay: 1600ms;
			}

			&:nth-child(2) {
				z-index: 2;
				animation: animBird 700ms forwards;
				animation-delay: 2000ms;
			}

			&:nth-child(4) {
				z-index: 1;
				animation: animCoat 700ms forwards;
				animation-delay: 2400ms;
			}

			&:nth-child(7) {
				animation: animWingLeft 700ms forwards;
				animation-delay: 800ms;
				transform-origin: right 40px;
			}

			&:nth-child(8) {
				animation: animWingRight 700ms forwards;
				animation-delay: 800ms;
				transform-origin: left 40px;
			}
		}

		&.final {
			img {
				&:nth-child(7) {
					animation: animWingingLeft linear 700ms 2 forwards;
				}

				&:nth-child(8) {
					animation: animWingingRight linear 700ms 2 forwards;
				}
			}
		}

		@keyframes animBG {
			from {
				left: 50%;
				top: 50%;
				transform: translateX(-50%) translateY(-50%);
			}
			to {
				opacity: 1;
				left: 50%;
				top: 50%;
				transform: translateX(-50%) translateY(-50%);
			}
		}
		@keyframes animElephant {
			from {
				left: 5%;
				top: 16%;
			}
			to {
				opacity: 1;
				left: 15%;
				top: 16%;
			}
		}
		@keyframes animCoat {
			from {
				left: 25%;
				top: 30%;
			}
			to {
				opacity: 1;
				left: 27%;
				top: 30%;
			}
		}
		@keyframes animBird {
			from {
				right: -8%;
				top: 8%;
			}
			to {
				opacity: 1;
				right: 2%;
				top: 8%;
			}
		}

		@keyframes animHat {
			from {
				left: 50%;
				top: 29%;
			}
			to {
				opacity: 1;
				left: 40%;
				top: 39%;
			}
		}
		@keyframes animSmallBird {
			from {
				left: 25%;
				top: -8%;
			}
			to {
				opacity: 1;
				left: 30%;
				top: 13%;
			}
		}
		@keyframes animWingLeft {
			from {
				opacity: 0;
				left: -1%;
				top: 22%;
				transform: rotate(-5deg);
			}
			to {
				opacity: 1;
				left: 9%;
				top: 22%;
				transform: rotate(-5deg);
			}
		}
		@keyframes animWingRight {
			from {
				left: 9%;
				top: 22%;
			}
			to {
				opacity: 1;
				left: 19%;
				top: 22%;
			}
		}
		@keyframes animWingingLeft {
			from {
				opacity: 1;
				left: 9%;
				top: 22%;
				transform: rotate(-5deg);
			}
			50% {
				opacity: 1;
				left: 9%;
				top: 22%;
				transform: rotate(10deg);
			}
			to {
				opacity: 1;
				left: 9%;
				top: 22%;
				transform: rotate(-5deg);
			}
		}
		@keyframes animWingingRight {
			from {
				opacity: 1;
				left: 19%;
				top: 22%;
			}
			50% {
				opacity: 1;
				left: 19%;
				top: 22%;
				transform: rotate(-15deg);
			}
			to {
				opacity: 1;
				left: 19%;
				top: 22%;
			}
		}
	}

</style>