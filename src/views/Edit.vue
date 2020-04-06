<template>
  <div class="edit pt-4" :key="refreshId">

    <EditLoading :key="refreshId" v-if="loading"></EditLoading>

    <v-alert type="error" v-if="error">
        {{ error }}
      </v-alert>

    <div v-if="record" class="content ">

      <v-row class="align-center">
        <v-col>
          <v-list-item>
            <v-list-item-avatar color="grey">
              <v-icon dark>{{$store.getters.recordDefinition(record.type).icon}}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">{{ record.name }}</v-list-item-title>
              <v-list-item-subtitle>
                <template v-if="record.uid">
                  {{record.type}}@{{record.id}} |
                  créé <b :title="record.date_created">{{createdAgo}}</b>,
                  modifié <b :title="record.date_modified">{{modifiedAgo}}</b>
                </template>
                <template v-if="!record.uid">
                  {{record.type}}
                </template>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col class="d-flex justify-end">
          <!--boutons enregistrement-->
              <v-btn :disabled="record.id===0"  color="error" v-on:click="deleteRecord()" class="mr-4">Supprimer</v-btn>
              <v-btn :disabled="!valid" color="success" v-on:click="saveRecord()">Enregistrer</v-btn>
        </v-col>
      </v-row>


      <v-divider class="mt-4"></v-divider>

      <!--le formulaire en fonction du type de record-->
      <component @valid="onValid"
                 v-model='record'
                 :is="$store.getters.recordDefinition(record.type).components.edit">
      </component>

      <h4>Debug here...</h4>
      <v-divider class="mb-5"></v-divider>

      <pre><code>{{record}}</code></pre>


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

  import EditLoading from "@/views/EditLoading";
  import moment from "moment";
  moment.locale('fr');

  export default {
    name: 'Edit',
    components: {EditLoading},
    data(){
      return {
        valid: true,
        changed:false,
        dialogConfirmDelete: false,
        loading: false,
        record: null,
        beforeChangeRecord:null,
        error: null,
        refreshId:0,
        now:"",
        modifiedAgo:"",
        createdAgo:"",
      }
    },
    created(){
      this.fetchData();
      setInterval(this.refreshDates, 1000);
    },
    watch:{
      '$route': 'fetchData',
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
      onValid(valid){
        this.valid=valid;
      },

      /**
       * Récupère les données
       **/
      fetchData(){
        this.refreshId++;
        //mode loading
        this.error = null;
        this.record = null;
        this.loading = true;
        let me=this;

        //nouveau record ?
        let rx=/^([a-z]+)-new$/;
        let m=rx.exec(me.$route.params.uid);
        if(m){
          this.record={
            id:0,
            type: m[1],
            name:""
          };
          this.loading = false;
        }else{
          me.$store.dispatch("getRecordByUid",me.$route.params.uid).then((freshData) => {
            me.record=freshData;
            me.refreshDates()
            me.loading=false;
            if(!me.record){
              me.error="Oups impossible de trouver "+me.$route.params.uid;
            }
            me.valid=true;
            me.changed=false;
          })
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
        this.$store.dispatch("deleteRecordByUid",this.record.uid).then(() => {
          this.$router.push('/');
        })
      },
      saveRecord(){
        //this.$store.commit("saveRecord",this.record);
        this.refreshId++;
        this.loading=true;
        this.$store.dispatch("saveRecord",this.record).then((freshData) => {
          this.record=freshData;
          this.loading=false;
          this.refreshDates()
          this.$router.push('/edit/'+freshData.uid).catch(err => {
            // Ignore the vuex err regarding  navigating to the page they are already on.
            if (err.name !== "NavigationDuplicated") {
              // But print any other errors to the console
              console.error(err);
            }
          })
        })
      }

    }
  }
</script>