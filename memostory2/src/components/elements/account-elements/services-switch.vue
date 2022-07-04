<template>
  <div class="services-switch">

  <v-row class="services-switch__items justify-space-between  pr-0  px-0 mx-0">

    <v-col cols="12" md="5" lg="5" xl="6" v-for="service of services" :key="service.name" class="pa-0 margin-bottom-main">
      <services-switch-item :place="place" :service="service"/>
    </v-col>

  </v-row>

  </div>
</template>

<script>
import servicesSwitchItem from "@/components/elements/account-elements/services-switch-item"

export default {
  name: 'services-switch',
  props:['services', 'place'],
  components: {servicesSwitchItem},
  data() {
    return {}
  },
  computed: {

    calculateServices() {

    },
  }
}
</script>

<style lang="scss">
.services-switch {
  &__items {
    .col-12 {
      /*max-width: unset;*/
      @include up($md) {
        /*width: 276px;*/
      }
    }

    .col-12:nth-child(odd) {
      margin-right: 0;
      @include up($md) {
        // margin-right: 15px !important;
      }
      @include up($xl) {
        padding-right: 32px !important;
      }
    }
    .col-12:nth-child(even) {
      margin-right: 0;
      @include up($md) {
        // margin-right: 15px !important;
      }
      @include up($xl) {
        padding-left: 32px !important;
      }
    }
  }


}
</style>
