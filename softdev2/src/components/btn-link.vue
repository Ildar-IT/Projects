<template>
	<router-link v-if="to" :to="to" class="btn-link" :class="{'rotate': linkLeft}">
		<svg v-show="linkLeft" class="mr-3" width="20" height="12" viewBox="0 0 20 12" fill="none"
			 xmlns="http://www.w3.org/2000/svg">
			<path
					d="M13.7798 2L13.0704 2.70592L16.0798 5.70086H3V6.69923H16.0797L13.0704 9.69408L13.7798 10.4L18 6.2L13.7798 2Z"
					/>
		</svg>
		<slot name="default">
      {{text[0].title}}
		</slot>
		<svg v-show="!linkLeft" class="ml-3" width="20" height="12" viewBox="0 0 20 12" fill="none"
			 xmlns="http://www.w3.org/2000/svg">
			<path
					d="M13.7798 2L13.0704 2.70592L16.0798 5.70086H3V6.69923H16.0797L13.0704 9.69408L13.7798 10.4L18 6.2L13.7798 2Z"
					/>
		</svg>
	</router-link>
</template>

<style lang="scss">
	.btn-link {

		color: $primary-1 !important;
		padding: 10px 1px;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 14px;
		line-height: 16px;
		letter-spacing: 0.05em;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
    & svg path {
      fill: $primary-1;
    }

		&.rotate {
			svg {
				transform: rotate(180deg);
			}
		}

		@include up($sm) {
			font-size: 16px;
			line-height: 22px;
			& svg {

				width: 25px;
				height: 14px;
			}
		}
		@include up($md) {
			font-size: 20px;
			line-height: 27px;
			& svg {
				width: 35px;
				height: 35px;
			}
		}

		&:hover {
			color: $primary-2 !important;

			& svg path {
				fill: $primary-2;
			}
		}

		&:active {
			color: $secondary-1 !important;

			& svg path {
				fill: $secondary-1;
			}
		}

		&:disabled {
			color: $mid-grey !important;

			& svg path {
				fill: $mid-grey;
			}
		}

		&.border {
			box-sizing: border-box;
			height: 50px;
			text-align: center;
			border: 2px solid $primary-1;
			width: 100%;

			&:hover {
				color: white !important;
				border: 2px solid transparent;
				background: $primary-1;

				& svg path {
					fill: $white;
				}

			}

			&:active {
				color: white !important;
				border: 2px solid transparent;
				background: $primary-2;
			}

			&:disabled {
				color: $mid-grey !important;
				border: 2px solid $mid-grey;

			}
		}

		&.btn-link__no-arrow {
			box-sizing: border-box;
			width: 100%;

			padding: 15px 10px;
			@include up($sm) {

				width: 300px;
				border: 1.5px solid $primary-1;
			}
			@include up($md) {

				padding: 20px 25px;
				height: 70px;
			}
		}
	}


</style>

<script>
    export default {
        name: 'btn-link',
        props: ["to", "label", "href", "linkLeft"],
        computed: {
          text() {
            return this.$store.state.common?.buttonsText.filter(el => el.uid === "learn");
          }
        }
    }
</script>
