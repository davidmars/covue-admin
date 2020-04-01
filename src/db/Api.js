const axios = require('axios').default;
//import { stringify } from 'querystring'

export default class Api {

    constructor(baseUrl) {
        this._baseUrl=baseUrl;
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

    /**
     * Liste les records d'un certain type
     * @param {String} recordsType
     * @param {*} options
     * @param {function} cbSuccess
     * @param {function} cbError
     */
    recordsList(recordsType,options,cbSuccess,cbError){
        options.type=recordsType;
        let success=function(data){
            cbSuccess(data.json.records);
        };
        this._call("records.list",options,success,cbError)
    }
    /**
     * Obtenir un recors
     * @param uid
     * @param cbSuccess
     * @param cbError
     */
    getRecordByUid(uid,cbSuccess,cbError){
        let success=function(data){
            cbSuccess(data.json.record);
        };
        this._call("records.getRecordByUid",{uid:uid},success,cbError);
    }

    /**
     * Enregistre un record
     * @param recordData
     * @param cbSuccess
     * @param cbError
     */
    saveRecord(recordData,cbSuccess,cbError){
        console.log("recordData",recordData)
        let success=function(data){
            cbSuccess(data.json.record);
        };
        this._call("records.save",recordData,success,cbError);
    }


    /**
     * Supprimer un record
     * @param uid
     * @param cbSuccess
     * @param cbError
     */
    deleteRecordByUid(uid,cbSuccess,cbError){
        let success=function(data){
            cbSuccess(data.json.deleted);
        };
        this._call("records.delete",{uid:uid},success,cbError);
    }
    /**
     * Upload un fichier en passant par l'api et en le découpant
     * @param {File} file
     * @param {function} cbProgress Renvoie la progression sous forme de : pourcentage, bytesuploadés, bytesTotaux
     * @param {function} cbComplete Renvoie un ApiReturn avec le fichier
     * @param {function} cbError Renvoie un ApiReturn avec les erreurs
     * @param {function} cbReader Renvoie le reader une fois qu'il est loadend, ce qui permet par exemple d'afficher une image de preview comme ceci $img.prop('src',reader.result)
     */
    uploadRecord(file, cbProgress, cbComplete, cbError) {
        let uploadUrl = this._baseUrl+"/records.upload";
        let reader = new FileReader();

        //pour l'upload
        reader.readAsBinaryString(file);
        /*
                //--------------1 va tester si le fichier existe déjà----------------


                function testFileIdentifier(binary){
                    let localFileIdentifier=md5(binary);
                    let url=uploadUrl;
                    $.ajax({
                        dataType: "json",
                        url: uploadUrl,
                        method:"get",
                        data: {fileIdentifier:localFileIdentifier},
                        cache:false,
                        success: function(result){
                            if(result.success){
                                console.log("success fileidentifier",result);
                                cbComplete(result);
                            }else{
                                console.log("error fileidentifier",result);
                                doUpload();
                            }
                        },
                        error:function(response){
                            console.error("oups testFileIdentifier",response);
                            if(response.responseText){
                                Xdebug.fromString(response.responseText)
                            }
                            cbError(response);
                        }
                    });
                }
                */

        //-----------------2 l'upload---------------------------------

        function doUpload(){
            processFile();
            let size, filename, filenametmp;
            function processFile() {
                filename=file.name;
                filenametmp=""+new Date().getTime()+file.name;
                size = file.size;

                let sliceSize = 1048576; // 1MB chunk sizes.;
                if(size<1048576 * 5){
                    sliceSize=104857; // 100k chunk si moins de 5m
                }
                let start = 0;
                setTimeout(loop, 1);
                function loop() {
                    let end = start + sliceSize;
                    if (size - end < 0) {
                        end = size;
                    }
                    let s = slice(file, start, end);
                    sendChunck(s, start, end,sliceSize,function(json){
                        if (end < size) {
                            start += sliceSize;
                            setTimeout(function(){
                                loop();
                            },1000);
                        }else{
                            cbComplete(json);
                        }
                    });
                }
            }

            function sendChunck(piece, start, end,sliceSize,cbNextChunk) {
                let formdata = new FormData();
                let xhr = new XMLHttpRequest();
                let apiurl=uploadUrl+"?";
                apiurl+="filename="+filename+"&";
                apiurl+="filenametmp="+filenametmp+"&";
                apiurl+="size="+size+"&";
                apiurl+="end="+end+"&";
                apiurl+="sliceSize="+sliceSize+"&";
                xhr.open('POST',apiurl,true);
                formdata.append('chunck', piece);
                xhr.addEventListener("error", function(){
                    alert("error upload 1");
                    console.error("error upload 1")
                    let json=JSON.parse(xhr.response);
                    cbError(json)
                }, false);
                xhr.onload = function() {
                    let percentage=Math.floor(100/size*end);
                    let json=JSON.parse(xhr.response);
                    cbProgress(percentage,end,size);
                    cbNextChunk(json);
                };
                xhr.send(formdata);
                console.log("upload send ",filename,""+Math.floor(100/size*start)+"%");
            }
            /**
             * Formalize file.slice
             */
            function slice(file, start, end) {
                let slice = file.mozSlice ? file.mozSlice :
                    file.webkitSlice ? file.webkitSlice :
                        file.slice ? file.slice : noop;

                return slice.bind(file)(start, end);
            }
            function noop() {}
        }


        doUpload();


    }





}