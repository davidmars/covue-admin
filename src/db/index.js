import Vue from 'vue'
import Vuex from "vuex";
//const axios = require('axios').default;

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        modelsConfig:[
            {
                "type":"page",
                "humanName":"Page",
                "icon":"mdi-file-outline",
                "create":true
            },
            {
                "type":"date",
                "icon":"mdi-calendar-clock",
                "humanName":"Date",
                "create":true
            }
        ],
        records: [
            {
                id:1,
                type:"date",
                titre:"Un",
                texte:"un un un un",
            },
            {
                id:2,
                titre:"Deux",
                type:"date",
                texte:"deux deux deux deux",
            },
            {
                id:3,
                titre:"Trois",
                type:"date",
                texte:"trois trois trois trois ",
            },
            {
                id:1,
                titre:"Page home",
                type:"page"
            }
        ]
    },
    mutations: {
        addRecord (state, record) {
            record.id= new Date().getTime();
            state.records.push(record);
            return record;
        },
        deleteRecord (state, record) {
            state.records = state.records.filter(obj => obj !== record)
        }
    },
    getters:{
        getRecordById: (state)  => (type,id) =>  {
            console.log(type,id);
            return state.records.find(record => (record.id === Number(id) && record.type === type))
        },
        allRecords:(state)=>{
            return state.records;
        },
        modelConfig:(state)=>(type)=>{
            return state.modelsConfig.find(model => model.type===type);
        }

    }
});

export default store;