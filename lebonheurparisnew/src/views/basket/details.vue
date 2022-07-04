<template>
  <div class="details text-center margin-top-main">
    <v-container>
      <h4 class="margin-bottom-main my-primary">Delivery details</h4>
      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field class="details__input" label="Full name" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field class="details__input" label="Email" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field class="details__input" label="Phone" required></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "details"
}
</script>

<style lang="scss">

</style>