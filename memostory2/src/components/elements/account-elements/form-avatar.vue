<template>
	<div class="form-avatar">
		<div class="add-photo-field  justify-center" v-if="changeable">

			<div v-if="imagePreview"
			     :class="imagePreview ? 'add-photo-field__photo mx-auto' : 'add-photo-field__photo add-photo-field__photo_dashed mx-auto hover-link'">
				<div class="add-photo-field__avatar photo-filter"
				     :style="{ 'backgroundImage': 'url(' + imagePreview + ')' }">
				</div>
				<div class="flex mt-2 add-photo-field__delete mb-4 mb-md-0" @click="deleteImageModal()">
					<span :class="{'text-caption':isMobileApp}"> {{ pageButtons.delete || 'Удалить фото'}} </span>
				</div>

			</div>

			<div class="add-photo-field__photo add-photo-field__photo_dashed mx-auto hover-link text-center pa-4"
			     v-else>
				<svgicon class="" name="user-thin" :fill="false" width="64" color="#BA9568"/>
			</div>

			<input @change="loadFile" class="add-photo-field__download"
			       name="myFile"
			       type="file"
			       ref="fileInput"
			       accept=".jpg, .jpeg, .png, .gif">

		</div>


		<div v-else-if="card.DETAIL_PICTURE" class="form-avatar__photo photo-filter"
		     :style="{ 'backgroundImage': 'url(' + card.DETAIL_PICTURE + ')' }">

		</div>
		<div v-else class="add-photo-field__photo add-photo-field__photo">
			<div class="form-avatar__photo "
			     :style="{ 'backgroundImage': 'url(' + img + ')' }">

			</div>
		</div>
		<v-dialog class="round"
		          v-model="dialogDelFile"
		          width="500"
		          content-class="elevation-0"
		>
			<v-card class="pa-4 pa-8 round">
				<div class="d-flex flex-column pa-md-8">
					<div class="mb-8 d-flex align-center justify-center">
						<img src="@/assets/images/Question.png"/>
					</div>

					<v-card-text class="body-1 text-center pb-8">
						{{ dialogs.deletePhoto ? dialogs.deletePhoto : "Вы хотите удалить фото? Это действие нельзя отменить" }}
					</v-card-text>

					<div class="d-flex flex-column align-center block-max-width">
						<v-btn
								class="btn--secondary  mb-4" dark block
								@click="onOk"
						> {{ pageButtons.confirm ? pageButtons.confirm : "Подтвердить" }}

						</v-btn>

						<v-btn class="btn--primary"
						       dark
						       block
						       @click="dialogDelFile = false"
						>
							{{ pageButtons.back ? pageButtons.back : "Назад"}}
						</v-btn>
					</div>

				</div>
			</v-card>
		</v-dialog>

	</div>
</template>

<script>
	import addPhotoField from '../../elements/account-elements/add-photo-field'

	export default {
		name: 'form-avatar',
		// props: ['initials', 'withAddress', 'dated'],
		props: ['card', 'changeable'],
		data() {
			return {
				imagePreview: null,
				dialogDelFile: false,
				isPictureSaved: false,
			}
		},
		components: {addPhotoField},
		computed: {
			avatarUrl() {
				return this.$store.state.avatarPreview;
			},
			img() {
				return require("@/assets/images/user.png");
			},
			pageButtons() {
				return this.$store.state.common?.buttons;
			},
			dialogs() {
				return this.$store.state.common.dialogs || {};
			},
			isMobileApp() {
				return this.$store.state.common.isMobileApp;
			}
		},
		watch: {
			card() {
				this.imagePreview = this.card.DETAIL_PICTURE;
			}
		},
		methods: {
			deleteImageModal() {
				this.dialogDelFile = true;
			},
			loadFile() {
				this.file = this.$refs.fileInput.files[0];
				let reader = new FileReader();

				reader.addEventListener("load", function () {
					this.imagePreview = reader.result;
					// this.card.DETAIL_PICTURE = reader.result;
				}.bind(this), false);

				if (this.file) {
					if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
						reader.readAsDataURL(this.file);
					}
				}
				console.log('loadFile')
				this.$emit('imageUpload', this.file)
			},
			onOk() {
				this.$store.dispatch('post', {
					action: 'RemovePlaceImageController',
					params: {'ID': this.card.ID}
				}).then((res) => {
					this.imagePreview = null;
					this.dialogDelFile = false;
				}).catch((err) => {
					console.log('err', err)
				})
			}
		},
		mounted() {
			this.imagePreview = this.card.DETAIL_PICTURE;
		}
	}
</script>


<style lang="scss">
	.form-avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

		&__photo {
			width: 100px;
			height: 100px;
			border-radius: 100%;
			background-size: cover;
			background-position: center;
		}

		.add-photo-field {
			position: relative;

			&__delete {
				cursor: pointer;
				font-family: $btn-font-family;
				color: $grey1;
				text-decoration: underline;

				&:hover {
					color: $beige1;
				}
			}

			&__photo {
				width: 100px;
				height: 120px;
				border-radius: 100%;
				@include up ($md) {
					height: 100px;
				}

				&_dashed {
					height: 100px;
					border: 2px dashed $beige1;
				}
			}

			&__avatar {
				width: 100px;
				height: 100px;
				border-radius: 100%;
				background-size: cover;
				background-position: center;
			}

			&__download {
				box-sizing: border-box;
				width: 100px;
				height: 100px;
				border-radius: 100%;
				cursor: pointer;
				opacity: 0;
				z-index: 3;
				position: absolute;
				left: 0;
				top: 0;

			}
		}
	}

</style>
