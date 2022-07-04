<template>
	<div class="burger-menu">
		<v-container class="d-flex pa-7">
			<div class="d-flex flex-column burger-menu__block">
				<div class="burger-menu__language">

					<div class="selector">
						<div class="d-flex justify-space-between list__placeholder">
							{{currentLanguage.name}}
							<v-icon>mdi-menu-down</v-icon>
						</div>

						<ul>
							<li v-for="(item,index) of languages" :key="'l'+index">
								{{item.code}}
							</li>
						</ul>
					</div>

					<!--<v-select :items="languages" label="English language"/>-->
				</div>
				<div class="burger-menu__scroll">
					<ul class="burger-menu__list pa-0">
						<template v-for="(item,index) of items">
							<li>
								<a v-if="item.scrollTo" href="#"
								   @click.prevent="scrollTo(item.scrollTo)">{{item.name}}</a>
								<a v-else-if="item.onClick" href="#"
								   @click.prevent="item.onClick">{{item.name}}</a>
								<router-link v-else :to="item.to">{{item.name}}</router-link>
							</li>
							<divider/>
						</template>
					</ul>
				</div>
			</div>
		</v-container>
	</div>
</template>

<script>
    import Divider from "../components/divider";

    export default {
        name: "burger-menu",
        components: {
            Divider
        },
        data() {
            return {
            }
        },
        computed: {
            currentLanguage() {
                return this.$store.getters.currentLanguage;
			},
            languages() {
                return this.$store.state.languages;
			},
            items() {
                return this.$store.state.menuItems;
            }
        }
    }

</script>

<style lang="scss">
	.selector {
		border-bottom: 2px solid $black;
		height: 28px;
		box-sizing: border-box;
		letter-spacing: $ls-1;
		font-size: 14px;

		ul {
			display: none;
		}

		.v-icon.v-icon {
			color: $black;
		}
	}

	.burger-menu {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		background: $white;
		box-sizing: border-box;
		overflow: hidden;

		.container {
			height: 100%;
		}

		&__block {
			width: 100%;
			margin-top: 75px;
		}

		&__language {
			height: 45px;
		}

		&__scroll {
			width: 100%;
			flex: 1;
			overflow-y: auto;
			overflow-x: hidden;
		}

		a {
			display: inline-block;
			line-height: 77px;
			height: 77px;
			padding-right: 10px;
			font-family: $header-font-family;
			font-size: $fs-h5;
			letter-spacing: $ls-h5;
			color: $black;
			white-space: nowrap;

			&:hover, &:active {
				opacity: 0.6;
				text-decoration-color: transparent;
				//text-decoration-color: $primary-500;
				//border-bottom: 1px solid $primary-500 !important;
			}

			/*@include up($lg) {
				font-size: $fs-h5;
				letter-spacing: $ls-h5;
			}*/
		}
	}

	.burger-enter-active, .burger-leave-active {
		transition: transform .2s
	}

	.burger-enter, .burger-leave-to {
		transform: translateX(-100%)
	}
</style>