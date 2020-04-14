<template>
  <div id="app">
    <v-app id="inspire">

      <app-bar></app-bar>

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




  </v-app>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

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
</style>
<script>
  import AppBar from "@/components/layout/app-bar";
  export default {
    components: {AppBar}
  }
</script>