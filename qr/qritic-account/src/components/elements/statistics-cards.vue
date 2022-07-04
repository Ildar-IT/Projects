<template>
	<div class="statistics-cards">
		<div class="anti-margin-row">
			<v-row class="ma-0">
				<v-col cols="12" lg="4" class="ma-0 pa-0" v-if="countPolls">

					<card class="statistics-cards__card margin-right-small margin-left-small margin-bottom-main">
						<div class="h7 gray-text mb-4 flex-center  ">
							<svgicon class="mr-4 statistics-cards__icon"
							         width="24" name="activity"
							         :fill="false"
							/>
							Последняя активность
						</div>
						<h4 class="flex-center  flex">
							{{lastActivity ? lastActivity : '—'}}
						</h4>
						<!--<div class="h7 red-text mt-4 flex-center">
							<svgicon class="mr-2" width="24" name="trending-down" color="#F35A45" :fill="false"/>
							-22%
						</div>-->
					</card>

				</v-col>
				<v-col cols="12" :lg="countPolls? 4 : 6" class="ma-0 pa-0">
					<card class="margin-right-small margin-left-small margin-bottom-main">
						<div class="h7 mb-4 flex-center gray-text">
							<svgicon class="mr-4" width="24" name="user2" color="#B3B8CB"/>
							Всего респондентов
						</div>
						<h4 class="flex-center flex">
							{{countReviews}}
						</h4>
						<!-- <div class="h7 mt-4 green-text flex-center">
							 <svgicon class="mr-2" width="24" name="trending-up" color="#6CC237" :fill="false"/>
							 +5%
						 </div>-->
					</card>
				</v-col>
				<v-col cols="12" :lg="countPolls? 4 : 6" class="ma-0 pa-0">
					<card class="margin-right-small margin-left-small margin-bottom-main">
						<div class="h7 flex-center gray-text mb-4">
							<svgicon class="mr-4" width="24" name="message-square" :fill="false" color="#B3B8CB"/>
							Поступило ответов
						</div>
						<h4 class="flex-center  " v-if="countAnswers">
							{{countAnswers}}
						</h4>
						<h4 class="flex-center " v-else>
							0
						</h4>
						<!-- <div class="h7 green-text flex-center mt-4">
							 <svgicon class="mr-2" width="24" name="trending-up" color="#6CC237" :fill="false"/>
							 +16%
						 </div>-->
					</card>
				</v-col>
			</v-row>
		</div>
	</div>
</template>

<script>
	export default {
		name: "statistics-cards",
		props: ['countPolls', 'countAnswers', 'countReviews', 'lastActivity']
	}
</script>

<style lang="scss">
	.statistics-cards {
		&__card {
			&:hover {
				@include transition();

			}
		}

		&__text {
			color: $gray;
			@include transition();
		}

		&__icon {
			stroke: $gray;
			fill: none;
			color: transparent;
		}
	}
</style>