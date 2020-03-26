<template>
    <v-icon>{{$store.getters.modelConfig(record.type).icon}}</v-icon>
</template>

<script>




    export default {
        name: "record-icon",
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