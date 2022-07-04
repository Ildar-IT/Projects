import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				// primary: "#ED1C24",
				// primaryDark: "#BB162A",
				secondary: "#B145F3",
				// accent: "#E5E5E5",
				// success: "#00B844",
				// info: "#848AA2",
				// error: "#FF6737",
				// warning: "#FFE600",
				// grey: "#848AA2",
			},
		},
	},
	icons: {
		iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
	},
});
