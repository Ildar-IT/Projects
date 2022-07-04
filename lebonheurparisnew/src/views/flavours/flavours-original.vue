<template>
  <div class="flavours-original">
      <div class="flavours-original__wrapper mx-auto">
        <FlavoursHeader class="d-none d-sm-block"/>
        <OriginauxFlavours label="Pralines originaux"/>
        <LimiteeFlavours/>
      </div>
  </div>
</template>

<script>

import OriginauxFlavours from './original/originaux-flavours';
import LimiteeFlavours from './original/limitee-flavours';
import FlavoursHeader from '../../layout/flavours-header';
export default {
  name: "flavours-original",
  components: {
    OriginauxFlavours,
    LimiteeFlavours,
    FlavoursHeader
  }
}
</script>

<style lang="scss">
.flavours-original {
  margin-top: 128px;
  &__wrapper {
    @include up($lg) {
      width: 1048px;
    }

  }
}
</style>