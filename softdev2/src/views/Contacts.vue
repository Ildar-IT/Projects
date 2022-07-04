<template>
  <section class="contacts">
    <div class="contacts__map">
      <MglMap
          container="corners-map"
          :center="geo"
          :zoom.sync="map.zoom"
          :accessToken="map.accessToken"
          :mapStyle="map.style"
          :scroll-zoom="false"
      >
        <MglMarker :coordinates="geo" :offset="point.offset" color="rgb(54, 122, 223)"/>
        <MglNavigationControl position="top-right"/>
      </MglMap>
    </div>
    <contacts-info/>
  </section>
</template>

<script>

import ContactsInfo from "./Contacts/contacts-info"

import Mapbox from "mapbox-gl";
import {MglMap, MglMarker, MglNavigationControl} from "vue-mapbox";
import Config from "@/config";

export default {
  name: "Contacts",
  components: {
    ContactsInfo,
    MglMap,
    MglMarker,
    MglNavigationControl
  },
  data() {
    return {
      map: {
        accessToken: Config.MAPBOX.accessToken,
        style: Config.MAPBOX.style,
        /*     center: [30.3915029, 59.918107],*/
        zoom: 15,
      },
      point: {
        /*    coordinates: [30.3906, 59.9181],*/
        offset: [6, -10]
      }
    }
  },
  computed: {
    geo() {
      //return [30.3915029, 59.918107];
      return this.$store.state.common.address?.geo?.replace(/\s+/g, '').split(',');
    },

  }
}
</script>

<style lang="scss">
.contacts {
  &__map {
    position: relative;
    width: 100%;
    height: 500px;

    @include up($md) {
      height: 560px;
    }
    @include up($lg) {
      height: 640px;
    }

  }


}
</style>
