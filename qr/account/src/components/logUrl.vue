<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    let params = this.$router.history.current.query   
        this.$store.dispatch('request', {
          action: 'AuthEmailURLController',
          params
      }).then((res) => {
        this.$router.replace({name: 'dashboard'});
      }).catch(() => {
        this.$router.replace({name: 'login'});
      })      
    }
}
</script>

<style>

</style>