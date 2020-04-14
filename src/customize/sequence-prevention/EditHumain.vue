<template>
    <div>
        <v-row>
            <v-col cols="12" md="6">
                <v-text-field
                        label="Prénom"
                        v-model="record.prenom"
                ></v-text-field>
            </v-col>
            <v-col  cols="12" md="6">
                <v-text-field
                        label="Nom"
                        v-model="record.nom"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
                <v-text-field
                        label="Email"
                        v-model="record.email"
                ></v-text-field>
            </v-col>
            <v-col  cols="12" md="6">
                <v-text-field
                        label="Mot de passe"
                        v-model="record.cleanpassword"
                ></v-text-field>
            </v-col>
            <v-col>
                <FieldSharedModelList
                    v-model="record.sharedEquipeList"
                    type="equipe"
                    label="équipes"
                ></FieldSharedModelList>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "EditHumain",
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
        }
    }
</script>

<style scoped>

</style>