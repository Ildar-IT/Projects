<template>
  <div class="expansion-photo-reports">
    <CoolLightBox
        :items="photoItems"
        :index="index"
        @close="closePopUp">
    </CoolLightBox>
    <v-expansion-panels accordion>
      <v-expansion-panel elevation="0" class="elevation-0 px-0"
                         v-for="(report, index) in reports" :key="index"
      >
        <v-expansion-panel-header>
          <h5 class="grey-text text-left">{{ date2ddMonthyyyy(report.date) }}</h5>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <h6 class="grey-text text-left mb-4 mb-md-5">Было</h6>
          <div class="d-flex mb-0 mb-md-1 flex-wrap mx-sm-n3">
            <div v-for="(item, idx) in report.photosBefore" :key="idx" :style="`background-image: url(${item.photo})`"
                 class="expansion-photo-reports__photo mb-4"
                 @click="showPopUpWithPhoto(idx, report.photosBefore)"
            />
          </div>
          <h6 class="grey-text text-left mb-4 mb-md-5">Стало</h6>
          <div class="d-flex flex-wrap mx-sm-n3">
            <div v-for="(item, idx) in report.photosAfter" :key="idx" :style="`background-image: url(${item.photo})`"
                 class="expansion-photo-reports__photo mb-4"
                 @click="showPopUpWithPhoto(idx, report.photosAfter)"/>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-dialog v-model="photoDialog" class="mx-auto" width="auto">
      <v-card class="photo-dialog mx-auto text-center pa-0" >
        <v-img :src="imgForDialog" contain height="80vh"/>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import {date2ddMonthyyyy, monthIndex, ddmmyyyy2Date, monthName} from '@/utils/date';
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
export default {
  name: 'expansion-photo-reports',
  props: ["months"],
  components: {
    CoolLightBox,
  },
  data(){
    return{
      photoDialog: false,
      imgForDialog: null,
      index: null,
      photoItems: [],
    }
  },
  computed:{
    object(){
      return this.$store.state.memories[0];
    },
    reports(){
      return this.object.reports;
    },
  },
  methods:{
    showPopUpWithPhoto(index, items){
      items.forEach(el =>  this.photoItems.push(el.photo))
      this.index = index;
    },
    closePopUp(){
      this.index = null;
      this.photoItems = [];
    },
    date2ddMonthyyyy(date){
      let jsDate = new Date(date);
      let day = jsDate.getDate();
      let monthIndex = jsDate.getMonth();
      let year = jsDate.getFullYear();
      return `${day} ${monthName(monthIndex)} ${year}`
    },

  }
}
</script>

<style lang="scss">
.expansion-photo-reports {
  .v-expansion-panel {
    background-color: $white4 !important;

    &::before {
      box-shadow: none !important;
    }
  }

  &__photo {
    width: 109px;
    height: 109px;
    border-radius: 16px;
    background-color: $grey4;
    background-position: center;
    background-size: cover;
    margin-right: 12px;
    cursor: pointer;
    @include up($sm){
      width: 121px;
      height: 121px;
      margin-right: 24px;
    }

    &:last-child, &:nth-child(5n) {
      margin-right: 24px;
      @include up($md){
        margin-right: 0;
      }
    }
  }
}

.v-dialog.v-dialog--active {
  width: fit-content;
  height: fit-content;
  .photo-dialog {
    max-height: 80vh;
    width: fit-content;

    .v-img {
      height: inherit;
    }
  }
}
</style>
