<template>
    <div class="logout">
        <h1 class="margin-bottom-main">До свидания!</h1>

        <div class="block-max-width d-flex flex-column">
            <div>
                <v-btn large block class="primary" @click="goLogin">
                    <span>Войти снова</span>
                </v-btn>
            </div>

            <div class="mt-8">
                <a href="https://qritic.ru">
                    <v-btn small block class="secondary">
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
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>