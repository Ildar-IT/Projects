<template>
  <section class="our-team-page">
    <our-team-main/>
    <leaders/>
    <talents/>

  </section>
</template>

<script>
import OurTeamMain from "./Our-team-page/our-team-main"
import Leaders from "./Our-team-page/leaders"
import Talents from "./Our-team-page/talents"

export default {
  name: "Our-team-page",
  components: {
    OurTeamMain,
    Leaders,
    Talents
  }
}
</script>

<style lang="scss">
.our-team-page {
  p {
    color: $black !important;
  }
}
</style>