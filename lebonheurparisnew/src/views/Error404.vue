<template>
  <section class="error404 text-center d-flex align-center justify-center">
    <v-row>
      <v-col>
        <div class="error404__wrapper">
          <img src="../assets/error/404.svg" alt="Error">
          <h3 class="my-primary">Page not found</h3>
          <div class="my-text-2 mt-8">It may have been deleted, or you entered the wrong address.</div>
          <BtnLink class="mx-auto mt-16" color="my-primary" href="/"  label="RETURN"/>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import BtnLink from '../components/btn-link';

export default {
  name: "error404",
  components: {
    BtnLink,
  }
}
</script>

<style lang="scss">
.error404 {
  margin-top: 128px;
  width: 100%;
  height: calc(100% - 128px);

}
</style>