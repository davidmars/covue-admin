<template>
    <div>
        <v-row>
            <v-col>
                <v-text-field
                        label="Nom de l'équipe"
                        v-model="record.name"
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <FieldSharedModelList
                        v-model="record.sharedHumainList"
                        type="humain"
                        label="Membres de l'équipe"
                ></FieldSharedModelList>
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