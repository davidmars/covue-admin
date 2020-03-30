import Vue from 'vue'
Vue.component(
    'record-icon',()=>import('./components/records/record-icon.vue'),
);
Vue.component(
    'default-record-preview',()=>import('./components/records/preview/default-record-preview'),
);

//drapeaux
import FlagIcon from 'vue-flag-icon'
Vue.use(FlagIcon);
