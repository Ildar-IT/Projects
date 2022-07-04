<template>
	<div class="cards-tariff">
<!--		<div >-->
			<swiper v-if="isWindowXS" ref="cardsTariffSwiper" :options="swiperOptions">
				<swiper-slide v-for="item of items" :key="item.name">
					<card-tariff :item="item"/>
				</swiper-slide>
			<div  class="cards-tariff__pagination swiper-pagination custom-pagination"
			     id="tariffs-swiper-pagination"
			     slot="pagination">
			</div>
      </swiper>

<!--		</div>-->

<!--		<div >-->
			<div v-else class="d-flex justify-center flex-wrap mx-auto mx-lg-0 ">
					<card-tariff  v-for="item of items" :key="item.name" :item="item"/>
<!--        <div cols="12" sm="6" md="6" lg="3"  v-for="item of items" :key="item.name" class="d-flex justify-center mx-8">
          <card-tariff :item="item"/>
        </div>-->
			</div>
<!--		</div>-->
	</div>
</template>

<script>
	import '@/plugins/swiper';
	import CardService from "../service-elements/card-service";
	import CardTariff from "./card-tariff";
	export default {
		name: "cards-tariff",
		components: {CardTariff, CardService},
		props: ['items'],
		data() {
			return {
				isMoving: false,
				swiperOptions: {
					keyboard: {
						enabled: true,
					},
					slidesPerView: 'auto',
					autoHeight: true,
				/*	navigation: {
						nextEl: "#swiper-controller-next",
						prevEl: "#swiper-controller-prev",
					},*/
					spaceBetween: 32,
					pagination: {
						el: '#tariffs-swiper-pagination',
						type: 'bullets'
					},
				},
			};
		},
		computed: {
			isWindowXS() {
				return this.$store.getters.isWindowXS;
			},
			swiper() {
				return this.$refs.cardsTariffSwiper.$swiper;
			}
		}
	}
</script>

<style lang="scss">
.cards-tariff{
	&__pagination{
		padding-top: 42px;
		position: relative;
		display: flex;
		width:100%;
		justify-content: center;

		.swiper-pagination-bullet{
			width: 12px;
			height: 12px;
			margin:0 8px;
			background-color: $beige5;
			&-active{
				background-color: $beige1;
			}
		}
	}
	&__item {
		@include up($lg) {
			&:last-of-type {
				padding-right: 0 !important;
			}
			&:first-of-type {
				padding-left: 0 !important;
			}

		}
	}
//   &__wrapper{
//     @include up($lg) {
//       max-width: 1920px;
//       div.justify-center {
//         max-width: 390px;

//         &:first-child {
//           margin-left: 0 !important;
//         }

//         &:last-child {
//           margin-right: 0 !important;
//         }
//       }
//     }
//   }
}
</style>
