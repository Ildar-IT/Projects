<template>
  <div class="praline">
    <FlavoursHeader class="d-none d-sm-block"/>
    <PralineInfo/>
    <PralineSpecifications/>
  </div>
</template>

<script>
import FlavoursHeader from '../../layout/flavours-header';
import PralineInfo from './praline/praline-info';
import PralineSpecifications from './praline/praline-specifications';
export default {
  name: "praline",
  components: {
    FlavoursHeader,
    PralineInfo,
    PralineSpecifications
  }
}
</script>

<style lang="scss">
.praline {
  margin-top: 128px;

}
</style>