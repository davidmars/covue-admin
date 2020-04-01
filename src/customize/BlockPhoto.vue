<template>
    <div>
        <FieldImage v-model="item.image"></FieldImage>

        <v-card-text>
                    <pre>{{item.image}}</pre>
                    <v-text-field
                            v-for="lang in $store.state.languages" :key="lang.code"
                            v-model="item['caption_'+lang.code]"
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
        props:["item"],
        data(){
            return{}
        },
        created(){},
        methods:{
            onChangeImage(uid){
                //this.value=uid;
                this.item.image=uid;
            }
        }

    }
</script>

<style scoped lang="less">

</style>