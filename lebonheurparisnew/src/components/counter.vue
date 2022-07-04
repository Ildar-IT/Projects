<template>
  <div class="counter   d-flex justify-space-around align-center">
    <button class="my-primary" v-on:click="sub">-</button>
    <h5>{{ counter }}</h5>
    <button class="my-primary" v-on:click="add">+</button>
  </div>
</template>

<script>
export default {
  name: "counter",
  props: ["counter"],
  methods: {
    add: function () {
      this.counter++;
    },
    sub: function () {
      if (this.counter != 0) {
        this.counter--;
      }
    }
  },
}
</script>

<style lang="scss">
.counter {
  width: 100%;
  max-width: 90px;
  height: 41px;
  border: 2px solid $black-50;
}

</style>