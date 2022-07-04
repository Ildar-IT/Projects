import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
//import 'vuetify/dist/vuetify.min.css'
import minifyTheme from 'minify-css-string';
import iconMapMarker from "@/components/icon-map-marker";

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi', // default - only for display purposes
        mapMarker:{
            component: iconMapMarker,
            props:{
                name: "map-marker",
            }
        }
    },
    options: {
        minifyTheme,
        themeCache: {
            get: key => localStorage.getItem(key),
            set: (key, value) => localStorage.setItem(key, value),
        },
    },
    treeShake: true,
    customVariables: ['~/scss/variables.scss'],
    // customVariables : [ '~/scss/_variables.scss'] ,
    breakpoint: {
        //in _variables.scss, config.js and plugins/vuetify.js
        thresholds: {
            xs: 0,
            sm: 600,
            md: 1024,
            lg: 1440,
            xl: 1920
        },
        mobileBreakpoint: 'sm'
    },
    theme: {
        themes: {
            light: {
                primary: '#D8C69E',
            },
        },
    }
});
