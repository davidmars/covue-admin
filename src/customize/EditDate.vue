<template>
    <v-form v-model="valid" :key="refreshId" ref="form">

        <v-row>
            <v-col cols="6">
                <v-text-field
                        v-model="record.year"
                        :counter="4"
                        label="Année"
                        :rules="[rules.year, rules.required]"
                        required
                ></v-text-field>
            </v-col>
        </v-row>

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

        <v-row>
            <v-col cols="12" lg="" v-for="lang in $store.state.languages" :key="lang.code">

                <v-textarea
                        v-model="record['text_'+lang.code]"
                        :counter="500"
                        :label="'Texte ('+lang.name+')'"
                        auto-grow
                        filled
                        required
                        rows="4"
                >
                    <template v-slot:append>
                        <flag class="caption" :squared="false" :iso='lang.flag'/>
                    </template>

                </v-textarea>
            </v-col>
        </v-row>

        <h3>Photos</h3>
        <field-blocks
                v-model="record.stuff"
                :block-types="['BlockTexte','BlockPhoto']"
                add-btn-label="Ajouter une photo"
        ></field-blocks>


    </v-form>
</template>

<script>

    export default {

        name: "EditDate",
        components: {},
        props:["record"],

        data(){
            return{
                refreshId:0,
                valid:true,
                r:null,
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
            this.r=this.record;
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

<style scoped lang="less">
    .flag-mg{
        outline: 1px solid red;
    }


</style>