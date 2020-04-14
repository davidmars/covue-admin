<template>

    <v-navigation-drawer permanent absolute>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title">
                    Application
                </v-list-item-title>
                <v-list-item-subtitle>
                    subtext
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>


        <div>
            <create-records></create-records>
            <v-divider></v-divider>

            <v-subheader>Records</v-subheader>
            <record-type-list v-for="recordType in $store.state.recordDefinitions" :key="recordType.type"
                              :record-type="recordType"
            ></record-type-list>
        </div>


    </v-navigation-drawer>


</template>

<script>
    export default {
        name: "main-menu"
    }
</script>

<style scoped>

</style>