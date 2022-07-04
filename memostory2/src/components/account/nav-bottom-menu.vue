<template>
	<v-bottom-navigation class="nav-bottom-menu" v-model="bottomNav" :value="activeBtn"
	                     :input-value="active" color="primary" horizontal>

		<div v-for="(link, idx) in routes" :key="idx">

			<v-btn icon :value="link.name" @mousedown="goToPage(link.name)"
			       :class="link.notification?'notification':''">
				<svgicon original :name="link.icon" width="24" height="24" :fill="false" color="#91A0A9"
				         :class="link.icon === 'money'? 'balance-icon':''"></svgicon>
			</v-btn>
		</div>

	</v-bottom-navigation>
</template>

<script>
	export default {
		name: 'nav-bottom-menu',
		data: () => ({bottomNav: '', activeBtn: 1, active: true,}),
		computed: {
			isWindowXS() {
				return this.$store.getters.isWindowXS;
			},
			isWindowMD() {
				return this.$store.getters.isWindowMD;
			},
			isWindowLG() {
				return this.$store.getters.isWindowLG;
			},
			isWindowXL() {
				return this.$store.getters.isWindowXL;
			},
			isEmailNotValidated() {
				return this.$store.getters.isEmailNotValidated;
			},
			isPhoneNotValidated() {
				return this.$store.getters.isPhoneNotValidated;
			},
			user() {
				return this.$store.state.session.user
			},

			routes() {
				return [
					{name: 'memory-places', icon: 'map-pin', notification: false},
					{name: 'reports', icon: 'camera', notification: false},
					{name: 'balance', icon: 'money', notification: false},
					{name: 'my-account', icon: 'user', notification: this.isEmailNotValidated || this.isPhoneNotValidated},
				]
			},
			route() {
				return this.$route
			}
		},
		methods: {
			goToPage(path) {

				return this.$router.push({name: path})
			}
		},
		mounted() {
			this.bottomNav = this.$route.name;
		}
	}
</script>

<style lang="scss">
	.nav-bottom-menu {
		z-index: 3;
		position: fixed !important;
		bottom: 0;
		width: 100%;
		height: 60px;
		background: $gradient-dark;
		border-radius: $border-radius-primary $border-radius-primary 0px 0px;

		button.v-btn {
			border-radius: 0 !important;
			height: 100% !important;
			position: relative;
		}

		.v-btn--active {
			svg:not(.balance-icon) {
				path {
					stroke: $beige5;
				}
			}

			svg.balance-icon {
				path:first-child {
					stroke: $beige5;
				}

				path:nth-child(2) {
					stroke: none;
					fill: $beige5;
				}
			}
		}

		svg.balance-icon {
			path:nth-child(2) {
				stroke: none;
				fill: #91A0A9;
			}
		}

		.notification {
			span.v-btn__content {
				position: relative;

				&:after {
					content: '';
					height: 10px;
					width: 10px;
					background-color: #FF0000;
					border-radius: 100%;
					border: 2px solid #334E5F;
					top: 16px;
					right: 23px;
					position: absolute;
				}
			}
		}
	}
</style>
