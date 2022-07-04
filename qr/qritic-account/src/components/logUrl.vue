<template>
	<div></div>
</template>

<script>
    export default {
        mounted() {
            let params = this.$router.history.current.query;
            this.$store.dispatch('request', {
                action: 'AuthEmailURLController',
                params
            }).then((res) => {

                // todo move this to router beforeEach / afterEach handler

                /*const tariffDefault = !res.session.user?.TARIFF ? true : res.session.user?.TARIFF?.IS_DEFAULT;
                if (tariffDefault) {
                    this.$router.push({name: 'suspended'});
                } else */
                if (res.session?.isFirstTime) {
                	let query = {};
                	if (this.withValidHash) query['welcome'] = true;
                    this.$router.push({name: 'polls', query});
                } else this.$router.push({name: 'dashboard'});
            }).catch(() => {
                this.$router.replace({name: 'login'});
            })
        }
    }
</script>

<style>

</style>