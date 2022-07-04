<template>
  <div class="layout-manager ">
    <header-manager />

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import headerManager from '@/components/manager/header-manager';

export default {
  name: 'layout-manager',
  components:{headerManager}
}
</script>

<style lang="scss">
.layout-manager{
  height: 100%;

  overflow: hidden;

  main{
    padding-top: 72px;
    padding-bottom: 60px;
    min-height: 80vh;
    @include up($lg) {
      padding-top: 100px;
    }
  }
}
</style>