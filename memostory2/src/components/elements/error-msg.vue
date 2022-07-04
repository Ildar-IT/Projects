<template>
  <v-dialog v-model="this.showError" ref="errorMsg"
         max-width="500px" @click:outside="closeErrorMsg"
  >
    <v-card v-if="this.error" class="error-msg">
      <v-card-title>
        <h5 class="text-center text-center beige-text">{{ this.errorTitle ? this.errorTitle : "Что-то пошло не так..." }}</h5>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class="body-1 text-center" v-html="myError">
        <br/>
        <i v-if="this.myError.detail">{{ this.myError.detail }}</i>
      </v-card-text>
      <v-card-actions>
        <div class="wrapper">
          <v-btn dark block class="btn--secondary"
                 @click="closeErrorMsg">
            Ок
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'error-msg',
  props:['error', 'isError'],
  data () {
    return {
      localError: this.error,
      // showError: this.isError,
      title: null,
      message: null,
      detail: null
    }
  },
  computed: {
    myError(){
      this.error.text ? this.error.text : "К сожалению, сейчас не получилось принять ваш ответ. Пожалуйста, попробуйте ещё раз."
      return this.error.text;
    },
    errorTitle(){
      return this.title = this.error.title;
    },
    errorMessage(){
      return this.message = this.error.message;
    },
    errorDetail(){
      return this.detail = this.error.detail;
    },
    showError(){
      return this.$store.state.isError;
    },
  },
  methods: {
    closeErrorMsg() {
      return this.$store.state.isError = false;
    },
  }
}
</script>

<style lang="scss">
.error-msg{
  h5{
    width: 100%;
  }
  .wrapper {
    width: 264px;
    margin: 0 auto 6px;
  }
}
</style>
