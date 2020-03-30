<template>
    <v-list >

        <create-records></create-records>

        <v-divider></v-divider>
        <v-subheader>Records</v-subheader>
        <v-list-item-group color="primary">
            <default-record-preview
                    v-for="record in $store.state.records "
                    :key="record.uid"
                    :record="record"
                    >
            </default-record-preview>
        </v-list-item-group>

        <v-divider></v-divider>

    </v-list>
</template>

<script>
    import CreateRecords from "@/components/layout/create-records";
    export default {
        name: "RecordsList",
        components: {CreateRecords},
        props:['records'],
        data: () => ({

        }),
    }
</script>

<style scoped>

</style>