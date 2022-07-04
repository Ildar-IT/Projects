<template>
	<card>
		<h6 class="text-center gray-text mb-8">
			QR-код опроса
		</h6>
		<a :href="link" target="_blank">
			<v-img class="mb-8" :src="image"/>
		</a>
		<div class="flex-center">
			<a class="qr-card__download" :href="downloadLink" target="_blank">
				<v-btn block small class="secondary">
					Скачать
				</v-btn>
			</a>
		</div>

		<transition name="route" mode="out-in">

			<div v-if="isShareLinkCopied"
			     class="flex-center align-center mt-8">
				Скопировано в буфер обмена!
			</div>
			<div v-else>
        <div class="flex-center align-center mt-8">Ссылка опроса:</div>
				<div class="flex-center align-center ">
					<input ref="share-input" readonly
					       class="qr-card__share__input"
					       :value="link" />
					<a :href="link" target="_blank" class="qr-card__share-link">{{linkLimited}}</a>
          <div class="flex-center align-center ">
            <svgicon class="ml-3 qr-card__share__icon"
                     name="target2"
                     width="20" :fill="false"
                     @click.native="shareCopyToClipboard"
                     title="Скопировать" />
          </div>
				</div>
			</div>
		</transition>
	</card>
</template>

<script>
	export default {
		name: "qr-card",
		props: ['image', 'link' , 'hash'],
		data: () => ({
			isShareLinkCopied: false,
		}),
		computed: {
			downloadLink() {
				return "/api/QRDownloadController?hash="+this.hash;
			},
			linkLimited() {
				return this.link.substring(0, 25);
			}
		},
		methods:{
			/*download() {
				console.log('hash', this.hash)
				this.$store.dispatch('fetchPage', {
					action: 'QRDownloadController',
					params: {'hash': this.hash}
				}).then((response) => {
					console.log('response', response);

					const url = response;
					const link = document.createElement('a');
					link.href = url;
					link.target = 'blank';
					link.setAttribute('download', 'qr-code.png'); //or any other extension
					document.body.appendChild(link);
					link.click();

				/!*	this.question = '';
					this.requestStatus = 'success';
					this.message = 'Ваше обращение отправлено!'*!/


				}).catch((error) => {
					console.log('error', error);
					/!*this.requestStatus = 'error';
					this.message = 'Что-то пошло не так :( Попробуйте еще раз.'*!/
				}).finally(() => {

					setTimeout(() => {
						/!*this.requestStatus = null;*!/
					}, 5000)
				})
			},*/
			shareCopyToClipboard() {

				const hiddenInput = this.$refs['share-input'];
				console.log('value', hiddenInput.value)

				/////////// it dont works
				hiddenInput.focus();
				hiddenInput.select();
				document.execCommand("copy");
				hiddenInput.selectionEnd = hiddenInput.selectionStart;
				hiddenInput.blur();

				////////// it works

				let textarea = document.createElement('textarea');
				textarea.textContent = hiddenInput.value;
				document.body.appendChild(textarea);

				let selection = document.getSelection();
				let range = document.createRange();
				range.selectNode(textarea);
				selection.removeAllRanges();
				selection.addRange(range);

				console.log('copy success', document.execCommand('copy'));
				selection.removeAllRanges();

				document.body.removeChild(textarea);

				//////

				this.isShareLinkCopied = true;
				setTimeout(() => {
					this.isShareLinkCopied = false;
				}, 1500);
			},
		}
	}
</script>

<style lang="scss">
	#account-app {
		.qr-card {

			svg:not([fill]) {
				fill: transparent;
			}

			&__download{
				width:100%;
			}

			&__share {
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				height: 50px;

				&__icon {
          display: block;
					@include transition();
					cursor: pointer;
					fill: transparent;
					stroke: $primary;

					&:hover {
						stroke: $secondary-hover;
					}
				}

				svg:not(fill) {
					fill: transparent;
				}

				&__input {
					display: none;
				}

        &-link {
          color: $primary;
          &:hover {
            color: $secondary-hover;
          }
        }
			}


		}
	}
</style>