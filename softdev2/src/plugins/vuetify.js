import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
//import 'vuetify/dist/vuetify.min.css';

Vuetify.config.silent = true;

Vue.use(Vuetify);

export default new Vuetify({


    breakpoint: {
        thresholds: {
            xs: 0,
            sm: 768,
            md: 1200,
            lg: 1720,
        },
    },
});
