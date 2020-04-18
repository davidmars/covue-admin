// src/plugins/vuetify.js
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { preset } from 'vue-cli-plugin-vuetify-preset-basil/preset'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

const opts = {
    preset,
    icons: {
        iconfont: 'mdiSvg',
    },
    theme: {
        themes: {
            light: {
                primary: '#3f51b5',
                secondary: '#b0bec5',
                accent: '#8c9eff',
                error: '#b71c1c',
            },
        },
    },
};

export default new Vuetify(opts)