<template>
    <v-row>
        <v-col cols="12" lg="" v-for="lang in $store.state.languages" :key="lang.code">
            <v-text-field
                    v-model="record['title_'+lang.code]"
                    :counter="30"
                    :label="'Titre (' +lang.name+')'"
                    required
                    filled
            >
                <template v-slot:append>
                    <flag class="caption" :squared="false" :iso='lang.flag'/>
                </template>
            </v-text-field>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "FieldInputTextLangs",
        props:{
            /**
             * Il s'agit des données json du record
             * @model
             */
            value:{
                type:Object
            },
            /**
             * Le nom de la variable qui sera déclinée en monchamp_fr, monchamp_en etc...
             */
            field:{
                type:String
            },
            /**
             * Label des champs qui sera suffixé par la langue
             */
            label:{
                type:String
            },
            /**
             * Nombre maximum de caractères
             */
            counter:{
                type:Number,
                default:0
            }
        },
        data(){
            return {
                record:{}
            }
        },
        mounted(){
            this.record=this.value;
        }
    }
</script>

<style scoped>

</style>