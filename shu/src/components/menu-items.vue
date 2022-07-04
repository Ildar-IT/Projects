<template>
    <nav class="menu-items">
        <ul class="menu-items__list d-md-flex justify-center">
            <li v-for="(item, index) of items" class="menu-items__item" :key="index">
                <router-link :to="{name: item.route, params: item.params}"
                             @click.native="onMenuItemClick(item)"
                             class="menu-items__link">{{ item.name }}
                </router-link>
            </li>
            <li class="menu-items__item">
                <router-link :to="{ name: 'HomeNewProducts'}"
                             @click.native="onMenuItemClick()"
                             class="menu-items__link">{{ buttons.new }}
                </router-link>
            </li>
            <li class="menu-items__item">
                <router-link :to=" {name: 'About'} "
                             class="menu-items__link">{{ buttons.about }}
                </router-link>
            </li>
            <li class="menu-items__item">
                <router-link :to=" {name: 'Shops'} "
                             class="menu-items__link">{{ buttons.buy }}
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss">
.menu-items {
    font-weight: normal;
    font-size: 18px;
    line-height: 23px;

    &__link {
            color: $white !important;
            transition: color 0.3s ease;

            &:hover,
            &:focus,
            &:active {
                color: $primary500 !important;
            }
    }

    &__item {
        &:not(:last-child) {
            margin-bottom: 16px;
            @include up($md) {
                margin-bottom: 0;
                margin-right: 8px;
            }
        }

        &:not(:first-child) {
        }

        @include up($md) {
            margin-left: 8px;
        }
    }
}
</style>

<script>
export default {
    name: "menu-items",
    computed: {
        pageLinks() {
            return this.$store.state.common.menuLinks[0];
        },

        texts() {
            return {
                news: this.$store.state.page.HomeController.texts?.MENU_NEWS,
            }
        },

        items() {
            const items = this.$store.state.common?.sections?.map(el => ({
                name: el.NAME,
                route: "Direction",
                params: {
                    dir: el.CODE
                }
            }));

            return items;
        },

        buttons() {
            return {
                new: this.$store.state.common?.buttons?.MAIN_NEW,
                about: this.$store.state.common?.buttons?.MENU_ABOUT,
                buy: this.$store.state.common?.buttons?.MENU_BUY,
            }
        }

    },
    methods: {
        onMenuItemClick(item) {
            this.$emit("select", item);
            // alternatively -> this.$store.state.isBurgerMenuShown = false;
        },

    }

}
</script>


