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
        <pre>{{record.stuff}}</pre>

        <div v-if="record.stuff.length===0"
                class="d-flex pa-5 justify-center align-center">
            <v-btn v-on:click="addStuffLine( 0)" dark  color="black">
                Ajouter une photo
                <v-icon right>mdi-cloud-upload</v-icon>
            </v-btn>
        </div>



        <draggable v-if="record.stuff.length>0" class="row" tag="div" :list="record.stuff" handle=".handle" >
                <v-col class="stuff-item" style="position: relative" cols="12" md="6" lg="4" xl="3" v-for="(item,index) in record.stuff" :key="item.id">
                    <v-card tile outlined flat class="my-5">
                        <v-system-bar lights-out dark absolute color="rgba(0,0,0,0.1)" window class="handle">
                            <v-spacer></v-spacer>
                            <v-icon  v-on:click="deleteStuffLine(index)">mdi-trash-can-outline</v-icon>
                        </v-system-bar>

                        <BlockPhoto :item="item"></BlockPhoto>
                    </v-card>

                    <v-btn v-on:click="addStuffLine( index)"
                           class="add-btn before"
                           absolute small dark fab bottom right color="black">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn v-on:click="addStuffLine( index + 1 )"
                           class="add-btn after"
                           absolute small dark fab bottom right color="black">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-col>
        </draggable>




    </v-form>
</template>

<script>

    import BlockPhoto from "@/customize/BlockPhoto";
    export default {

        name: "EditDate",
        components: {BlockPhoto},
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
            },
            addStuffLine(index=0){
                if(this.record.stuff.length===0){
                    this.record.stuff.push({id:new Date().getTime()});
                }else{
                    this.record.stuff.splice(index,0,{id:new Date().getTime()});
                }
                this.refreshId++;
            },
            deleteStuffLine(index){
                this.record.stuff.splice(index,1);
            }
        },
        created(){
            if(!this.record.stuff){
                this.record.stuff=[];
            }
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
    .fade-enter-active, .fade-leave-active {
        transition: all 1.5s;
        max-height: 1000px;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
        max-height: 0;
        overflow: hidden;
    }

    .stuff-item{
        .add-btn{
            display: none;
            top: 50%;
            &.before{
                left: -20px;
            }
            &.after{
                right: -20px;
            }
        }
        &:hover{
            .add-btn{
                display: block;
            }
        }
    }

</style>