<template>
  <div class="home" id="home">
    <TheHeader/>
    <Intro/>
    <Video/>
    <Ambassodors class="d-sm-none"/>
    <CollectionSlider/>
    <Ambassodors class="d-none d-sm-block"/>
    <BecomeAmbassodor/>
    <FollowUs/>
    <TheFooter/>
  </div>
</template>

<script>

import TheHeader from './home/the-header.vue';
import Intro from './home/intro.vue';
import Video from './home/video.vue';
import Ambassodors from './home/ambassadors.vue'
import CollectionSlider from './home/collection-slider.vue';
import TheFooter from './home/the-footer.vue';
import BecomeAmbassodor from './home/become-ambassador.vue'
import FollowUs from './home/follow-us.vue'

export default {
  name: 'Home',

  components: {
    TheHeader,
    Intro,
    Video,
    Ambassodors,
    CollectionSlider,
    TheFooter,
    BecomeAmbassodor,
    FollowUs
  },
}
</script>

<style lang="scss">
.home {
  padding-top: 64px;
  @include up($md) {
    padding-top: 113px;
  }
}
</style>
