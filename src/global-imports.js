import Vue from 'vue'



Vue.component(
    'record-icon',()=>import('./components/records/record-icon.vue'),
);
Vue.component(
    'default-record-preview',()=>import('./components/records/preview/default-record-preview'),
);

//--------CUSTOM FMK---------------

import BlockPhoto from "@/customize/BlockPhoto";
Vue.component('BlockPhoto',BlockPhoto);


//--------FMK---------------

//fields
import FieldImage from "@/components/fields/FieldImage";

import FieldBlocks from "@/components/fields/FieldBlocks";
//Vue.component('FieldImage',()=>import('@/components/fields/FieldImage'));


Vue.component('FieldImage',FieldImage);
Vue.component('FieldBlocks',FieldBlocks);

//Vue.component('FieldBlocks',()=>import('@/components/fields/FieldBlocks'));


//--------composants tiers---------------

//drapeaux
import FlagIcon from 'vue-flag-icon'
Vue.use(FlagIcon);

//draggable
Vue.component(
    'draggable',()=>import('vuedraggable/dist/vuedraggable.common')
);
