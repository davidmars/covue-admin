<template>
    <v-row class="field-textarea-langs">
        <v-col cols="12" lg="" v-for="lang in $store.state.languages" :key="lang.code">
            <v-textarea
                    v-model="record['text_'+lang.code]"
                    :counter="counter"
                    :label="label+' ('+lang.name+')'"
                    auto-grow
                    filled
                    required
                    rows="2"
            >
                <template v-slot:append><flag class="caption" :squared="false" :iso='lang.flag'/></template>
            </v-textarea>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "FieldTextareaLangs",
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

<style lang="less">
    .field-textarea-langs{
        >*{
            display: flex;
            >.v-textarea{
                display: flex;
                flex-direction: column;
                >.v-input__control{
                    flex-grow: 1;
                    display: flex;
                    >.v-input__slot{
                        flex-grow:1;
                    }
                    >.v-text-field__details{
                        flex-grow: 0;
                    }
                }

            }
        }
    }
</style>