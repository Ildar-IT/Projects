<template>
  <section class="set-filter pt-8 pb-8" >
    <v-container>
      <h2 class="mb-8">{{ texts.PRODUCT_FILTER }}</h2>
        <filter-checkboxes/>
      <div class="d-flex flex-column align-center">
        <button>
      <switch-button class="mb-4"> {{ buttons.accept }} </switch-button>
        </button>
        <button>
      <switch-button> {{ buttons.cancel }} </switch-button>
        </button>
      </div>
    </v-container>
  </section>
</template>

<style lang="scss">
  .set-filter {
    & h2 {
      font-size: 30px;
      line-height: 35px;
    }
  }
</style>

<script>

import SwitchButton from "./switch-button";
import FilterCheckboxes from "./filter-checkboxes";
export default {
  name: 'set-filter',
  components: {FilterCheckboxes, SwitchButton},
    computed: {
        texts() {
            return this.$store.state.page?.ProductListController?.texts;
        },
        buttons() {
            return {
                accept: this.$store.state.common?.buttons?.ACCEPT,
                cancel: this.$store.state.common?.buttons?.CANCEL,
            }
        }
    }
}
</script>