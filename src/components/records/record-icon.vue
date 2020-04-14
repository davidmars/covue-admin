<template>
    <v-icon>{{$store.getters.recordDefinition(record.type).icon}}</v-icon>
</template>

<script>
    /**
     * Affiche simplement la bonne icône d'un record en fonction de son type
     */
    export default {
        name: "record-icon",
        props:
            {
                "record":{
                    type:Object,
                    mandatory:true
                }

            }
        ,
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