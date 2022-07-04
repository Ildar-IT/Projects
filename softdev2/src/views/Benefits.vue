<template>
  <div class="benefits">
    <benefits-softdev/>
    <benefits-section/>
    <competencies/>
  </div>
</template>

<script>
import BenefitsSoftdev from "@/views/Benefits/benefits-softdev"
import BenefitsSection from "@/views/Benefits/benefits-section"

import Competencies from "@/views/About-us/competencies"


export default {
  name: "Benefits",
  components: {
    BenefitsSoftdev,
    BenefitsSection,

    Competencies,

  }
}
</script>

<style  lang="scss">
.benefits {
  p {
    color: $black !important;
  }
}
</style>
