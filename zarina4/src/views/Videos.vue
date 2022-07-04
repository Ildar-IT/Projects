<template>
  <div class="videos" id="videos">
<!--    <the-header />-->
    <the-videos/>
    <the-footer/>
  </div>
</template>

<script>

import TheHeader from './home/the-header.vue';
import TheVideos from './videos/the-videos.vue';
import TheFooter from './home/the-footer.vue';

export default {
  name: 'Home',

  components: {
    TheHeader,
    TheVideos,
    TheFooter
  },
}
</script>

<style lang="scss">
.videos {
 /* padding-top: 64px;
  @include up($md) {
    padding-top: 193px;
  }*/
}
</style>
