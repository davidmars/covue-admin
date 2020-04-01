<template>
    <v-img ref="image"
           style="background-color: #EEE"
           class="align-end"
           aspect-ratio="2"
           cover
           :src="imgSrc">

        <v-card-title class="justify-end">

            {{uid}}

            <v-btn fab color="white" class="upload">
                <v-icon dark>mdi-cloud-upload</v-icon>
                <input ref="input-file"
                       type="file"
                       accept="image/*"
                       @change="setImage"
                >
            </v-btn>



        </v-card-title>

        <v-progress-linear
                ref="uploadProgress"
                color="light-blue"
                height="10"
                :value="uploadValue"
                :active="uploadActive"
                stream
        ></v-progress-linear>


    </v-img>
</template>

<script>
    export default {
        name: "FieldImage",

        props: {
            fileRecordUid: {
                type: String
            },
            value: {
                type: String
            }
        },
        data(){
            return{
                uid:"",
                imgSrc: "",
                file: null,
                filename: null,
                uploadActive:false,
                uploadValue:0,
                newFileRecordUid:""
            }
        },
        mutations:{

        },
        created(){
            this.uid=this.value;
            if(this.uid){
                let me=this;
                this.$store.state.api.getRecordByUid(this.uid,function(record){
                    console.log(record.httpPath);
                    console.log(me.$store.state.api.imgUrl(record.httpPath));
                    me.imgSrc=me.$store.state.api.imgUrl(record.httpPath);
                })
            }
        },
        methods:{

            updateValue: function (value) {
                this.$emit('input', value)
            },

            setImage(e){
                // const file = e;
                const file = e.target.files[0];
                console.log(file)
                // this.file = file
                this.filename = file.name;
                console.log(this.filename)

                if (!file.type.includes("image/")) {
                    alert("Please select an image file");
                    return;
                }

                let me=this;
                this.uploadActive=true;
                this.uploadValue=0;


                this.$store.state.api.uploadRecord(file,
                    function(percent){
                        me.uploadValue=percent;

                    },function(data){
                        console.log("complete",data)
                        me.uploadValue=0;
                        me.uploadActive=false;
                        if(data.json.record){
                            //me.item.image=data.json.record.uid
                            me.uid=data.json.record.uid;
                            //me.$emit("change", me.uid);
                            me.updateValue(data.json.record.uid);
                        }
                    },function (a,b,c) {
                        console.log("error",a,b,c)
                    });


                if (typeof FileReader === "function") {
                    const reader = new FileReader();
                    reader.onload = event => {
                        me.imgSrc = event.target.result;
                        //this.$emit("update:dataUrl", this.imgSrc);
                    };
                    reader.readAsDataURL(file);
                } else {
                    alert("Sorry, FileReader API not supported");
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .upload{
        position: relative;
        input{
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            opacity: 0;
        }
    }
</style>