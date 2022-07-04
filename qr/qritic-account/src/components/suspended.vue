<template>
	<div class="suspended px-4 mt-lg-n10">
		<suspended-message />
		<svgicon class="suspended__svg mx-auto d-block" name="smile-bad" width="120" height="120" original/>
		<div class="suspended__text-wrapper mx-auto my-12  my-md-16">
			<h5 class="text-center ">Нам очень жаль, Ваш пробный период подошел к концу.</h5>
			<div class="h7 text-center mt-4">Не переживайте, все созданные Вами опросы продолжают работать,
				а собранная нами статистика будет храниться в Вашем личном кабинете. Чтобы её увидеть, продлите
				подписку.
			</div>
		</div>
		<router-link :to="{name: 'tariffs'}" tag="button" class="mx-auto d-block">
			<v-btn class="primary suspended__btn">
				Продлить
			</v-btn>
		</router-link>
	</div>

</template>

<script>
    import SuspendedMessage from "@/components/elements/suspended-message";

    export default {
        name: "suspended",
        components: [SuspendedMessage]
    }
</script>

<style lang="scss">
	.suspended {
		width: 100%;

		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

		&__svg {

		}

		&__text-wrapper {
			max-width: 590px;

			h5 {
				font-size: 28px;
				line-height: 34px;
			}

			.h7 {
				font-size: 18px;
				line-height: 22px;
			}
		}

		&__btn {
			width: 250px !important;
			font-size: 23px !important;
		}
	}
</style>