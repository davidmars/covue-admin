<template>
    <div>
        <pre>{{record}}</pre>
        <v-row>
            <v-col>
                <v-text-field
                        label="Nom de l'équipe"
                        v-model="record.name"
                ></v-text-field>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "EditEquipe",
        props:{
            /**
             * Il s'agit des données json du champ
             * @model
             */
            value: {
                type: Object
            },
        },
        data(){
            return{
                record:null,
            }
        },
        created(){
            this.record=this.value;
            if(!this.record){
                this.record={};
            }
        },
    }
</script>

<style scoped>

</style>