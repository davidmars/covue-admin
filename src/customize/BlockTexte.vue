<template>
    <div>
        <pre v-if="debug">{{json}}</pre>
        <v-card-text class="mt-5">
                    <v-textarea
                            v-for="lang in $store.state.languages" :key="lang.code"
                            v-model="json['text_'+lang.code]"
                            :counter="30"
                            :label="'Texte (' +lang.name+')'"
                            required
                            auto-grow
                    >
                        <template v-slot:append>
                            <flag class="caption" :squared="false" :iso='lang.flag'/>
                        </template>
                    </v-textarea>
        </v-card-text>

    </div>


</template>

<script>
    export default {
        name: "BlockTexte",
        props: {
            value: {
                type: Object
            },
            debug:{
                type:Boolean,
                default:false
            },
            humanName:{
                type:String,
                default:"Texte"
            },
            icon:{
                type:String,
                default:"mdi-card-text"
            }
        },
        data(){
            return{
                json:{}
            }
        },
        created(){
            this.json = this.value;
            if(!this.json){
                this.json={};
            }
            this.json["blockType"]=this.$options.name;

        }

    }
</script>

<style scoped lang="less">

</style>