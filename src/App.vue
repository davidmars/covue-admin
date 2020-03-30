<template>
  <div id="app">
    <v-app id="inspire">

      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/edit/1">edit/1</router-link>
      </div>

      <v-container fluid>
        <v-row>

          <v-col cols="3" >
            <v-divider></v-divider>
            <records-list :records="$store.getters.allRecords"></records-list>
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
  import RecordsList from "@/components/RecordsList";
  export default {
    components: {RecordsList}
  }
</script>