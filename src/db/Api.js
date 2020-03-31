const axios = require('axios').default;
import { stringify } from 'querystring'

export default class Api {

    constructor(baseUrl) {
        this._baseUrl=baseUrl;
    }

    _call(action,params,cbSuccess,cbError){
        axios.post(`${this._baseUrl}/${action}`,
            stringify(params)
        )
            .then(function (response) {
                console.log(response);
                cbSuccess(response);
            })
            .catch(function (error) {
                console.error(error);
                cbError(error);
            })
            .then(function () {
                // always executed
            });
    }

    /**
     * Liste les records d'un certain type
     * @param {String} recordsType
     * @param {*} options
     * @param {function} cbSuccess
     * @param {function} cbError
     */
    recordsList(recordsType,options,cbSuccess,cbError){
        options.type=recordsType;
        let success=function(json){
            cbSuccess(json.data.json.records);
        };
        this._call("records.list",options,success,cbError)
    }

    /**
     * Enregistre un record
     * @param recordData
     * @param cbSuccess
     * @param cbError
     */
    saveRecord(recordData,cbSuccess,cbError){
        let success=function(json){
            cbSuccess(json.data.json.record);
        };
        this._call("records.save",recordData,success,cbError);
    }

    /**
     * Obtenir un recors
     * @param uid
     * @param cbSuccess
     * @param cbError
     */
    getRecordByUid(uid,cbSuccess,cbError){
        let success=function(json){
            cbSuccess(json.data.json.record);
        };
        this._call("records.getRecordByUid",{uid:uid},success,cbError);
    }
    /**
     * Supprimer un record
     * @param uid
     * @param cbSuccess
     * @param cbError
     */
    deleteRecordByUid(uid,cbSuccess,cbError){
        let success=function(json){
            cbSuccess(json.data.json.deleted);
        };
        this._call("records.delete",{uid:uid},success,cbError);
    }





}