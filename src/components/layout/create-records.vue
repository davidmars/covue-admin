<template>
    <v-list-group>
        <template v-slot:activator>
            <v-list-item-icon>
                <v-icon>mdi-plus-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>Créer...</v-list-item-subtitle>
        </template>
        <v-list-item-group
                no-action
                sub-group
                value="true"
        >
            <v-list-item
                    v-for="defintion in $store.state.recordDefinitions"
                    :key=defintion.type
                    :to="'/edit/'+defintion.type+'-new'">

                <v-list-item-icon>
                    <v-icon>{{defintion.icon}}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title v-text="defintion.humanName"></v-list-item-title>
                </v-list-item-content>

            </v-list-item>

        </v-list-item-group>


    </v-list-group>
</template>

<script>
    export default {
        name: "create-records"
    }
</script>

<style scoped>

</style>