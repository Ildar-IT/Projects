<template>
    <div class="error404 layout-top">
        <h1>404</h1>
        <h2>Тут такого нет...</h2>
        <h2>Пожалуйста, попробуйте поискать через меню.</h2>
    </div>
</template>

<script>
    export default {
        name: "error404"
    }
</script>

<style lang="scss">
    .error404 {
        h1 {
            font-size: 128px;
            line-height: 200px;
            color: $gray;
        }
    }
</style>