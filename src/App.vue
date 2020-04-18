<template>

    <v-app id="covue-admin">

      <v-navigation-drawer dark v-model="mainNavOpen" app>
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
      </v-navigation-drawer>


      <app-bar @toggleMainNav="mainNavOpen=!mainNavOpen"></app-bar>

      <!--
      <v-app-bar
              app
              color="indigo"
              dark
      >
        <v-app-bar-nav-icon @click.stop="mainNavOpen = !mainNavOpen" />
        <v-toolbar-title>Application</v-toolbar-title>
      </v-app-bar>
      -->


      <v-content>
        <v-sheet tile color="grey lighten-2" class="fill-height fill-width" >
          <v-container class="pa-0 pa-sm-5 pa-lg-10 align-center justify-center" fluid>
            <v-card elevation="10" class="pa-2 pa-sm-5 pa-lg-10">
              <router-view></router-view>
            </v-card>
          </v-container>
        </v-sheet>

      </v-content>

      <!--
      <v-container class="mt-10" fluid>
        <v-row>
          <v-col cols="3" >
            <v-divider></v-divider>
            <main-menu></main-menu>
          </v-col>

          <v-col cols="9">
            <v-divider></v-divider>
            <router-view/>
          </v-col>

        </v-row>
      </v-container>
    -->



  </v-app>

</template>


<script>
  export default {
    data(){
      return{
        mainNavOpen:null
      }
    }
  }
</script>






















<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/*
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
 */
</style>
