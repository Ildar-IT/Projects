<template>
  <div class="address text-center margin-top-main ">
    <v-container>
      <h4 class="margin-bottom-main my-primary">ADDRESS</h4>
      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field class="address__input" label="Zip/Postal code" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field class="address__input" label="City" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field class="address__input" label="District" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field class="address__input" label="Street" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field class="address__input" label="Building" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field class="address__input" label="Room" required></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "address"
}
</script>

<style lang="scss">

</style>