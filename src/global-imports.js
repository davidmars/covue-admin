import Vue from 'vue'

import SmartAvatar from "@/components/SmartAvatar";
Vue.component('SmartAvatar',SmartAvatar);

import ScreenSize from "@/components/ScreenSize";
Vue.component('ScreenSize',ScreenSize);

Vue.component(
    'record-icon',()=>import('./components/records/record-icon.vue'),
);
Vue.component(
    'default-record-preview',()=>import('./components/records/preview/default-record-preview'),
);

//--------CUSTOM FMK---------------




//--------FMK---------------

//layout stuff

import MainMenu from "@/components/layout/main-menu";
Vue.component('MainMenu',MainMenu);

import AppBar from "@/components/layout/app-bar";
Vue.component('AppBar',AppBar);

import RecordTypeList from "@/components/layout/RecordTypeList";
Vue.component('RecordTypeList',RecordTypeList);

import CreateRecords from "@/components/layout/create-records";
Vue.component('CreateRecords',CreateRecords);

//fields
import FieldImage from "@/components/fields/FieldImage";
import FieldTextareaLangs from "@/components/fields/translated/FieldTextareaLangs";
import FieldInputTextLangs from "@/components/fields/translated/FieldInputTextLangs";
import FieldBlocks from "@/components/fields/FieldBlocks";
import FieldSharedModelList from "@/components/fields/FieldSharedModelList";

Vue.component('FieldImage',FieldImage);
Vue.component('FieldTextareaLangs',FieldTextareaLangs);
Vue.component('FieldInputTextLangs',FieldInputTextLangs);
Vue.component('FieldBlocks',FieldBlocks);
Vue.component('FieldSharedModelList',FieldSharedModelList);

//Vue.component('FieldBlocks',()=>import('@/components/fields/FieldBlocks'));


//--------composants tiers---------------

//drapeaux
import FlagIcon from 'vue-flag-icon'
Vue.use(FlagIcon);

//draggable
Vue.component(
    'draggable',()=>import('vuedraggable/dist/vuedraggable.common')
);
