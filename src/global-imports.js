import Vue from 'vue'



Vue.component(
    'record-icon',()=>import('./components/records/record-icon.vue'),
);
Vue.component(
    'default-record-preview',()=>import('./components/records/preview/default-record-preview'),
);

//--------CUSTOM FMK---------------




//--------FMK---------------

//fields
import FieldImage from "@/components/fields/FieldImage";
import FieldTextareaLangs from "@/components/fields/translated/FieldTextareaLangs";
import FieldInputTextLangs from "@/components/fields/translated/FieldInputTextLangs";
import FieldBlocks from "@/components/fields/FieldBlocks";

Vue.component('FieldImage',FieldImage);
Vue.component('FieldTextareaLangs',FieldTextareaLangs);
Vue.component('FieldInputTextLangs',FieldInputTextLangs);
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
