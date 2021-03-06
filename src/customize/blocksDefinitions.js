import Vue from 'vue'

const blocksDefintions={
    "BlockTexte":{
        humanName:"Texte",
        icon:"mdi-text-box-outline",
    },
    "BlockPhoto":{
        humanName:"Photo",
        icon:"mdi-image",
        file:{
            accept:"image/*",
            multiple:true
        }
    }
};

//imports
import BlockPhoto from "@/customize/madagascar/BlockPhoto";
Vue.component('BlockPhoto',BlockPhoto);

import BlockTexte from "@/customize/tests/BlockTexte";
Vue.component('BlockTexte',BlockTexte);

export {
    blocksDefintions
}