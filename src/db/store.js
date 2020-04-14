import Vue from 'vue'
import Vuex from "vuex";

const recordDefinitions=require("@/customize/recordsDefinitions").recordDefinitions;
const blocksDefinitions=require("@/customize/blocksDefinitions").blocksDefintions;
const languages=require("@/customize/recordsDefinitions").languages;

import Api from "@/db/Api";
Vue.use(Vuex);

//todo configurer
const api=new Api("http://localhost/github/madagascar-timeline/fr/povApi/action");




const store = new Vuex.Store({
    state: {
        appLoaded:false,
        recordDefinitions:recordDefinitions,
        blocksDefinitions:blocksDefinitions,
        records: [],
        languages:languages,
        api:api,
    },
    mutations: {
        deleteRecord (state, uid) {
            console.log("a",uid);
            state.records = state.records.filter(obj => obj.uid !== uid)
        },
        setRecord(state, freshRecordData){
            let me=this;
            let existing=this.getters.getRecordByUid(freshRecordData.uid);
            if(existing){
                //met à jour les record qui existait déjà
                for(let k in freshRecordData){
                    existing[k]=freshRecordData[k];
                }
            }else{
                //injecte un nouveau record
                me.state.records.push(freshRecordData);
            }
        }
    },
    computed:{
        records:function(){
            return this.$store.state.records;
        }
    },
    actions: {
        saveRecord ({ commit }, recordData) {
            let me=this;
            return new Promise((resolve, reject) => {
                api.saveRecord(recordData,function(freshRecordData){
                    commit("setRecord",freshRecordData);
                    resolve(me.getters.getRecordByUid(freshRecordData.uid))
                },function(err){
                    reject(err)
                });
            })
        },
        getRecordByUid ({ commit }, uid) {
            return new Promise((resolve, reject) => {
                api.getRecordByUid(uid,function(freshRecordData){
                    commit("setRecord",freshRecordData);
                    resolve(freshRecordData)
                },function(err){
                    reject(err)
                });
            });
        },
        deleteRecordByUid ({ commit }, uid) {
            return new Promise((resolve, reject) => {
                api.deleteRecordByUid(uid,function(deletedUid){
                    console.log("b",deletedUid)
                    commit("deleteRecord",deletedUid);
                    resolve(deletedUid)
                },function(err){
                    reject(err)
                });
            });
        }
    },
    getters:{
        /**
         *
         * @param type
         * @param id
         * @return {function(*=, *=): T}
         */
        getRecordByUid: (state)  => (uid) => {
            return state.records.find(record => (record.uid === uid))
            //return state.records[uid];
        },
        allRecords:(state)=>{
            return state.records;
        },
        /**
         * Returns the record definition
         * @param {string} type the record type
         * @return {RecordDefinition}
         */
        recordDefinition:(state)=>(type)=>{
            return state.recordDefinitions.find(model => model.type===type);
        },
        /**
         *
         * @param {string} type the record type
         * @return {{}}
         */
        recordsByType:(state)=>(type)=>{
            return state.records.filter(record => record.type===type);
        },


    }

});





for(let recordType of recordDefinitions){
    api.recordsList(recordType.type,{},
        function(records){
            for(let r of records){
                store.state.records.push(r);
            }
        },
        function (err) {
            console.error("errr",err);
        }
    );
}










export default store;