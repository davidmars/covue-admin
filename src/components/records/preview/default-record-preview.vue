<template>
    <v-list-item
            dense
            :to="{ name: 'edit', params: {
                        uid:r.uid
                        }
                    }">

        <v-list-item-icon>
            <record-icon :record="r"></record-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title v-text="r.name"></v-list-item-title>
            <v-list-item-action-text>{{r.uid}} {{r.date_modified}}</v-list-item-action-text>
        </v-list-item-content>

    </v-list-item>
</template>

<script>


    export default {
        name: "default-record-preview",
        components:{},
        props:["record"],
        data(){
            return{
                r:null
            }
        },
        created(){
            this.r=this.record;
        }
    }
</script>

<style scoped>

</style>