<template>
    <v-app-bar color="white" fixed>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
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
    }
</script>

<style scoped>

</style>