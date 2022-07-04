<template>
	<v-dialog ref="modal"
	          v-model="dialog"
	          fullscreen
	          hide-overlay
	          transition="dialog-bottom-transition"
	          scrollable
	>
		<div class="templates-download px-8" style="padding-top:178px; z-index: 999">
			<v-container>
				<h2 class="margin-bottom-main">
					Выберите опрос для макета
				</h2>
				<div class="mb-8">
					<div class="block-max-width">
						<v-select
								v-model="hash"
								label="Выберите опрос"
								:items="polls"
								item-text="NAME"
								item-value="QRHASH"
						></v-select>
					</div>
				</div>

				<div class="block-max-width">
					<v-btn block
					       :disabled="!this.hash"
					       @click="download" large
					       class="primary margin-bottom-main mb-11">
						<!--         TODO: fix svg-->
						<svgicon name="download"
						         color="white" :fill="false"
						         width="24" height="24" class="mr-5"/>
						<span>Скачать</span>
					</v-btn>
					<v-btn block
					       class="v-btn v-btn--flat v-btn--text  v-size--large primary--text"
					       @click="dialog = false">
						Отмена
					</v-btn>
				</div>
			</v-container>
		</div>
	</v-dialog>
</template>

<script>
	export default {
		name: "templates-download",
		props: ['styleId','polls','type'],
		data: () => ({
			dialog: false,
			hash:null,
		}),
		components: {},
		computed: {

		},
		methods: {
			showModal() {
				this.dialog = true;
			},
			download() {
        console.log("download", this.type, this.hash, this.styleId)
				this.$emit('download',this.type, this.hash, this.styleId )
			}
		}
	}
</script>

<style lang="scss">

	.templates-download {
		background-color: $primary-light;
	}

</style>