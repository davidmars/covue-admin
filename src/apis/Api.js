import RecordsApi from "@/apis/RecordsApi";
import UserApi from "@/apis/UserApi";
import FilesApi from "@/apis/FilesApi";

const axios = require('axios').default;
//import { stringify } from 'querystring'

export default class Api {

    constructor(baseUrl) {
        this._baseUrl=baseUrl;
        //les sous apis
        this.records=new RecordsApi(this);
        this.user=new UserApi(this);
        this.files=new FilesApi(this);
    }

    imgUrl(httpPath){
        return "http://localhost"+httpPath;
    }

    _call(action,params,cbSuccess,cbError){
        axios.post(`${this._baseUrl}/${action}`,
            params
        )
            .then(function (response) {
                console.log(response.data);
                if(response.data.success){
                    cbSuccess(response.data);
                }else{
                    cbError(response.data);
                }
            })
            .catch(function (error) {
                console.error(error);
                cbError(error);
            })
            .then(function () {
                // always executed
            });
    }








}