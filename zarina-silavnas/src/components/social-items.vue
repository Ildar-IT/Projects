<template>
    <div class="social-items">
        <a href="https://vk.com/zarinaofficial" target="_blank" class="social-items__item"><img src="~@/assets/icons/social/vk.svg" alt="Vk"></a>
        <a href="https://www.instagram.com/zarina_fashion/" target="_blank" class="social-items__item"><img src="~@/assets/icons/social/instagram.svg" alt="Instagram"></a>
        <a href="https://www.facebook.com/Zarinafashion" target="_blank" class="social-items__item"><img src="~@/assets/icons/social/facebook.svg" alt="Facebook"></a>
        <a href="https://t.me/ZarinaOfficialBot" target="_blank" class="social-items__item"><img src="~@/assets/icons/social/telegram.svg" alt="Telegram"></a>
    </div>
</template>

<script>
    export default {
        name: 'social-items',
    }
</script>

<style lang="scss">

    .social-items {
        display: flex;
        width: 200px;
        justify-content: space-between;

        &__item {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            background-color: $accent-color;
            border-radius: 80px;

            img {
                display: inline-block;
            }
        }
    }
</style>
