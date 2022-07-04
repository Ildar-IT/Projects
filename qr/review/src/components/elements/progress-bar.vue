<!--Obsolete: not used-->
<template>
	<div class="progress-bar" :class="progressClasses">
		<div class="progress-bar__inner" :style="style" ></div>
	</div>
</template>
<script>
	// import {nf} from "@/utils";

	export default {
		name: "progress-bar",

		props: ["value", "valueText", "total", "type", "size", 's', 'color'],
		data: () => ({
			percentage: 0,
		}),
		computed: {
			valueString() {
				if ( !this.valueText) return "";
				return this.valueText;
			},
            progressValue() {
                if (this.size === "thick" && this.value / this.total < .2)
                	return this.total * .2;

                return this.value;
            },
			style() {
				if ( !this.total ) return {};
				let delta = this.progressValue / this.total;
				this.percentage = delta*100;
				return {
					width: (delta*100)+"%"
				}
			},
			progressClasses() {
				let classes = [];
				if ( this.type ) {
					classes.push("progress-bar--"+this.type);
				} else {
					if (this.percentage > 80) classes.push("progress-bar--success");
					else if (this.percentage > 20) classes.push("progress-bar--warning");
					else classes.push("progress-bar--danger");
				}
				if ( this.size ) classes.push("progress-bar--"+this.size);
				return classes;
			},
		},
		mounted() {
			//console.log(`asdasdasd--${this.percentage}`)
		}
	}
</script>

<style lang="scss">
	.progress-bar {
		//height: 56px;
		line-height: 32px;
		box-sizing: border-box;
		background: $red1;
		color:$red1;
		border-radius: 1000px 0 0 1000px;

		font-weight: bold;
		text-align: center;
		overflow:hidden;
		position: relative;
		//font-size: 18px;

		.progress-bar__inner {
			height: 100%;
			background: $green1;
			border-radius: 1000px 0 0 1000px;
		}

		&--answers{
			background: $red1;
			.progress-bar__inner {
				background:$green1;
			}
		}

		&--bw{
			.progress-bar__inner {
				background:$gray2;
			}
		}

		@include transition();

		&--primary {
			.progress-bar__inner {
				background:$green1;
			}
		}
		&--warning {
			.progress-bar__inner {
				background-color:$orange1;
			}
		}
		&--success {
			.progress-bar__inner {
				background-color: $green1;
			}
		}
		&--danger {
			.progress-bar__inner {
				background-color: $red1;
			}
			
		}
		&--small {
			width: 32px;
			height: 32px;
			line-height: 32px;
			/*border-radius: $border-radius-s;*/
		}

		&--line{
			 border-radius: 1000px;
			 width: 100%;
			 height: 8px;
			 /*background: #F0F0F0;*/
		 }
		&--slim{
			width: 100%;
			height: 3px;
			background: $gray0;
		}

		&--thick {
			//height: 56px;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			line-height: 54px;
			/*font-size: $font-size-m;*/

			.progress-bar {

				&-value {
					text-align: right;
					height: 56px;
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					padding-left: 16px;
				}

				h1 {
					margin: 0 0 4px 0;
				}

				&-title {
				/*	color: $--border-color-light;*/
					margin: 0 0 8px 0;
				}
			}
		}
	}
</style>
