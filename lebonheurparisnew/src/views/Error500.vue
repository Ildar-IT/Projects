<template>
  <section class="error500 text-center d-flex align-center justify-center">
    <v-row>
      <v-col>
        <div class="error500__wrapper">
          <img src="../assets/error/500.svg" alt="Error">
          <h3 class="my-primary">server error</h3>
          <div class="my-text-2 mt-8">Please try again later</div>
          <BtnLink class="mx-auto mt-16" color="my-primary" href="/"  label="RETURN"/>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import BtnLink from '../components/btn-link';

export default {
  name: "error500",
  components: {
    BtnLink,
  }
}
</script>

<style lang="scss">
.error500 {
  margin-top: 128px;
  width: 100%;
  height: calc(100% - 128px);

}
</style>