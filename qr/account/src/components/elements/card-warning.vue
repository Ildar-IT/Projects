<template>
    <card class="card-warning">
      <h5 class="text-md-center text-left margin-bottom-small red-text h5">
        {{ title }}
      </h5>
      <div class="body-1 mb-1">
        {{
          text
        }}
      </div>
      <v-row class="flex justify-center">
        <v-col cols="12" md="6">
          <v-btn block
                 color="darken-1"
                 class="premium premium_primary standard-size"
                 @click="goToSubscription"
          >
            {{ btnText }}
          </v-btn>
        </v-col>

      </v-row>
    </card>
</template>

<script>
export default {
  name: 'card-warning',
  props: ['title', 'text', 'btnText'],
  methods:{
    goToSubscription(){
      this.$router.replace({name:'subscription'});
    }
  }
}
</script>

<style lang="scss">
.card-warning{
border: 4px solid $red1;
}
</style>
