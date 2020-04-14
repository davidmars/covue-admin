<template>
  <div class="edit pt-4">

    <EditLoading v-if="loading"></EditLoading>

      <v-alert type="error" v-if="error">
        {{ error }}
      </v-alert>

    <div v-if="record" class="content ">

      <!--le formulaire en fonction du type de record-->
      <component v-model='record'
                 :key="kk"
                 :is="$store.getters.recordDefinition(record.type).components.edit">
      </component>

      <h4>Debug here...</h4>
      <v-divider class="mb-5"></v-divider>

      <pre><code>{{kk}}</code></pre>
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

    <v-dialog persistent v-if="record" v-model="dialogConfirmQuitModified" max-width="400">

      <v-card max-width="400">
        <v-system-bar light>
          <v-spacer></v-spacer>
          <v-icon @click="dialogConfirmQuitModified=false">mdi-close</v-icon>
        </v-system-bar>

        <v-card-title>Attention</v-card-title>

        <v-card-text>
          Vos modifications n'ont pas été enregistrées.
          Que souhaitez-vous faire avant de quitter la page?
        </v-card-text>

        <v-card-actions>
          <v-btn text color="success" @click="nextPage(true)">Enregistrer</v-btn>
          <v-btn text color="error" @click="nextPage(false)">Ne pas enregistrer</v-btn>
          <v-spacer></v-spacer>
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
        dialogConfirmDelete: false,
        dialogConfirmQuitModified: false,
        loading: false,
        record: null,
        recordString:'',
        error: null,
        isModified:false,
        next:null,
        kk:0,
      }
    },
    created(){
      console.log("created EDIT");
      let me=this;
      this.fetchData();
      this.$root.$on("record.save",function(){
        me.saveRecord(
          function(freshData){
            me.defineFreshData(freshData);
            me.fetchData();
            me.$router.push('/edit/'+freshData.uid).catch(err => {
              // Ignore the vuex err regarding  navigating to the page they are already on.
              if (err.name !== "NavigationDuplicated") {
                // But print any other errors to the console
                console.error(err);
              }
            })
          }
        );
      });
      this.$root.$on("record.delete",function(){
        me.deleteRecord();
      });
    },
    watch:{
      '$route': 'fetchData'
      ,
      record:{
        deep:true,
        immediate:false,
        handler(){
          console.log("changed record ?");
          if(this.record && this.recordString && JSON.stringify(this.record)!==this.recordString){
            console.log("YES");
            this.isModified=true;
            this.$root.$emit('editing-record',this.record,this.isModified);
          }else{
            console.log("NO");
            if(this.record){
              this.isModified=false;
              this.$root.$emit('editing-record',this.record,this.isModified);
            }

          }
        }
      },
    },
    // when route changes and this component is already rendered,
    // the logic will be slightly different.
    /*beforeRouteEnter (to, from, next) {
      console.log('beforeRouteEnter',to,from,next);
      next();
    },*/
    // when route changes and this component is already rendered,
    // the logic will be slightly different.
    beforeRouteUpdate (to, from, next) {
      console.log('beforeRouteEnter',to,from,next);
      if(this.isModified){
        this.next=next;
        this.dialogConfirmQuitModified=true;
      }else{
        next();
      }
    },
    methods:{
      nextPage(save=true){
        let me=this;
        if(save){
          this.saveRecord(
              function(){
                me.dialogConfirmQuitModified=false;
                me.next();
              }
          )
        }else{
          this.dialogConfirmQuitModified=false;
          me.next();
        }
      },
      /**
       * Récupère les données en fonction de la route
       **/
      fetchData(){
        console.log("fetchData");
        this.$forceUpdate();
        //mode loading
        this.error = null;
        this.record = null;
        this.loading = true;
        let me=this;
        this.$root.$emit('loading-record');

        //nouveau record ?

        let rx=/^([a-z]+)-new$/;
        let m=rx.exec(me.$route.params.uid);
        if(m){
          let r={
            id:0,
            type: m[1],
            name:"",
          };
          this.defineFreshData(r);
        }else{

          me.$store.dispatch("getRecordByUid",me.$route.params.uid).then((freshData) => {
            if(!freshData){
              me.error="Oups impossible de trouver "+me.$route.params.uid;
            }else{
              this.defineFreshData(freshData);
            }
          }).catch((errors)=>{
            console.error("EDIT",errors);
            this.error=errors[0];
            this.loading=false;
          })
        }


      },
      /**
       * Demande si on est certain de vouloir effacer
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
      saveRecord(cb){
        console.log("saveRecord",this.record.uid);
        this.loading=true;
        this.$store.dispatch("saveRecord",this.record).then((freshData) => {
          if(cb){
            cb(freshData);
          }
        })
      },
      defineFreshData(freshData){
        console.log("defineFreshData");
        this.dialogConfirmQuitModified=false;
        this.isModified=false;
        this.recordString=JSON.stringify(freshData);
        this.record=freshData;
        this.loading = false;
        this.$root.$emit('editing-record',this.record);
        this.kk++;
        this.$forceUpdate();
      }


    }
  }
</script>