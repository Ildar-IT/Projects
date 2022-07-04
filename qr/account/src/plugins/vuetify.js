import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import minifyTheme from 'minify-css-string';

// css for mdi icons should be included via CSS file: https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css

Vue.use(Vuetify);

export default new Vuetify({
    options: {
        minifyTheme,
        themeCache: {
            get: key => localStorage.getItem(key),
            set: (key, value) => localStorage.setItem(key, value),
        },
    },
    breakpoint: {

        thresholds: {
            //in _variables.scss, config.js and plugins/vuetify.js
            xs: 0,
            sm: 600,
            md: 1024,
            lg: 1360,
            xl: 1920
        },
    },
    theme: {
        themes: {
            light: {
                /*primary: colors.purple,
                secondary: colors.grey.darken1,
                accent: colors.shades.black,
                error: colors.red.accent3,*/
                success: '#00B844',
                info: '#272933',
                error: '#F35A45',
                warning: '#F3EA45',
                // secondary:rgba(0, 0, 0, 0.87),
                primary: '#B145F3',
                secondary: '#EFDAFD',
            },
        },
        icons: {
            iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
        },
    }
});
