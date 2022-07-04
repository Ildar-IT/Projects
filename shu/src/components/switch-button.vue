<template>
  <div class="switch-button">
      <slot name="default">

      </slot>
  </div>
</template>

<script>
export default {
  name: 'switch-button',
}
</script>

<style lang="scss">

.switch-button {
  width: 296px;
  padding: 15px 32px;
  background-color: $secondary500;
  color: $white;
  font-size: 18px;
  line-height: 21px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.08);
  border-radius: 999px;
  display: inline-block;
  transition: all 0.2s ease;
  &:hover {
    background-color: $white;
    color: $secondary500;
  }
}

</style>