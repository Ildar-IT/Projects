<template>
  <div class="layout-error">
    <the-header/>
    <main>
      <transition name="route" mode="out-in">
        <router-view/>
      </transition>
    </main>
  </div>
</template>

<script>
import TheHeader from "./main/the-header";

export default {
  components: {TheHeader}
}
</script>

<style >

</style>