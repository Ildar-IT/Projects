<template>
    <div class="logout layout-top d-flex align-center justify-center flex-column">
        <h2 class="text-center padding-bottom-main beige-text px-3 px-lg-0 ">{{ pageContent.title ? pageContent.title : "До свидания!"}}</h2>

        <div class="flex-center">
            <v-btn large class="primary" @click="goLogin">
                <span>{{ pageContent.btn ? pageContent.btn : "Войти снова"}}</span>
            </v-btn>
        </div>

    </div>
</template>

<script>
    export default {
        name: "logout",
        methods: {
            goLogin() {
                this.$router.replace({name: 'login'});
            }
        },
        computed: {
            pageContent() {
                return this.$store.state.page.LogoutController.texts.content || {}
            },
        }
    }
</script>

<style lang="scss">
    .logout {
        height: 80vh;
    }
</style>