<template>
    <v-form v-model="valid" :key="refreshId" ref="form">

        <v-row>
            <v-col cols="" lg="4">
                <v-text-field
                        v-model="record.year"
                        :counter="4"
                        label="Année"
                        :rules="[rules.year, rules.required]"
                        required
                ></v-text-field>
            </v-col>
        </v-row>

        <FieldInputTextLangs
                v-model="record" field="title" label="Titre"
                :counter="30"
        ></FieldInputTextLangs>

        <FieldTextareaLangs
                v-model="record" field="text" label="Texte"
                :counter="500"
        ></FieldTextareaLangs>

        <h3>Photos</h3>
        <field-blocks
                v-model="record.stuff"
                :block-types="[
                    //'BlockTexte',
                    'BlockPhoto'
                    ]"
                add-btn-label="Ajouter une photo"
        ></field-blocks>


    </v-form>
</template>

<script>

    export default {

        name: "EditDate",
        components: {},
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
                refreshId:0,
                valid:true,
                record:null,
                rules: {
                    required: value => !!value || 'Champ obligatoire.',
                    year: v => (v && v.length === 4) || '4 characters',
                },
            }
        },
        methods:{
            validate () {
                this.$el.validate()
            }
        },
        created(){
            this.record=this.value;
            if(!this.record){
                this.record={};
            }
            this.$emit("checkvalid",this.valid);
        },
        watch:{
            valid(){
                console.log("is valid",this.valid)
                this.$emit("valid",this.valid);
            }
        }
    }
</script>

<style lang="less">






</style>