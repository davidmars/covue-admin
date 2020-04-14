<template>
    <v-row class="align-center" :key="kk"
           v-if="record">
        <v-col>
            <default-record-preview :key="record.uid"
                                   :record="record"></default-record-preview>

        </v-col>

        <v-col class="d-flex justify-end">
            <!--boutons enregistrement-->
            <v-btn small :disabled="disableDelete"  tile color="error" v-on:click="$root.$emit('record.delete')" class="mr-4">Supprimer</v-btn>
            <v-btn small :disabled="disableSave" tile color="success" v-on:click="$root.$emit('record.save')">Enregistrer</v-btn>
        </v-col>


    </v-row>
</template>

<script>
    import moment from "moment";

    export default {
        name: "edit-actions",
        data(){
          return {
              record:null,
              now:"",
              modifiedAgo:"",
              createdAgo:"",
              isModified:false,
              kk:0
          }
        },
        computed:{
            disableDelete:function(){
                return !this.record.id
            },
            disableSave: function(){
                console.log("computed disableSave")
                return this.isModified===false
            }
        },
        created(){
            setInterval(this.refreshDates, 1000);
        },
        mounted(){
            this.$root.$on('editing-record',(record,isModified)=>{

                console.log("editing-record",record,isModified);
                this.record=record;
                this.isModified=isModified;
                this.kk++;
            });
            this.$root.$on('loading-record',()=>{
                console.log("loading-record");
                this.isModified=false;
                this.record=null;
            });


        },
        methods:{
            refreshDates(){
                if(!this.record){
                    this.modifiedAgo = this.createdAgo = this.now="";
                }else{
                    let m;
                    m=moment(this.record.date_modified);
                    this.modifiedAgo=m.fromNow();
                    m=moment(this.record.date_created);
                    this.createdAgo=m.fromNow();
                }
            },
        }
    }
</script>

<style scoped>

</style>