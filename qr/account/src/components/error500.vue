<template>
    <div class="error500 layout-top">
        <h1>500</h1>
        <h2>Что-то пошло не так...</h2>
        <h2>Мы уже работаем над этим...</h2>
    </div>
</template>

<script>
    export default {
        name: "error500"
    }
</script>

<style lang="scss">
    .error500 {
        h1 {
            font-size: 128px;
            line-height: 200px;
            color: $gray;
        }
    }
</style>