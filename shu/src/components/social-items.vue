<template>
    <div class="social-items">
        <a v-for="(item, index) of socials" :key="index" :href="item.link" target="_blank">
           <img :src="item.img">
        </a>
    </div>
</template>

<script>
export default {
    name: 'SocialItems',
    computed: {
        socials() {
            return this.$store.state.currentPage?.socials?.map(el => {
                return {
                    img: el.ICON,
                    link: el.LINK
                };
            });
        }
    }

}
</script>

<style lang="scss">
.social-items {
    a {
        @include transition();

        &:not(:last-child) {
            margin-right: 16px;
        }
    }

    img {
        @include transition();

        &:hover,
        &:focus,
        &:active {
            background-color: $primary500;
            border-radius: 50%;
        }
    }
}

</style>