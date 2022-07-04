<template>
  <div class="video">
        <img class="d-block d-sm-none heroes__slide-video-poster" src="../../assets/video/bg.jpg" alt="Video"/>
    <img class=" d-none d-sm-block heroes__slide-video-poster" src="../../assets/video/bg-lg.jpg" alt="Video"/>
        <PlayBtn/>
  </div>
</template>

<script>
import PlayBtn from '../../components/play-btn.vue';

export default {
  name: "video",
  components: {
    PlayBtn
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.video {
  position: relative;
  width: 100%;
  height: 240px;
  @include up($sm) {
    height: 688px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>