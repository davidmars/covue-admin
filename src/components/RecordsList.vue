<template>
    <v-list >
        <v-subheader>Records</v-subheader>
        <v-list-item-group color="primary">
            <v-list-item
                    v-for="record in records"
                    :key="record.type+'-'+record.id"
                    :to="{ name: 'edit', params: {
                        type:record.type,
                        id: record.id
                        }
                    }">

                    <v-list-item-icon>
                        <record-icon :record="record"></record-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-text="record.titre"></v-list-item-title>
                    </v-list-item-content>

            </v-list-item>
        </v-list-item-group>
        <v-list-group>
            <template v-slot:activator>
                <v-list-item-title>Créer...</v-list-item-title>
            </template>
            <v-list-item-group
                    no-action
                    sub-group
                    value="true"
            >
                <v-list-item
                v-for="recordType in $store.state.modelsConfig"
                :key=recordType.type
                :to="{ name: 'edit', params: { type: recordType.type,id:0 }}">

                <v-list-item-icon>
                    <v-icon>{{recordType.icon}}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title v-text="recordType.humanName"></v-list-item-title>
                </v-list-item-content>

                </v-list-item>

            </v-list-item-group>


        </v-list-group>

        <v-divider></v-divider>



    </v-list>
</template>

<script>
    import RecordIcon from "@/components/record-icon";
    export default {
        name: "RecordsList",
        components: {RecordIcon},
        props:['records'],
        data: () => ({

        }),
    }
</script>

<style scoped>

</style>