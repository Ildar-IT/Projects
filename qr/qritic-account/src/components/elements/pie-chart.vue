<script>
	import { Doughnut, mixins } from "vue-chartjs";
	export default {
		extends: Doughnut,
		props: ["data"],
		data: () => ({
			options: {
				width: '232px',
				height: '232px',
				legend: {
					display: false,
					height:'0px',
				},
				tooltips: {
					enabled: false
				}
				// borderWidth: "10px",
				// hoverBackgroundColor: "red",
				// hoverBorderWidth: "10px"
			}
		}),
		watch: {
			data(newVal, olaVal) {
				if(newVal !== olaVal) this.renderChart(this.data, this.options, {responsive: true});
			}
		},
		mounted() {
			// this.chartData is created in the mixin.
			// If you want to pass options please create a local options object

			this.$refs.canvas.width = 232;
			this.$refs.canvas.height = 232;
			this.renderChart(this.data, this.options, {responsive: true});
		}
	};
</script>

<style scoped>

</style>