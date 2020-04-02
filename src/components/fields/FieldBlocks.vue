<template>
    <div class="blocks">



        <div v-if="json.length===0"
             class="d-flex pa-5 justify-center align-center">

            <add-block-btn :blocks-types="blockTypes" @select="addStuffLine">
                {{addBtnLabel}}
            </add-block-btn>
            <v-spacer></v-spacer>
            <add-block-btn :blocks-types="blockTypes" @select="addStuffLine">
                {{addBtnLabel}}
            </add-block-btn>

        </div>




        <draggable v-if="json.length>0" class="row" tag="div" :list="json" handle=".handle" >
            <v-col class="stuff-item" style="position: relative" cols="12" md="6" lg="4" xl="3" v-for="(item,index) in json" :key="item.id">
                <v-card tile outlined flat class="my-5" min-height="200">
                    <v-system-bar lights-out dark absolute color="rgba(0,0,0,0.1)" window class="handle">
                        <v-spacer></v-spacer>
                        <v-icon  v-on:click="deleteStuffLine(index)">mdi-trash-can-outline</v-icon>
                    </v-system-bar>

                    <component v-model="json[index]"
                               :is="item.blockType"
                               :debug="debug">
                    </component>


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
        <pre v-if="debug">{{json}}</pre>

    </div>
</template>

<script>
    import AddBlockBtn from "@/components/fields/filed-blocks/add-block-btn";
    export default {
        name: "FieldBlocks",
        components: {AddBlockBtn},
        props: {
            value: {
                type: Array
            },
            debug:{
                type:Boolean,
                default:false
            },
            addBtnLabel:{
               type:String,
                default:"Ajouter"
            },
            blockTypes:{
                type:Array
            }
        },
        data(){
            return{
                json:[]
            }
        },
        watch:{
          value:function(val){
              console.warn("watch value",val)
              this.json=val;
          }
        },
        created() {
            this.json = this.value;
            if(!this.json){
                this.json=[];
            }
        },
        methods:{
            addStuffLine(index=0,blockType=null){
                if(blockType===null){
                    blockType=this.blockTypes[0];
                }
                this.json.splice(index,0,{
                    blockType:blockType,
                    id:new Date().getTime()
                });

            },
            deleteStuffLine(index){
                this.json.splice(index,1);
            }
        }
    }
</script>

<style scoped lang="less">
    .blocks{
        min-height: 100px;
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

    }
</style>