<template>
    <div class="site-search mb-8">
        <div class="site-search__wrap d-inline-block">
            <input class="site-search__input" :placeholder="texts.search">
            <button class="site-search__btn" type="button">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M11.6523 19C16.0706 19 19.6523 15.4183 19.6523 11C19.6523 6.58172 16.0706 3 11.6523 3C7.23407 3 3.65234 6.58172 3.65234 11C3.65234 15.4183 7.23407 19 11.6523 19Z"
                          stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21.6527 21.0004L17.3027 16.6504" stroke="black" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<style lang="scss">
.site-search {

    &__btn {
        position: absolute;
        top: 13px;
        right: 12px;
    }

    &__wrap {
        position: relative;
    }

    &__input {
        height: 50px;
        width: 296px;
        background-color: $additional100 !important;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.06);
        border-radius: 999px;
        padding-left: 13px;
        font-size: 18px;
    }
}
</style>

<script>
export default {

    computed: {
        texts() {
            return {
                search: this.$store.state.common?.commontext?.SEARCH_PLACEHOLDER,
            }
        },
    }
}
</script>