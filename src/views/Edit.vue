<template>
  <div class="edit pt-4">

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

      <v-list-item>
        <v-list-item-avatar color="grey">
          <v-icon dark>{{$store.getters.recordDefinition(record.type).icon}}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">{{ record.name }}</v-list-item-title>
          <v-list-item-subtitle>{{record.type}}@{{record.id}} | {{record.date_created}} | {{record.date_modified}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mt-4"></v-divider>

      <!--boutons enregistrement-->
      <div class="pt-4">
        <div class="d-flex justify-end">
          <v-btn :disabled="record.id===0"  color="error" v-on:click="deleteRecord()" class="mr-4">Supprimer</v-btn>
          <v-btn :disabled="!valid" color="success" v-on:click="saveRecord()">Enregistrer</v-btn>
        </div>
      </div>

      <!--le formulaire en fonction du type de record-->
      <component @valid="onValid"
                 :record='record'
                 :is="$store.getters.recordDefinition(record.type).components.edit">
      </component>

      <v-divider class="mb-5"></v-divider>



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
  export default {
    name: 'Edit',
    components: {},
    data(){
      return {
        valid: true,
        changed:false,
        dialogConfirmDelete: false,
        loading: false,
        record: null,
        beforeChangeRecord:null,
        error: null
      }
    },
    created(){
      this.fetchData();
    },
    watch:{
      '$route': 'fetchData',
    },
    methods:{
      onValid(valid){
        this.valid=valid;
      },
      fetchData(){
        this.error = this.record = null;
        this.loading = true;
        let me=this;

        //nouveau?
        let rx=/^([a-z]+)-new$/;
        let m=rx.exec(me.$route.params.uid);
        if(m){
          me.record={
            id:0,
            type: m[1],
            name:""
          };
          this.loading = false;
        }else{
          setTimeout(function(){
            me.record=me.$store.getters.getRecordByUid(me.$route.params.uid);
            me.loading=false;
            if(!me.record){
              me.error="Oups impossible de trouver "+me.$route.params.uid;
            }
            me.valid=true;
            me.changed=false;

          },100);
        }


      },
      /**
       * Demande si il faut effacer le record
       */
      deleteRecord(){
        this.dialogConfirmDelete=true;
      },
      /**
       * Efface le record pour de bon
       */
      deleteRecordConfirmed(){
        this.dialogConfirmDelete=false;
        this.$store.commit('deleteRecord',this.record)
      },
      saveRecord(){
        //this.$store.commit("saveRecord",this.record);
        this.$store.dispatch("saveRecord",this.record).then((freshData) => {
          this.$router.push('/edit/'+freshData.uid);
        })
      }

    }
  }
</script>