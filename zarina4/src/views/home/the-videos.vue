<template>
	<section class="the-videos d-flex align-center justify-center mt-4 mb-16">
		<div class="d-flex align-center justify-center the-videos__intro">
			<v-container>
				<h1 class="text-center the-videos__intro__header">Обучающий курс</h1>
				<h3 class="text-center mt-2 mt-md-0">#силавтебе</h3>

				<divider class="mb-8" color="accentColor"/>

				<p>Начни прокачивать свои скиллы прямо сейчас. Четыре эксперта, четыре области: финансы, психология, книги и здоровье. Смотри видеоуроки, узнавай больше и сделай свою жизнь ещё качественней вместе с Zarina!</p>

				<div class="the-videos__intro-buttons d-flex flex-column flex-md-row align-center justify-center mt-12 mr-auto ml-auto">
					<button @click="setCategory('finance')" :class="{pressed:category==='finance'}">финансы</button>
					<button @click="setCategory('books')" :class="{pressed:category==='books'}">книги</button>
					<button @click="setCategory('psychology')" :class="{pressed:category==='psychology'}">психология</button>
					<button @click="setCategory('health')" :class="{pressed:category==='health'}">здоровье</button>
				</div>
				<div class="the-videos__wrapper mt-16">
					<v-row>
						<v-col cols="12" sm="6" class="px-4">
							<div class="the-videos__wrapper-video" :class="{active:!soon(videos[0])}"
								 @click="showVideo(videos[0])">
								<img class="d-block the-videos__wrapper-video-poster" :src="videos[0].poster"
									 alt="Image"/>
								<play-btn-mini v-if="soon(videos[0])"/>
								<span v-if="soon(videos[0])" class="the-videos__wrapper-video__text">{{
										soon(videos[0])
									}}</span>
								<play-btn v-else/>
							</div>
							<h2 class="mt-3">{{ videos[0].name }}</h2>
						</v-col>
						<v-col cols="12" sm="6" class="px-4">
							<div class="mt-4 mt-sm-0 the-videos__wrapper-video" :class="{active:!soon(videos[1])}"
								 @click="showVideo(videos[1])">
								<img class="d-block the-videos__wrapper-video-poster" :src="videos[1].poster"
									 alt="Image"/>
								<play-btn-mini v-if="soon(videos[1])"/>
								<span v-if="soon(videos[1])" class="the-videos__wrapper-video__text">{{
										soon(videos[1])
									}}</span>
								<play-btn v-else/>
							</div>
							<h2 class="mt-3">{{ videos[1].name }}</h2>
						</v-col>
						<v-col cols="12" sm="6" md="4" class="px-4">
							<div class="mt-4 the-videos__wrapper-video" :class="{active:!soon(videos[2])}"
								 @click="showVideo(videos[2])">
								<img class="d-block the-videos__wrapper-video-poster" :src="videos[2].poster"
									 alt="Image"/>
								<play-btn-mini v-if="soon(videos[2])"/>
								<span v-if="soon(videos[2])" class="the-videos__wrapper-video__text">{{
										soon(videos[2])
									}}</span>
								<play-btn v-else/>
							</div>
							<h2 class="mt-3">{{ videos[2].name }}</h2>
						</v-col>
						<v-col cols="12" sm="6" md="4" class="px-4">
							<div class="mt-4 the-videos__wrapper-video" :class="{active:!soon(videos[3])}"
								 @click="showVideo(videos[3])">
								<img class="d-block the-videos__wrapper-video-poster" :src="videos[3].poster"
									 alt="Image"/>
								<play-btn-mini v-if="soon(videos[3])"/>
								<span v-if="soon(videos[3])" class="the-videos__wrapper-video__text">{{
										soon(videos[3])
									}}</span>
								<play-btn v-else/>
							</div>
							<h2 class="mt-3">{{ videos[3].name }}</h2>
						</v-col>
						<v-col cols="12" sm="6" md="4" class="px-4">
							<div class="mt-4 the-videos__wrapper-video" :class="{active:!soon(videos[4])}"
								 @click="showVideo(videos[4])">
								<img class="d-block the-videos__wrapper-video-poster" :src="videos[4].poster"
									 alt="Image"/>
								<play-btn-mini v-if="soon(videos[4])"/>
								<span v-if="soon(videos[4])" class="the-videos__wrapper-video__text">{{
										soon(videos[4])
									}}</span>
								<play-btn v-else/>
							</div>
							<h2 class="mt-3">{{ videos[4].name }}</h2>
						</v-col>
					</v-row>
				</div>
			</v-container>
		</div>

		<v-dialog
			v-model="dialog"
			fullscreen
			hide-overlay
			transition="dialog-bottom-transition">
			<div class="d-flex flex-column the-videos__video-dialog">
				<div class="flex-grow-0 text-center the-videos__video-dialog-header">
					<span @click="dialog=false">Вернуться</span>
				</div>
				<div class="flex-grow-1 d-flex align-center the-videos__video-dialog-content" id="ytPlayerContainer">
					<iframe v-if="dialog" type="text/html"
							:src="'https://www.youtube.com/embed/'+videoId+'?autoplay=1'"
							width="100%" :height="videoHeight" frameborder="0" allowfullscreen></iframe>
				</div>
			</div>
		</v-dialog>
	</section>
</template>

<script>
import Divider from '../../components/divider.vue';
import BtnLink from "../../components/btn-link";
import PlayBtn from "../../components/play-btn";
import PlayBtnMini from "../../components/play-btn-mini";
import {end} from "../../utils/string";

export default {
	name: 'the-test',
	components: {
		BtnLink,
		Divider,
		PlayBtn,
		PlayBtnMini
	},
	data() {
		return {
			dialog: false,
			videoId: null,
			category: "finance",
			allVideos: {
				"finance": [
					{
						date: "2021-08-31",
						poster: require('@/assets/the-videos/finance/poster1.jpg'),
						name: "Пять способов экономии",
						id: "-jsVJopXlTg",
					},
					{
						date: "2021-09-08",
						poster: require('@/assets/the-videos/finance/poster2.jpg'),
						name: "Как найти дополнительный источник дохода",
						id: "fwTVLCTw_7U",
					},
					{
						date: "2021-09-15",
						poster: require('@/assets/the-videos/finance/poster3.jpg'),
						name: "Как распределять свои доходы, чтобы была возможность откладывать",
						id: "FYGevfirwPA",
					},
					{
						date: "2021-09-22",
						poster: require('@/assets/the-videos/finance/poster4.jpg'),
						name: "Как накопить на крупную покупку",
						id: "LpkzKNtMBLc",
					},
					{
						date: "2021-09-29",
						poster: require('@/assets/the-videos/finance/poster5.jpg'),
						name: "Что такое инвестиции",
						id: "yra73SdTaIE",
					},
				],
				"psychology": [
					{
						date: "2021-09-04",
						poster: require('@/assets/the-videos/psychology/poster1.jpg'),
						name: "Если ничего не получается",
						id: "jJNpGw6tpHk",
					},
					{
						date: "2021-09-11",
						poster: require('@/assets/the-videos/psychology/poster2.jpg'),
						name: "Про самооценку",
						id: "CM2XF8as_OA",
					},
					{
						date: "2021-09-18",
						poster: require('@/assets/the-videos/psychology/poster3.jpg'),
						name: "Про поддержку",
						id: "ZdvouH_oVgQ",
					},
					{
						date: "2021-09-25",
						poster: require('@/assets/the-videos/psychology/poster4.jpg'),
						name: "Как быть собой",
						id: "CqbycC0Bso0",
					},
					{
						date: "2021-10-02",
						poster: require('@/assets/the-videos/psychology/poster5.jpg'),
						name: "Про предназначение",
						id: "rCA74OZaMG8",
					},
				],
				"books": [
					{
						date: "2021-09-02",
						poster: require('@/assets/the-videos/books/poster1.jpg'),
						name: "Книги для отличного вечера",
						id: "2AFN3Uc4ih0",
					},
					{
						date: "2021-09-09",
						poster: require('@/assets/the-videos/books/poster2.jpg'),
						name: "Книги с терапевтическим эффектом",
						id: "uu80jCA7PQ8",
					},
					{
						date: "2021-09-16",
						poster: require('@/assets/the-videos/books/poster3.jpg'),
						name: "Книжный клуб Риз Уизерспун",
						id: "9C_NzCoqqXM",
					},
					{
						date: "2021-09-23",
						poster: require('@/assets/the-videos/books/poster4.jpg'),
						name: "Телесность и любовь к себе",
						id: "gVJXYsNbm2I",
					},
					{
						date: "2021-09-30",
						poster: require('@/assets/the-videos/books/poster5.jpg'),
						name: "Лучшая книга для родителей",
						id: "VTYFeR-hwP4",
					},
				],
				"health": [
					{
						date: "2021-09-03",
						poster: require('@/assets/the-videos/health/poster1.jpg'),
						name: "5 основных правил здоровья",
						id: "GSxaOimHneI",
					},
					{
						date: "2021-09-10",
						poster: require('@/assets/the-videos/health/poster2.jpg'),
						name: "Жиры полезные и вредные. Нормы и значение для здоровья",
						id: "lqOIf2SjCEI",
					},
					{
						date: "2021-09-17",
						poster: require('@/assets/the-videos/health/poster3.jpg'),
						name: "Стоп продукты и вредные добавки, которых стоит избегать",
						id: "b8kMflqTQxA",
					},
					{
						date: "2021-09-24",
						poster: require('@/assets/the-videos/health/poster4.jpg'),
						name: "Допустимые лакомства при ЗОЖ",
						id: "I--lWjObwG4",
					},
					{
						date: "2021-10-01",
						poster: require('@/assets/the-videos/health/poster5.jpg'),
						name: "Смена сезонов: особенности питания летом, осенью, зимой и весной",
						id: "yL4esm47p9E",
					},
				]
			}
		}
	},
	computed: {
		videos() {
			return this.allVideos[this.category];
		},
		videoHeight() {
			if (this.isWindowMD) return "100%";
			return "320px";
		},
		isWindowMD() {
			return this.$store.getters.isWindowMD;
		},
	},
	methods: {
		soon(video) {
			const now = new Date();
			const date = new Date(video.date);
			const diffTime = date - now;
			if (diffTime <= 0) return null;
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
			//console.log(diffTime + " milliseconds");
			//console.log(diffDays + " days");
			if (diffDays <= 0) return null;
			return "выход видео через " + diffDays + " " + end(diffDays, "день", "дня", "дней");
		},
		showVideo(video) {
			if(this.soon(video)) return;
			this.videoId = video.id;
			this.dialog = true;
		},
		setCategory(category) {
			this.category = category;
		}
	}
}
</script>

<style lang="scss">

.the-videos {
	//min-height: 700px;

	&__intro {
		width: 100%;
		height: auto;
		box-sizing: border-box;
		text-align: center;
		background-image: url('~@/assets/the-test/bg.jpg');
		background-position: top;
		background-size: 1200px;
		background-repeat: no-repeat;

		@include up($lg) {
			height: auto;
			background-size: unset;
		}

		&__header {
			padding-top: 120px;
			@include up($md) {
				padding-top: 240px;
			}
		}

		p {
			margin: 0 auto;

			@include up($sm) {
				width: 80%;
				max-width: 720px;
			}
		}

		&-buttons {
			width: 100%;
			row-gap: 10px;

			button {
				width: 260px;
				@include up($md) {
					width: auto;
					margin: 0 6px;
				}
			}
		}
	}

	&__wrapper {
		text-align: start;

		&-video {
			position: relative;
			height: auto;

			&-poster {
				width: 100%;
				display: block;
			}

			.play-btn {
				position: absolute;
				z-index: 2;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				margin: auto;
			}

			.play-btn-mini {
				position: absolute;
				z-index: 2;
				top: 12px;
				right: 12px;
				width: 24px;
				height: 24px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			&__text {
				position: absolute;
				z-index: 2;
				width: auto !important;
				//right: 30%;
				//transform: translateY(-50%);
				right: 5%;
				bottom: 5%;
				font-size: 14px;

				color: $white-color;

				@include up($lg) {
					font-size: unset;
				}
			}

			&::after {
				content: '';
				position: absolute;
				z-index: 1;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.6);

				@include transition();
			}

			&:hover {
				&::after {
					background: rgba(0, 0, 0, 0.05);
				}

				.the-videos__wrapper-video__text {
					//color: $black-color;
					text-shadow: 0 0 1px rgba(0,0,0,0.35);
				}
			}

			&.active {
				&::after {
					background: rgba(0, 0, 0, 0.15);
				}

				&:hover {
					&::after {
						background: rgba(0, 0, 0, 0.05);
					}
				}
			}
		}

	}

	&__video-dialog {
		background: $black-color;
		width: 100%;
		height: 100%;

		&-header {
			height: 40px;
			line-height: 40px;
			color: #fff;

			span {
				cursor: pointer;
				@include transition();

				&:hover {
					opacity: 0.5;
				}
			}
		}
	}
}
</style>
