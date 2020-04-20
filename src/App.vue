<template>

    <v-app id="covue-admin" class="fonts">

      <v-navigation-drawer v-model="mainNavOpen"  class="main-nav grey lighten-4" app>
        <v-list shaped>

          <v-list>
            <v-list-item>
              <v-list-item-avatar tile color="white" size="50%">
                <v-img contain background="white" src="../src/assets/logo-roady.png"></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">{{$projectMetas.title}}</v-list-item-title>
                <v-list-item-subtitle>{{$projectMetas.subTitle}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <create-records></create-records>

          <v-divider></v-divider>

          <v-subheader>Records</v-subheader>
          <record-type-list v-for="recordType in $store.state.recordDefinitions"
                            :key="recordType.type"
                            :record-type="recordType"
          ></record-type-list>

        </v-list>


        <!--bottom-->


        <template v-slot:append>

          <v-list>


            <v-list-item>
              <v-list-item-avatar>
                <smart-avatar
                        :text="$currentUser.email"
                        :img="$currentUser.thumbnail"
                ></smart-avatar>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-group append-icon="mdi-menu-down">
              <template v-slot:activator>

              <v-list-item-content>
                <v-list-item-title class="title">{{$currentUser.name}}</v-list-item-title>
                <v-list-item-subtitle>{{$currentUser.email}}</v-list-item-subtitle>
                <v-divider></v-divider>
              </v-list-item-content>
              </template>

              <v-list-item dense>
                <v-list-item-icon>
                  <v-icon>mdi-logout </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Déconnexion</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item dense>
                <v-list-item-icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Modifier mon profil</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

            </v-list-group>





          </v-list>


          <v-divider></v-divider>
          <div class="pa-2 justify-space-between align-center d-flex">

            <screen-size></screen-size>
            <v-chip x-small>
              {{appVersion()}}
            </v-chip>

          </div>
        </template>

      </v-navigation-drawer>

      <app-bar @toggleMainNav="mainNavOpen=!mainNavOpen"></app-bar>

      <v-content>
        <v-sheet tile color="grey lighten-2" class="fill-height fill-width" >
          <v-container class="pa-0 pa-sm-5 pa-lg-10 align-center justify-center" fluid>
            <v-card elevation="10" class="pa-2 pa-sm-5 pa-lg-10">
              <router-view></router-view>
            </v-card>
          </v-container>
        </v-sheet>

      </v-content>

  </v-app>

</template>


<script>
  export default {
    data(){
      return{
        mainNavOpen:null
      }
    },
    methods:{
      /**
       * Renvoie la version de package.json
       * @return {string}
       */
      appVersion(){
        let j=require("../package.json");
        return j.version;
      }
    }
  }
</script>


















<style lang="less">
  @import url("https://use.typekit.net/qmp3xon.css");
  .v-application{
    &.fonts{
    font-family: proxima-nova, sans-serif !important;
      .title{
        font-family: proxima-nova, sans-serif !important;
        //font-weight: 400 !important;
      }
    }
    .main-nav{
      .primary--text{
        //color: blue !important;
      }
    }
  }



#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
