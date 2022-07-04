<template>
  <div class="output-info">
    <v-row class="manager-object__info text-center d-flex mx-auto justify-space-between align-end">

      <v-col cols="12" md="6" class="py-0 mr-0  margin-bottom-small ">
        <v-textarea class="text-left grey-text "
                    v-model="address"
                    :auto-grow=true
                    rows="1"
                    readonly
                    label="Адрес кладбища">
        </v-textarea>
<!--        <div class="address-status text-left mt-n4" :style="isApproved? 'color: #72BE4E':'color: #BE4E4E'">-->
<!--          {{ isApproved ? 'Подтверждено' : 'Ожидает подтверждения' }}-->
<!--        </div>-->
      </v-col>

      <v-col cols="12" md="6" class="py-0 mr-0   margin-bottom-small">
        <v-text-field class="text-left grey-text"
                      v-model="placeNumber"
                      readonly
                      label="Номер места">
        </v-text-field>
      </v-col>

    </v-row>
    <v-row class="manager-object__info text-center d-flex mx-auto justify-space-between">

      <v-col v-if="document" cols="12" md="6" class="d-flex align-center py-0">
        <div class="text-left grey-text d-flex align-center hover-link_dark">
           <a download :href="document" target="_blank">
          <svgicon name="pdf-doc" original width="42" height="48"></svgicon>
           </a>
          <span class="body-1 ml-4">Паспорт захоронения</span>
        </div>
      </v-col>

<!--      <v-col cols="12" md="5" class="py-0">-->
<!--        <v-text-field class="text-left grey-text margin-bottom-small"-->
<!--                      v-model="geoPosition"-->
<!--                      readonly-->
<!--                      label="Геопозиция"-->
<!--                      prepend-inner-icon="mdi-map-marker">-->
<!--        </v-text-field>-->
<!--      </v-col>-->

      <v-col cols="12" md="6" class="d-flex align-center mt-5 mt-lg-0 py-0">
        <v-text-field class="text-left grey-text"
                      v-model="notes"
                      readonly
                      label="Дополнительная информация">
        </v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'output-info',
  props: ['address', 'placeNumber', 'geoPosition', 'document', 'notes'],
  data() {
    return {
      isApproved: true,
    }
  },

}
</script>

<style lang="scss">
.output-info {
  .manager-object-info {
    width: 100%;

    .address-status {
      font-family: 'Roboto';
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
    }

  }
}
</style>
