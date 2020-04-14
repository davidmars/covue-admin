<template>
    <v-list-group>

        <template v-slot:activator>

            <v-list-item-icon>
                <v-icon>{{recordType.icon}}</v-icon>
            </v-list-item-icon>

            <v-list-item-subtitle>{{recordType.humanName}}s</v-list-item-subtitle>

            <v-list-item-action>
                <v-list-item-action-text>{{$store.getters.recordsByType(recordType.type).length}}</v-list-item-action-text>
            </v-list-item-action>

        </template>

            <default-record-preview
                    v-for="record in $store.getters.recordsByType(recordType.type) "
                    :key="record.uid"
                    :record="record"
            >
            </default-record-preview>



            <v-divider class="my-2"></v-divider>




    </v-list-group>


</template>

<script>
    export default {
        name: "RecordTypeList",
        props:{
            recordType:{
                type:Object
            }
        },
        data:function(){
            return{
                records:[]
            }
        },
        watch:{

        },
        created(){
            this.refresh();
        },
        methods:{
            refresh(){
                this.records=this.$store.getters.recordsByType(this.type);
            }
        }


    }
</script>

<style scoped lang="less">

</style>