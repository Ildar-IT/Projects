<template>
  <div class="included-services">
    <h5 class="grey-text mb-sm-13 mb-5">
      Текущая задача
    </h5>
    <v-row class="justify-space-around mb-sm-13 mb-5 flex-column flex-sm-row px-2 px-sm-0">
      <v-col cols="12" :sm="3" v-for="service in services" :key="service.name" v-if="service.included"
      class="d-flex flex-row flex-sm-column align-center">

        <div class="service-logo mb-sm-4 mr-4 mx-sm-auto ">
          <svgicon original :name="service.icon" width="50" height="50"></svgicon>
        </div>
        <h5 class="beige-text text-center">
          {{ service.name }}
        </h5>
      </v-col>

    </v-row>
  </div>
</template>

<script>
export default {
  name:'included-services',
  props: ['services'],
}
</script>

<style lang="scss">
.included-services{

}
</style>
