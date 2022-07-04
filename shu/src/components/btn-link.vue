<template>
  <router-link :to="to">
    <div class="btn-link">
      <slot name="default">

      </slot>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'btn-link',
  props: ["to"],
}
</script>

<style lang="scss">
.btn-link {
  padding: 15px 32px;
  background-color: $primary500;
  color: $white;
  font-size: 18px;
  line-height: 21px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.08);
  border-radius: 999px;
  display: inline-block;
  transition: all 0.2s ease;
  &:hover {
    background-color: $white;
    color: $primary500;
  }
}
</style>