import BMF from 'browser-md5-file';

export default class FilesApi {
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
        this._uploadUrl=this.api._baseUrl+"/records.upload";
    }

    /**
     * Fait le md5 sum et le renvoie en CB
     * @param file
     * @param cbSuccess
     * @param cbError
     * @private
     */
    _md5(file,cbSuccess,cbError){
        let encoder=new BMF();
        encoder.md5(
            file,
            (err, md5) => {
                console.log('md5 err:', err);
                console.log('md5 string:', md5); // 97027eb624f85892c69c4bcec8ab0f11
                if(md5){
                    cbSuccess(md5)
                }else if(err){
                    cbError(err)
                }
            },
            progress => {
                console.log('md5 progress :', progress);
            },
        );
    }

    /**
     * Obtenir un record par son MD5 file
     * @param {String} md5
     * @param {function} cbSuccess
     * @param {function} cbError
     */
    byMD5(md5,cbSuccess,cbError){
        let success=function(data){
            console.log("byMD5 success",data)
            cbSuccess(data.json.record);
        };
        this.api._call("records.fileExists",
            {md5:md5},
            success,
            function(data){
                cbError(data.errors);
            }
        );
    }

    /**
     * Uploade un fichier progressivement en passant par l'api et en le découpant
     * @param {File} file
     * @param {function} cbProgress Renvoie la progression sous forme de : pourcentage, bytesuploadés, bytesTotaux
     * @param {function} cbComplete Renvoie un ApiReturn avec le fichier
     * @param {function} cbError Renvoie un ApiReturn avec les erreurs
     */
    uploadRecord(file, cbProgress, cbComplete, cbError) {
        let me=this;
        this._md5(file,
            function(md5){
                me.byMD5(md5,
                    function(record){
                        //le record existe déjà
                        console.log("byMD5 2 success",record)
                        cbComplete(record);
                    },
                    function () {
                        //il faut uploader
                        me._upload(file, cbProgress, cbComplete, cbError);
                    }
                )
            }
        );
    }

    /**
     * Calcule les poids des paquets envoyés en fonction de la taille données
     * @param totalSize
     * @return {number}
     * @private
     */
    _sliceSize(totalSize){
        let sliceSize = 1048576; // 1MB chunk sizes.;
        if(totalSize<1048576 * 5){
            sliceSize=104857; // 100k chunk si moins de 5m
        }
        return sliceSize;
    }

    _upload(file,cbProgress,cbComplete,cbError){
        let me=this;
        let totalSize, fileName, fileNameTmp;
        let start = 0;
        let end = 0;
        fileName=file.name;
        fileNameTmp=""+new Date().getTime()+file.name;
        totalSize = file.size;

        //en fonction du poids du fichier, on envoie des paquets plus ou moins gros
        let sliceSize = this._sliceSize(totalSize);
        function uploadRecursive() {
            end = start + sliceSize;
            if (totalSize - end < 0) { end = totalSize;}
            let piece = me._slice(file, start, end);
            me._sendChunck(piece, start, end, sliceSize,totalSize,fileName,fileNameTmp,nextSlice,cbProgress,cbError);
        }
        function nextSlice(result){
            if (end < totalSize) {
                start += sliceSize;
                setTimeout(function(){
                    uploadRecursive();
                },1000);
            }else{
                cbComplete(result.json.record);
            }
        }

        uploadRecursive();

    }




    /**
     * Envoie une portion d'un fichier
     * @param piece
     * @param {Number} start Position où il faudra écrire les octets
     * @param {Number} end Position de fin où il faudra écrire les octets
     * @param {Number} sliceSize Nombre d'octets transférées
     * @param {Number} totalSize Poids total
     * @param {String} fileName Nom originel du fichier
     * @param {String} fileNameTmp Nom du fichier temporaire dans lequel on écrit
     * @param {function} cbNextChunk
     * @param {function} cbProgress
     * @param {function} cbError
     * @private
     */
    _sendChunck(piece,start,end,sliceSize,totalSize,fileName,fileNameTmp,cbNextChunk,cbProgress,cbError) {
        let formdata = new FormData();
        let xhr = new XMLHttpRequest();
        let apiurl=this._uploadUrl+"?";
        apiurl+="filename="+fileName+"&";
        apiurl+="filenametmp="+fileNameTmp+"&";
        apiurl+="size="+totalSize+"&";
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
            let percentage=Math.floor(100/totalSize*end);
            let json=JSON.parse(xhr.response);
            cbProgress(percentage,end,totalSize);
            cbNextChunk(json);
        };
        xhr.send(formdata);
        //console.log("upload send ",fileName,""+Math.floor(100/totalSize*start)+"%");
    }

    /**
     * Compatibilité navigateurs pour file.slice
     */
    _slice(file, start, end) {
        let slice = file.mozSlice       ? file.mozSlice :
                    file.webkitSlice    ? file.webkitSlice :
                    file.slice          ? file.slice : function(){};

        return slice.bind(file)(start, end);
    }



}