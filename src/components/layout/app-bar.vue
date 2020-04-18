<template>
    <v-app-bar color="white" app>
        <v-app-bar-nav-icon @click.stop="$emit('toggleMainNav')"></v-app-bar-nav-icon>
        <v-toolbar-title>Title</v-toolbar-title>
        <v-spacer></v-spacer>
        <edit-actions></edit-actions>
    </v-app-bar>
</template>

<script>
    import EditActions from "@/components/layout/edit-actions";
    export default {
        name: "app-bar",
        components: {EditActions},
        props:{
          mainNavOpen:{
              type:Boolean,
              default:false
          }
        },
        data(){
          return{
              isMainNavOpen:this.mainNavOpen
          }
        }


    }
</script>

<style scoped>

</style>