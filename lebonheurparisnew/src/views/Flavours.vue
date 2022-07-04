<template>
  <div class="flavours">
    <transition name="route" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: "flavours",
}
</script>

<style lang="scss">

</style>