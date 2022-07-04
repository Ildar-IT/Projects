<template>
	<div class="layout-menu layout-top">
		<div v-for="(link, idx) of routes">
			<!--			<router-link :to="{name: link.name}"-->
			<router-link :to="{name:link.name}" class="flex justify-space-between py-6">
				<div class="h6">{{link.title}}</div>
				<svgicon :name="link.icon" width="24" height="24" color="#B3B8CB"
						 :fill="link.icon === 'money-stroke'"/>
			</router-link>
			<!--			</router-link>-->
			<v-divider v-if="idx!==routes.length-1" id="layout-menu__divider"/>
		</div>
	</div>
</template>

<script>
    export default {
        name: "layout-menu",
        computed: {
            routes() {
                return [
                    {title: 'Статистика', icon: 'home', name: 'dashboard',},
                    {title: 'Опросы', icon: 'message-square', name: 'polls',},
                    {title: 'Журнал', icon: 'list', name: 'journal',},
                    {title: 'Шаблоны', icon: 'box', name: 'templates',},
                    {title: 'Подписка', icon: 'money-stroke', name: 'subscription',},
                    {title: 'Настройка', icon: 'settings', name: 'settings',},
                    {title: 'Поддержка', icon: 'mail', name: 'support',},
                    {title: 'Выход', icon: 'log-out', name: 'logout'},
                ]
            },
        },
        methods: {
            /*redirectTo(link) {
                if (this.$route.name !== link) {
                    this.$router.push({name: link});
                }
                /!*setTimeout(() => {
                    this.$store.state.isMenuOpen = false;
                }, 300)*!/
            }*/
        }
    }
</script>

<style lang="scss">
	.layout-menu {
		z-index: 11;

		#layout-menu__divider {
			border-color: #CDD0DC;
		}
	}
</style>
