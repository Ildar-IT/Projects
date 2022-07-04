<script>
	import { Bar } from 'vue-chartjs'

	export default {
		extends: Bar,
		props: ['chartdata', 'visible'],
		data: () => ({

		}),
		watch: {
			visible() {
				this.refresh()
			},
			chartdata(newVal, oldVal) {
				if(newVal !== oldVal) this.renderChart( this.chartdata, this.options  );
			}
		},
		computed: {
			options() {
				return {
					scales: {
						yAxes: [{
							stacked: true,
							ticks: {
								beginAtZero: true,
								stepSize: 25,
								max: this.chartdata.max,
								min:  this.chartdata.min,
							},
							gridLines: {
								display: true,
								stacked: true,
							}
						}],
						xAxes: [{
							stacked: true,
							gridLines: {
								display: true
							},
							ticks: {
								display: true,
								stacked: true,
							}
						}]
					},
					legend: {
						display: false
					},
					tooltips: {
						enabled: false
					},
					// config:{
					// 	height:232
					// },

					responsive: true,
					maintainAspectRatio: false,
				}
			}
		},
		methods: {
			refresh() {
				setTimeout(()=> {
					this.$refs.canvas.height = 232;

					this.renderChart(
						this.chartdata,
						this.options, {
							// responsive: true
						});
				},50)
			}
		},
		mounted () {
			this.refresh()
			// console.log(this.$data._chart)
		},

	}
</script>

<style lang="scss">
</style>