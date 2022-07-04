<template>
  <div class="background">
      <main class="layout-suspended layout">
        <transition name="route" mode="out-in">
          <router-view/>
        </transition>
      </main>
  </div>
</template>

<script>
export default {
  name: "layout-suspended"
}
</script>

<style lang="scss">
.background {
  background: #F4F3F8;
  height: 100vh;
  min-height: 500px;
}
</style>