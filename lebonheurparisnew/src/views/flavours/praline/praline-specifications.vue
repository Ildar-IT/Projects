<template>
  <section class="praline-specification mt-16">
    <v-container >
      <v-row>
        <v-col cols="12" lg="6">
          <div class="praline-specification__wrapper">
            <div class="block">
              <h5 class="text-center">expiration date</h5>
              <div class="my-text-2 text-center mt-2">21 days after purchase date.</div>
            </div>
            <div class="block">
              <h5 class="text-center">Nutritional informations per 100 g</h5>
              <div class="my-text-2 text-center mt-2">Energy 2380 kj/ 572 kcal, fat 38,6 g, of which saturated fat 16,5 g, carbonhydrates 45 g, of which sugar 38 g, proteins 8,6 g, salt 0,1 g</div>
            </div>
            <div class="block">
              <h5 class="text-center">Allergens</h5>
              <div class="my-text-2 text-center mt-2">This product may contain traces of nuts, egg and gluten.</div>
            </div>
            <div class="block">
              <h5 class="text-center">Ingredients</h5>
              <div class="my-text-2 text-center mt-2">MILK chocolate couverture 26,3%(sugar, cocoa butter, whole MILK powder, cocoa beans, emulsifier (SOYA lecithin), natural vanilla extract),
                ALMOND praline 24,3%(ALMONDS, sugar, glucose, water, sorbitol, salt, vanilla pod), HAZELNUT praline 24,3%(HAZELNUTS, sugar, glucose, water, sorbitol, salt, vanilla pod),
                dark chocolate couverture 20,5%(cocoa beans, sugar, cocoa butter, emulsifier (SOYA lecithin), natural vanilla extract), nougatine  (glucose, sugar, ALMONDS), ALMONDS , cocoa paste (cocoa beans), cocoa butter ,
                This product may contain traces of nuts, egg and gluten.</div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" lg="6">
          <div class="praline-specification__img d-sm-none d-lg-block"></div>
        </v-col>
      </v-row>

    </v-container>
    <img class="praline-specification__img d-none d-sm-block d-lg-none" src="@/assets/Flavours/praline/bg-sm.jpg" alt="Background">
  </section>
</template>

<script>
export default {
  name: "praline-specifications"
}
</script>

<style lang="scss">
.praline-specification {
  .container {
    margin-bottom: 128px;
  }
  &__wrapper {
    display: grid;
    grid-template-rows: minmax(111px, auto);
    grid-auto-rows: minmax(111px, auto);
    grid-template-columns: 1fr;
    @include up($sm) {
      grid-template-rows: repeat(2, minmax(111px, auto));
      grid-auto-rows: minmax(111px, auto);
      grid-template-columns: repeat(3, 1fr);
    }
    @include up($lg) {
      grid-template-rows: repeat(2, minmax(111px, auto));
      grid-auto-rows: minmax(111px, auto);
      grid-template-columns: 1fr;
    }
    .block {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 32px 32px;
      border: 1px solid $primary-100;

      &:last-child {
        @include up($sm) {
          grid-column-start: 1;
          grid-column-end: 5;
        }
        @include up($lg) {
          grid-column-start: auto;
          grid-column-end: auto;
        }
      }
    }
  }

  &__img {
    width: 100%;
    height: 296px;
    background: url("../../../assets/Flavours/praline/bg-xs.jpg");
    background-size: cover;
    @include up($sm) {
      background: none;
      height: 418px;
      object-fit: cover;
      margin-bottom: 96px;
    }
    @include up($lg) {
      background: url("../../../assets/Flavours/praline/bg-lg.jpg") no-repeat;
      background-size: contain;
      height: 100%;
      margin-bottom: 0;
    }
  }

  .my-text-2 {
    color: $black-200;
  }
}
</style>