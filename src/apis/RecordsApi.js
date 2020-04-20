/**
 * Cette api gère les actions CRUD sur les records
 */
export default class RecordsApi {
    /**
     *
     * @param {Api} api
     */
    constructor(api) {
        /**
         *
         * @type {Api}
         */
        this.api=api;
    }
    /**
     * Liste les records d'un certain type
     * @param {String} recordsType
     * @param {*} options
     * @param {function} cbSuccess
     * @param {function} cbError
     */
    list(recordsType,options,cbSuccess,cbError){
        options.type=recordsType;
        let success=function(data){
            cbSuccess(data.json.records);
        };
        this.api._call("records.list",options,success,cbError)
    }

    /**
     * Obtenir un record par uid
     * @param {String} uid
     * @param {function} cbSuccess
     * @param {function} cbError
     */
    byUid(uid,cbSuccess,cbError){
        let success=function(data){
            cbSuccess(data.json.record);
        };
        this.api._call("records.getRecordByUid",
            {uid:uid},
            success,
            function(data){
                cbError(data.errors);
            }
        );
    }
    /**
     * Supprimer un record
     * @param {String} uid
     * @param {function} cbSuccess
     * @param {function} cbError
     */
    delete(uid,cbSuccess,cbError){
        let success=function(data){
            cbSuccess(data.json.deleted);
        };
        this.api._call("records.delete",{uid:uid},success,cbError);
    }

    /**
     * Enregistre un record (et le crée au passage si besoin)
     * @param {*} recordData Les data du record
     * @param {function} cbSuccess
     * @param {function} cbError
     */
    save(recordData,cbSuccess,cbError){
        let success=function(data){
            cbSuccess(data.json.record);
        };
        this.api._call("records.save",recordData,success,cbError);
    }
}