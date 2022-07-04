<template>
    <div class="logout layout-top">
        <h1 class="margin-bottom-main">До свидания!</h1>

        <div class="flex-center flex-column">
            <div class="mb-8">
                <v-btn large class="primary" @click="goLogin">
                    <span>Войти снова</span>
                </v-btn>
            </div>

            <div>
                <a href="https://qr-feedback.ru">
                    <v-btn class="v-btn v-btn--flat v-btn--text  v-size--large primary--text">
                        На главную
                    </v-btn>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import Config from "@/config";

    export default {
        name: "logout",
        methods: {
            goLogin() {
                this.$router.replace({name: 'login'});
            }
        },
        mounted() {
            setTimeout(()=>{
                localStorage.removeItem(Config.STORAGE_AUTH_TOKEN);
            },500);
        }
    }
</script>

<style lang="scss">
    .logout {

    }
</style>