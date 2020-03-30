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
const recordDefinitions=[
        {
            "type":"page",
            "humanName":"Page",
            "icon":"mdi-file-outline",
            "create":true,
            "components":{
                "edit":"edit-page"
            }
        },
        {
            "type":"pagedate",
            "icon":"mdi-calendar-clock",
            "humanName":"Date",
            "create":true,
            "components":{
                "edit":"edit-date"
            }
        },
        {
            "type":"blocktexte",
            "icon":"mdi-text-box-outline",
            "humanName":"Block Texte",
            "create":true,
            "components":{
                "edit":"edit-block-texte"
            }
        }
];

/**
 * ici il faut référencer les composants de chaque type de records
 */
import Vue from 'vue'

Vue.component(
    'edit-block-texte',()=>import('./EditBlockTexte'),
);
Vue.component(
    'edit-date',()=>import('./EditDate'),
);
Vue.component(
    'edit-page',()=>import('./EditPage'),
);

export {
    languages,recordDefinitions
}
