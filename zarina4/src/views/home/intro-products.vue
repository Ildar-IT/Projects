<template>
    <section class="intro-products">
        <v-container>
            <v-row justify="space-between" align="center">
                <v-col cols="12" md="4">
                    <div class="mb-md-16 intro-products__text">
                        <h2>Как часто ты слышала, что у тебя ничего не получится или о том, что ты не справишься?</h2>
                        <p class="mt-4">Несмотря на то, что в работе артиста ярлыки — это способ создания узнаваемых персонажей,
                            Екатерина никогда не давала сценическим образам затмевать себя настоящую: яркую, харизматичную,
                            остроумную и чуткую.</p>
                    </div>
                </v-col>
                <v-col cols="12" md="7">
                    <div class="intro-products__products">
                        <a class="product" href="https://zarina.ru/catalog/clothes/106977-32/" target="_blank">
                            <img class="product-photo" src="~@/assets/intro-products/product1.jpg" alt="Product">
                            <span class="product-name">Жилет</span>
                            <div class="product-price">
                                <img class="product-price__icon" src="~@/assets/icons/shopping-bag.svg"
                                     alt="shopping-bag">
                                <span class="product-price__value">2 599 руб.</span>
                            </div>
                        </a>
                        <a class="product ml-2 ml-sm-10 ml-lg-16" href="https://zarina.ru/catalog/new/113413-2/"
                           target="_blank">
                            <img class="product-photo" src="~@/assets/intro-products/product2.jpg" alt="Product">
                            <span class="product-name">Свитер</span>
                            <div class="product-price">
                                <img class="product-price__icon" src="~@/assets/icons/shopping-bag.svg"
                                     alt="shopping-bag">
                                <span class="product-price__value">2 999 руб.</span>
                            </div>
                        </a>
                    </div>
                </v-col>
            </v-row>

        </v-container>
    </section>
</template>


<style lang="scss">

    .intro-products {
        //background-color: $section-bg1;

        //height: 630px; // мне пришлось комментить эту строчку, так как моя секция ниже наезжала на блок
        padding: 30px 0 30px 0;

        @include up($md) {
            padding: 60px 0 60px 0;
        }

        &__text {
            @include up($md) {
                max-width: 370px;
            }
        }

        &__products {
            display: flex;
            justify-content: flex-end;

            .product {
                flex: 1;
            }
        }


        /*        @include up($sm) {
                    &__text {
                        width: 45%;
                        margin: auto 0;
                    }
                    &__items {
                        margin-top: 0px;
                        width: 50%;
                    }

                    &__item {
                        width: 50%;
                    }
                }

                @include up($lg) {
                    &__text {
                        width: 25%;

                    }
                }*/
    }


</style>
