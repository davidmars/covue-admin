<template>
  <div class="edit pt-5">

    <div class="loading" v-if="loading">

      <div class="row">

        <div class="col-12">
          <v-skeleton-loader
                  class="mx-auto"
                  type="heading"
          ></v-skeleton-loader>
        </div>

        <div class="col-3">
          <v-skeleton-loader
                  class="mx-auto"
                  type="sentences"
          ></v-skeleton-loader>
        </div>

        <div class="col-3">
          <v-skeleton-loader
                  class="mx-auto"
                  type="image"
          ></v-skeleton-loader>
        </div>

        <div class="col-3">
          <v-skeleton-loader
                  class="mx-auto"
                  type="text"
          ></v-skeleton-loader>
        </div>

        <div class="col-3">
          <v-skeleton-loader
                  class="mx-auto"
                  max-width="300"
                  type="paragraph"
          ></v-skeleton-loader>
        </div>

      </div>











    </div>


      <v-alert type="error" v-if="error">
        {{ error }}
      </v-alert>


    <div v-if="record" class="content ">

      <v-spacer></v-spacer>
      <span class="font-weight-thin display-2">
        <record-icon :record="record" large></record-icon>
        {{ record.titre }}
      </span>
      <span class="subtitle-1 font-weight-light">{{record.type}}@{{record.id}}</span>
      <v-spacer></v-spacer>

      <v-form>
        <component :record='record' :is="'edit-'+record.type"></component>

        <div class="flex justify-center">
          <v-btn v-if="record.id!==0" color="error" v-on:click="deleteRecord()" class="mr-4">Effacer</v-btn>
          <v-btn v-if="record.id===0" color="success" v-on:click="createRecord()">Enregistrer</v-btn>
        </div>

      </v-form>

    </div>


    <v-dialog v-if="record" v-model="dialogConfirmDelete" max-width="290">
      <v-card>
        <v-card-title class="headline">Êtes vous sûr?</v-card-title>
        <v-card-text>
          Voulez-vous le supprimer définitivement <b>{{record.titre}}</b> ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  color="green" text @click="deleteRecordConfirmed()">oui</v-btn>
          <v-btn color="grey" text @click="dialogConfirmDelete = false">non</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>


<script>

  import EditPage from "@/components/records/EditPage";
  import EditDate from "@/components/records/EditDate";
  import RecordIcon from "@/components/record-icon";
  export default {
    name: 'Edit',
    components: {
      EditPage,EditDate,RecordIcon
    },
    data(){
      return {
        dialogConfirmDelete: false,
        loading: false,
        record: null,
        error: null
      }
    },
    created(){
      this.fetchData();
    },
    watch:{
      '$route': 'fetchData'
    },
    methods:{
      fetchData(){
        this.error = this.record = null;
        this.loading = true;
        let me=this;
        setTimeout(function(){
          me.record=me.$store.getters.getRecordById(me.$route.params.type,me.$route.params.id);
          me.loading=false;
          if(!me.record){
            if(me.$route.params.id===0){
              me.record={
                id:0,
                type:me.$route.params.type,
                titre:""
              }
              //me.$store.commit("addRecord",me.record);
            }else{
              me.error="Oups impossible de trouver "+me.$route.params.type+"@"+me.$route.params.id;
            }
          }
        },1000);
      },
      deleteRecord(){
        this.dialogConfirmDelete=true;
      },
      deleteRecordConfirmed(){
        this.dialogConfirmDelete=false;
        this.$store.commit('deleteRecord',this.record)
      },
      createRecord(){
        this.$store.commit("addRecord",this.record);
        this.$router.push('/edit/'+this.record.type+"/"+this.record.id);
      }

    }
  }
</script>