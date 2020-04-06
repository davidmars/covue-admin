import Vue from 'vue'

const languages={
    "fr":{
        code:"fr",
        name:"Français",
        flag:"fr"
    },
    "en":{
        code:"en",
        name:"English",
        flag:"gb"
    },
    "mg":{
        code:"mg",
        name:"Malgache",
        flag:"mg"
    }
};


/**
 * La définition de nos modèles
 * @type {RecordDefinition[]}
 */
const recordDefinitions=[];

//-----------------------------------------------tests-----------------------------------
Vue.component('edit-page',()=>import('./tests/EditPage'),);
recordDefinitions.push(
    {
        "type":"page",
        "humanName":"Page",
        "icon":"mdi-file-outline",
        "create":true,
        "components":{
            "edit":"edit-page"
        }
    }
);

//------------------------------------------------madagascar--------------------------------

Vue.component('edit-date',()=>import('./madagascar/EditDate'),);
recordDefinitions.push(
    {
        "type":"pagedate",
        "icon":"mdi-calendar-clock",
        "humanName":"Date",
        "create":true,
        "components":{
            "edit":"edit-date"
        }
    }
);

//---------------------------------------sequence-prevention---------------------------------------
import EditHumain from "@/customize/sequence-prevention/EditHumain";
Vue.component("EditHumain",EditHumain);
recordDefinitions.push(
    {
        "type":"humain",
        "icon":"mdi-account",
        "humanName":"Humain",
        "create":true,
        "components":{
            "edit":"edit-humain"
        }
    }
);
import EditEquipe from "@/customize/sequence-prevention/EditEquipe";
Vue.component("EditEquipe",EditEquipe);
recordDefinitions.push(
    {
        "type":"equipe",
        "icon":"mdi-account-group",
        "humanName":"Équipe",
        "create":true,
        "components":{
            "edit":"edit-equipe"
        }
    }
);





export {
    languages,recordDefinitions
}
