<template>
    <div>
        <FieldImage v-model="json.image" :debug="debug"></FieldImage>
        <pre v-if="debug">{{json}}</pre>
        <v-card-text>
                    <v-text-field
                            v-for="lang in $store.state.languages" :key="lang.code"
                            v-model="json['caption_'+lang.code]"
                            :counter="30"
                            :label="'Légende (' +lang.name+')'"
                            required
                    >
                        <template v-slot:append>
                            <flag class="caption" :squared="false" :iso='lang.flag'/>
                        </template>
                    </v-text-field>
        </v-card-text>

    </div>


</template>

<script>
    import FieldImage from "@/components/fields/FieldImage";
    export default {
        name: "BlockPhoto",
        components: {FieldImage},
        props: {
            value: {
                type: Object
            },
            debug:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
                json:{}
            }
        },
        watch:{
            value:function(val){
                this.json=val;
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